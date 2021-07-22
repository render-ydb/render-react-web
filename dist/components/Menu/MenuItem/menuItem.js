import React, { useContext } from 'react';
import classNames from 'classnames';
import { prefix } from '../../../utils/constant';
import Icon from '../../Icon';
import { MenuContext } from '../menu';
;
export var MenuItem = function (_a) {
    var _b;
    var icon = _a.icon, children = _a.children, link = _a.link, disabled = _a.disabled;
    var context = useContext(MenuContext);
    var menuItemClassNames = classNames(prefix + "-menu-item", (_b = {},
        _b[prefix + "-menu-item-" + context.mode] = context.mode,
        _b[prefix + "-menu-item-selected"] = link === context.index,
        _b[prefix + "-menu-item-disabled"] = disabled,
        _b));
    var handleClick = function () {
        var onSelecte = context.onSelecte;
        if (onSelecte && !disabled) {
            onSelecte(link);
        }
    };
    return (React.createElement("li", { className: menuItemClassNames, onClick: handleClick },
        icon && React.createElement("span", null,
            React.createElement(Icon, { name: 'AlertFilled' })),
        React.createElement("span", { className: icon ? prefix + "-menu-title-content" : '' }, children)));
};
MenuItem.defaultProps = {
    link: '0'
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
