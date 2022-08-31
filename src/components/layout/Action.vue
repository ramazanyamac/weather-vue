<template>
    <div class="col-span-12 lg:col-span-7 relative">
        <picture class="absolute w-full h-full z-0">
            <video class="rounded-lg w-full h-full object-cover" ref="myVideo" autoplay loop muted>
                <source :src="`../videos/${weatherStore.getToday.weather[0].main}.mp4`" type="video/mp4" />
            </video>
        </picture>
        <div class="flex flex-col relative h-full z-10 p-10">
            <div class="flex justify-between items-center mb-5">
                <h3 class="font-medium leading-tight text-2xl">Weather</h3>
                <div
                    class="bg-[#79817F] bg-opacity-60 rounded-xl py-2 px-5 gap-3 inline-flex items-center"
                    role="alert"
                >
                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="#fff">
                        <path
                            d="M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13zm0-11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                        />
                    </svg>
                    <div class="flex flex-col">
                        <p class="font-light text-xs">Current Location</p>
                        <p class="font-bold text-base">{{ weatherStore.getCity }}</p>
                    </div>
                </div>
            </div>

            <div class="flex flex-col justify-center mt-auto mb-auto">
                <h1 class="font-medium leading-tight text-3xl mt-0 mb-10 text-center">
                    The Only Weather Forecast You Need
                </h1>

                <div class="flex justify-center">
                    <div class="w-[50%]">
                        <div class="flex gap-3 items-center">
                            <div class="relative w-full">
                                <input
                                    @input="handleSearchInput"
                                    v-model="searchInput"
                                    type="text"
                                    class="block p-3 pr-10 w-full text-sm bg-transparent outline-0 text-white placeholder-gray-100 placeholder-opacity-75 rounded-md backdrop-blur-sm bg-white/30"
                                    placeholder="Enter location"
                                    autocomplete="off"
                                />
                                <div class="flex absolute inset-y-0 right-0 items-center pr-3">
                                    <IconSpinner v-if="isSearch" />
                                    <div class="cursor-pointer" v-else-if="search" @click="clearSearch">
                                        <IconClose />
                                    </div>
                                    <IconSearch v-else />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// import
import { computed, ref } from 'vue';
import IconSpinner from '@/components/icons/IconSpinner.vue';
import IconSearch from '@/components/icons/IconSearch.vue';
import IconClose from '@/components/icons/IconClose.vue';
import { useNavigatorLanguage, useGeolocation } from '@vueuse/core';
import { useWeatherStore } from '@/stores/weather';
import { weatherAPI } from '@/services/weatherAPI';

// ref
const search = ref(null);
const searchInput = ref(null);
const debounce = ref(null);
const isSearch = ref(false);
const myVideo = ref(null);

// store
const weatherStore = useWeatherStore();

// coords
const { coords } = useGeolocation();

// language
const { language } = useNavigatorLanguage();

// videoReload
const videoReload = () => {
    const videoPlayer = myVideo.value;
    videoPlayer.load();
    videoPlayer.play();
};

// search
const handleSearchInput = async (e) => {
    search.value = null;
    clearTimeout(debounce.value);
    debounce.value = setTimeout(() => {
        search.value = searchInput.value;
        isSearch.value = true;

        setTimeout(async () => {
            const params = {
                q: searchInput.value,
                lang: language.value,
            };
            const data = await weatherAPI(params);
            if (data.cod === '200') {
                weatherStore.addWeather(data);
                isSearch.value = false;
                videoReload();
            } else {
                console.log(data);
            }
        }, 1000);
    }, 1000);
};

// clearSearch
const clearSearch = async () => {
    search.value = null;
    searchInput.value = null;

    const params = {
        lat: coords.value.latitude,
        lon: coords.value.longitude,
        lang: language.value,
    };
    const data = await weatherAPI(params);
    weatherStore.addWeather(data);
    videoReload();
};
</script>
