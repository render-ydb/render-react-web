import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';

import { Upload, UploadProps } from './upload';
import Button from '../Button';

export default {
  title: 'Upload 文件上传',
  component: Upload,
};



const Template: Story<UploadProps> = (args) => <Upload {...args}>
  <Button
    type='primary'
    icon='ToTopOutlined'
  >
    上传文件
  </Button></Upload>;

export const Primary = Template.bind({});
Primary.storyName = 'upload'
Primary.args = {
  action: "https://jsonplaceholder.typicode.com/posts/",
  beforeUpload: (file) => {
    console.log(file);
    return Promise.resolve(file);
  },
  avatar:true,
  onChange: (file) => {
    console.log('文件发生改变', file)
  },
  onSuccess: (file) => {
    console.log('成功', file)
  },
  onError: (file) => {
    console.log('失败', file)
  },
  onProgress: (percent, file) => {
    console.log('当前进度', percent);
    console.log('文件', file)
  },
  onDeleted:(file)=>{
    console.log('被删除的文件',file);
  },
  multiple:false,
}


