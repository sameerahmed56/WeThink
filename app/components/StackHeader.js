import React, {Component} from 'react';
import {Appbar} from 'react-native-paper';
import {View, Platform, NativeModules, StatusBar} from 'react-native';
import colors from '../constants/color';

const StackHeader = class extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const theme = colors;
    // const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
    const STATUSBAR_HEIGHT = StatusBar.currentHeight;
    return (
      <View style={{}}>
        <Appbar.Header style={{backgroundColor: theme.THEME_ORANGE}}>
          <Appbar.BackAction color={theme.WHITE} onPress={this.props.goBack} />
          <Appbar.Content color={theme.WHITE} title={this.props.headerText} />
        </Appbar.Header>
      </View>
    );
  }
};

export default StackHeader;
