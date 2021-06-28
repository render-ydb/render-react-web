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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import classNames from 'classnames';
import { prefix } from '../../utils/constant';
import Icon from '../icon';
import useLoading from '../../hooks/useLoading';
export var Button = function (props) {
    var _a;
    var block = props.block, disabled = props.disabled, href = props.href, htmlType = props.htmlType, icon = props.icon, loading = props.loading, shape = props.shape, size = props.size, target = props.target, type = props.type, children = props.children, resetProps = __rest(props, ["block", "disabled", "href", "htmlType", "icon", "loading", "shape", "size", "target", "type", "children"]);
    var loadingVisible = useLoading(loading);
    var addPr8 = children && (loadingVisible || icon);
    var realClassNames = classNames(prefix + "-btn", (_a = {},
        _a[prefix + "-btn-" + type] = type !== 'default',
        _a[prefix + "-btn-" + size] = size !== 'middle',
        _a[prefix + "-btn-" + shape] = !!shape,
        _a[prefix + "-btn-block"] = !!block,
        _a[prefix + "-btn-loading"] = !!loadingVisible,
        _a[prefix + "-btn-disabled"] = !!disabled && type === 'link',
        _a[prefix + "-btn-icon-only"] = !children && (loadingVisible || icon),
        _a));
    if (type === 'link' && href) {
        return (React.createElement("a", __assign({ href: href, target: target, className: realClassNames }, resetProps),
            (loadingVisible || icon) && React.createElement("span", { style: addPr8 ? { paddingRight: '8px' } : {} },
                React.createElement(Icon, { className: children && prefix + "-btn-loading-icon" || '', name: loadingVisible ? 'LoadingOutlined' : (icon || 'LoadingOutlined') })),
            React.createElement("span", null, children)));
    }
    else {
        return (React.createElement("button", __assign({ disabled: disabled, type: htmlType, className: realClassNames }, resetProps),
            (loadingVisible || icon) && React.createElement("span", { style: addPr8 ? { paddingRight: '8px' } : {} },
                React.createElement(Icon, { className: children && prefix + "-btn-loading-icon" || '', name: loadingVisible ? 'LoadingOutlined' : (icon || 'LoadingOutlined') })),
            React.createElement("span", null, children)));
    }
};
Button.defaultProps = {
    target: '_blank',
    type: 'primary',
    size: 'middle',
    loading: false
};
export default Button;
