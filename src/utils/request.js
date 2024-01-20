// const isProd = import.meta.env.PROD ? true : false
export const request = ({ url, method, data, }) => new Promise((resolve, rej) => {
    uni.request({
        url: "https://www.998115.xyz" + url,
        method,
        data,
        withCredentials: true,
        success: ({ data }) => {
            resolve(data)
        },
        fail: (err) => {
            rej(err)
        }
    });
})
