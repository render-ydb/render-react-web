import React, { CSSProperties } from 'react';
declare type ThememProps = 'primary' | 'warning' | 'success' | 'error' | 'default';
export interface TagProps {
    /**设置tag内置主题*/
    theme?: ThememProps;
    /**设置tag的样式名*/
    className?: string;
    /**设置tag的样式，例如 backgroundColor 和 color*/
    style?: CSSProperties;
    /**标签是否允许关闭*/
    closable?: boolean;
    /**标签关闭的回调函数*/
    onClose?: () => void;
}
export declare const Tag: React.FC<TagProps>;
export default Tag;
