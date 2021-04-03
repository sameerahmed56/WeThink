import React, {useState} from 'react';
import {View, Text, Animated, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import * as Animatable from 'react-native-animatable';
import colors from '../constants/color';

//screen
import Account from '../screens/BottomNav/Account/Account';
import EditProfile from '../screens/BottomNav/Account/EditProfile';
import Add from '../screens/BottomNav/Add/Add';
import Login from '../screens/LoginScreen/Login';
import Dashboard from '../screens/BottomNav/Dashboard/Dashboard';
import Signup from '../screens/LoginScreen/Signup';
import VerifyEmail from '../screens/BottomNav/Account/VerifyEmail';
import UpdateEmail from '../screens/BottomNav/Account/UpdateEmail';
const SIZE = 80;
export default class AppNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      LoggedIn: false,
    };
  }
  mode = new Animated.Value(0);
  toggleView = () => {
    Animated.timing(this.mode, {
      toValue: this.mode._value === 0 ? 1 : 0,
      duration: 250,
      // useNativeDriver: true
    }).start();
  };

  async componentDidMount() {}

  logout = async () => {
    let removeItem = []; //add key you don't want to delete on logout
    let keys = await AsyncStorage.getAllKeys();
    for (let i = 0; i < removeItem.length; i++) {
      keys.splice(keys.indexOf(removeItem[i]), 1);
    }
    await AsyncStorage.multiRemove(keys);
    this.setState({LoggedIn: false});
  };

  login = () => {
    this.setState({LoggedIn: true});
  };

  splashComplete = async () => {
    let loggedInStatus = await isLoggedIn();
    console.log('DDDDDKJKJKSW');
    if (loggedInStatus) {
      this.setState({isLoading: false, LoggedIn: true});
    } else {
      this.setState({isLoading: false, LoggedIn: false});
    }
  };

  // splashComplete = async () => {
  //     let loggedInStatus = await isLoading()
  //     if (loggedInStatus == "LoggedIn") {
  //         this.setState({ isLoading: false, LoggedIn: true })
  //     } else {
  //         this.setState({ isLoading: false, LoggedIn: false })
  //     }
  // }

  render() {
    const {isLoading, LoggedIn} = this.state;
    return (
      <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
        {this.state.LoggedIn ? (
          <MyContext.Provider value={this.logout}>
            <View style={{flex: 1}}>
              <TabNavigator />
            </View>
          </MyContext.Provider>
        ) : (
          <MyContext.Provider value={this.login}>
            <LoginStack />
            {/* <TabNavigator /> */}
          </MyContext.Provider>
        )}
      </View>
    );
  }
}
const StackNavigator = createStackNavigator();

const AccountStack = props => (
  <StackNavigator.Navigator
    initialRouteName="Account"
    mode="card"
    headerMode="none">
    <StackNavigator.Screen name="Account" component={Account} />
    <StackNavigator.Screen name="Edit Profile" component={EditProfile} />
    <StackNavigator.Screen name="Verify Email" component={VerifyEmail} />
    <StackNavigator.Screen name="Update Email" component={UpdateEmail} />
  </StackNavigator.Navigator>
);
const LoginStack = props => (
  <StackNavigator.Navigator
    initialRouteName="Login"
    mode="modal"
    headerMode="none">
    <StackNavigator.Screen name="Login" component={Login} />
    <StackNavigator.Screen name="Signup" component={Signup} />
  </StackNavigator.Navigator>
);
const Tab = createBottomTabNavigator();
const TabNavigator = props => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let sizeIcon = focused ? size + 6 : size;
          let colorIcon = focused ? colors.THEME_ORANGE : colors.BLACK; // 51b9db
          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
            return <Icon name={iconName} size={sizeIcon} color={colorIcon} />;
          } else if (route.name === 'Add') {
            iconName = focused ? 'plus-circle' : 'plus';
            return <Icon name={iconName} size={sizeIcon} color={colorIcon} />;
          } else if (route.name === 'Account') {
            iconName = focused ? 'account' : 'account-outline';
            return <Icon name={iconName} size={sizeIcon} color={colorIcon} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.WHITE,
        keyboardHidesTabBar: true,
        activeBackgroundColor: colors.TILE, //60708d
        inactiveBackgroundColor: colors.WHITE, //00223d
        showLabel: false,
        adaptive: true,
      }}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Add" component={Add} />
      <Tab.Screen name="Account" component={AccountStack} />
    </Tab.Navigator>
  );
};

export const MyContext = React.createContext(() => {
  //do nothing
});

//function to generate view for bottom nav bar icon with badge
function IconWithBadge({name, badgeCount, color, size}) {
  return (
    <Animatable.View
      animation={badgeCount ? 'rubberBand' : ''}
      iterationCount={'infinite'}
      style={{width: size, height: size, margin: 5}}>
      <Icon name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
            {badgeCount}
          </Text>
        </View>
      )}
    </Animatable.View>
  );
}
