import React from 'react';
import classNames from 'classnames';
import { prefix } from '../../utils/constant';
import * as antIcons from '@ant-design/icons';
;
export var Icon = function (_a) {
    var _b;
    var theme = _a.theme, className = _a.className, rotate = _a.rotate, spin = _a.spin, style = _a.style, twoToneColor = _a.twoToneColor, name = _a.name;
    var AntIcon = antIcons[name];
    var realClassNames = classNames((_b = {},
        _b[prefix + "-icon-" + theme] = theme,
        _b), className);
    return (React.createElement(AntIcon, { style: style, rotate: rotate, spin: spin, className: realClassNames, twoToneColor: twoToneColor }));
};
Icon.defaultProps = {
    spin: false
};
export default Icon;
