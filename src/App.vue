<script setup lang="ts">
import { computed, ref } from 'vue'
import { Lamp, LampState } from './statemachine'

const lamp = ref(new Lamp())

// get mainBody and set the background color
const backgroundColor = computed(() => {
    const brightness = lamp.value.brightness
    const brightness255 = brightness / lamp.value.maxBrightness
    return `rgb(${brightness255 * 255}, ${brightness255 * 255}, ${brightness255 * 194})`
})

const lampIsOn = computed(() => lamp.value.currentState.stateId === LampState.On)
</script>

<template>
    <div class="container mx-auto mt-5 text-center">
        <div>
            <h1 class="display-3">A beautiful lamp</h1>
        </div>
        <div>
            <h2 class="display-5">Currently {{ lamp.currentState.stateId.toLowerCase() }}</h2>
            <div :style="{ backgroundColor }" style="height: 20vh" />
            <h3 class="display-5">
                with a brightness of {{ (lamp.brightness / lamp.maxBrightness) * 100 }}% ({{
                    lamp.brightness
                }}/{{ lamp.maxBrightness }})
            </h3>
        </div>
        <div class="py-3">
            <button class="btn btn-primary mx-2 btn-lg" @click="lamp.toggle()">
                {{ lampIsOn ? 'Turn off' : 'Turn on' }}
            </button>
            <button
                class="btn btn-primary mx-2 btn-lg"
                @click="lamp.increase()"
                :disabled="!lampIsOn"
            >
                Increase
            </button>
            <button
                class="btn btn-primary mx-2 btn-lg"
                @click="lamp.decrease()"
                :disabled="!lampIsOn"
            >
                Decrease
            </button>
        </div>
    </div>
</template>
