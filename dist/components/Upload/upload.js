var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { useRef, useState } from 'react';
import { prefix } from '../../utils/constant';
import classNames from 'classnames';
import axios from 'axios';
import Icon from '../Icon';
import Progress from '../Progress';
export var Upload = function (props) {
    var _a;
    var action = props.action, avatar = props.avatar, drag = props.drag, headers = props.headers, withCredentials = props.withCredentials, data = props.data, name = props.name, accept = props.accept, multiple = props.multiple, list = props.list, beforeUpload = props.beforeUpload, onError = props.onError, onProgress = props.onProgress, onSuccess = props.onSuccess, onChange = props.onChange, onDeleted = props.onDeleted, children = props.children;
    var fileInput = useRef(null);
    var _b = useState(list || []), fileList = _b[0], setFileList = _b[1];
    var updateFileList = function (uploadFile, uploadObj) {
        var _file = uploadFile;
        setFileList(function (prevFileList) {
            return prevFileList.map(function (file) {
                if (file.uuid === uploadFile.uuid) {
                    _file = __assign(__assign({}, file), uploadObj);
                    return _file;
                }
                return file;
            });
        });
        return _file;
    };
    var handleFileInputClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        if (!multiple) {
            setFileList([]);
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                postFile(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        postFile(processedFile);
                    });
                }
                else if (result !== false) {
                    postFile(file);
                }
            }
        });
    };
    var postFile = function (file) {
        var initFileInfo = {
            uuid: Date.now() + 'file',
            size: file.size,
            name: file.name,
            raw: file,
            percent: 0,
            status: 'ready'
        };
        setFileList(function (fileList) {
            return __spreadArray([initFileInfo], fileList);
        });
        onChange && onChange(initFileInfo);
        // return;
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            headers: __assign(__assign({}, headers), { "Content-type": "multipart/form-data" }),
            withCredentials: !!withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                console.log(percentage);
                var uploadingFile = updateFileList(initFileInfo, { percent: percentage, status: 'uploading' });
                if (percentage < 100) {
                    onProgress && onProgress(percentage, uploadingFile);
                }
            }
        }).then(function (res) {
            var successFile = updateFileList(initFileInfo, { percent: 100, status: 'success', response: res });
            onSuccess && onSuccess(res, successFile);
            onChange && onChange(successFile);
        }).catch(function (err) {
            console.log(err);
            var failedFile = updateFileList(initFileInfo, { status: 'error', error: err });
            onError && onError(err, failedFile);
            onChange && onChange(failedFile);
        });
    };
    console.log(fileList);
    var uploadClassNames = classNames((_a = {},
        _a[prefix + "-upload-avatar"] = !!avatar,
        _a));
    var handleDelIcon = function (item, visible) {
        setFileList(function (fileList) {
            return fileList.map(function (file) {
                if (file.uuid === item.uuid) {
                    return __assign(__assign({}, file), { isHover: visible });
                }
                return file;
            });
        });
    };
    var handleDelFile = function (item) {
        if (!item.isHover) {
            return;
        }
        setFileList(function (fileList) {
            var _fileList = __spreadArray([], fileList);
            var index = __spreadArray([], _fileList).findIndex(function (file) { return file.uuid === item.uuid; });
            if (index >= 0) {
                if (onDeleted) {
                    onDeleted(_fileList[index]);
                }
                _fileList.splice(index, 1);
            }
            return _fileList;
        });
    };
    var handleDragOver = function (e) {
        e.preventDefault();
    };
    var handleOndrop = function (e) {
        e.preventDefault();
        var files = e.dataTransfer.files;
        if (files) {
            uploadFiles(files);
        }
    };
    return (React.createElement("div", null,
        React.createElement("div", { className: uploadClassNames, onClick: handleFileInputClick, onDragOver: function (e) { return handleDragOver(e); }, onDragLeave: function (e) { return handleDragOver(e); }, onDrop: handleOndrop },
            React.createElement("div", null, children),
            React.createElement("input", { type: "file", style: {
                    display: "none"
                }, ref: fileInput, onChange: handleFileChange, accept: accept, multiple: multiple })),
        React.createElement("ul", { className: prefix + "-upload-list" }, fileList.map(function (file) {
            var name = file.name, percent = file.percent, status = file.status, isHover = file.isHover;
            return (React.createElement("li", { key: file.uuid, className: prefix + "-upload-item", onMouseEnter: function () { return handleDelIcon(file, true); }, onMouseLeave: function () { return handleDelIcon(file, false); } },
                React.createElement("div", { className: prefix + "-upload-item-container " + (status === 'error' ? prefix + "-upload-item-fail" : '') },
                    React.createElement(Icon, { name: (status === 'ready' || status === 'uploading') ? 'LoadingOutlined' : 'PaperClipOutlined' }),
                    React.createElement("span", { className: prefix + "-upload-item-filename" }, name),
                    React.createElement("span", { className: prefix + "-upload-item-del-icon", onClick: function () { return handleDelFile(file); } }, isHover && React.createElement(Icon, { name: 'DeleteOutlined' }))),
                (status !== 'error' && status !== 'success') &&
                    React.createElement("div", { className: prefix + "-upload-item-progress" },
                        React.createElement(Progress, { showInfo: false, height: 4, percent: percent }))));
        }))));
};
Upload.defaultProps = {
    name: 'file',
    drag: true,
};
export default Upload;
