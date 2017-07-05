/**
 * @Author: will
 * @Date:   2017-05-25T11:34:03+08:00
 * @Filename: RootApp.js
 * @Last modified by:   will
 * @Last modified time: 2017-07-05T10:40:28+08:00
 */


import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import MainApp from './MainApp';
import ChildPage from '../component/childpage/ChildPage';

const RootApp = StackNavigator({
  MainApp: { screen: MainApp, navigationOptions: { header: null } },
  ChildPage: { screen: ChildPage },
}, {
  headerMode: 'screen',
  transitionConfig: () => ({
    screenInterpolator: CardStackStyleInterpolator.forHorizontal,
  }),
},
);

export default RootApp;
