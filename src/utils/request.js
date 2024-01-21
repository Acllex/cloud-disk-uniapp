// const isProd = import.meta.env.PROD ? true : false
export const request = ({ url, method, data, }) => new Promise((resolve, rej) => {
    uni.request({
        url: "https://api.joon.eu.org" + url,
        method,
        data,
        withCredentials: true,
        header: {
            authorization: localStorage.getItem('access_token')
        },
        success: ({ data }) => {
            resolve(data)
        },
        fail: (err) => {
            rej(err)
        }
    });
})
