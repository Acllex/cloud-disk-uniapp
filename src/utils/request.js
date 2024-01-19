// const isProd = import.meta.env.PROD ? true : false
export const request = ({ url, method, data, }) => new Promise((resolve, rej) => {
    uni.request({
        url: "https://nest-cloud-be.vercel.app" + url,
        method,
        data,
        success: ({ data }) => {
            resolve(data)
        },
        fail: (err) => {
            rej(err)
        }
    });
})
