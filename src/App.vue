<template>
    <Loading v-if="isLoading" :location="isLocation" />
    <div v-else class="container bg-white rounded-lg shadow-2xl">
        <div class="grid grid-cols-12">
            <Action />
            <Weather />
        </div>
    </div>
</template>

<script setup>
// import
import { ref, watch } from 'vue';
import Loading from '@/components/layout/Loading.vue';
import Weather from '@/components/layout/Weather.vue';
import Action from '@/components/layout/Action.vue';
import { useNavigatorLanguage, useGeolocation } from '@vueuse/core';
import { weatherAPI } from '@/services/weatherAPI';
import { useWeatherStore } from '@/stores/weather';

// ref
const isLoading = ref(true);
const isLocation = ref(false);

// store
const weatherStore = useWeatherStore();

// language
const { language } = useNavigatorLanguage();

// coords
const { coords } = useGeolocation();

watch(coords, async (newQuestion) => {
    if (newQuestion && !isLocation.value) {
        isLocation.value = true;
        if (isLocation.value) {
            const params = {
                lat: coords.value.latitude,
                lon: coords.value.longitude,
                lang: language.value,
            };
            const data = await weatherAPI(params);
            weatherStore.addWeather(data);
            isLoading.value = data?.false;
        }
    }
});
</script>
