import React from 'react';
import { Story, Meta } from '@storybook/react';

import  { Progress,ProgressProps } from './progress';

export default {
  title: 'Progress 进度条',
  component: Progress,
};

const Template: Story<ProgressProps> = (args) => <Progress {...args}   />;

export const Primary = Template.bind({});
Primary.storyName ='progress'
Primary.args = {
  width:200,
  percent:20,
  format:(percent)=>{
    return '自定义百分比'+percent+'%'
  },
};


