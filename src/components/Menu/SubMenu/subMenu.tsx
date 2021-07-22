import React, { useContext, useState, Children, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { prefix } from '../../../utils/constant'
import Icon from '../../Icon';
import { MenuItemProps } from '../MenuItem/menuItem'
import { IconTypeProps } from '../../Icon/icon'
import { MenuContext } from '../menu'
type MenuMode = 'vertical' | 'horizontal';

export interface SubMenuProps {
    icon?: IconTypeProps,
    title?: string,
    link?: string
};

export const SubMenu: React.FC<SubMenuProps> = ({
    icon,
    title,
    children,
    link

}) => {


    const [openVisible, setOpenVisible] = useState(false)

    const context = useContext(MenuContext);


    const subMenuClassNames = classNames(
        `${prefix}-subMenu`,
        // `${prefix}-subMenu-selected`,
        {
            [`${prefix}-subMenu-horizontal`]: context.mode === 'horizontal',
            [`${prefix}-subMenu-vertical`]: context.mode === 'vertical'
        }
    );

    const subMenuTitleClassNames = classNames(
        `${prefix}-subMenu-title`,
        `${prefix}-menu-item`,
        {
            // [`${prefix}-subMenu-selected`]: context.index !== link,
            [`${prefix}-subMenu-vertical`]: context.mode === 'vertical',

        }
    )
    const childListClassNames = classNames(
        `${prefix}-subMenu-child-list`,
        {
            [`${prefix}-subMenu-child-list-active`]: openVisible
        }
    );
    const arrowIconClassNames = classNames(
        `${prefix}-subMenu-title-arrow`,
        {
            [`${prefix}-subMenu-title-arrow-active`]: openVisible
        }
    )
    const renderChildren = () => {
        return Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>;
            if (!childElement.type) { console.error("Warining: The SubMenu Component's child must be MenuItem"); return }
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem') {
                return child;
            } else {
                console.error("Warining: The SubMenu Component's child must be MenuItem")
            }

        })
    }
    const handleOpenEvent = (visible: boolean) => {
        if (context.mode === 'horizontal') {
            setOpenVisible(visible)
        }

    }
    const handleClickEvent = (visible: boolean) => {
        if (context.mode === 'vertical') {
            setOpenVisible(visible)
        }
    }
    return (
        <li className={subMenuClassNames} onMouseLeave={() => handleOpenEvent(false)}>
            <div
                className={subMenuTitleClassNames}
                onMouseEnter={() => handleOpenEvent(true)}
                onClick={() => handleClickEvent(!openVisible)}

            >
                {
                    icon ? <span className={`${prefix}-subMenu-title-icon`}><Icon name={icon} /></span> : null
                }

                <span style={{ flex: 1 }} className={icon ? `${prefix}-subMenu-title-text` : ''}>{title}</span>
                {
                    context.mode === 'vertical' && <span className={arrowIconClassNames}><Icon name='DownOutlined' /></span>
                }
            </div>
            <ul className={childListClassNames}>
                {renderChildren()}
            </ul>
        </li>
    )
}
SubMenu.defaultProps = {


}
SubMenu.displayName = 'SubMenu'
export default SubMenu;