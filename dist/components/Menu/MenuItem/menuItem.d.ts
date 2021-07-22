import React from 'react';
import { IconTypeProps } from '../../Icon/icon';
export interface MenuItemProps {
    icon?: IconTypeProps;
    link: string;
    disabled?: boolean;
}
export declare const MenuItem: React.FC<MenuItemProps>;
export default MenuItem;
