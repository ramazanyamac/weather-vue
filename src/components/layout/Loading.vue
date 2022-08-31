<template>
    <div class="bg-white w-screen h-screen flex flex-col items-center justify-center mb-3">
        <Vue3Lottie :animationData="WeatherJSON" :height="200" :width="200" :speed="5" />
        <p class="text-md text-black" v-show="!location">Allow browser location</p>
    </div>
</template>

<script setup>
// import
import WeatherJSON from '@/assets/lotties/weather-icon.json';

const props = defineProps({
    location: {
        type: Boolean,
        required: true,
    },
});
</script>
