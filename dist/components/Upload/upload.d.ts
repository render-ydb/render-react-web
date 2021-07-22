import React from 'react';
export interface UploadProps {
    /**
     * 文件上传地址
    */
    action: string;
    /**开启头像上传*/
    avatar?: boolean;
    /**拖拽上传*/
    drag?: boolean;
    /**自定义请求headers*/
    headers?: {
        [key: string]: any;
    };
    /**额外的上传数据*/
    data?: {
        [key: string]: any;
    };
    /**是否携带cookie*/
    withCredentials?: boolean;
    /**上传文件名称*/
    name?: string;
    /**文件上传类型*/
    accept?: string;
    /**是否可以上传多个文件*/
    multiple?: boolean;
    /**文件列表*/
    list?: UploadFile[];
    /**
     * 文件上传之前的处理函数，返回false，则禁止上传文件
    */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /**
     * 该函数用户获取文件的上传进度
    */
    onProgress?: (percentage: number, file: UploadFile) => void;
    /**
     * 文件上传成功的回调函数
    */
    onSuccess?: (data: any, file: UploadFile) => void;
    /**
     * 文件上传失败的回调函数
    */
    onError?: (err: any, file: UploadFile) => void;
    /**
     * 文件状态改变后的回调函数
    */
    onChange?: (file: UploadFile) => void;
    /**删除文件的回调*/
    onDeleted: (file: UploadFile) => void;
}
export declare type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error' | 'uploading';
export interface UploadFile {
    /**
     * 文件的唯一标识
    */
    uuid: string;
    /**
     * 文件大小
    */
    size: number;
    /**
     * 文件名称
    */
    name: string;
    /**
     * 文件状态
    */
    status?: UploadFileStatus;
    /**
     * 文件上传进度
    */
    percent?: number;
    /**
     * 文件原始信息
    */
    raw?: File;
    /**
     * 文件上传成功后的结果
    */
    response?: any;
    /**
     * 文件上传失败后的结果
    */
    error?: any;
    /**
     * 文件是否是hover状态，用于动画显示
    */
    isHover?: boolean;
}
export declare const Upload: React.FC<UploadProps>;
export default Upload;
