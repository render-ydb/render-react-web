import React, { useContext, useState, Children } from 'react';
import classNames from 'classnames';
import { prefix } from '../../../utils/constant';
import Icon from '../../Icon';
import { MenuContext } from '../menu';
;
export var SubMenu = function (_a) {
    var _b, _c, _d, _e;
    var icon = _a.icon, title = _a.title, children = _a.children, link = _a.link;
    var _f = useState(false), openVisible = _f[0], setOpenVisible = _f[1];
    var context = useContext(MenuContext);
    var subMenuClassNames = classNames(prefix + "-subMenu", (_b = {},
        _b[prefix + "-subMenu-horizontal"] = context.mode === 'horizontal',
        _b[prefix + "-subMenu-vertical"] = context.mode === 'vertical',
        _b));
    var subMenuTitleClassNames = classNames(prefix + "-subMenu-title", prefix + "-menu-item", (_c = {},
        // [`${prefix}-subMenu-selected`]: context.index !== link,
        _c[prefix + "-subMenu-vertical"] = context.mode === 'vertical',
        _c));
    var childListClassNames = classNames(prefix + "-subMenu-child-list", (_d = {},
        _d[prefix + "-subMenu-child-list-active"] = openVisible,
        _d));
    var arrowIconClassNames = classNames(prefix + "-subMenu-title-arrow", (_e = {},
        _e[prefix + "-subMenu-title-arrow-active"] = openVisible,
        _e));
    var renderChildren = function () {
        return Children.map(children, function (child, index) {
            var childElement = child;
            if (!childElement.type) {
                console.error("Warining: The SubMenu Component's child must be MenuItem");
                return;
            }
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem') {
                return child;
            }
            else {
                console.error("Warining: The SubMenu Component's child must be MenuItem");
            }
        });
    };
    var handleOpenEvent = function (visible) {
        if (context.mode === 'horizontal') {
            setOpenVisible(visible);
        }
    };
    var handleClickEvent = function (visible) {
        if (context.mode === 'vertical') {
            setOpenVisible(visible);
        }
    };
    return (React.createElement("li", { className: subMenuClassNames, onMouseLeave: function () { return handleOpenEvent(false); } },
        React.createElement("div", { className: subMenuTitleClassNames, onMouseEnter: function () { return handleOpenEvent(true); }, onClick: function () { return handleClickEvent(!openVisible); } },
            icon ? React.createElement("span", { className: prefix + "-subMenu-title-icon" },
                React.createElement(Icon, { name: icon })) : null,
            React.createElement("span", { style: { flex: 1 }, className: icon ? prefix + "-subMenu-title-text" : '' }, title),
            context.mode === 'vertical' && React.createElement("span", { className: arrowIconClassNames },
                React.createElement(Icon, { name: 'DownOutlined' }))),
        React.createElement("ul", { className: childListClassNames }, renderChildren())));
};
SubMenu.defaultProps = {};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
