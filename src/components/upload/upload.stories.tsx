import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';

import { Upload, UploadProps} from './upload';

export default {
  title: 'Upload 文件上传',
  component: Upload,
};


 
const Template: Story<UploadProps> = (args) => <Upload {...args}/>;

export const Primary = Template.bind({});
Primary.storyName = 'upload'
Primary.args = {
  action:"https://jsonplaceholder.typicode.com/posts/",
  beforeUpload:(file)=>{
    console.log(file);
    return Promise.resolve(file);
  },
  onChange:(file)=>{
    console.log(file)
  }
}


