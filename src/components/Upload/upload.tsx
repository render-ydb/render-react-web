import React, { ChangeEvent, useRef, useState, DragEvent } from 'react'
import { prefix } from '../../utils/constant'
import classNames from 'classnames'
import axios from 'axios'
import Icon from '../Icon'
import Progress from '../Progress'

export interface UploadProps {
    /**
     * 文件上传地址
    */
    action: string,
    /**开启头像上传*/
    avatar?: boolean,
    /**拖拽上传*/
    drag?: boolean,
    /**自定义请求headers*/
    headers?: { [key: string]: any },
    /**额外的上传数据*/
    data?: { [key: string]: any },
    /**是否携带cookie*/
    withCredentials?: boolean,
    /**上传文件名称*/
    name?: string,
    /**文件上传类型*/
    accept?: string,
    /**是否可以上传多个文件*/
    multiple?: boolean,
    /**文件列表*/
    list?: UploadFile[],
    /**
     * 文件上传之前的处理函数，返回false，则禁止上传文件
    */
    beforeUpload?: (file: File) => boolean | Promise<File>,
    /**
     * 该函数用户获取文件的上传进度
    */
    onProgress?: (percentage: number, file: UploadFile) => void,
    /**
     * 文件上传成功的回调函数
    */
    onSuccess?: (data: any, file: UploadFile) => void,
    /**
     * 文件上传失败的回调函数
    */
    onError?: (err: any, file: UploadFile) => void,
    /**
     * 文件状态改变后的回调函数
    */
    onChange?: (file: UploadFile) => void,
    /**删除文件的回调*/
    onDeleted: (file: UploadFile) => void
}

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error' | 'uploading'

export interface UploadFile {
    /**
     * 文件的唯一标识
    */
    uuid: string,
    /**
     * 文件大小
    */
    size: number,
    /**
     * 文件名称
    */
    name: string,
    /**
     * 文件状态
    */
    status?: UploadFileStatus,
    /**
     * 文件上传进度
    */
    percent?: number,
    /**
     * 文件原始信息
    */
    raw?: File,
    /**
     * 文件上传成功后的结果
    */
    response?: any,
    /**
     * 文件上传失败后的结果
    */
    error?: any,
    /**
     * 文件是否是hover状态，用于动画显示
    */
    isHover?: boolean,


}

export const Upload: React.FC<UploadProps> = props => {
    const {
        action,
        avatar,
        drag,
        headers,
        withCredentials,
        data,
        name,
        accept,
        multiple,
        list,
        beforeUpload,
        onError,
        onProgress,
        onSuccess,
        onChange,
        onDeleted,
        children
    } = props;
    const fileInput = useRef<HTMLInputElement>(null);

    const [fileList, setFileList] = useState<UploadFile[]>(list || []);

    const updateFileList = (uploadFile: UploadFile, uploadObj: Partial<UploadFile>) => {
        let _file: UploadFile = uploadFile;
        setFileList(prevFileList => {
            return prevFileList.map(file => {
                if (file.uuid === uploadFile.uuid) {
                    _file = { ...file, ...uploadObj }
                    return _file
                }
                return file
            })
        });

        return _file

    }

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
        if (!multiple){
            setFileList([]);
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
        const initFileInfo: UploadFile = {
            uuid: Date.now() + 'file',
            size: file.size,
            name: file.name,
            raw: file,
            percent: 0,
            status: 'ready'
        };
        setFileList(fileList => {
            return [initFileInfo, ...fileList]
        });
        onChange && onChange(initFileInfo);
        // return;
        const formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key])
            })
        }
        axios.post(action, formData, {
            headers: {
                ...headers,
                "Content-type": "multipart/form-data"
            },
            withCredentials: !!withCredentials,
            onUploadProgress: (e) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                console.log(percentage);
                let uploadingFile: UploadFile = updateFileList(initFileInfo, { percent: percentage, status: 'uploading' })
                if (percentage < 100) {
                    onProgress && onProgress(percentage, uploadingFile);

                }
            }
        }).then(res => {
            let successFile: UploadFile = updateFileList(initFileInfo, { percent: 100, status: 'success', response: res })
            onSuccess && onSuccess(res, successFile);
            onChange && onChange(successFile)
        }).catch(err => {
            console.log(err);
            let failedFile: UploadFile = updateFileList(initFileInfo, { status: 'error', error: err })
            onError && onError(err, failedFile);
            onChange && onChange(failedFile)
        })
    }
    console.log(fileList);

    const uploadClassNames = classNames(
        {
            [`${prefix}-upload-avatar`]: !!avatar
        }
    );

    const handleDelIcon = (item: UploadFile, visible: boolean) => {
        setFileList(fileList => {
            return fileList.map(file => {
                if (file.uuid === item.uuid) {
                    return { ...file, isHover: visible }
                }
                return file;
            })
        })
    }
    const handleDelFile = (item: UploadFile) => {
        if (!item.isHover) { return }
        setFileList(fileList => {
            const _fileList = [...fileList];
            const index = [..._fileList].findIndex(file => file.uuid === item.uuid);
            if (index >= 0) {
                if (onDeleted) { onDeleted(_fileList[index]) }
                _fileList.splice(index, 1);
            }
            return _fileList;
        })
    }
    const handleDragOver = (e: DragEvent<HTMLElement>) => {
        e.preventDefault();
    }
    const handleOndrop = (e: DragEvent<HTMLElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files) {
            uploadFiles(files)
        }

    }
    return (
        <div>
            <div
                className={uploadClassNames}
                onClick={handleFileInputClick}
                onDragOver={e => handleDragOver(e)}
                onDragLeave={e => handleDragOver(e)}
                onDrop={handleOndrop}
            >
                <div>
                    {children}
                </div>
                <input
                    type="file"
                    style={{
                        display: "none"
                    }}
                    ref={fileInput}
                    onChange={handleFileChange}
                    accept={accept}
                    multiple={multiple}
                />
            </div>
            <ul className={`${prefix}-upload-list`}>
                {
                    fileList.map(file => {
                        const { name, percent, status, isHover } = file;
                        return (
                            <li
                                key={file.uuid}
                                className={`${prefix}-upload-item`}
                                onMouseEnter={() => handleDelIcon(file, true)}
                                onMouseLeave={() => handleDelIcon(file, false)}
                            >
                                <div className={`${prefix}-upload-item-container ${status === 'error' ? `${prefix}-upload-item-fail` : ''}`}>
                                    <Icon name={(status === 'ready' || status === 'uploading') ? 'LoadingOutlined' : 'PaperClipOutlined'} />
                                    <span className={`${prefix}-upload-item-filename`}>{name}</span>

                                    <span className={`${prefix}-upload-item-del-icon`} onClick={() => handleDelFile(file)}>
                                        {
                                            isHover && <Icon name='DeleteOutlined' />
                                        }
                                    </span>
                                </div>
                                {
                                    (status !== 'error' && status !== 'success') &&
                                    <div className={`${prefix}-upload-item-progress`}>
                                        <Progress
                                            showInfo={false}
                                            height={4}
                                            percent={percent}
                                        />
                                    </div>
                                }
                            </li>
                        )

                    })
                }
            </ul>
        </div>
    )

}
Upload.defaultProps = {
    name: 'file',
    drag:true,
}
export default Upload;