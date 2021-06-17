import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.less';

// import { SmileFilled, SmileTwoTone } from '@ant-design/icons';
// import * as icons from '@ant-design/icons'
// console.log(icons.SmileFilled)

import Icon from './components/icon/icon'

ReactDOM.render(
  <React.StrictMode>
    <Icon
      name='SmileFilled'
      theme='warning'
      twoToneColor='green'
    />
     <Icon
      name='SmileFilled'
      theme='error'
      twoToneColor='green'
    />
     <Icon
      name='SmileFilled'
      theme='success'
      twoToneColor='green'
    />
      <Icon
      name='SmileFilled'
      theme='success'
      twoToneColor='green'
      style={{color:'purple'}}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

