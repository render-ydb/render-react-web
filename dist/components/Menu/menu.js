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
import React, { Children, createContext, useState } from 'react';
import classNames from 'classnames';
import { prefix } from '../../utils/constant';
;
export var MenuContext = createContext({
    mode: 'horizontal',
    index: '0'
});
export var Menu = function (props) {
    var _a;
    var mode = props.mode, defaultOpenedSubMenus = props.defaultOpenedSubMenus, style = props.style, className = props.className, onSelecte = props.onSelecte, children = props.children, defaultActiveIndex = props.defaultActiveIndex;
    var _b = useState(defaultActiveIndex), activeIndex = _b[0], setActiveIndex = _b[1];
    var menuClassNames = classNames(prefix + "-menu", (_a = {},
        _a[prefix + "-menu-" + mode] = mode,
        _a), className);
    console.log('menuClassNames', menuClassNames, mode);
    var handleClick = function (index) {
        setActiveIndex(index);
        if (onSelecte) {
            onSelecte(index);
        }
    };
    var passedContext = {
        index: activeIndex || '0',
        mode: mode,
        onSelecte: handleClick
    };
    var renderChildren = function () {
        return Children.map(children, function (child, index) {
            var childElement = child;
            if (!childElement.type) {
                console.error("Warining: The Menu Component's child must be MenuItem or SubMenu Component");
                return;
            }
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return child;
            }
            else {
                console.error("Warining: The Menu Component's child must be MenuItem or SubMenu Component");
            }
        });
    };
    return (React.createElement("ul", { className: menuClassNames, style: mode === 'vertical' ? __assign({ width: '200px' }, style) : style },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    // mode: 'vertical'
    defaultActiveIndex: '0',
    // style:{width:'200px'}
};
Menu.displayName = 'Menu';
export default Menu;
