import React from 'react';
export interface ProgressProps {
    /**内容的模板函数*/
    format?: (percent: number) => string;
    /**进度百分比*/
    percent?: number;
    /**状态，可选：success exception normal*/
    status?: "success" | "exception" | "normal";
    /**进度条长度*/
    width?: number | string;
    /**进度条高度*/
    height?: number | string;
    /**进度条的色彩*/
    strokeColor?: string;
    /**进度条的样式*/
    strokeLinecap?: 'round' | 'square';
    /**未完成分段的颜色*/
    trailColor?: string;
    /**进度条尺寸*/
    size?: 'normal' | 'small';
    /**是否显示进度数值或状态图标*/
    showInfo?: boolean;
}
export declare const Progress: React.FC<ProgressProps>;
export default Progress;
