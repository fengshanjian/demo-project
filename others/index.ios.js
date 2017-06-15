/**
 * @Author: will
 * @Date:   2017-05-25T10:01:45+08:00
 * @Filename: index.ios.js
 * @Last modified by:   will
 * @Last modified time: 2017-06-15T16:37:04+08:00
 */


import { AppRegistry } from 'react-native';
import RootApp from './src/main/RootApp';
import RootTab from './src/main/RootTab';

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    error: () => {},
  };
}