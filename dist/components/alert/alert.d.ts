import React, { ReactNode } from 'react';
declare type TypeProps = 'success' | 'info' | 'warning' | 'error';
declare type MessageFun = () => React.ReactElement;
export interface AlertProps {
    /**指定警告提示的样式*/
    type: TypeProps;
    /**警告提示内容*/
    message: string | ReactNode | MessageFun;
    /**警告提示的辅助性文字介绍*/
    description?: string | ReactNode;
    /**自定义className */
    className?: string;
    /**是否显示关闭按钮 */
    closable?: boolean;
    /**是否显示图标 */
    showIcon?: boolean;
}
export declare const Alert: React.FC<AlertProps>;
export default Alert;
