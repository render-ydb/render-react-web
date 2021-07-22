import React, { useState, useContext } from 'react'
import classNames from 'classnames'
import { prefix } from '../../../utils/constant'
import Icon from '../../Icon';
import { IconTypeProps } from '../../Icon/icon'
import { MenuContext } from '../menu';



export interface MenuItemProps {
    icon?: IconTypeProps,
    link: string,
    disabled?: boolean
};

export const MenuItem: React.FC<MenuItemProps> = ({
    icon,
    children,
    link,
    disabled
}) => {
    const context = useContext(MenuContext);
    const menuItemClassNames = classNames(
        `${prefix}-menu-item`,
        {
            [`${prefix}-menu-item-${context.mode}`]: context.mode,
            [`${prefix}-menu-item-selected`]: link === context.index,
            [`${prefix}-menu-item-disabled`]: disabled
        }
    );

    const handleClick = () => {
        const onSelecte = context.onSelecte;
        if (onSelecte && !disabled) {
            onSelecte(link)
        }
    }

    return (
        <li className={menuItemClassNames} onClick={handleClick}>
            {/* {renderChildren()} */}
            {
                icon && <span><Icon name='AlertFilled' /></span>
            }
            <span className={icon ? `${prefix}-menu-title-content` : ''}>{children}</span>
        </li>
    )
}
MenuItem.defaultProps = {
    link: '0'
}
MenuItem.displayName = 'MenuItem';
export default MenuItem;