import React, { ReactElement, ReactNode } from 'react';
declare type TypeProps = 'success' | 'info' | 'warning' | 'error';
declare type MessageFun = () => React.ReactElement;
export interface AlertProps {
    /**指定警告提示的样式*/
    type: TypeProps;
    /**警告提示内容*/
    message: string | ReactElement | MessageFun | number;
    /**警告提示的辅助性文字介绍*/
    description?: String | ReactNode;
    /**自定义className */
    className?: String;
}
export declare const Alert: React.FC<AlertProps>;
export default Alert;
