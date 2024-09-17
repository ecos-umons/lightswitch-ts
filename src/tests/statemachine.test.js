import { Lamp } from '../statemachine.ts'
import { expect, test } from 'vitest'

const ON_STATE = 'on'
const OFF_STATE = 'off'
const SWITCHING_OFF_STATE = 'switching off'

test('Lamp should be off by default', () => {
    const lamp = new Lamp()
    expect(lamp.state.name.toLowerCase()).toBe(OFF_STATE)
})

test('Lamp should be on after toggle', () => {
    const lamp = new Lamp()
    lamp.toggle()
    expect(lamp.state.name.toLowerCase()).toBe(ON_STATE)
})

test('Lamp should be off after toggle twice', () => {
    const lamp = new Lamp()
    lamp.toggle()
    lamp.toggle()
    expect(lamp.state.name.toLowerCase()).toBe(OFF_STATE)
})

test('Lamp should be on with a brightness of 50 after toggle and 5 decrease', () => {
    const lamp = new Lamp()
    lamp.toggle()
    expect(lamp.state.name.toLowerCase()).toBe(ON_STATE)
    for (let i = 0; i < 5; i++) {
        lamp.decrease()
    }
    expect(lamp.state.name.toLowerCase()).toBe(ON_STATE)
    expect(lamp.brightness).toBe(5)
})

test('Lamp should be on after toggle and 10 decrease', () => {
    const lamp = new Lamp()
    lamp.toggle()
    expect(lamp.state.name.toLowerCase()).toBe(ON_STATE)
    for (let i = 0; i < 10; i++) {
        lamp.decrease()
    }
    expect(lamp.state.name.toLowerCase()).toBe(ON_STATE)
    expect(lamp.brightness).toBe(0)
})

test('Lamp should be turning off after a toggle and 10 ticks', () => {
    const lamp = new Lamp()
    lamp.toggle()
    expect(lamp.state.name.toLowerCase()).toBe(ON_STATE)
    for (let i = 0; i < 10; i++) {
        lamp.tick()
    }
    expect(lamp.state.name.toLowerCase()).toBe(SWITCHING_OFF_STATE)
})

test('Lamp should be off after a toggle, 10 + maxBrightness ticks', () => {
    const lamp = new Lamp()
    lamp.toggle()
    expect(lamp.state.name.toLowerCase()).toBe(ON_STATE)
    for (let i = 0; i < 10 + lamp.maxBrightness; i++) {
        lamp.tick()
    }
    expect(lamp.state.name.toLowerCase()).toBe(OFF_STATE)
})

test('Lamp should be on after a toggle, 10 ticks, toggle', () => {
    const lamp = new Lamp()
    lamp.toggle()
    expect(lamp.state.name.toLowerCase()).toBe(ON_STATE)
    for (let i = 0; i < 10; i++) {
        lamp.tick()
    }
    expect(lamp.state.name.toLowerCase()).toBe(SWITCHING_OFF_STATE)
    lamp.toggle()
    expect(lamp.state.name.toLowerCase()).toBe(ON_STATE)
})

test('Lamp should be off after a toggle, X decrease, 10 ticks, X ticks', () => {
    const lamp = new Lamp()
    lamp.toggle()
    expect(lamp.state.name.toLowerCase()).toBe(ON_STATE)
    for (let i = 0; i < 5; i++) {
        lamp.decrease()
    }
    expect(lamp.state.name.toLowerCase()).toBe(ON_STATE)
    expect(lamp.brightness).toBe(5)
    for (let i = 0; i < 10; i++) {
        lamp.tick()
    }
    expect(lamp.state.name.toLowerCase()).toBe(SWITCHING_OFF_STATE)
    for (let i = 0; i < 10; i++) {
        lamp.tick()
    }
    expect(lamp.state.name.toLowerCase()).toBe(OFF_STATE)
})

test('Lamp should be the same brightness after off and on', () => {
    const lamp = new Lamp()
    const x = 5
    lamp.toggle()
    expect(lamp.state.name.toLowerCase()).toBe(ON_STATE)
    for (let i = 0; i < x; i++) {
        lamp.decrease()
    }
    expect(lamp.state.name.toLowerCase()).toBe(ON_STATE)
    expect(lamp.brightness).toBe(lamp.maxBrightness - x)
    lamp.toggle()
    expect(lamp.state.name.toLowerCase()).toBe(OFF_STATE)
    expect(lamp.brightness).toBe(0)
    lamp.toggle()
    expect(lamp.state.name.toLowerCase()).toBe(ON_STATE)
    expect(lamp.brightness).toBe(lamp.maxBrightness - x)
})

test('Lamp should be turning off at brightness 2 after a toggle and 10+maxBrightness-2 ticks', () => {
    const lamp = new Lamp()
    lamp.toggle()
    expect(lamp.state.name.toLowerCase()).toBe(ON_STATE)
    for (let i = 0; i < 10 + lamp.maxBrightness - 2; i++) {
        lamp.tick()
    }
    expect(lamp.state.name.toLowerCase()).toBe(SWITCHING_OFF_STATE)
    expect(lamp.brightness).toBe(2)
})
