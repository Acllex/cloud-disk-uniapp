import { defineStore } from 'pinia'
import { getFilesApi, createFilesApi } from '@/api/files.js'
import { ref } from "vue";

export const useFilesStore = defineStore('files', () => {
    const loading = ref(false)
    const files = ref({})

    async function getFiles(data) {
        loading.value = true
        try {
            const { statusCode, data } = await getFilesApi(data)
            files.value = data;
        } catch (error) {
            console.log(error);
        }
        loading.value = false
    }

    async function addFiles(data) {
        try {
            files.value = await addFiles(data)
        } catch (error) {
            console.log(error);
        }
    }

    return { loading, files, getFiles }
})