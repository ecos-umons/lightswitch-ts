import { reactive, ref } from 'vue'

class Transition {
    private _to: any

    constructor(to: any) {
        this._to = to
    }

    transition(context: Lamp): void {
        context.state = new this._to()
    }
}

class State {
    name: string
    protected _context!: Lamp

    constructor(name: string) {
        this.name = name
    }

    entry(): void {
        console.log(`[${this.name}]: entry`)
    }

    exit(): void {
        console.log(`[${this.name}]: exit`)
    }

    toggle(): void {
        console.log(`[${this.name}]: toggle`)
    }
    decrease(): void {
        console.log(`[${this.name}]: decrease`)
    }
    increase(): void {
        console.log(`[${this.name}]: increase`)
    }
    tick(): void {
        console.log(`[${this.name}]: tick`)
    }

    get context(): Lamp {
        return this._context
    }

    set context(context: Lamp) {
        this._context = context
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
        super.transition(context)
        context.memory = context.brightness
        context.brightness = 0
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

class Off extends State {
    constructor() {
        super('Off')
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
        super('On')
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
        this._timeout = 10
    }

    decrease(): void {
        super.decrease()
        // brightness should not be less than 0
        // verified by the setter
        this.context.brightness -= 1
        this._timeout = 10
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
}

class SwitchingOff extends State {
    constructor() {
        super('SwitchingOff')
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
    memory: number
    state: any
    // should be State, but there is then a typing issue
    // with the getter and accessor
}

export class Lamp {
    private _stateVars: LampVars

    constructor() {
        this._stateVars = reactive({
            brightness: 0,
            memory: 10,
            state: new Off()
        })
        this._stateVars.state.context = this
        this._stateVars.state.entry()
        // run every second
        setInterval(() => this.state.tick(), 1000)
    }

    transition(t: Transition): void {
        t.transition(this)
    }

    toggle(): void {
        this.state.toggle()
    }
    increase(): void {
        this.state.increase()
    }
    decrease(): void {
        this.state.decrease()
    }

    set brightness(value: number) {
        // Ensure the brightness value is between 0 and 10
        value = Math.min(10, Math.max(0, value))
        this._stateVars.brightness = value
    }

    get brightness(): number {
        return this._stateVars.brightness
    }

    get state(): State {
        return this._stateVars.state
    }

    set state(state: State) {
        this.state.exit()
        this._stateVars.state = state
        this._stateVars.state.context = this
        this.state.entry()
    }

    set memory(value: number) {
        this._stateVars.memory = value
    }

    get memory(): number {
        return this._stateVars.memory
    }
}
