import { extend } from "umi-request"

const request = extend({
    prefix: '',
    timeout: 1000000,
    requestType: 'form',
    credentials: 'include'
})


/** 登陆  */
export async function requestByUpload(
    body: any,
    file?: any,
    params?: {},
    options?: { [key: string]: any }
) {
    request<any>('/api/file/presign', {
        method: 'POST',
        params,
        data: body,
        ...(options || {}),
    }).then(res => {
        console.log('presign', res)
        if (res.code === 200) {
            console.log(file)
            let form = res.data.presign_data.formData
            let formdata = new FormData()
            Object.keys(form).forEach(key => {
                formdata.append(key, form[key])
            })
            formdata.append('file', file)
            request<any>(res.data.presign_data.postURL, {
                method: 'POST',
                params,
                requestType: 'form',
                body: formdata,
                ...(options || {}),
            }).then(res => {
                console.log('图片上传成功')
            }).catch(err => {
                console.log('图片上传失败')
            })
        }
    }).catch(err => {
        console.log(err)
    })
}
