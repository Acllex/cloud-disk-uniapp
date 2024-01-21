import { defineStore } from 'pinia'

export const useFilesStore = defineStore('files', () => {
    const count = ref({})
    function increment() {

    }

    return { count, doubleCount, increment }
})