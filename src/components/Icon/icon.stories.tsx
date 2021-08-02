import React from 'react';
import { Story, Meta } from '@storybook/react';

import  { Icon,IconProps } from './icon';

export default {
  title: 'Icon 图标',
  component: Icon,
};

const Template: Story<IconProps> = (args) => <Icon {...args}   />;

export const Primary = Template.bind({});
Primary.storyName ='icon'
Primary.args = {
  theme: 'primary',
  spin:false,
  rotate:0,
  style:{},
  name:'AccountBookFilled',
  className:''
};


