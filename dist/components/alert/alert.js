import React from 'react';
import classNames from 'classnames';
import { prefix } from '../../utils/constant';
var Demo = function (props) {
    return React.createElement("div", null, props.msg);
};
export var Alert = function (props) {
    console.log(111, props.message);
    var type = props.type, message = props.message, description = props.description, className = props.className;
    var realClassNames = classNames(prefix + "-alert", prefix + "-alert-" + type, className);
    // console.log(message)
    var handleMessage = function () {
        if (typeof message === 'function') {
            return message();
        }
        return message;
    };
    return (React.createElement("div", { className: realClassNames },
        React.createElement("div", { className: prefix + "-alert-content" },
            React.createElement("div", { className: prefix + "-alert-message" }, handleMessage()),
            React.createElement("div", { className: prefix + "-alert-description" }, description))));
};
Alert.defaultProps = {};
export default Alert;
