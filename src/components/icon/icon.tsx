import React, { CSSProperties } from 'react'
import classNames from 'classnames'
import {prefix} from '../../utils/constant'
import *  as antIcons from '@ant-design/icons'

type ThememProps = 'primary' | 'info' | 'success' | 'error' | 'white' | 'black';
type IconTypeProps = keyof typeof antIcons;

export interface IconProps {
    /**设置图标内置主题*/
    theme?: ThememProps,
    /**设置图标的样式名*/
    className?: string,
    /**图标旋转角度（IE9 无效）*/
    rotate?: number,
    /**是否有旋转动画*/
    spin?: boolean,
    /**设置图标的样式，例如 fontSize 和 color*/
    style?: CSSProperties,
    /**仅适用双色图标。设置双色图标的主要颜色*/
    twoToneColor?: string,
    /**所要展示图标的名称*/
    name: IconTypeProps
};

export const Icon: React.FC<IconProps> = ({
    theme,
    className,
    rotate,
    spin,
    style,
    twoToneColor,
    name
}) => {
    const AntIcon = antIcons[name] as any;
    const realClassNames = classNames(
        {
            [`${prefix}-icon-${theme}`]: theme
        },
        className
    );

    return (
        <AntIcon
            style={style}
            rotate={rotate}
            spin={spin}
            className={realClassNames}
            twoToneColor={twoToneColor}
        />
    )
}
Icon.defaultProps = {
    spin:false
}
export default Icon;