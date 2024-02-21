import { defineStore } from 'pinia'
import { NFTStorage } from 'nft.storage'
import { getFilesApi, createFilesApi, delFilesApi } from '@/api/files.js'
import { ref } from "vue";

const Redirect = () => {
    uni.removeStorageSync("access_token");
    uni.reLaunch({
        url: "/pages/login/index",
    });
}
const client = new NFTStorage({ token: import.meta.env.VITE_NFT_STORAGE_TOKEN })

export const useFilesStore = defineStore('files', () => {
    const loading = ref(false)
    // 父id的栈
    const parentStack = ref([])
    // 当前打开的文件目录
    const current = ref([])

    // 获取文件列表
    async function getFiles({ name, val }) {
        loading.value = true
        uni.showLoading({ mask: true })
        if (val) {
            try {
                const { status, statusCode, data } = await getFilesApi(val)
                if (status && statusCode !== 401) {
                    if (name) {
                        parentStack.value.push({ name: name, id: val.parentId })
                    } else {
                        if (parentStack.value.length > 1) {
                            parentStack.value.pop();
                        }
                    }
                    current.value = data
                } else {
                    Redirect()
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const { status, statusCode, data } = await getFilesApi({ parentId: parentStack.value[parentStack.value.length - 1].id })
                if (status && statusCode !== 401) {
                    current.value = data
                } else {
                    Redirect()
                }
            } catch (error) {
                console.log(error);
            }
        }
        uni.hideLoading()
        loading.value = false
    }
    // 添加文件夹
    async function addFolder(val) {
        try {
            const { status, statusCode, data, message } = await createFilesApi(val)
            if (status) {
                current.value.push(data);
            } else {
                uni.showToast({
                    title: message,
                    icon: 'none'
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    // 添加文件
    async function addFile(val) {
        try {
            const cid = await client.storeDirectory([val.file]);
            delete val.file;
            const { status, statusCode, data, message } = await createFilesApi({ ...val, ipfs: `https://ipfs.io/ipfs/${cid}/${val.filename}` })
            if (status) {
                current.value.push(data);
            } else {
                uni.showToast({
                    title: message,
                    icon: 'none'
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    // 删除文件/文件夹
    async function delFiles(id) {
        try {
            const { status, statusCode, data, message } = await delFilesApi(id)
            if (status) {
                current.value.filter(item => item._id !== id);
            } else {
                uni.showToast({
                    title: message,
                    icon: 'none'
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    return { loading, current, parentStack, getFiles, addFolder, addFile, delFiles }
})