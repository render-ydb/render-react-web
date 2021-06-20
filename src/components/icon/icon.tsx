import React, { CSSProperties } from 'react'
import classNames from 'classnames'
import {prefix} from '../../utils/constant'
import *  as antIcons from '@ant-design/icons'

type ThememProps = 'primary' | 'info' | 'success' | 'error' | 'white' | 'black';


export interface IconProps {
    theme?: ThememProps,
    className?: string,
    rotate?: number,
    spin?: boolean,
    style?: CSSProperties,
    twoToneColor?: string,
    name: keyof typeof antIcons
};

const Icon: React.FC<IconProps> = ({
    theme = 'black',
    className,
    rotate,
    spin,
    style,
    twoToneColor = 'red',
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

export default Icon;