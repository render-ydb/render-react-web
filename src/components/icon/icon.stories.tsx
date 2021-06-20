import React from 'react';
import { Story, Meta } from '@storybook/react';

import Icon , { IconProps } from './icon';

export default {
  title: '图标',
  component: Icon,
} as Meta;

const Template: Story<IconProps> = (args) => <Icon {...args}   />;

export const Primary = Template.bind({});
Primary.args = {
  theme: 'primary',
  spin:false,
  rotate:0,
  style:{},
  name:'AccountBookFilled',
  className:''
};



