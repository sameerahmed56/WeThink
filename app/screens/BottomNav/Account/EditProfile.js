import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import StackHeader from '../../../components/StackHeader';
import {Snackbar, Checkbox, Button} from 'react-native-paper';
import color from '../../../constants/color';
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../../constants/storageKeys';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      firstName: '',
      lastName: '',
      phone: '',
      gender: '',
      username: '',
      yearOfBirth: '',
      snackbarVisibility: false,
      snackbarMsg: '',
    };
  }
  componentDidMount() {
    this.setData();
  }
  setData = async () => {
    const profileData = JSON.parse(
      await AsyncStorage.getItem(storageKeys.PROFILE_DATA),
    );
    this.setState({
      id: profileData.id,
      username: profileData.user_name,
      firstName: profileData.user_first_name,
      lastName: profileData.user_last_name,
      phone: profileData.user_mobile,
    });
  };
  updateProfile = () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append('X-API-KEY', 'ds89fdfvcb87gf8dfdg87fdghgjh897');
      myHeaders.append('Authorization', 'Basic YWRtaW46MTIzNA==');
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append(
        'Cookie',
        'ci_session=024741f08766fdc634ba93abdc982268cec59f6d; csrf_cookie_name=f37003fc90c6ecc36567538dce277598',
      );

      var raw = JSON.stringify({
        id: this.state.id,
        user_name: this.state.firstName + this.state.lastName,
        user_first_name: this.state.firstName,
        user_last_name: this.state.lastName,
        user_mobile: this.state.phone,
        year_of_birth: this.state.yearOfBirth,
        gender: this.state.gender,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch('https://wethink.pw/test/test_profile_update/', requestOptions)
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
            this.setState({
              snackbarMsg: 'Successfully Update Profile',
              snackbarVisibility: true,
            });
            setTimeout(() => {
              this.props.navigation.navigate('Account');
            }, 4000);
          }
        })

        .catch(error => console.log('error', error));
    } catch (error) {
      console.log('error:', error);
    }
  };
  render() {
    return (
      <View style={{flex: 1, backgroundColor: color.WHITE}}>
        <StackHeader
          headerText="My Profile"
          goBack={() => {
            this.props.navigation.navigate('Account');
          }}
        />
        <ScrollView>
          <View
            style={{
              width: DEVICE_WIDTH,
              justifyContent: 'center',
              marginTop: 24,
            }}>
            <Text
              style={{
                marginLeft: 27,
                color: '#4B4A4A',
                fontSize: 18,
                marginBottom: 7,
              }}>
              FIRST NAME
            </Text>
            <TextInput
              style={{
                borderColor: '#6C6C6C',
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
              placeholder="Enter First Name"
              value={this.state.firstName}
              placeholderTextColor={'#9A9A9A'}
              onChangeText={firstName => {
                this.setState({firstName});
              }}
            />
          </View>
          <View
            style={{
              width: DEVICE_WIDTH,
              justifyContent: 'center',
              marginTop: 24,
            }}>
            <Text
              style={{
                marginLeft: 27,
                color: '#4B4A4A',
                fontSize: 18,
                marginBottom: 7,
              }}>
              LAST NAME
            </Text>
            <TextInput
              style={{
                borderColor: '#6C6C6C',
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
              placeholder="Enter Last Name"
              value={this.state.lastName}
              placeholderTextColor={'#9A9A9A'}
              onChangeText={lastName => {
                this.setState({lastName});
              }}
            />
          </View>
          <View
            style={{
              width: DEVICE_WIDTH,
              justifyContent: 'center',
              marginTop: 24,
            }}>
            <Text
              style={{
                marginLeft: 27,
                color: '#4B4A4A',
                fontSize: 18,
                marginBottom: 7,
              }}>
              PHONE
            </Text>
            <TextInput
              style={{
                borderColor: '#6C6C6C',
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
              placeholder="10 digit phone number"
              value={this.state.phone}
              placeholderTextColor={'#9A9A9A'}
              onChangeText={phone => {
                this.setState({phone});
              }}
            />
          </View>
          <View
            style={{
              width: DEVICE_WIDTH,
              justifyContent: 'center',
              marginTop: 24,
            }}>
            <Text
              style={{
                marginLeft: 27,
                color: '#4B4A4A',
                fontSize: 18,
                marginBottom: 7,
              }}>
              GENDER
            </Text>
            <TextInput
              style={{
                borderColor: '#6C6C6C',
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
              placeholder="Enter Gender"
              value={this.state.gender}
              placeholderTextColor={'#9A9A9A'}
              onChangeText={gender => {
                this.setState({gender});
              }}
            />
          </View>
          <View
            style={{
              width: DEVICE_WIDTH,
              justifyContent: 'center',
              marginTop: 24,
            }}>
            <Text
              style={{
                marginLeft: 27,
                color: '#4B4A4A',
                fontSize: 18,
                marginBottom: 7,
              }}>
              USERNAME
            </Text>
            <TextInput
              style={{
                borderColor: '#6C6C6C',
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
              placeholder="e.g john123"
              value={this.state.username}
              placeholderTextColor={'#9A9A9A'}
              onChangeText={username => {
                this.setState({username});
              }}
            />
          </View>
          <View
            style={{
              width: DEVICE_WIDTH,
              justifyContent: 'center',
              marginTop: 24,
            }}>
            <Text
              style={{
                marginLeft: 27,
                color: '#4B4A4A',
                fontSize: 18,
                marginBottom: 7,
              }}>
              DATE OF BIRTH
            </Text>
            <TextInput
              style={{
                borderColor: '#6C6C6C',
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
              placeholder="e.g 05/06/1999"
              value={this.state.yearOfBirth}
              placeholderTextColor={'#9A9A9A'}
              onChangeText={yearOfBirth => {
                this.setState({yearOfBirth});
              }}
            />
          </View>
          <View
            style={{
              width: DEVICE_WIDTH,
              alignItems: 'center',
              marginTop: 34,
              marginBottom: 34,
            }}>
            <TouchableOpacity
              onPress={() => this.updateProfile()}
              style={{
                backgroundColor: color.THEME_ORANGE,
                width: DEVICE_WIDTH - 54,
                justifyContent: 'center',
                alignItems: 'center',
                height: 54,
                borderRadius: 3,
              }}>
              <Text style={{color: color.WHITE, fontSize: 22}}>
                SAVE CHANGES
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
      </View>
    );
  }
}

export default EditProfile;
const DEVICE_WIDTH = Dimensions.get('screen').width;
const DEVICE_HEIGHT = Dimensions.get('screen').height;
