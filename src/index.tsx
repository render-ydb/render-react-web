import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.less';

import { SmileFilled, SmileTwoTone } from '@ant-design/icons';
import * as icons from '@ant-design/icons'
console.log(icons.SmileFilled)

ReactDOM.render(
  <React.StrictMode>
     <SmileFilled 
      spin
      twoToneColor="red"
     />
  </React.StrictMode>,
  document.getElementById('root')
);

