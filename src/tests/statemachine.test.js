import { Lamp, LampState } from '../statemachine.ts'
import { expect, test } from 'vitest'

test('Lamp should be off by default', () => {
    const lamp = new Lamp()
    expect(lamp.currentState.stateId).toBe(LampState.Off)
})

test('Lamp should be on after toggle', () => {
    const lamp = new Lamp()
    lamp.toggle()
    expect(lamp.currentState.stateId).toBe(LampState.On)
})

test('Lamp should be off after toggle twice', () => {
    const lamp = new Lamp()
    lamp.toggle()
    lamp.toggle()
    expect(lamp.currentState.stateId).toBe(LampState.Off)
})

test('Lamp should be on with a middle brightness after enough decrease', () => {
    const lamp = new Lamp()
    lamp.toggle()
    expect(lamp.currentState.stateId).toBe(LampState.On)
    const x = Math.floor((lamp.maxBrightness - lamp.minBrightness) / 2)
    for (let i = 0; i < x; i++) {
        lamp.decrease()
    }
    expect(lamp.currentState.stateId).toBe(LampState.On)
    expect(lamp.brightness).toBe(lamp.maxBrightness - x)
})

test('Lamp should be on after toggle and maxBrightness decrease', () => {
    const lamp = new Lamp()
    lamp.toggle()
    expect(lamp.currentState.stateId).toBe(LampState.On)
    for (let i = 0; i < lamp.maxBrightness; i++) {
        lamp.decrease()
    }
    expect(lamp.currentState.stateId).toBe(LampState.On)
    expect(lamp.brightness).toBe(lamp.minBrightness)
})

test('Lamp should be turning off after a toggle and timeoutTicks ticks', () => {
    const lamp = new Lamp()
    lamp.toggle()
    expect(lamp.currentState.stateId).toBe(LampState.On)
    for (let i = 0; i < lamp.timeoutTicks; i++) {
        lamp.tick()
    }
    expect(lamp.currentState.stateId).toBe(LampState.SwitchingOff)
})

test('Lamp should be off after a toggle, timeoutTicks + maxBrightness ticks', () => {
    const lamp = new Lamp()
    lamp.toggle()
    expect(lamp.currentState.stateId).toBe(LampState.On)
    for (let i = 0; i < lamp.timeoutTicks + lamp.maxBrightness; i++) {
        lamp.tick()
    }
    expect(lamp.currentState.stateId).toBe(LampState.Off)
})

test('Lamp should be on after a toggle, lamp.timeoutTicks ticks, toggle', () => {
    const lamp = new Lamp()
    lamp.toggle()
    expect(lamp.currentState.stateId).toBe(LampState.On)
    for (let i = 0; i < lamp.timeoutTicks; i++) {
        lamp.tick()
    }
    expect(lamp.currentState.stateId).toBe(LampState.SwitchingOff)
    lamp.toggle()
    expect(lamp.currentState.stateId).toBe(LampState.On)
})

test('Lamp should be off after a toggle, X decrease, lamp.timeoutTicks ticks, X ticks', () => {
    const lamp = new Lamp()
    lamp.toggle()
    expect(lamp.currentState.stateId).toBe(LampState.On)
    const x = Math.floor((lamp.maxBrightness - lamp.minBrightness) / 2)
    for (let i = 0; i < x; i++) {
        lamp.decrease()
    }
    expect(lamp.currentState.stateId).toBe(LampState.On)
    expect(lamp.brightness).toBe(lamp.maxBrightness - x)
    for (let i = 0; i < lamp.timeoutTicks; i++) {
        lamp.tick()
    }
    expect(lamp.currentState.stateId).toBe(LampState.SwitchingOff)
    for (let i = 0; i < lamp.maxBrightness - x; i++) {
        lamp.tick()
    }
    expect(lamp.currentState.stateId).toBe(LampState.Off)
})

test('Lamp should be the same brightness after off and on', () => {
    const lamp = new Lamp()
    const x = Math.floor((lamp.maxBrightness - lamp.minBrightness) / 2)
    lamp.toggle()
    expect(lamp.currentState.stateId).toBe(LampState.On)
    for (let i = 0; i < x; i++) {
        lamp.decrease()
    }
    expect(lamp.currentState.stateId).toBe(LampState.On)
    expect(lamp.brightness).toBe(lamp.maxBrightness - x)
    lamp.toggle()
    expect(lamp.currentState.stateId).toBe(LampState.Off)
    expect(lamp.brightness).toBe(0)
    lamp.toggle()
    expect(lamp.currentState.stateId).toBe(LampState.On)
    expect(lamp.brightness).toBe(lamp.maxBrightness - x)
})

test('Lamp should be turning off at brightness 2 after a toggle and lamp.timeoutTicks+maxBrightness-2 ticks', () => {
    const lamp = new Lamp()
    lamp.toggle()
    expect(lamp.currentState.stateId).toBe(LampState.On)
    for (let i = 0; i < lamp.timeoutTicks + lamp.maxBrightness - 2; i++) {
        lamp.tick()
    }
    expect(lamp.currentState.stateId).toBe(LampState.SwitchingOff)
    expect(lamp.brightness).toBe(2)
})
