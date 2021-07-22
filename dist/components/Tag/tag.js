import React, { useState } from 'react';
import classNames from 'classnames';
import { prefix } from '../../utils/constant';
import Icon from '../Icon';
;
export var Tag = function (_a) {
    var _b;
    var theme = _a.theme, className = _a.className, style = _a.style, closable = _a.closable, onClose = _a.onClose, children = _a.children;
    var _c = useState(true), visible = _c[0], setVisible = _c[1];
    var tagClassNames = classNames(prefix + "-tag", (_b = {},
        _b[prefix + "-tag-" + theme] = theme !== 'default',
        _b), className);
    var handleTagClose = function () {
        setVisible(false);
        onClose && onClose();
    };
    return (React.createElement(React.Fragment, null, visible
        &&
            React.createElement("span", { className: tagClassNames, style: style },
                React.createElement("span", { className: prefix + "-tag-text" }, children),
                closable && React.createElement("span", { onClick: handleTagClose, className: prefix + "-tag-del-icon" },
                    React.createElement(Icon, { name: 'CloseOutlined' })))
        || null));
};
Tag.defaultProps = {
    theme: 'default'
};
export default Tag;
