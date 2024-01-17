import { Component } from "react"
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons, SimpleLineIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Colors from "../utilty/Colors";
import { CommonApiRequest } from "../utilty/api/commonApiRequest";
import WorkorderStateInterface from "../Interfaces/States/WorkorderStateInterface";
import MainLayout from "../Layout/MainLayout";
import ProgressCircle from 'react-native-progress-circle';
import ButtonComponent from "../Components/Common/ButtonComponent";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import { CommonHelper } from "../utilty/CommonHelper";
import * as Location from "expo-location";
export default class Workorder extends Component<ScreenInterfcae, WorkorderStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            objWorkorder: {},
            loader: false,
            serachText: '',
            user: {},
            intervalId: 0,
            isStarted: false,
            timeLine:[],
            isAnyJobStarted:false
        }
    }
    async componentDidMount() {
        this.setState({ user: await CommonHelper.getUserData() });
        this.setState({ loader: false });
        this.props?.navigation.addListener("focus", async () => {
            await this.getApiData();
        });
        const interval = setInterval(() => {
            this.setState({
                curTime: new Date().toLocaleString(),
                curDate: new Date()
            });
        }, 1000);
        this.setState({ intervalId: interval });
        await this.getApiData();
    }
    componentWillUnmount(): void {
        clearInterval(this.state.intervalId);
    }
    async getApiData(){
        const objApiData = {
            service_id: this.props?.route?.params?.data,
            machine_id: this.props?.route?.params?.machine?.machine_id,
            job_site_id: this.props?.route?.params?.machine?.job_site_id,
        }
        CommonApiRequest.getTodaysTimerLog(objApiData).then((response) => {
            this.setState({ loader: false });
            console.log(response?.results?.tiimeline);
            if (response?.status == 200) {
                this.setState({
                    isStarted:response?.results?.clockInStatus,
                    isAnyJobStarted:response?.results?.isClockedIn,
                    timeLine:response?.results?.tiimeline
                })
            }
        })
    }
    async startTimer() {
        this.setState({ loader: true });
        let location = await Location.getCurrentPositionAsync({});
        const objApiData = {
            service_id: this.props?.route?.params?.data,
            machine_id: this.props?.route?.params?.machine?.machine_id,
            job_site_id: this.props?.route?.params?.machine?.job_site_id,
            job_start_date: new Date().toLocaleString(),
            cords: location?.coords
        }
        CommonApiRequest.startLogTimer(objApiData).then((response) => {
            this.setState({ loader: false });
            if (response?.status == 200 || response?.status == 500) {
                this.setState({ isStarted: true });
            }
        }).catch((error) => {
            this.setState({ loader: false });
        })
    }
    refreshPage() {

    }
    render() {
        return (
            <MainLayout isTopLogo={false} onRefresh={() => { this.refreshPage() }} loader={this.state?.loader} headerText="Time Tracking" backButton={true} navigation={this.props.navigation}>
                <View>
                    <View style={[ThemeStyling.container, { marginTop: 0 }]}>

                        <View>
                            <View style={{ marginBottom: 20 }}>
                                <Text style={[ThemeStyling.heading5, { textAlign: "center", marginBottom: 0, color: Colors.dark_color, fontWeight: '600', fontFamily: 'Poppins_600SemiBold', }]}>Punch Clock</Text>
                                <Text style={[ThemeStyling.text2, { color: Colors.success_color, textAlign: "center" }]}>{CommonHelper.convertDateTimeToDateAndTime(this.state.curTime, this.state.curDate)}</Text>
                            </View>
                            <View style={{ marginBottom: 40 }}>
                                <View>
                                    <Text style={[ThemeStyling.heading2, { textAlign: "center", marginBottom: 5 }]}>{CommonHelper.getUserName(this.state?.user)}</Text>
                                </View>
                                <View style={{ justifyContent: "center", flexDirection: "row" }}>
                                    <View>
                                        <Text style={[ThemeStyling.text1, { textAlign: "center" }]}>Your are currently</Text>
                                    </View>
                                    <View style={{ marginLeft: 5 }}>
                                        <Text style={{ marginBottom: 0, color: ((this.state.isStarted)) ? Colors.success_color : Colors.errorColor }}>{(this.state.isStarted) ? "Punched In!" : "Punched Out!"}</Text>
                                    </View>
                                </View>
                            </View>
                            {this.state.isStarted &&
                                <View style={[ThemeStyling.threeColumnLayout, { marginBottom: 50 }]}>
                                    <View>
                                        <Text style={[ThemeStyling.heading4, { marginBottom: 0, lineHeight: 22 }]}>7:55 AM</Text>
                                        <Text style={[ThemeStyling.text2, { color: Colors.secondry_color, lineHeight: 15, textAlign: "center", textTransform: "uppercase" }]}>Start Time</Text>
                                    </View>
                                    <View>
                                        <FontAwesome name="circle" size={20} style={{ color: (this.state.isStarted) ? Colors.success_color : Colors.errorColor }} />
                                        <Text style={[ThemeStyling.text2, { textAlign: "center", color: (this.state.isStarted) ? Colors.success_color : Colors.errorColor, textTransform: "uppercase" }]}>{(this.state.isStarted) ? 'In' : "Out"}</Text>
                                    </View>
                                    <View>
                                        <Text style={[ThemeStyling.heading4, { marginBottom: 0, lineHeight: 22 }]}>0:10:00</Text>
                                        <Text style={[ThemeStyling.text2, { color: Colors.secondry_color, lineHeight: 15, textAlign: "center", textTransform: "uppercase" }]}>Duration</Text>
                                    </View>
                                </View>
                            }

                            <View style={{ justifyContent: 'center', alignItems: "center", flex: 1, marginBottom: 20 }}>
                                <TouchableOpacity
                                    onPress={() => { this.startTimer() }}
                                    style={[ThemeStyling.btnSuccess, { width: 150, height: 45, alignItems: "center", flexDirection: "row" }]}
                                >
                                    <FontAwesome name={(this.state.isStarted) ? 'hand-o-left' : "hand-o-right"} size={24} color="white" />
                                    <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f16, color: Colors.white, marginLeft: 10 }]}>{(this.state.isStarted) ? 'Punch Out' : "Punch In"}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={[ThemeStyling.notesBlock, { marginBottom: 10 }]}>
                                <View style={{ justifyContent: "center", flex: 1, flexDirection: "row", marginBottom: 10 }}>
                                    <FontAwesome name="commenting-o" size={20} style={{ color: Colors.primary_color, marginRight: 5 }} />
                                    <Text>Notes</Text>
                                </View>
                                <View style={ThemeStyling.formgroup2}>
                                    <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>Enter Message here</Text>
                                    <TextInput style={[ThemeStyling.formcontrol, {borderRadius:8, justifyContent:'flex-start', alignItems:"flex-start", flex:1, top:5}]} secureTextEntry={false}
                                        multiline={true}
                                        numberOfLines={4}
                                        placeholder="e.g. required two brush..."></TextInput>
                                </View>
                                <View style={{ marginBottom: 20 }}>
                                    <TouchableOpacity style={[ThemeStyling.btnPrimary, { justifyContent: 'center' }]}>
                                        <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f16, color: Colors.white }]}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View>
                                <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 5 }]}>
                                    <View>
                                        <Text style={[ThemeStyling.heading5, {
                                            color: Colors.dark_color, fontFamily: 'Poppins_700Bold',
                                            fontWeight: '700',
                                        }]}>Today's Punch</Text>
                                    </View>
                                    <View>
                                        <Text style={[ThemeStyling.heading5, {
                                            color: Colors.dark_color, fontFamily: 'Poppins_700Bold',
                                            fontWeight: '700',
                                        }]}>Timeline</Text>
                                    </View>
                                </View>
                                {this.state?.timeLine?.length > 0 && this.state?.timeLine?.map((item:any,index:number)=>{
                                    return <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between" }]} key={index}>
                                        <View style={ThemeStyling.twoColumnLayout}>
                                            <View style={{ marginRight: 5 }}>
                                                {CommonHelper.getClockType(item)}
                                            </View>
                                            <View>
                                                <Text style={[ThemeStyling.text2, { color: Colors.dark_color }]}>{item?.type}</Text>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>{item?.time}</Text>
                                        </View>
                                    </View>
                                })}
                            </View>
                        </View>
                    </View>
                </View>
            </MainLayout>
        );
    }
}