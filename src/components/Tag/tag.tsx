import React, { CSSProperties, useState } from 'react'
import classNames from 'classnames'
import { prefix } from '../../utils/constant'
import Icon from '../Icon';

type ThememProps = 'primary' | 'warning' | 'success' | 'error' | 'default';

export interface TagProps {
    /**设置tag内置主题*/
    theme?: ThememProps,
    /**设置tag的样式名*/
    className?: string,
    /**设置tag的样式，例如 backgroundColor 和 color*/
    style?: CSSProperties,
    /**标签是否允许关闭*/
    closable?: boolean,
    /**标签关闭的回调函数*/
    onClose?: () => void,
};

export const Tag: React.FC<TagProps> = ({
    theme,
    className,
    style,
    closable,
    onClose,
    children

}) => {
    const [visible, setVisible] = useState(true);
    const tagClassNames = classNames(
        `${prefix}-tag`,
        {
            [`${prefix}-tag-${theme}`]: theme !== 'default'
        },
        className
    );
    const handleTagClose = () => {
        setVisible(false);
        onClose&&onClose();
    }
    return (
        <>
            {
                visible
                &&
                <span className={tagClassNames} style={style}>
                    <span className={`${prefix}-tag-text`}>{children}</span>
                    {
                        closable && <span onClick={handleTagClose} className={`${prefix}-tag-del-icon`}><Icon name='CloseOutlined' /></span>
                    }
                </span>
                || null
            }
        </>
    )
}
Tag.defaultProps = {
    theme: 'default'

}
export default Tag;