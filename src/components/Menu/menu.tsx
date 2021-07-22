import React, { CSSProperties, Children, FunctionComponentElement, createContext, useState } from 'react'
import classNames from 'classnames'
import { prefix } from '../../utils/constant'
import { MenuItemProps } from './MenuItem/menuItem';



export type MenuMode = 'vertical' | 'horizontal';

interface MenuContextProps {
    index: string,
    mode?: MenuMode,
    onSelecte?: (index: string) => void,
}

export interface MenuProps {
    /**菜单模式*/
    mode?: MenuMode,
    /**默认展开的SubMenu*/
    defaultOpenedSubMenus?: string[],
    /**自定义的Menu样式*/
    style?: CSSProperties,
    /**点击MenuItem的回调*/
    onSelecte?: (index: string) => void,
    /**自定义Menu的class名称*/
    className?: string,
    /**默认选中的index*/
    defaultActiveIndex?: string
};
export const MenuContext = createContext<MenuContextProps>({
    mode: 'horizontal',
    index: '0'
})
export const Menu: React.FC<MenuProps> = (props) => {
    const {
        mode,
        defaultOpenedSubMenus,
        style,
        className,
        onSelecte,
        children,
        defaultActiveIndex

    } = props;
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
    const menuClassNames = classNames(
        `${prefix}-menu`,
        {
            [`${prefix}-menu-${mode}`]: mode
        },
        className,
    );

    console.log('menuClassNames', menuClassNames, mode)

    const handleClick = (index: string) => {
        setActiveIndex(index);
        if (onSelecte) { onSelecte(index) }
    }
    const passedContext: MenuContextProps = {
        index: activeIndex || '0',
        mode: mode,
        onSelecte: handleClick
    }

    const renderChildren = () => {
        return Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>;
            if (!childElement.type) {
                console.error("Warining: The Menu Component's child must be MenuItem or SubMenu Component");
                return;
            }
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return child;
            } else {
                console.error("Warining: The Menu Component's child must be MenuItem or SubMenu Component")
            }

        })
    }
    return (
        <ul className={menuClassNames} style={mode === 'vertical' ? { width: '200px', ...style } : style}>
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}
Menu.defaultProps = {
    // mode: 'vertical'
    defaultActiveIndex: '0',
    // style:{width:'200px'}
}
Menu.displayName = 'Menu';
export default Menu;