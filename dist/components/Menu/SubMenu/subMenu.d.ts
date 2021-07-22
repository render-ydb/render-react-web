import React from 'react';
import { IconTypeProps } from '../../Icon/icon';
export interface SubMenuProps {
    icon?: IconTypeProps;
    title?: string;
    link?: string;
}
export declare const SubMenu: React.FC<SubMenuProps>;
export default SubMenu;
