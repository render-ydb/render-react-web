import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { prefix } from '../../utils/constant'
import Icon from '../icon'
import *  as antIcons from '@ant-design/icons'
import useLoading from '../../hooks/useLoading'

type IconTypeProps = keyof typeof antIcons;
type ShapeProps = 'circle' | 'round';
// type loadingProps = boolean | { delay: number };
type SizeProps = 'large' | 'middle' | 'small';

type TypeProps = 'primary' | 'dashed' | 'link' | 'text' | 'default' | 'danger';
export interface BaseButtonProps {
    /**将按钮宽度调整为其父宽度的选项*/
    block?: boolean,
    /**按钮失效状态*/
    disabled?: boolean,
    /**点击跳转的地址，指定此属性button的行为和a链接一致*/
    href?: string,
    /**设置button原生的type值，可选值请参考HTML标准*/
    htmlType?: 'button' | 'reset' | 'submit',
    /**设置按钮的图标组件*/
    icon?: IconTypeProps,
    /**设置按钮载入状态*/
    loading?: (boolean | { delay: number }),
    /**设置按钮形状*/
    shape?: ShapeProps,
    /**设置按钮大小*/
    size?: SizeProps,
    /**相当于a链接的target属性，href存在时生效*/
    target?: string,
    /**设置按钮类型*/
    type?: TypeProps,

}
// 忽略button元素的原生type属性，使用htmlType来代替
type NativeButtonProps = BaseButtonProps & Omit<React.ButtonHTMLAttributes<HTMLElement>, 'type'>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

export const Button: React.FC<ButtonProps> = (props) => {
    const {
        block,
        disabled,
        href,
        htmlType,
        icon,
        loading,
        shape,
        size,
        target,
        type,
        children,
        ...resetProps
    } = props;

    

    
    let loadingVisible = useLoading(loading as any);
    const addPr8 = children && (loadingVisible || icon);

    const realClassNames = classNames(
        `${prefix}-btn`,
        {
            [`${prefix}-btn-${type}`]: type !== 'default',
            [`${prefix}-btn-${size}`]: size !== 'middle',
            [`${prefix}-btn-${shape}`]: !!shape,
            [`${prefix}-btn-block`]: !!block,
            [`${prefix}-btn-loading`]: !!loadingVisible,
            [`${prefix}-btn-disabled`]: !!disabled && type === 'link',
            [`${prefix}-btn-icon-only`]: !children && (loadingVisible || icon),
        },

    );
   

    if (type === 'link' && href) {
        return (
            <a href={href} target={target} className={realClassNames} {...resetProps}>
                 {
                    (loadingVisible || icon) && <span style={addPr8 ? { paddingRight: '8px' } : {}}><Icon className={children && `${prefix}-btn-loading-icon` || ''} name={loadingVisible ? 'LoadingOutlined' : (icon || 'LoadingOutlined')} /></span>
                }
                <span>{children}</span>
            </a>
        )
    } else {
        return (
            <button disabled={disabled} type={htmlType} className={realClassNames} {...resetProps}>
            {
                (loadingVisible || icon) && <span style={addPr8 ? { paddingRight: '8px' } : {}}><Icon className={children && `${prefix}-btn-loading-icon` || ''} name={loadingVisible ? 'LoadingOutlined' : (icon || 'LoadingOutlined')} /></span>
            }
           
            <span>{children}</span>
        </button>
        )
    }

}
Button.defaultProps = {
    target: '_blank',
    type: 'primary',
    size: 'middle',
    loading:true
}


export default Button;