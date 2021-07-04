import React, { ChangeEvent, useRef } from 'react'
import { prefix } from '../../utils/constant'
import Button from '../button'
import axios from 'axios'

export interface UploadProps {
    /**
     * 文件上传地址
    */
    action: string,
    /**
     * 文件上传之前的处理函数，返回false，则禁止上传文件
    */
    beforeUpload?: (file: File) => boolean | Promise<File>,
    /**
     * 该函数用户获取文件的上传进度
    */
    onProgress?: (percentage: number, file: File) => void,
    /**
     * 文件上传成功的回调函数
    */
    onSuccess?: (data: any, file: File) => void,
    /**
     * 文件上传失败的回调函数
    */
    onError?: (err: any, file: File) => void,
    /**
     * 文件状态改变后的回调函数
    */
    onChange?: (file: File) => void
}

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
    /**
     * 文件的唯一标识
    */
    uuid:string,
    /**
     * 文件大小
    */
    size:number,
    /**
     * 文件名称
    */
    name:string,
    /**
     * 文件状态
    */
    status?:UploadFileStatus,
    /**
     * 文件上传进度
    */
    percent?:number,
    /**
     * 文件原始信息
    */
    raw?:File,
    /**
     * 文件上传成功后的结果
    */
    response?:any,
    /**
     * 文件上传失败后的结果
    */
    error?:any
}

export const Upload: React.FC<UploadProps> = props => {
    const {
        action,
        beforeUpload,
        onError,
        onProgress,
        onSuccess,
        onChange
    } = props;
    const fileInput = useRef<HTMLInputElement>(null);

    const handleFileInputClick = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }

    }
    const uploadFiles = (files: FileList) => {
        const postFiles = Array.from(files);
        postFiles.forEach(file => {
            if (!beforeUpload) {
                postFile(file)
            } else {
                const result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        postFile(processedFile);
                    })
                } else if (result !== false) {
                    postFile(file)
                }
            }

        });
    }
    const postFile = (file: File) => {
        const formData = new FormData();
        formData.append(file.name, file);
        axios.post(action, formData, {
            headers: {
                "Content-type": "multipart/form-data"
            },
            onUploadProgress: (e) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                console.log(percentage)
                if (percentage < 100) {
                    onProgress && onProgress(percentage, file);
                }
            }
        }).then(res => {
            console.log(res);
            onSuccess && onSuccess(res, file)
        }).catch(err => {
            console.log(err);
            onError && onError(err, file)
        }).finally(() => {
            onChange && onChange(file)
        })
    }
    return (
        <div>
            <Button
                type='primary'
                icon='ToTopOutlined'
                onClick={handleFileInputClick}
            >
                上传文件
            </Button>
            <input
                type="file"
                style={{
                    display: "none"
                }}
                ref={fileInput}
                onChange={handleFileChange}
            />
        </div>
    )

}

export default Upload;