import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import color from '../../constants/color';
import {Snackbar, Checkbox, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../constants/storageKeys';
import {MyContext} from '../../navigation/AppNavigation';
import {postRequest, getRequest} from '../../services/APIRequest';
import urls from '../../constants/urls';
import Base64 from '../../utils/Base64';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      snackbarVisibility: false,
      snackbarMsg: '',
    };
  }

  startLogin = async login => {
    try {
      var myHeaders = new Headers();
      myHeaders.append('X-API-KEY', 'ds89fdfvcb87gf8dfdg87fdghgjh897');
      myHeaders.append('Authorization', 'Basic YWRtaW46MTIzNA==');
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append(
        'Cookie',
        'ci_session=a398d10df611ea4f9b475b8c6288fa3f2bafeb1a; csrf_cookie_name=7e603d783e505b02881156aad6d2988d',
      );

      var raw = JSON.stringify({
        email: this.state.email,
        pwd: this.state.password,
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch('https://wethink.pw/test/test_login/', requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('result:', result);
          if (result.status == '0') {
            this.setState({
              snackbarMsg: result.message,
              snackbarVisibility: true,
            });
          } else {
            AsyncStorage.setItem(
              storageKeys.PROFILE_DATA,
              JSON.stringify(result.data),
            );
            setTimeout(login, 800);
          }
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log('error:', error);
    }
  };
  render() {
    return (
      <ScrollView
        style={{
          backgroundColor: color.WHITE,
          flex: 1,
          minHeight: DEVICE_HEIGHT,
        }}>
        <View style={{marginLeft: 27, marginBottom: 100}}>
          <Text style={{fontSize: 34, color: color.BLACK, fontWeight: 'bold'}}>
            Login
          </Text>
          <Text style={{fontSize: 19, color: color.LIGHT_GREY, marginTop: 11}}>
            Enter your email id to login
          </Text>
        </View>
        <View style={{width: DEVICE_WIDTH}}>
          <View style={{width: DEVICE_WIDTH, justifyContent: 'center'}}>
            <Text
              style={{
                marginLeft: 27,
                color: '#4B4A4A',
                fontSize: 18,
                marginBottom: 7,
              }}>
              EMAIL
            </Text>
            <TextInput
              style={{
                borderColor: color.VERY_LIGHT_GREY,
                borderWidth: 1,
                borderRadius: 6,
                height: 54,
                color: color.BLACK,
                alignSelf: 'center',
                width: DEVICE_WIDTH - 54,
                fontSize: 19,
                paddingLeft: 21,
                backgroundColor: color.WHITE,
              }}
              underlineColor={color.THEME_ORANGE}
              placeholder="Enter Email"
              value={this.state.email}
              placeholderTextColor={color.PLACEHOLDER_BLACK}
              onChangeText={email => {
                this.setState({email});
              }}
            />
          </View>
          <View
            style={{
              width: DEVICE_WIDTH,
              justifyContent: 'center',
              marginTop: 34,
            }}>
            <Text
              style={{
                marginLeft: 27,
                color: '#4B4A4A',
                fontSize: 18,
                marginBottom: 7,
              }}>
              PASSWORD
            </Text>
            <TextInput
              style={{
                borderColor: color.VERY_LIGHT_GREY,
                borderWidth: 1,
                borderRadius: 6,
                height: 54,
                color: color.BLACK,
                alignSelf: 'center',
                width: DEVICE_WIDTH - 54,
                fontSize: 19,
                paddingLeft: 21,
                backgroundColor: color.WHITE,
              }}
              underlineColor={color.THEME_ORANGE}
              placeholder="Enter Password"
              value={this.state.password}
              secureTextEntry={true}
              placeholderTextColor={color.PLACEHOLDER_BLACK}
              onChangeText={password => {
                this.setState({password});
              }}
            />
          </View>
          <View
            style={{width: DEVICE_WIDTH, alignItems: 'center', marginTop: 34}}>
            <MyContext.Consumer>
              {value => (
                <TouchableOpacity
                  onPress={() => {
                    this.startLogin(value);
                  }}
                  style={{
                    backgroundColor: color.THEME_ORANGE,
                    width: DEVICE_WIDTH - 54,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 54,
                    borderRadius: 6,
                  }}>
                  <Text style={{color: color.WHITE, fontSize: 22}}>
                    SIGN IN
                  </Text>
                </TouchableOpacity>
              )}
            </MyContext.Consumer>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 34,
          }}>
          <Text style={{color: '#797979', fontSize: 19}}>New To Website?</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Signup');
            }}>
            <Text style={{color: color.THEME_ORANGE, fontSize: 19}}>
              Join Now
            </Text>
          </TouchableOpacity>
        </View>
        <Snackbar
          visible={this.state.snackbarVisibility}
          style={{
            backgroundColor: color.WHITE,
            marginBottom: 10,
            borderRadius: 5,
          }}
          duration={4000}
          onDismiss={() => this.setState({snackbarVisibility: false})}
          action={{
            label: 'Ok',
            color: color.THEME_ORANGE,
            onPress: () => {
              this.setState({snackbarVisibility: false});
            },
          }}>
          <Text style={{color: color.THEME_ORANGE, fontSize: 15}}>
            {this.state.snackbarMsg}
          </Text>
        </Snackbar>
      </ScrollView>
    );
  }
}

export default Login;
const DEVICE_WIDTH = Dimensions.get('screen').width;
const DEVICE_HEIGHT = Dimensions.get('screen').height;
