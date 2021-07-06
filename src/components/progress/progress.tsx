import React, { CSSProperties } from 'react'
import classNames from 'classnames'
import { prefix } from '../../utils/constant'
import Icon from '../icon'




export interface ProgressProps {
    /**内容的模板函数*/
    format?: (percent: number) => string,
    /**进度百分比*/
    percent?: number,
    /**状态，可选：success exception normal*/
    status?: "success" | "exception" | "normal",
    /**进度条长度*/
    width?: number | string,
    /**进度条的色彩*/
    strokeColor?: string,
    /**进度条的样式*/
    strokeLinecap?: 'round' | 'square',
    /**未完成分段的颜色*/
    trailColor?: string
    /**进度条尺寸*/
    size?: 'normal' | 'small'
};

export const Progress: React.FC<ProgressProps> = (props) => {
    const {
        format,
        percent,
        status,
        width,
        strokeColor,
        strokeLinecap,
        trailColor,
        size
    } = props;

    const _percent = Math.min.apply(null, [percent || 0, 100]);
    const success = (status === 'success') || (_percent === 100);
    const exception = status === 'exception';
    const progressBgClassNames = classNames(
        `${prefix}-progress-bg`,
        {
            [`${prefix}-progress-bg-${size}`]: size === 'small',
            [`${prefix}-progress-bg-success`]: success,
            [`${prefix}-progress-bg-exception`]: exception
        }
    );
    const progressText = classNames(
        `${prefix}-progress-text`,
        {
            [`${prefix}-progress-text-${size}`]: size === 'small',
            [`${prefix}-progress-text-success`]: success,
            [`${prefix}-progress-text-exception`]: exception

        }
    )
    const progressInner = classNames(
        `${prefix}-progress-inner`,
        {
            [`${prefix}-progress-inner-${strokeLinecap}`]: strokeLinecap === 'square',

        }
    )

    const handleText = () => {
        if (success) {
            return <Icon name='CheckCircleOutlined'/>
        } else if (exception) {
            return <Icon name='CloseCircleOutlined'/>
        }

        return format ? format(percent || 0) : _percent + '%'
    }

    return (
        <div className={`${prefix}-progress`} style={{ width: width ? width + 'px' : '100%' }}>
            <div className={progressInner} style={{ backgroundColor: trailColor }}>
                <div className={progressBgClassNames} style={{ width: percent + '%', backgroundColor: strokeColor }}></div>
            </div>
            <div className={progressText} title={_percent + ''}>
                {handleText()}
            </div>
        </div>
    )
}
Progress.defaultProps = {
    percent: 0,
    status: 'normal',
    width: "100%",
    strokeLinecap: 'round',
    strokeColor: "#1890ff",
    trailColor: "#f5f5f5",
}
export default Progress;