import React, { ReactNode,useEffect,useState  } from 'react'
import classNames from 'classnames'
import { prefix } from '../../utils/constant'
import Icon from '../icon'
import *  as antIcons from '@ant-design/icons'
import { stringify } from 'querystring'
type IconTypeProps = keyof typeof antIcons;
type TypeProps = 'success' | 'info' | 'warning' | 'error';
type MessageFun = ()=>React.ReactElement;

export interface AlertProps {
    /**指定警告提示的样式*/
    type:TypeProps,
    /**警告提示内容*/
    message:string | ReactNode | MessageFun,
    /**警告提示的辅助性文字介绍*/
    description?:String | ReactNode ,
    /**自定义className */
    className?:String,
    /**是否显示关闭按钮 */
    closable?:Boolean,
    /**是否显示图标 */
    showIcon?:Boolean
}
interface TypeObj {
    [proppName:string]:{
        value:IconTypeProps,
        color:string
    };
}
export const Alert: React.FC<AlertProps> = (props) => {
    const [ showAlert,setShowAlert] = useState<Boolean>(true)
    const {
        type,
        message,
        description,
        className,
        closable,
        showIcon
    } = props;
    const realClassNames = classNames(
        `${prefix}-alert`,
        `${prefix}-alert-${type}`,
        showIcon?`${prefix}-alert-with-description`:'',
        className
    );
    const handleMessage = ()=>{
        if (typeof message === 'function') {
           return message();
        }
       return message
    }
    const close = ()=>{
        setShowAlert(false)
    }
    const IconObj:TypeObj = {
        success:{
            value:'CheckCircleTwoTone',
            color:'#52c41a'
        },
        info:{
            value:'InfoCircleOutlined',
            color:'#1890ff'
        },
        warning:{
            value:'ExclamationCircleOutlined',
            color:'#faad14'
        },
        error:{
            value:'CloseCircleOutlined',
            color:'#ff4d4f'
        },
    }
    const handleIconName = ():IconTypeProps =>{
        return IconObj[type].value
    }
    const handleColor = () => {
        return IconObj[type].color
    }
    return (
        showAlert ? 
        <div className={realClassNames}>
            {showIcon ? <Icon twoToneColor={handleColor()} style={{color:handleColor()}} className={`${prefix}-alert-icon`} name={handleIconName()}/> : ''}
            <div className={`${prefix}-alert-content`}>
                <div className={`${prefix}-alert-message`}>{handleMessage()}</div>
                <div className={`${prefix}-alert-description`}>{description}</div>
            </div>
            {closable ? <div onClick={close}><Icon name="CloseOutlined"/></div> : ''}
        </div>:
        <div></div>
    )

}
Alert.defaultProps = {
    
}


export default Alert;