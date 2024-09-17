<script setup lang="ts">
import { computed, ref } from 'vue'
import { Lamp } from './statemachine'
import * as bootstrap from 'bootstrap'

const lamp = ref(new Lamp())

// const brightness = ref(lamp._lampState.brightness)
// const stateName = computed(() => lamp._lampState.state.value.name)
// const brightness = computed(() => lamp.value._brightness)

// get mainBody and set the background color
const backgroundColor = computed(() => {
    const brightness = lamp.value.brightness
    const brightness255 = brightness / lamp.value.maxBrightness
    return `rgb(${brightness255 * 255}, ${brightness255 * 255}, ${brightness255 * 194})`
})
</script>

<template>
    <div class="container mx-auto mt-5 text-center">
        <div>
            <h1 class="display-3">A beautiful lamp</h1>
        </div>
        <div>
            <h2 class="display-5">Currently {{ lamp.state.name.toLowerCase() }}</h2>
            <div :style="{ backgroundColor }" style="height: 20vh" />
            <h3 class="display-5">
                with a brightness of {{ (lamp.brightness / lamp.maxBrightness) * 100 }}% ({{
                    lamp.brightness
                }}/{{ lamp.maxBrightness }})
            </h3>
        </div>
        <div class="py-3">
            <button class="btn btn-primary mx-2 btn-lg" @click="lamp.toggle()">Toggle</button>
            <button class="btn btn-primary mx-2 btn-lg" @click="lamp.increase()">Increase</button>
            <button class="btn btn-primary mx-2 btn-lg" @click="lamp.decrease()">Decrease</button>
        </div>
    </div>
</template>
