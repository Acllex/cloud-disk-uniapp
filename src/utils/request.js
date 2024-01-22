// const isProd = import.meta.env.PROD ? true : false
export const request = ({ url, method, data, }) => new Promise((resolve, rej) => {
    uni.request({
        url: "https://api.joon.eu.org" + url,
        method,
        data,
        withCredentials: true,
        header: {
            authorization: uni.getStorageSync('access_token')
        },
        success: ({ data }) => {
            console.log(data);
            resolve(data)
        },
        fail: (err) => {
            rej(err)
        }
    });
})
