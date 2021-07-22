import React from 'react';
import { Story, Meta } from '@storybook/react';

import  { Tag,TagProps } from './tag';

export default {
  title: 'Tag 标签',
  component: Tag,
};

const Template: Story<TagProps> = (args) => <Tag {...args}>tag 1</Tag>;

export const Primary = Template.bind({});
Primary.storyName ='tag'
Primary.args = {
  theme: 'warning',
  className:'',
  closable:true,
 
};


