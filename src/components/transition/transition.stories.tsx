import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import Button from '../button'

import { Transition, TransitionProps } from './transition';

export default {
  title: 'Transition 过渡组件',
  component: Transition,
};


const Template: Story<TransitionProps> = (args) => {
  {
    const [showButton, setShowButton] = useState(true);
    const [showMessage, setShowMessage] = useState(false);
    return (
      <div style={{ paddingTop: '2rem' }}>
        <p>更多用法，请参考 <a href="https://reactcommunity.org/react-transition-group/css-transition">https://reactcommunity.org/react-transition-group/css-transition</a></p>
        {showButton && (
          <Button
            onClick={() => setShowMessage(true)}
            size="large"
            type='primary'
          >
            Show Message
          </Button>
        )}
        <Transition
          transitionVisible={showMessage}
          timeout={300}
          onEnter={() => setShowButton(false)}
          onExited={() => setShowButton(true)}
        >
          <div
          >
            <h1>
              Animated alert message
            </h1>
            <p>
              This alert message is being transitioned in and
              out of the DOM.
            </p>
            <Button onClick={() => setShowMessage(false)}>
              Close
            </Button>
          </div>
        </Transition>
      </div>
    );
  }
};

export const Primary = Template.bind({});
Primary.storyName = 'transition'
Primary.args = {
  // loading:true,
}


