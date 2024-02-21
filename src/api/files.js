import { request } from '@/utils/index.js'

/**
 * 新建文件或文件夹
 */
const createFilesApi = async (data) => await request({
    url: '/api/files',
    method: 'post',
    data
})
/**
 * 获取文件目录
 */
const getFilesApi = async (data) => await request({
    url: '/api/files/child',
    method: 'post',
    data
})
/**
 * 删除文件
 */
const delFilesApi = async (id) => await request({
    url: `/api/files/${id}`,
    method: 'delete'
})

export { createFilesApi, getFilesApi, delFilesApi }