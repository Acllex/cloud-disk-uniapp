import { request } from '@/utils/index.js'


/**
 * 注册
 * @param {*} data 
 * @returns 
 */
const registerApi = async (data) => await request({
    url: '/api/user',
    method: 'post',
    data
})

/**
 * 是否重名
 */
const noUserNameApi = async (username) => await request({
    url: `/api/user/${username}`,
    method: 'get',
})

/**
 * 校验验证码
 */
const verCodeApi = async (data) => await request({
    url: '/api/vercode',
    method: 'post',
    data
})
export { registerApi, noUserNameApi, verCodeApi }