import { extend } from "umi-request"

const request = extend({
    prefix: '',
    timeout: 1000000,
    requestType: 'form',
})

/** 登陆  */
export async function requestByUpload(
    body: any,
    file?: any,
    params?: {},
    options?: { [key: string]: any }
) {
    request('/api/file/presign', {
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
            request(res.data.presign_data.postURL, {
                method: 'POST',
                params,
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

export async function requestByUploadOss(
    body: any,
    fileBody: any,
    params?: {},
    options?: { [key: string]: any }
) {
    console.log(fileBody)
    request('/api/file/presign_oss', {
        method: 'POST',
        params,
        data: body,
        ...(options || {}),
    }).then(res => {
        console.log('presign_oss', res)
        if (res.code === 200) {
            request(res.data.url, {
                method: 'PUT',
                params,
                headers: {
                    "Content-Type": "application/octet-stream"
                },
                body: fileBody,
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