import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import StackHeader from '../../../components/StackHeader';
import color from '../../../constants/color';
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../../constants/storageKeys';
import {Snackbar, Checkbox, Button} from 'react-native-paper';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
class VerifyEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snackbarVisibility: false,
      snackbarMsg: '',
      otpStatus: '0',
    };
  }
  componentDidMount() {
    this.setData();
  }
  setData = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append('X-API-KEY', 'ds89fdfvcb87gf8dfdg87fdghgjh897');
      myHeaders.append('Authorization', 'Basic YWRtaW46MTIzNA==');
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append(
        'Cookie',
        'ci_session=3a4ad0b4bd1dd96a619db5e35b4c55abe437991f; csrf_cookie_name=f37003fc90c6ecc36567538dce277598',
      );

      var raw = JSON.stringify({
        id: '245',
        email: 'youarethe1formeonly@gmail.com',
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch('https://wethink.pw/test/test_email_generate_otp/', requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('result:', result);
          this.setState({
            snackbarVisibility: true,
            snackbarMsg: result.message,
            otpStatus: result.status,
          });
        })
        .catch(error => console.log('error', error));
    } catch (error) {}
  };
  render() {
    return (
      <View style={{flex: 1, backgroundColor: color.WHITE}}>
        <StackHeader
          headerText="Verify Email"
          goBack={() => {
            this.props.navigation.navigate('Account');
          }}
        />
        <ScrollView>
          <CodeField
            // ref={ref}
            value={this.state.otpValue}
            onChangeText={otpValue => {
              this.setState({otpValue});
            }}
            cellCount={6}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </ScrollView>
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
      </View>
    );
  }
}

export default VerifyEmail;
const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});
