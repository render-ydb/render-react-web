import React from 'react';
import { Story, Meta } from '@storybook/react';

import  { Alert,AlertProps } from './alert';

export default {
  title: 'Alert警告框',
  component: Alert,
};

const Template: Story<AlertProps> = (args) => <Alert {...args}   />;

export const Primary = Template.bind({});
Primary.storyName ='alert'
Primary.args = {
  type:'success',
  // message:<div>22dsd2</div>,
  message:()=>{
    return <div>3331111</div>
  },
  description:'das'
};