import React, { ReactElement, ReactNode  } from 'react'
import classNames from 'classnames'
import { prefix } from '../../utils/constant'
import Icon from '../icon'
import *  as antIcons from '@ant-design/icons'


type TypeProps = 'success' | 'info' | 'warning' | 'error';
type MessageFun = ()=>React.ReactElement;

export interface AlertProps {
    /**指定警告提示的样式*/
    type:TypeProps,
    /**警告提示内容*/
    message:string | ReactElement | MessageFun| number,
    /**警告提示的辅助性文字介绍*/
    description?:String | ReactNode ,
    /**自定义className */
    className?:String
}
const Demo = (props:any) => {
    return <div>{props.msg}</div>
}
export const Alert: React.FC<AlertProps> = (props) => {
    console.log(111,props.message)
    const {
        type,
        message,
        description,
        className
    } = props;
    const realClassNames = classNames(
        `${prefix}-alert`,
        `${prefix}-alert-${type}`,
        className
    );
    // console.log(message)
    const handleMessage = ()=>{
        if (typeof message === 'function') {
           return message();
        }
       return message
    }
    return (
        <div className={realClassNames}>
            <div className={`${prefix}-alert-content`}>
                <div className={`${prefix}-alert-message`}>{handleMessage()}</div>
                <div className={`${prefix}-alert-description`}>{description}</div>
            </div>
        </div>
    )

}
Alert.defaultProps = {
    
}


export default Alert;