import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import color from '../../../constants/color';
import {MyContext} from '../../../navigation/AppNavigation';
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../../constants/storageKeys';

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailVerified: '0',
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
      email: profileData.user_email,
      emailVerified: profileData.two_way_authentication,
    });
  };
  startLogout = logout => {
    logout();
  };
  render() {
    return (
      <ScrollView style={{backgroundColor: '#FAFBFA', flex: 1}}>
        <View
          style={{
            width: DEVICE_WIDTH,
            height: 190,
            backgroundColor: color.THEME_ORANGE,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              marginHorizontal: 26,
              color: color.WHITE,
              fontSize: 24,
              fontWeight: 'bold',
            }}>
            Welcome
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 26,
              flexWrap: 'wrap',
            }}>
            <Text style={{fontSize: 19, color: color.WHITE}}>
              {this.state.email}
            </Text>
            {this.state.emailVerified == 0 && (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Verify Email')}>
                <Text
                  style={{
                    fontSize: 19,
                    fontWeight: 'bold',
                    color: color.WHITE,
                    fontStyle: 'italic',
                  }}>
                  Verify
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View
          style={{
            marginTop: -41,
            backgroundColor: 'transparent',
            flex: 1,
            marginHorizontal: 16,
          }}>
          <View
            style={{
              height: 82,
              backgroundColor: color.WHITE,
              borderRadius: 12,
              elevation: 3,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 19.25,
            }}>
            <View>
              <Text
                style={{color: color.BLACK, fontSize: 22, fontWeight: '600'}}>
                Lavendel Cash
              </Text>
              <Text style={{color: '#ACA4A3', fontSize: 15}}>
                Invite your friends and earn bonus
              </Text>
            </View>
            <Text
              style={{fontSize: 34, color: color.BLACK, fontWeight: 'bold'}}>
              12
            </Text>
          </View>
          <View
            style={{
              height: 439,
              backgroundColor: color.WHITE,
              borderRadius: 10,
              elevation: 5,
              marginTop: 25,
            }}>
            <View
              style={{
                height: 433 / 7,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: 29,
              }}>
              <Text style={{color: '#4D4D4D', fontSize: 22}}>My Profile</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Edit Profile')}>
                <Text style={{color: color.THEME_ORANGE, fontSize: 19}}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: color.VERY_LIGHT_GREY,
              }}></View>
            <View
              style={{
                height: 433 / 7,
                justifyContent: 'center',
                paddingHorizontal: 29,
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Update Email')}>
                <Text style={{color: '#4D4D4D', fontSize: 22}}>
                  Update Email
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: color.VERY_LIGHT_GREY,
              }}></View>
            <View
              style={{
                height: 433 / 7,
                justifyContent: 'center',
                paddingHorizontal: 29,
              }}>
              <Text style={{color: '#4D4D4D', fontSize: 22}}>Item Won</Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: color.VERY_LIGHT_GREY,
              }}></View>
            <View
              style={{
                height: 433 / 7,
                justifyContent: 'center',
                paddingHorizontal: 29,
              }}>
              <Text style={{color: '#4D4D4D', fontSize: 22}}>Item Lost</Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: color.VERY_LIGHT_GREY,
              }}></View>
            <View
              style={{
                height: 433 / 7,
                justifyContent: 'center',
                paddingHorizontal: 29,
              }}>
              <Text style={{color: '#4D4D4D', fontSize: 22}}>My Items</Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: color.VERY_LIGHT_GREY,
              }}></View>
            <View
              style={{
                height: 433 / 7,
                justifyContent: 'center',
                paddingHorizontal: 29,
              }}>
              <Text style={{color: '#4D4D4D', fontSize: 22}}>My Sold</Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: color.VERY_LIGHT_GREY,
              }}></View>
            <View
              style={{
                height: 433 / 7,
                justifyContent: 'center',
                paddingHorizontal: 29,
              }}>
              <MyContext.Consumer>
                {value => {
                  <TouchableOpacity
                    onPress={() => {
                      this.startLogout(value);
                    }}>
                    <Text style={{color: '#4D4D4D', fontSize: 22}}>Logout</Text>
                  </TouchableOpacity>;
                }}
              </MyContext.Consumer>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Account;
const DEVICE_WIDTH = Dimensions.get('screen').width;
const DEVICE_HEIGHT = Dimensions.get('screen').height;
