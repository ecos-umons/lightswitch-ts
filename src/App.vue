<script setup lang="ts">
import { ref } from 'vue'
import { Lamp } from './statemachine'

const lamp = ref(new Lamp())

// const brightness = ref(lamp._lampState.brightness)
// const stateName = computed(() => lamp._lampState.state.value.name)
// const brightness = computed(() => lamp.value._brightness)
</script>

<template>
    <div>
        <h1>A beautiful lamp</h1>
    </div>
    <div>
        <h2>{{ lamp.state.name }}</h2>
        <h3>{{ lamp.brightness }} - (Memory: {{ lamp.memory }})</h3>
    </div>
    <div>
        <button @click="lamp.toggle()">Toggle</button>
        <button @click="lamp.increase()">Increase</button>
        <button @click="lamp.decrease()">Decrease</button>
    </div>
</template>
