import React, { CSSProperties } from 'react';
import * as antIcons from '@ant-design/icons';
declare type ThememProps = 'primary' | 'info' | 'success' | 'error' | 'white' | 'black';
export interface IconProps {
    /**设置图标内置主题*/
    theme?: ThememProps;
    /**设置图标的样式名*/
    className?: string;
    /**图标旋转角度（IE9 无效）*/
    rotate?: number;
    /**是否有旋转动画*/
    spin?: boolean;
    /**设置图标的样式，例如 fontSize 和 color*/
    style?: CSSProperties;
    /**仅适用双色图标。设置双色图标的主要颜色*/
    twoToneColor?: string;
    /**所要展示图标的名称*/
    name: keyof typeof antIcons;
}
export declare const Icon: React.FC<IconProps>;
export default Icon;
