<template>
    <div class="col-span-12 lg:col-span-5">
        <div class="py-8">
            <div class="px-10">
                <h3 class="mb-3 text-5xl font-bold text-black">Today</h3>
                <div class="mb-7 p-7 max-w-sm bg-white rounded-2xl shadow-xl">
                    <div class="flex justify-between gap-5">
                        <div class="flex-1">
                            <h4 class="mb-3 text-4xl font-bold text-black">
                                {{ Math.round(weatherStore.getToday.main.temp) }}°
                            </h4>
                            <div class="flex items-center gap-2 mb-3">
                                <h5 class="text-3xl font-medium text-black">
                                    {{ weatherStore.getToday.weather[0].main }}
                                </h5>
                                <img
                                    :src="`http://openweathermap.org/img/wn/${weatherStore.getToday.weather[0].icon}@2x.png`"
                                    width="50"
                                    height="50"
                                    :alt="weatherStore.getToday.weather[0].main"
                                    :title="weatherStore.getToday.weather[0].main"
                                />
                            </div>
                            <p class="font-normal text-black">{{ date(weatherStore.getToday.dt_txt) }}</p>
                        </div>
                        <div class="space-y-10">
                            <hr class="h-full border-2 rounded-2xl border-gray-300" />
                        </div>
                        <div class="flex flex-1 items-center">
                            <ul class="list-none">
                                <li class="text-sm text-gray-400" v-show="weatherStore.getToday.main.feels_like">
                                    RealFeel: {{ Math.round(weatherStore.getToday.main.feels_like) }}°
                                </li>
                                <li class="text-sm text-gray-400" v-show="weatherStore.getToday.main.humidity">
                                    Humidity: {{ Math.round(weatherStore.getToday.main.humidity) }}%
                                </li>
                                <li class="text-sm text-gray-400" v-show="weatherStore.getToday.clouds">
                                    Cloudy: {{ Math.round(weatherStore.getToday.clouds.all) }}%
                                </li>
                                <li class="text-sm text-gray-400" v-show="weatherStore.getToday.wind.speed">
                                    Wind: {{ Math.round(weatherStore.getToday.wind.speed) }}km/h
                                </li>
                                <li class="text-sm text-gray-400" v-show="weatherStore.getToday.main.temp_max">
                                    High / Low: {{ Math.round(weatherStore.getToday.main.temp_max) }}° /
                                    {{ Math.round(weatherStore.getToday.main.temp_min) }}°
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-[85%] mr-auto ml-auto">
                <h3 class="mb-3 text-4xl font-bold text-black">Daily</h3>
                <div class="flex gap-3 scroll-smooth overflow-x-auto px-5 -mx-5">
                    <div
                        class="mb-7 min-w-fit p-5 bg-white rounded-2xl shadow-xl"
                        v-for="(weather, index) in weatherStore.getDaily"
                        :key="index"
                    >
                        <h4 class="mb-3 text-3xl font-bold text-black">{{ Math.round(weather.main.temp) }}°</h4>
                        <div class="flex items-center gap-2 mb-3">
                            <h5 class="text-2xl font-medium text-black">{{ weather.weather[0].main }}</h5>
                            <img
                                :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
                                width="50"
                                height="50"
                                :alt="weather.weather[0].main"
                                :title="weather.weather[0].main"
                            />
                        </div>
                        <p class="font-normal text-black">
                            {{ date(weather.dt_txt) }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// import
import { useDateFormat } from '@vueuse/core';
import { useWeatherStore } from '@/stores/weather';

// store
const weatherStore = useWeatherStore();

// date
const date = (date) => {
    const day = useDateFormat(date, 'ddd', { locales: 'en-US' });
    const month = useDateFormat(date, 'DD', { locales: 'en-US' });
    const minute = useDateFormat(date, 'mm', { locales: 'en-US' });
    const hour = useDateFormat(date, 'HH', { locales: 'en-US' });
    return `${hour.value}:${minute.value} - ${day.value} ${month.value}`;
};
</script>
