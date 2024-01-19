export const request = ({ url, method, data, }) => {
    return new Promise((resolve, rej) => {
        uni.request({
            url: url,
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
}