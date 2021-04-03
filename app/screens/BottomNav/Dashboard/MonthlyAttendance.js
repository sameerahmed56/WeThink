import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Image, ScrollView, TouchableOpacity, Dimensions, Text, ActivityIndicator, Animated, BackHandler, FlatList } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/SimpleLineIcons'
import AsyncStorage from '@react-native-community/async-storage'
import { Card, Appbar, Snackbar, TextInput } from 'react-native-paper'
import color from '../../../constants/color'
import { postRequest, getRequest } from "../../../services/APIRequest";
import storageKeys from '../../../constants/storageKeys'
import StackHeader from '../../../components/StackHeader';
import PieChart from 'react-native-pie-chart';
import AwesomeAlert from 'react-native-awesome-alerts';
import urls from '../../../constants/urls'
import { VictoryPie, VictoryLabel, VictoryTooltip, VictoryGroup, VictoryTheme } from 'victory-native';
import Svg from 'react-native-svg'
import PTRView from 'react-native-pull-to-refresh';

class MonthlyAttendance extends Component {
    constructor(props) {
        super(props)
        this.setData = this.setData.bind(this);
        this.state = {
            loading: true,
            monthlyAttendanceSummary: [],
            monthlyAttendanceData: [],
            showDailyAttendanceList: [],
            snackbarVisibility: false,
            snackbarMsg: '',
            showAlert: false,
            seriesArr: [],
            graphicColor: [color.ATT_GREEN, color.ATT_ORANGE, color.BORDER, color.BLACK, color.TILE],
            graphicData: [{ label: '', y: 0 }, { label: '', y: 0 }, { label: '', y: 0 }, { label: '', y: 0 }, { label: 'Not Loaded', y: 100 }],
            graphPadAngle: 0,
        }
    }
    componentDidMount() {
        this.setData()
    }
    setData = async () => {
        const Cookie = await AsyncStorage.getItem(storageKeys.COOKIE);
        var today = new Date('2020-03-31');
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + "-" + mm + "-" + dd;
        var todayMonthYear = yyyy + "-" + mm + "-"
        try {
            this.setState({ showAlert: true })
            //TODAY ATTENDANCE
            const url = urls.SINGLE_PERSON_ATTENDANCE + "?fdate=" + todayMonthYear + "01" + "&tdate=" + today
            let getAttendanceResponse = await getRequest(url, Cookie)
            console.log(getAttendanceResponse.data.s)
            console.log(getAttendanceResponse.data.summary)
            var seriesArr = []
            var graphicData = []
            getAttendanceResponse.data.summary.forEach(element => {
                element['y'] = element.data
                element['label'] = element.data != 0 ? element.label : ''
                graphicData.push(element)
            });
            console.log(graphicData)
            this.setState({
                monthlyAttendanceSummary: getAttendanceResponse.data.summary, monthlyAttendanceData: getAttendanceResponse.data.s, showDailyAttendanceList: getAttendanceResponse.data.s, showAlert: false, loading: false, seriesArr: seriesArr,
                graphPadAngle: 1, graphicColor: [color.ATT_GREEN, color.ATT_ORANGE, color.BORDER, color.ATT_RED, color.BLACK], graphicData: graphicData,
            })
        } catch (error) {
            console.log(error)
            this.setState({ loading: false, showAlert: false, snackbarVisibility: true, snackbarMsg: 'Some Error Occurred' })
        }
    }
    changeMonthlyAttendanceData(attType) {
        const { monthlyAttendanceData, } = this.state
        var showDailyAttendanceList = []
        if (attType == 'Present') {
            monthlyAttendanceData.forEach(element => {
                if (element.emp_status == "P") {
                    showDailyAttendanceList.push(element);
                }
                // <Text style={{ fontSize: 18, paddingRight: 20, color: data.emp_status == "P" ? color.ATT_GREEN : (data.emp_status == "A" && data.leave.length == 0) ? color.ATT_RED : data.leave.length != 0 ? color.TEXT_SECONDARY : data.emp_status == "Sunday" ? color.ATT_ORANGE : color.TEXT_PRIMARY }}>{data.emp_status == "P" ? "Present" : (data.emp_status == "A" && data.leave.length == 0) ? "Absent" : data.leave.length != 0 ? "Leave" : data.emp_status}</Text>
            });
        }
        else if (attType == 'Absent') {
            monthlyAttendanceData.forEach(element => {
                if (element.emp_status == "A" && element.leave.length == 0) {
                    showDailyAttendanceList.push(element);
                }
            });
        }
        else if (attType == 'Leave') {
            monthlyAttendanceData.forEach(element => {
                if (element.leave.length != 0) {
                    showDailyAttendanceList.push(element);
                }
            });
        }
        else if (attType == 'Holiday') {
            monthlyAttendanceData.forEach(element => {
                if (element.emp_status != "A" && element.emp_status != "P" && element.leave.length == 0) {
                    showDailyAttendanceList.push(element);
                }
            });
        }
        // console.log(showDailyAttendanceList)
        this.setState({ showDailyAttendanceList: showDailyAttendanceList })
    }
    AttendanceDetailLayout = (props) => (
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingLeft: 10 }}>
            <Text style={{ fontSize: 15, fontFamily: 'Verdana', color: color.TEXT_PRIMARY }}>{props.subtitle}</Text>
            <Text style={{ fontSize: 14, color: color.TEXT_SECONDARY }}>{props.title}</Text>
        </View>
    )
    render() {
        const { monthlyAttendanceData, graphicColor, graphicData } = this.state
        const theme = color
        let daysSum = 0
        this.state.seriesArr.forEach(element => {
            daysSum += element
        });
        let colorArr = [color.ATT_GREEN, color.ATT_ORANGE, color.BORDER, color.BLACK, color.WHITE]
        return (
            <View style={{ flex: 1, backgroundColor: theme.TILE }}>
                <StackHeader headerText="Monthly Attendance" goBack={() => { this.props.navigation.navigate("Dashboard") }} />
                <PTRView onRefresh={this.setData}>
                    <View>
                        <View style={{ flexDirection: 'row', backgroundColor: color.WHITE, marginTop: 5, marginBottom: 0, justifyContent: 'space-between', alignItems: 'center', }} activeOpacity={0.7}>
                            <Svg>
                                <VictoryPie
                                    animate={{ easing: 'exp' }}
                                    data={graphicData}
                                    labels={({ datum }) => datum.x}
                                    labelPosition='centroid'
                                    padAngle={this.state.graphPadAngle}
                                    colorScale={graphicColor}
                                    innerRadius={40}
                                    cornerRadius={3}
                                    height={220}
                                    width={DeviceWidth}
                                    style={{
                                        labels: {
                                            fontSize: 16, fill: "#000"
                                        },
                                        padding: 0
                                    }}
                                    animate={{ duration: 1500 }}
                                    // radius={({ datum }) => 50 + datum.y * 1.5}
                                    radius={70}
                                    labelRadius={({ innerRadius }) => innerRadius + 50}
                                    events={[{
                                        target: "data",
                                        eventHandlers: {
                                            onPressIn: () => {
                                                return [
                                                    {
                                                        target: "labels",
                                                        mutation: ({ text }) => {
                                                            // this.props.navigation.navigate('Dashboard')
                                                            this.state.loading != true ?
                                                                this.changeMonthlyAttendanceData(text)
                                                                :
                                                                console.log('not loaded')
                                                            return null;
                                                        }
                                                    },
                                                    // {
                                                    //     target: "data",
                                                    //     mutation: (props) => {
                                                    //         console.log('index: ' + props.innerRadius);
                                                    //         return null;
                                                    //     }
                                                    // }, {
                                                    //     target: "labels",
                                                    //     mutation: ({ text }) => {
                                                    //         console.log('text: ');
                                                    //         // props.innerRadius = 56;
                                                    //         return text === "clicked" ? null : { text: "clicked" };
                                                    //     }
                                                    // }, {
                                                    //     target: "data",
                                                    //     mutation: ({ radius }) => {
                                                    //         return radius === 68 ? 96 : 85;
                                                    //     }
                                                    // }
                                                ];
                                            }
                                        }
                                    }]}
                                // padding={{ top: 0, bottom: 35, right: 10, left: 10 }}
                                // labelComponent={<VictoryLabel angle={45} />}
                                // radius={({ datum }) => 50 + datum.y * 7}
                                // categories={{ x: ["dogs", "cats", "mice"] }}
                                // labelComponent={<VictoryTooltip dy={0} centerOffset={{ x: 25 }} />}
                                />

                            </Svg>
                        </View>
                        <ScrollView>
                            {
                                this.state.showDailyAttendanceList.map((data, index) => {
                                    return (
                                        <Card style={{ marginBottom: 0, marginTop: index == 0 ? 3 : 0, paddingVertical: 8 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10 }}>
                                                <Text style={{ color: color.THEME_ORANGE, fontSize: 18 }}>{data.att_date}</Text>
                                                <Text style={{ fontSize: 16, paddingRight: 20, color: data.emp_status == "P" ? color.ATT_GREEN : (data.emp_status == "A" && data.leave.length == 0) ? color.ATT_RED : data.leave.length != 0 ? color.TEXT_SECONDARY : data.emp_status == "Sunday" ? color.ATT_ORANGE : color.TEXT_PRIMARY }}>{data.emp_status == "P" ? "Present" : (data.emp_status == "A" && data.leave.length == 0) ? "Absent" : data.leave.length != 0 ? "Leave" : data.emp_status}</Text>
                                            </View>
                                            <this.AttendanceDetailLayout color={theme} subtitle='Leave : ' title={data.leave} />
                                            <this.AttendanceDetailLayout color={theme} subtitle='In Time : ' title={data.emp_intime} />
                                            <this.AttendanceDetailLayout color={theme} subtitle='Out TIme : ' title={data.emp_outtime} />
                                            {/* <this.AttendanceDetailLayout color={theme} subtitle='Late In : ' title={data.latein} />
                                    <this.AttendanceDetailLayout color={theme} subtitle='Early Exit : ' title={data.earlyexit} />
                                    <this.AttendanceDetailLayout color={theme} subtitle='Extra Hour : ' title={data.extra} /> */}
                                            {
                                                index != this.state.showDailyAttendanceList.length - 1 ?
                                                    <View style={{ height: 1, backgroundColor: color.BORDER, marginTop: 3 }}></View>
                                                    :
                                                    <View></View>
                                            }
                                        </Card>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </PTRView>
                <AwesomeAlert
                    show={this.state.showAlert}
                    progressSize={40}
                    showProgress={true}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={true}
                    progressColor={color.THEME_ORANGE}
                    contentContainerStyle={{
                        backgroundColor: color.WHITE,
                        borderRadius: 25,
                        height: 50,
                        width: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                />
                <Snackbar
                    visible={this.state.snackbarVisibility}
                    style={{ backgroundColor: color.WHITE, marginBottom: 10, borderRadius: 5 }}
                    duration={3000}
                    onDismiss={() => this.setState({ snackbarVisibility: false })}
                    action={{
                        label: 'Ok',
                        color: color.THEME_ORANGE,
                        onPress: () => {
                            this.setState({ snackbarVisibility: false })
                        },
                    }}
                >
                    <Text style={{ color: color.THEME_ORANGE, fontSize: 15 }}>{this.state.snackbarMsg}</Text>
                </Snackbar>
            </View>
        )
    }
}
const DeviceWidth = Dimensions.get('window').width
const DeviceHeight = Dimensions.get('window').height
const styles = StyleSheet.create(
    {
        Container: {
            flex: 1
        }
    }
)
export default MonthlyAttendance;