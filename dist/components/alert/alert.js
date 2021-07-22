import React, { useState } from 'react';
import classNames from 'classnames';
import { prefix } from '../../utils/constant';
import Icon from '../Icon';
export var Alert = function (props) {
    var _a = useState(true), showAlert = _a[0], setShowAlert = _a[1];
    var type = props.type, message = props.message, description = props.description, className = props.className, closable = props.closable, showIcon = props.showIcon;
    var realClassNames = classNames(prefix + "-alert", prefix + "-alert-" + type, showIcon ? prefix + "-alert-with-description" : '', className);
    var handleMessage = function () {
        if (typeof message === 'function') {
            return message();
        }
        return message;
    };
    var close = function () {
        setShowAlert(false);
    };
    var IconObj = {
        success: {
            value: 'CheckCircleTwoTone',
            color: '#52c41a'
        },
        info: {
            value: 'InfoCircleOutlined',
            color: '#1890ff'
        },
        warning: {
            value: 'ExclamationCircleOutlined',
            color: '#faad14'
        },
        error: {
            value: 'CloseCircleOutlined',
            color: '#ff4d4f'
        },
    };
    var handleIconName = function () {
        return IconObj[type].value;
    };
    var handleColor = function () {
        return IconObj[type].color;
    };
    return (showAlert ?
        React.createElement("div", { className: realClassNames },
            showIcon ? React.createElement(Icon, { twoToneColor: handleColor(), style: { color: handleColor() }, className: prefix + "-alert-icon", name: handleIconName() }) : '',
            React.createElement("div", { className: prefix + "-alert-content" },
                React.createElement("div", { className: prefix + "-alert-message" }, handleMessage()),
                React.createElement("div", { className: prefix + "-alert-description" }, description)),
            closable ? React.createElement("div", { onClick: close },
                React.createElement(Icon, { name: "CloseOutlined" })) : '') :
        React.createElement("div", null));
};
Alert.defaultProps = {};
export default Alert;
