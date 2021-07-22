import React from 'react';
import classNames from 'classnames';
import { prefix } from '../../utils/constant';
import Icon from '../Icon';
;
export var Progress = function (props) {
    var _a, _b, _c;
    var format = props.format, percent = props.percent, status = props.status, width = props.width, strokeColor = props.strokeColor, strokeLinecap = props.strokeLinecap, trailColor = props.trailColor, size = props.size, showInfo = props.showInfo, height = props.height;
    var _percent = Math.min.apply(null, [percent || 0, 100]);
    var success = (status === 'success') || (_percent === 100);
    var exception = status === 'exception';
    var progressBgClassNames = classNames(prefix + "-progress-bg", (_a = {},
        _a[prefix + "-progress-bg-" + size] = size === 'small',
        _a[prefix + "-progress-bg-success"] = success,
        _a[prefix + "-progress-bg-exception"] = exception,
        _a));
    var progressText = classNames(prefix + "-progress-text", (_b = {},
        _b[prefix + "-progress-text-" + size] = size === 'small',
        _b[prefix + "-progress-text-success"] = success,
        _b[prefix + "-progress-text-exception"] = exception,
        _b));
    var progressInner = classNames(prefix + "-progress-inner", (_c = {},
        _c[prefix + "-progress-inner-" + strokeLinecap] = strokeLinecap === 'square',
        _c));
    var handleText = function () {
        if (success) {
            return React.createElement(Icon, { name: 'CheckCircleOutlined' });
        }
        else if (exception) {
            return React.createElement(Icon, { name: 'CloseCircleOutlined' });
        }
        return format ? format(percent || 0) : _percent + '%';
    };
    return (React.createElement("div", { className: prefix + "-progress", style: { width: width ? (typeof width === 'number' ? width + 'px' : width) : '100%' } },
        React.createElement("div", { className: progressInner, style: { backgroundColor: trailColor } },
            React.createElement("div", { className: progressBgClassNames, style: {
                    width: percent + '%',
                    backgroundColor: strokeColor,
                    height: height ? (typeof height === 'number' ? height + 'px' : height) : (size === 'small' ? '6px' : '8px')
                } })),
        showInfo &&
            React.createElement("div", { className: progressText, title: _percent + '' }, handleText())));
};
Progress.defaultProps = {
    percent: 0,
    status: 'normal',
    width: "100%",
    strokeLinecap: 'round',
    strokeColor: "#1890ff",
    trailColor: "#f5f5f5",
    showInfo: true,
    height: 8
};
export default Progress;
