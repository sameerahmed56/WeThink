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
import color from '../../../constants/color';
class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      gender: '',
      username: '',
      yearOfBirth: '',
    };
  }

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
              secureTextEntry={true}
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
              secureTextEntry={true}
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
              secureTextEntry={true}
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
              placeholder="Enter Password"
              value={this.state.password}
              secureTextEntry={true}
              placeholderTextColor={'#9A9A9A'}
              onChangeText={password => {
                this.setState({password});
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
              secureTextEntry={true}
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
              YEAR OF BIRTH
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
              placeholder="1990"
              value={this.state.yearOfBirth}
              secureTextEntry={true}
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
              onPress={() => this.startLogin()}
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
        </ScrollView>
      </View>
    );
  }
}

export default EditProfile;
const DEVICE_WIDTH = Dimensions.get('screen').width;
const DEVICE_HEIGHT = Dimensions.get('screen').height;
