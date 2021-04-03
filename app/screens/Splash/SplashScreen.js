import React, { useState } from "react";
import { Text, View, Animated, StyleSheet, Dimensions, Easing } from 'react-native';
import { postRequest } from "../../services/APIRequest";
import { Button, Snackbar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient'
import urls from "../../constants/urls";
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from "../../constants/storageKeys";
import color from '../../constants/color'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import TouchID from "react-native-touch-id";
import AwesomeAlert from 'react-native-awesome-alerts';

export default class SplashScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            snackbarVisibility: false,
            snackbarMsg: '',
            showAlert: false,
            alertMsg: '',
            alertTitle: '',
            biometryType: null,
            background: '',
            authenticate: false,
            animationImgColor: new Animated.Value(0),
            animationBackgroundColor: new Animated.Value(0),
            animationK: new Animated.Value(0),
            animationHeight: new Animated.Value(DeviceHeight),
            animationWidth: new Animated.Value(DeviceWidth),
            animationImage: new Animated.Value(0),
            animationKAKSHA: new Animated.Value(0),
            animationKIET: new Animated.Value(0),
            animationKIETKAKSHA: new Animated.Value(0),
            bottomAnimationHeight: new Animated.Value(0),
            bottomAnimationWidth: new Animated.Value(0),
        }
    }
    async componentDidMount() {
        setTimeout(() => {
            this.fetchData()
        }, 100)
        // this.moveImageUp()
        // this.moveImageDown()
        // this.fadeInOutK()
        // if (this.state.authenticate == false) {
        //     this.touchIdSupport()
        // }
        // else {
        //     this.fadeInHeight()
        //     this.fadeInWidth()
        // }
    }
    touchIdSupport() {
        TouchID.isSupported()
            .then(biometryType => {
                // Success code
                if (biometryType === 'FaceID') {
                    console.log('FaceID is supported.');
                    this.fadeInHeight()
                    this.fadeInWidth()
                } else if (biometryType === 'TouchID') {
                    console.log('TouchID is supported.')
                    this.checkFingerPrint()
                } else if (biometryType === true) {
                    // Touch ID is supported on Android
                    console.log("finger support on android")
                    this.checkFingerPrint()
                }
            })
            .catch(error => {
                // Failure code if the user's device does not have touchID or faceID enabled
                console.log(error)
                this.fadeInHeight()
                this.fadeInWidth()
            });
    }
    checkFingerPrint() {
        TouchID.isSupported()
            .then(this.authenticate())
            .catch(error => {
                console.log("finger print not supported")
                this.fadeInHeight()
                this.fadeInWidth()
            })
    }

    authenticate() {
        return TouchID.authenticate("Verify your FingerPrint",)
            .then(granted => {
                if (granted) {
                    this.fadeInWidth()
                    this.fadeInHeight()
                    console.log("authentication complete")
                    this.setState({ authenticate: true })
                }
                else {
                    console.log(granted)
                    this.authenticate()
                }

            })
            .catch(error => {
                console.log(error)
                this.setState({ snackbarMsg: `Please Try Again \nYou need to authenticate to get into App `, snackbarVisibility: true })
                // this.setState({ showAlert: true, alertTitle: "Not Authorized", alertMsg: "cannot get in without authorizing touch id" })
                console.log("JIIIIII")
                console.log(error.msg)
            });
    }

    moveImageDown = () => {
        Animated.timing(this.state.animationKIET, {
            toValue: DeviceHeight / 2 - 190,
            delay: 100,
            duration: 1000,
            easing: Easing.cubic,
        }).start(() => {
        })
    }
    moveImageUp = () => {
        Animated.timing(this.state.animationKAKSHA, {
            toValue: DeviceHeight / 2,
            delay: 100,
            duration: 1000,
            easing: Easing.cubic,
        }).start(() => {
            setTimeout(() => {
                this.imgColorChange()
                // this.bacColorChange()
            }, 1000)
        })
    }
    imgColorChange = () => {
        Animated.timing(this.state.animationImgColor, {
            toValue: 1,
            delay: 100,
            duration: 200,
            easing: Easing.cubic,
        }).start(() => {
            this.moveWholeImageUp()
        })
    }
    moveWholeImageUp = () => {
        Animated.timing(this.state.animationKIETKAKSHA, {
            toValue: DeviceWidth,
            delay: 100,
            duration: 500,
            easing: Easing.cubic,
        }).start(() => {
            this.bottomFullHeight()

            // setTimeout(() => {
            //     this.fetchData()
            // }, 1000)
        })
    }
    bottomFullHeight = () => {
        console.log("DDD")
        Animated.timing(this.state.bottomAnimationWidth, {
            toValue: DeviceWidth,
            delay: 0,
            duration: 800,
            easing: Easing.cubic,
        }).start(() => {
            this.fetchData()
            // setTimeout(() => {
            // }, 1000)
        })
    }
    // bacColorChange = () => {
    //     Animated.timing(this.state.animationBackgroundColor, {
    //         toValue: 1,
    //         delay: 100,
    //         duration: 500,
    //         easing: Easing.cubic,
    //     }).start(() => {
    //         setTimeout(() => {
    //             this.fetchData()
    //         }, 1000)
    //     })
    // }
    // fadeInImage = () => {
    //     Animated.timing(this.state.animationImage, {
    //         toValue: 1,
    //         delay: 100,
    //         duration: 1000,
    //         easing: Easing.cubic,
    //     }).start(() => {
    //         this.fadeInOutK()
    //     })
    // }
    // fadeOutImage = () => {
    //     Animated.timing(this.state.animationImage, {
    //         toValue: 0,
    //         delay: 100,
    //         duration: 1000,
    //         easing: Easing.cubic,
    //     }).start(() => {
    //         this.fadeOutHeight()
    //         this.fadeOutWidth()
    //     })
    // }
    // fadeInOutK = () => {
    //     Animated.timing(this.state.animationK, {
    //         toValue: 1,
    //         delay: 0,
    //         duration: 600,
    //         easing: Easing.cubic,
    //     }).start(() => {
    //         this.fadeOutImage()
    //     })
    // }
    // fadeInHeight = () => {
    //     Animated.timing(this.state.animationHeight, {
    //         toValue: 200,
    //         delay: 300,
    //         duration: 600,
    //         easing: Easing.cubic,
    //     }).start(() => {
    //         this.fadeInImage()
    //     })
    // }
    // fadeInWidth = () => {
    //     Animated.timing(this.state.animationWidth, {
    //         toValue: 200,
    //         delay: 300,
    //         duration: 600,
    //         easing: Easing.cubic,
    //     }).start()
    // }
    // fadeOutHeight = () => {
    //     Animated.timing(this.state.animationHeight, {
    //         toValue: DeviceHeight,
    //         delay: 100,
    //         duration: 600,
    //         easing: Easing.cubic,
    //     }).start(() => {
    //         setTimeout(() => {
    //             this.fetchData()
    //         }, 1000)
    //     })
    // }
    // fadeOutWidth = () => {
    //     Animated.timing(this.state.animationWidth, {
    //         toValue: DeviceWidth,
    //         delay: 100,
    //         duration: 600,
    //         easing: Easing.cubic,
    //     }).start()
    // }

    fetchData = () => {
        //api to request data
        this.props.complete()
    }

    render() {
        const { isLoading, LoggedIn } = this.state
        let { animationHeight, animationImage, animationK, animationKAKSHA, animationKIET, animationKIETKAKSHA, animationT, MOBIscale } = this.state;
        const animatedStyle = {
            width: this.state.animationWidth,
            height: this.state.animationHeight
        }
        var imgColor = this.state.animationImgColor.interpolate({
            inputRange: [0, 1],
            outputRange: [color.THEME_ORANGE, color.THEME_LIGHT_ORANGE]
        });
        var bacColor = this.state.animationBackgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: [color.TILE, color.THEME_ORANGE]
        });
        const bottomViewStyle = {
            width: this.state.bottomAnimationWidth,
            // height: this.state.bottomAnimationHeight,
            // marginBottom: this.state.animationBottomMargin
        }
        return (
            <View style={{ flex: 1, backgroundColor: bacColor, alignItems: 'center', justifyContent: 'center' }}>
                {/* <LinearGradient colors={[color.THEME_ORANGE, '#6aaede', '#96ccf2',]} style={{ height: DeviceHeight, width: DeviceWidth, justifyContent: 'center', alignItems: 'center' }}> */}
                {/* <Animated.Image style={{ marginTop: 50, tintColor: color.THEME_ORANGE, height: 180, width: 180, top: 0, position: 'absolute', opacity: animationImage }} source={require('../../assets/education.png')} /> */}
                <Animated.View style={{ flex: 1, marginLeft: animationKIETKAKSHA, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }} >
                    <Animated.View style={{ marginTop: animationKIET, flexDirection: 'column' }} ref={(ref) => { this.topImage = ref }}>
                        <View>
                            <Animated.Image style={{ tintColor: imgColor, height: 140, width: 140, marginBottom: 15 }} source={require('../../assets/education.png')} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Animated.Image style={{ tintColor: imgColor, height: 60, width: 40, marginHorizontal: 3 }} source={require('../../assets/letterK.png')} />
                            <Animated.Image style={{ tintColor: imgColor, height: 55, width: 10, marginHorizontal: 3, marginTop: 3 }} source={require('../../assets/letterI.png')} />
                            <Animated.Image style={{ tintColor: imgColor, height: 60, width: 40, marginHorizontal: 3 }} source={require('../../assets/letterE.png')} />
                            <Animated.Image style={{ tintColor: imgColor, height: 60, width: 40, marginHorizontal: 3 }} source={require('../../assets/letterT.png')} />
                        </View>
                    </Animated.View>
                    <Animated.View style={{ marginBottom: animationKAKSHA, flexDirection: 'row', }} ref={(ref) => { this.bottomImage = ref }}>
                        <Animated.Image style={{ tintColor: imgColor, height: 60, width: 40, marginHorizontal: 3 }} source={require('../../assets/letterK.png')} />
                        <Animated.Image style={{ tintColor: imgColor, height: 60, width: 40, marginHorizontal: 5 }} source={require('../../assets/letterA.png')} />
                        <Animated.Image style={{ tintColor: imgColor, height: 60, width: 40, marginHorizontal: 3 }} source={require('../../assets/letterK.png')} />
                        <Animated.Image style={{ tintColor: imgColor, height: 60, width: 40, marginHorizontal: 5 }} source={require('../../assets/letterS.png')} />
                        <Animated.Image style={{ tintColor: imgColor, height: 60, width: 40, marginHorizontal: 5 }} source={require('../../assets/letterH.png')} />
                        <Animated.Image style={{ tintColor: imgColor, height: 60, width: 50, marginHorizontal: 5 }} source={require('../../assets/letterA.png')} />
                    </Animated.View>
                </Animated.View>
                <Animated.View style={[styles.bottomBox, bottomViewStyle]}>
                    <Icon name={'arrow-right-bold-hexagon-outline'} size={55} style={{ color: color.TEXT_WHITE, right: 0, position: 'absolute' }} />
                </Animated.View>
                {/* <Animated.View style={[styles.container, animatedStyle]}>
                    <Animated.Text style={{ opacity: animationK, color: color.TEXT_PRIMARY, fontSize: 40, fontWeight: 'bold', fontFamily: 'monospace' }}>KIET</Animated.Text>
                    <Animated.Text style={{ opacity: animationK, color: color.TEXT_WHITE, fontSize: 40, fontWeight: 'bold', fontFamily: 'monospace' }}>Kaksha</Animated.Text>
                </Animated.View> */}
                {/* </LinearGradient> */}
                <AwesomeAlert
                    show={this.state.showAlert}
                    title={this.state.alertTitle}
                    message={this.state.alertMsg}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    onConfirmPressed={() => {
                        this.setState({ showAlert: false })
                        this.checkFingerPrint()
                    }}
                    showProgress={false}
                />
                <Snackbar
                    duration={4000}
                    visible={this.state.snackbarVisibility}
                    onDismiss={() => {
                        this.setState({ snackbarVisibility: false })
                        this.checkFingerPrint()
                    }}
                    action={{
                        label: "OKAY",
                        onPress: () => {
                            this.setState({ snackbarVisibility: false })
                            this.checkFingerPrint()
                        }
                    }}
                >
                    {this.state.snackbarMsg}
                </Snackbar>
            </View>

        )
    }
}
const DeviceWidth = Dimensions.get('window').width
const DeviceHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.THEME_ORANGE,
        borderRadius: 100
    },
    bottomBox: {
        // width: DeviceWidth,
        height: DeviceHeight,
        position: 'absolute',
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.THEME_LIGHT_ORANGE,
        borderTopColor: color.ATT_GREEN,
        borderTopWidth: 0
    }
})
export const isLoggedIn = async () => {
    let cookie = await AsyncStorage.getItem(storageKeys.COOKIE)
    if (cookie) {
        return true;
    } else {
        return false;
    }
}

