import React,{useState} from 'react';
import { Story, Meta } from '@storybook/react';

import  { Button,ButtonProps } from './button';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'Button 按钮',
  component: Button,
};

const B = (props:ButtonProps)=>{
  const [flag,setFlag] = useState(true);
 return (
   
  <div>
    <p onClick={()=>{if(flag) {setFlag(false)}else {setFlag(true)}}}>sdsda</p>
      <Button onClick={()=>{
    alert(1)
  }} {...props} loading={flag}>大大说</Button>
  </div>
 )
}

const Template: Story<ButtonProps> = (args) => <B {...args}/>;

export const Primary = Template.bind({});
Primary.storyName ='button'
Primary.args = {
    // loading:true,
} 


