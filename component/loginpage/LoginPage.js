/**
* @Author: will
* @Date:   2017-03-26T13:18:07+08:00
* @Filename: LoginPage.js
 * @Last modified by:   smartrabbit
 * @Last modified time: 2018-04-18T14:32:53+08:00
* @flow weak
*/


 import React, { PropTypes, PureComponent } from 'react';

 import {
   View,
   StyleSheet,
   AsyncStorage,
   NativeModules,
   Text,
   Alert,
   Platform,
   Keyboard,
   StatusBar,
 } from 'react-native';
 import validate from 'mobx-form-validate';
 import { observable } from 'mobx';
 import { Toast } from 'react-native-komect-uikit';
 import { observer } from 'mobx-react/native';
 import { login } from '../../common/request';
 import { FormProvider, FormItem, Submit } from './form';
 import UserManager from '../../common/UserManager';
 import appColor from '../../common/appColor';
 import appFont from '../../common/appFont';
 import globalState from '../../globalState/GlobalState';
 import appConfig from '../../config/appConfig';
 import {
   WINDOW_WIDTH,
   WINDOW_HEIGHT,
   widthSacle,
   heightScale,
 } from '../../common/windowUtil';
 import Loader from '../../common/Loader';

 class LoginForm {
   // 用户名
   @observable
   @validate(/^.+$/, 'Please input a valid phone number.')
   mobile = '';

   // 密码
   @observable
   @validate(/^.+$/, 'Please input any password.')
   pwd = '';
   @observable
   loading = false;

}

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: 'white',
   },
   form_container: {
     paddingLeft: 150 * widthSacle,
     paddingRight: 150 * widthSacle,
     marginTop: 150 * heightScale,
   },
 });

@observer
 export default class LoginPage extends PureComponent {
   static propTypes = {
     navigation: React.PropTypes.any,
   }
   static navigationOptions = ({ navigation }) => ({
     header: null,
     gesturesEnabled: false,
     mode: 'modal',
   })
   async componentDidMount() {
     if (global.pushToken === undefined) {
       global.pushToken = await AsyncStorage.getItem('push_token');
     }
     globalState.barStyle = 'default';
   }

   form= new LoginForm();
   timer;

   submit = async () => {
     const { goBack, navigate } = this.props.navigation;
     if (!this.form.mobile) {
       Toast.message('请输入用户名');
       return;
     }

     if (!this.form.pwd) {
       Toast.message('请输入密码');
       return;
     }

     Keyboard.dismiss();
     this.form.loading = true;
     this.timer = setTimeout(() => {
       if (appConfig.IS_TEST) {
         globalState.updateLogin(true);
         Toast.success('登录成功');
         goBack('MainApp');
         // 如果是Tab模式的后面需要加一句
         // navigate('MainTab')
       }
       this.form.loading = false;
     }, appConfig.REQUEST_TIME);
     if (appConfig.IS_TEST) {
       return;
     }
     login(this.form.mobile, this.form.pwd, global.pushToken, (response) => {
       console.log('登录返回：' + JSON.stringify(response));
       this.timer && clearTimeout(this.timer);
       // result为200表明登录成功
       if (response.recode === 200) {
         response.data.userInfo.token = response.data.sessionId;
         UserManager.saveUser(response.data.userInfo);
         globalState.updateLogin(true);
         Toast.success('登录成功');
         goBack('MainApp');
         // 如果是Tab模式的后面需要加一句
         // navigate('MainTab')
       } else {
         Toast.fail(response.msg);
       }
     }, () => {
       this.timer && clearTimeout(this.timer);
     });
   }
   render() {
     return (
       <FormProvider form={this.form}>
         <View style={styles.container}>
           <Text style={[appFont.blueTilteText, { marginTop: 350 * heightScale, alignSelf: 'center' }]}>
             登录页面
           </Text>
           <View style={styles.form_container}>
             <FormItem
               name="mobile"
               placeholder={'请输入用户名'}
               icon={require('../../../resource/image/demo/phone.png')}
             />
             <FormItem
               secureTextEntry
               name="pwd"
               placeholder={'请输入密码'}
               icon={require('../../../resource/image/demo/mima.png')}
             />
             <Submit onSubmit={this.submit} >登录</Submit>
           </View>
           <Loader visible={this.form.loading} />
         </View>
       </FormProvider>
     );
   }
 }
