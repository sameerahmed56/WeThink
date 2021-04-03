/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import AppNavigation from './app/navigation/AppNavigation';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import color from './app/constants/color';

const App = props => (
  <NavigationContainer>
    <View style={{flex: 1}}>
      <StatusBar
        translucent={true}
        barStyle="dark-content"
        hidden={false}
        backgroundColor={color.TILE}
      />
      <AppNavigation />
    </View>
  </NavigationContainer>
);

export default App;
