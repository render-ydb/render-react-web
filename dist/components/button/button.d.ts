import React from 'react';
import * as antIcons from '@ant-design/icons';
declare type IconTypeProps = keyof typeof antIcons;
declare type ShapeProps = 'circle' | 'round';
declare type loadingProps = boolean | {
    delay: number;
};
declare type SizeProps = 'large' | 'middle' | 'small';
declare type TypeProps = 'primary' | 'dashed' | 'link' | 'text' | 'default' | 'danger';
export interface BaseButtonProps {
    /**将按钮宽度调整为其父宽度的选项*/
    block?: boolean;
    /**按钮失效状态*/
    disabled?: boolean;
    /**点击跳转的地址，指定此属性button的行为和a链接一致*/
    href?: string;
    /**设置button原生的type值，可选值请参考HTML标准*/
    htmlType?: 'button' | 'reset' | 'submit';
    /**设置按钮的图标组件*/
    icon?: IconTypeProps;
    /**设置按钮载入状态*/
    loading?: loadingProps;
    /**设置按钮形状*/
    shape?: ShapeProps;
    /**设置按钮大小*/
    size?: SizeProps;
    /**相当于a链接的target属性，href存在时生效*/
    target?: string;
    /**设置按钮类型*/
    type?: TypeProps;
}
declare type NativeButtonProps = BaseButtonProps & Omit<React.ButtonHTMLAttributes<HTMLElement>, 'type'>;
declare type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
export declare const Button: React.FC<ButtonProps>;
export default Button;
