import { defineStore } from 'pinia'
import { getFilesApi } from '@/api/files.js'
import { ref } from "vue";

export const useFilesStore = defineStore('files', () => {
    const loading = ref(false)
    const files = ref({})

    async function getFiles(data) {
        loading.value = true
        try {
            files.value = await getFilesApi(data)
        } catch (error) {
            console.log(error);
        }
        loading.value = false
    }

    return { loading, files, getFiles }
})