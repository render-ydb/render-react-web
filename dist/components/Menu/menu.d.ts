import React, { CSSProperties } from 'react';
export declare type MenuMode = 'vertical' | 'horizontal';
interface MenuContextProps {
    index: string;
    mode?: MenuMode;
    onSelecte?: (index: string) => void;
}
export interface MenuProps {
    /**菜单模式*/
    mode?: MenuMode;
    /**默认展开的SubMenu*/
    defaultOpenedSubMenus?: string[];
    /**自定义的Menu样式*/
    style?: CSSProperties;
    /**点击MenuItem的回调*/
    onSelecte?: (index: string) => void;
    /**自定义Menu的class名称*/
    className?: string;
    /**默认选中的index*/
    defaultActiveIndex?: string;
}
export declare const MenuContext: React.Context<MenuContextProps>;
export declare const Menu: React.FC<MenuProps>;
export default Menu;
