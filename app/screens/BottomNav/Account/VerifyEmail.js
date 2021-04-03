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
class VerifyEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View>
        <StackHeader
          headerText="Verify Email"
          goBack={() => {
            this.props.navigation.navigate('Account');
          }}
        />
        <Text>Verify Email</Text>
      </View>
    );
  }
}

export default VerifyEmail;
