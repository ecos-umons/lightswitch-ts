import { reactive } from 'vue'

class Transition {
    private _to: any

    constructor(to: any) {
        this._to = to
    }

    transition(context: Lamp): void {
        context.currentState = new this._to()
    }
}

class OffOnTransition extends Transition {
    constructor() {
        super(On)
    }

    transition(context: Lamp): void {
        super.transition(context)
        context.brightness = context.memory
    }
}

class OnOffTransition extends Transition {
    constructor() {
        super(Off)
    }

    transition(context: Lamp): void {
        context.memory = context.brightness
        super.transition(context)
    }
}

class SOffOffTransition extends Transition {
    constructor() {
        super(Off)
    }

    transition(context: Lamp): void {
        if (context.brightness === 0) {
            super.transition(context)
        }
    }
}

class SOffOnTransition extends Transition {
    constructor() {
        super(On)
    }

    transition(context: Lamp): void {
        super.transition(context)
    }
}

class OnSOffTransition extends Transition {
    constructor() {
        super(SwitchingOff)
    }

    transition(context: Lamp): void {
        super.transition(context)
    }
}

export enum LampState {
    Off = 'Off',
    On = 'On',
    SwitchingOff = 'Switching Off'
}

class State {
    stateId: LampState
    protected _context!: Lamp

    constructor(state: LampState) {
        this.stateId = state
    }

    entry(): void {
        console.log(`[${this.stateId}]: entry`)
    }

    exit(): void {
        console.log(`[${this.stateId}]: exit`)
    }

    toggle(): void {
        console.log(`[${this.stateId}]: toggle`)
    }
    decrease(): void {
        console.log(`[${this.stateId}]: decrease`)
    }
    increase(): void {
        console.log(`[${this.stateId}]: increase`)
    }
    tick(): void {
        console.log(`[${this.stateId}]: tick`)
    }

    get context(): Lamp {
        return this._context
    }

    set context(context: Lamp) {
        this._context = context
    }
}

class Off extends State {
    constructor() {
        super(LampState.Off)
    }

    entry(): void {
        super.entry()
        this.context.brightness = 0
    }

    toggle(): void {
        super.toggle()
        this.context.transition(new OffOnTransition())
    }
}

class On extends State {
    private _timeout: number = 10

    constructor() {
        super(LampState.On)
    }

    entry(): void {
        super.entry()
        this.context.brightness = this.context.memory
    }

    exit(): void {
        super.exit()
        this.context.memory = this.context.brightness
    }

    increase(): void {
        super.increase()
        // brightness should not exceed 10
        // verified by the setter
        this.context.brightness += 1
        this._timeout = this.context.timeoutTicks
    }

    decrease(): void {
        super.decrease()
        // brightness should not be less than minBrightness
        this.context.brightness = Math.max(this.context.minBrightness, this.context.brightness - 1)
        this._timeout = this.context.timeoutTicks
    }

    toggle(): void {
        super.toggle()
        this.context.transition(new OnOffTransition())
    }

    tick(): void {
        super.tick()
        this._timeout -= 1
        if (this._timeout === 0) {
            this.context.transition(new OnSOffTransition())
        }
    }

    // Somehow, we also need to override the context getter
    // when we override the context setter
    get context(): Lamp {
        return super.context
    }

    set context(context: Lamp) {
        super.context = context
        this._timeout = context.timeoutTicks
    }
}

class SwitchingOff extends State {
    constructor() {
        super(LampState.SwitchingOff)
    }

    tick(): void {
        super.tick()
        // brightness should not be less than 0
        // verified by the setter
        this.context.brightness -= 1
        this.context.transition(new SOffOffTransition())
    }

    toggle(): void {
        super.toggle()
        this.context.transition(new SOffOnTransition())
    }
}

interface LampVars {
    brightness: number
    maxBrightness: number
    minBrightness: number
    memory: number
    currentState: any
    timeoutTicks: number
    // should be State, but there is then a typing issue
    // with the getter and accessor
}

export class Lamp {
    private _stateVars: LampVars

    constructor() {
        this._stateVars = reactive({
            brightness: 0,
            memory: 10,
            currentState: new Off(),
            maxBrightness: 10,
            minBrightness: 5,
            timeoutTicks: 10
        })
        // assert(this._stateVars.minBrightness <= this._stateVars.maxBrightness)
        this._stateVars.currentState.context = this
        this._stateVars.currentState.entry()
        // run every second
        setInterval(() => this.currentState.tick(), 1000)
    }

    transition(t: Transition): void {
        t.transition(this)
    }

    toggle(): void {
        this.currentState.toggle()
    }
    increase(): void {
        this.currentState.increase()
    }
    decrease(): void {
        this.currentState.decrease()
    }
    tick(): void {
        this.currentState.tick()
    }

    get brightness(): number {
        return this._stateVars.brightness
    }

    set brightness(value: number) {
        // Ensure the brightness value is between 0 and 10
        value = Math.min(this._stateVars.maxBrightness, Math.max(0, value))
        this._stateVars.brightness = value
    }

    get currentState(): State {
        return this._stateVars.currentState
    }

    set currentState(state: State) {
        this.currentState.exit()
        this._stateVars.currentState = state
        this._stateVars.currentState.context = this
        this.currentState.entry()
    }

    set memory(value: number) {
        this._stateVars.memory = value
    }

    get memory(): number {
        return this._stateVars.memory
    }

    get maxBrightness(): number {
        return this._stateVars.maxBrightness
    }

    get minBrightness(): number {
        return this._stateVars.minBrightness
    }

    get timeoutTicks(): number {
        return this._stateVars.timeoutTicks
    }

    set timeoutTicks(value: number) {
        this._stateVars.timeoutTicks = value
    }
}
