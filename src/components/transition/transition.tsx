import React  from 'react'

import { CSSTransition } from 'react-transition-group';

import {TransitionProps as EventProps} from 'react-transition-group/Transition'
export interface Props  {
    /**
     * 过渡的class名称
     * 具体写法 参考链接 https://reactcommunity.org/react-transition-group/css-transition
    */
    transition?: string,
    /**
     * 如果需要过渡的组件，本身有其他的transition效果，
     * 可以开启此选项，实现transition隔离，避免相互影响
    */
    wrapper?: boolean,
    /**
     * 过渡时间
    */
    timeout: number,
    /**
     * 是否在过渡前后移除需要过渡的组件，默认开启
    */
    unmountOnExit?: boolean,
    /**
     * 组件加载的时候，是否需要进行过渡
    */
    appear?: boolean,
    /**
     * 过渡开始的开关
    */
     transitionVisible:boolean
}

export type TransitionProps = EventProps & Props;
export const Transition: React.FC<TransitionProps> = (props) => {
    const {
        transitionVisible,
        transition,
        wrapper,
        timeout,
        children,
        ...otherProps
    } = props;
    return (
        <CSSTransition
            in={transitionVisible}
            timeout={timeout}
            classNames={transition}
            {...otherProps}
        >
            {wrapper ? <div>{children}</div> : children}
        </CSSTransition>
    )
}

Transition.defaultProps = {
    unmountOnExit: true,
    appear: true,
    timeout: 10,
    transitionVisible:false,
    transition: 'alert'
}

export default Transition;