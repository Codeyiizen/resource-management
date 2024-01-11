import { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { FontAwesome, FontAwesome5, AntDesign, SimpleLineIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import Colors from "../utilty/Colors";
import MainLayout from "../Layout/MainLayout";
import { CommonApiRequest } from "../utilty/api/commonApiRequest";
import DashboardInterface from "../Interfaces/States/DashboardInterface";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import ProgressCircle from 'react-native-progress-circle';
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { CommonHelper } from "../utilty/CommonHelper";

export default class Dashboard extends Component<ScreenInterfcae, DashboardInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            ...this.state,
            loader: false,
            userObj:{}
        }
    }
    async componentDidMount() {
        const userData = await CommonHelper.getUserData();
        this.setState({userObj:userData});
        this.props?.navigation.addListener("focus", async () => {
            await this.getApiData();
        });
        this.setState({ loader: true });
        await this.getApiData();
    }
    async getApiData() {
        await CommonApiRequest.getDashboardData({}).then((response: any) => {
            this.setState({ dataObj: response?.results });
            this.setState({ loader: false });
        }).catch(() => {
            this.setState({ loader: false })
        });
    }
    async refreshPage() {
        await this.getApiData();
    }
    retirectToDetail(data: any) {
        this.props.navigation?.navigate("WorkOrderDetail", { data: data });
    }
    render() {
        return (
            <MainLayout onRefresh={() => { this.refreshPage() }} loader={this.state?.loader}>
                <View style={[ThemeStyling.bgPrimary, { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 15 }]}>
                    <View style={[ThemeStyling.container, { justifyContent: "space-between", flexDirection: "row", minHeight: 1, width: '100%', minWidth: '100%' }]}>
                        <View>
                            <View>
                                <Text style={[ThemeStyling.heading2, { color: Colors.white }]}>Hello, { CommonHelper.getUserName(this.state.userObj) }</Text>
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <Text style={[ThemeStyling.text1, { color: Colors.primary_light_color }]}>{CommonHelper.getCurrentDate()}</Text>
                            </View>
                        </View>
                        <View style={{ position: "relative", top: 10 }}>
                            <TouchableOpacity style={{ position: "relative" }}>
                                <FontAwesome name="bell-o" size={20} color={Colors.white} />
                                <Text style={[ThemeStyling.text5, { color: Colors.white, fontWeight: '700', borderRadius: 100, width: 20, height: 20, lineHeight: 20, backgroundColor: Colors.success_color, position: "absolute", top: -10, right: -10 }]}>14</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={[ThemeStyling.container, { alignItems: "flex-start", minHeight: 1, paddingBottom: 0 }]}>
                    <View style={{ display: "flex", flexWrap: 'wrap', flexDirection: "row", justifyContent: "center", marginTop: -40 }}>
                        <View style={[ThemeStyling.card, { width: '45%', marginRight: 10 }]}>
                            <View style={ThemeStyling.cardBody}>
                                <View style={{ marginBottom: 10, display: "flex", flexWrap: 'wrap', flexDirection: "row", justifyContent: "space-between", }}>
                                    <Text style={[ThemeStyling.listIcon, ThemeStyling.bglightPrimary, { borderRadius: 8 }]}>
                                        <FontAwesome name="tasks" size={16} style={{ color: Colors.primary_color }} />
                                    </Text>
                                    <Text style={[ThemeStyling.heading1, { fontSize: Colors.FontSize.h1, marginBottom: 0 }]}>645</Text>
                                </View>
                                <View>
                                    <Text style={[ThemeStyling.heading5, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', color: Colors.dark_color }]}>Total Task</Text>
                                    <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}>34 new task added</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[ThemeStyling.card, { width: '45%', marginLeft: 10 }]}>
                            <View style={ThemeStyling.cardBody}>
                                <View style={{ marginBottom: 10, display: "flex", flexWrap: 'wrap', flexDirection: "row", justifyContent: "space-between", }}>
                                    <Text style={[ThemeStyling.listIcon, ThemeStyling.bglightSuccess, { borderRadius: 8 }]}>
                                        <FontAwesome5 name="calendar-check" size={18} style={{ color: Colors.success_color }} />
                                    </Text>
                                    <Text style={[ThemeStyling.heading1, { fontSize: Colors.FontSize.h1, marginBottom: 0 }]}>115</Text>
                                </View>
                                <Text style={[ThemeStyling.heading5, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', color: Colors.dark_color }]}>Completed</Text>
                                <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}>4 new task today</Text>
                            </View>
                        </View>
                        <View style={[ThemeStyling.card, { width: '45%', marginRight: 10 }]}>
                            <View style={ThemeStyling.cardBody}>
                                <View style={{ marginBottom: 10, display: "flex", flexWrap: 'wrap', flexDirection: "row", justifyContent: "space-between", }}>
                                    <Text style={[ThemeStyling.listIcon, ThemeStyling.bglightDanger, { borderRadius: 8 }]}>
                                        <FontAwesome name="tasks" size={16} style={{ color: Colors.errorColor }} />
                                    </Text>
                                    <Text style={[ThemeStyling.heading1, { fontSize: Colors.FontSize.h1, marginBottom: 0 }]}>24</Text>
                                </View>
                                <View>
                                    <Text style={[ThemeStyling.heading5, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', color: Colors.dark_color }]}>Pending</Text>
                                    <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}>2 task remaining</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[ThemeStyling.card, { width: '45%', marginLeft: 10 }]}>
                            <View style={ThemeStyling.cardBody}>
                                <View style={{ marginBottom: 10, display: "flex", flexWrap: 'wrap', flexDirection: "row", justifyContent: "space-between", }}>
                                    <Text style={[ThemeStyling.listIcon, ThemeStyling.bglightWarning, { borderRadius: 8 }]}>
                                        <FontAwesome name="tasks" size={16} style={{ color: Colors.orange_color }} />
                                    </Text>
                                    <Text style={[ThemeStyling.heading1, { fontSize: Colors.FontSize.h1, marginBottom: 0 }]}>11</Text>
                                </View>
                                <View>
                                    <Text style={[ThemeStyling.heading5, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', color: Colors.dark_color }]}>In Progress</Text>
                                    <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}>Track all your task</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                <Text style={[ThemeStyling.heading3, { marginBottom: 0 }]}>Ongoing Tasks</Text>
                                <Text style={[ThemeStyling.badge, ThemeStyling.bgWarning, { marginLeft: 5, textAlign: "center", paddingHorizontal: 5 }]}>
                                    12
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={[ThemeStyling.text1, { textAlign: "right", marginBottom: 0 }]}> See All</Text>
                        </View>
                    </View>
                    <View style={[ThemeStyling.card, { flex: 1 }]}>
                        <View style={[ThemeStyling.cardBody, { display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                            <View style={{ width: '76%' }}>
                                <Text style={[ThemeStyling.heading5, { color: Colors.dark_color, fontFamily: 'Poppins_600SemiBold', fontWeight: '600', marginBottom: 0 }]}>Crystal Grand River Woods (Cambridge)</Text>
                                <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}>
                                    <AntDesign name="clockcircleo" /> 342 hours 14 min <SimpleLineIcons name="calendar" /> Due today</Text>
                            </View>
                            <View style={{ width: '20%', marginLeft: 10, justifyContent: "flex-end", display: "flex", alignItems: "flex-end" }}>
                                {/* <ProgressCircle
                                    percent={10}
                                    radius={25}
                                    borderWidth={4}
                                    color={Colors.grayLight}
                                    shadowColor={Colors.orange_color}
                                    bgColor="#fff"
                                >
                                    <Text style={{ fontSize: 12 }}>{'80%'}</Text>
                                </ProgressCircle> */}
                                <Feather name="pause-circle" size={45} color={Colors.success_color} />
                            </View>
                        </View>
                    </View>
                    <View style={[ThemeStyling.card]}>
                        <View style={[ThemeStyling.cardBody, { display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                            <View style={{ width: '76%' }}>
                                <Text style={[ThemeStyling.heading5, { color: Colors.dark_color, fontFamily: 'Poppins_600SemiBold', fontWeight: '600', marginBottom: 0 }]}>Empire Homes (Welland)</Text>
                                <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}>
                                    <AntDesign name="clockcircleo" /> 123 hours 52 min <SimpleLineIcons name="calendar" /> Sep 6, 2023</Text>
                            </View>
                            <View style={{ width: '20%', marginLeft: 10, justifyContent: "flex-end", display: "flex", alignItems: "flex-end" }}>
                                {/* <ProgressCircle
                                    percent={.9}
                                    radius={25}
                                    borderWidth={4}
                                    color={Colors.grayLight}
                                    shadowColor={Colors.primary_color}
                                    bgColor="#fff"

                                >
                                    <Text style={{ fontSize: 12 }}>{'96%'}</Text>
                                </ProgressCircle> */}
                                <Feather name="play-circle" size={45} color={Colors.primary_color} />
                            </View>
                        </View>
                    </View>
                    <View style={[ThemeStyling.card, { flex: 1 }]}>
                        <View style={[ThemeStyling.cardBody, { display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                            <View style={{ width: '76%' }}>
                                <Text style={[ThemeStyling.heading5, { color: Colors.dark_color, fontFamily: 'Poppins_600SemiBold', fontWeight: '600', marginBottom: 0 }]}>Kingswood Homes (Paris) Kayak</Text>
                                <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}>
                                    <AntDesign name="clockcircleo" /> 563 hours 45 min <SimpleLineIcons name="calendar" /> Due tomorrow</Text>
                            </View>
                            <View style={{ width: '20%', marginLeft: 10, justifyContent: "flex-end", display: "flex", alignItems: "flex-end" }}>
                                {/* <ProgressCircle
                                    percent={Math.round(100)}
                                    radius={25}
                                    borderWidth={4}
                                    color={Colors.grayLight}
                                    shadowColor={Colors.errorColor}
                                    bgColor="#fff"
                                >
                                    <Text style={{ fontSize: 12 }}>{'50%'}</Text>
                                </ProgressCircle> */}
                                <Feather name="play-circle" size={45} color={Colors.primary_color} />
                            </View>
                        </View>
                    </View>
                    <View style={[ThemeStyling.card, { flex: 1 }]}>
                        <View style={[ThemeStyling.cardBody, { display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                            <View style={{ width: '76%' }}>
                                <Text style={[ThemeStyling.heading5, { color: Colors.dark_color, fontFamily: 'Poppins_600SemiBold', fontWeight: '600', marginBottom: 0 }]}>Mattamy Parkside Towns (Downsview)</Text>
                                <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}>
                                    <AntDesign name="clockcircleo" /> 234 hours 23 min <SimpleLineIcons name="calendar" /> Sep 20, 2023</Text>
                            </View>
                            <View style={{ width: '20%', marginLeft: 10, justifyContent: "flex-end", display: "flex", alignItems: "flex-end" }}>
                                {/* <ProgressCircle
                                    percent={Math.round(30)}
                                    radius={25}
                                    borderWidth={4}
                                    color={Colors.grayLight}
                                    shadowColor={Colors.success_color}
                                    bgColor="#fff"
                                >
                                    <Text style={{ fontSize: 12 }}>{'100%'}</Text>
                                </ProgressCircle> */}
                                <MaterialIcons name="timer-off" size={45} color={Colors.errorColor} />
                            </View>
                        </View>
                    </View>
                    <View style={[ThemeStyling.btnContainer, { marginBottom: 80, width: '100%' }]}>
                        <TouchableOpacity style={[ThemeStyling.btnPrimary, { width: '100%' }]}>
                            <Text style={ThemeStyling.btnText}>Add Timesheet</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </MainLayout>
        );
    }
}
