import { defineStore } from 'pinia'

export const useWeatherStore = defineStore({
  id: 'weather',
  state: () => ({
    weather: [],
  }),
  actions: {
    addWeather(data) {
      this.weather = data;
    },
  },
  getters: {
    getCity: (state) => {
      const { name } = state.weather.city

      return name
    },
    getDaily: (state) => state.weather.list,
    getToday: (state) => state.weather.list.shift()
  }
})
