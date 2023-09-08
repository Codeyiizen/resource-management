import { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { FontAwesome, FontAwesome5, } from '@expo/vector-icons';
import Colors from "../utilty/Colors";
import MainLayout from "../Layout/MainLayout";
import { CommonApiRequest } from "../utilty/api/commonApiRequest";
import DashboardInterface from "../Interfaces/States/DashboardInterface";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import ProgressCircle from 'react-native-progress-circle';

export default class Dashboard extends Component<ScreenInterfcae, DashboardInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            ...this.state,
            loader: false
        }
    }
    async componentDidMount() {
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
                <View style={[ThemeStyling.bgPrimary, { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }]}>
                    <View style={[ThemeStyling.container, { alignItems: "flex-start", minHeight: 1, width: '100%', minWidth: '100%' }]}>
                        <View>
                            <Text style={[ThemeStyling.heading2, { color: Colors.white }]}>Hello, John Steward</Text>
                        </View>
                        <View style={{ marginBottom: 15 }}>
                            <Text style={[ThemeStyling.text1, { color: Colors.primary_light_color }]}>Monday, 17 Sep 2023</Text>
                        </View>
                        <View style={{ display: "flex", flexWrap: 'wrap', flexDirection: "row", justifyContent: "center", marginBottom: 30 }}>
                            <View style={{ width: '30%' }}>
                                <Text style={[ThemeStyling.heading1, { textAlign: "center", color: Colors.primary_light_color, fontSize: Colors.FontSize.f32, marginBottom: 5 }]}>28</Text>
                                <Text style={[ThemeStyling.text3, { textAlign: "center" }]}>Tasks Pending</Text>
                            </View>
                            <View style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ borderRightWidth: 1, borderRightColor: Colors.dark_color, paddingVertical: 3 }}></Text>
                            </View>
                            <View style={{ width: '30%' }}>
                                <Text style={[ThemeStyling.heading1, { textAlign: "center", color: Colors.primary_light_color, fontSize: Colors.FontSize.f32, marginBottom: 5 }]}>34</Text>
                                <Text style={[ThemeStyling.text3, { textAlign: "center" }]}>Tasks In Progress</Text>
                            </View>
                            <View style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ borderRightWidth: 1, borderRightColor: Colors.dark_color, paddingVertical: 3 }}></Text>
                            </View>
                            <View style={{ width: '30%' }}>
                                <Text style={[ThemeStyling.heading1, { textAlign: "center", color: Colors.primary_light_color, fontSize: Colors.FontSize.f32, marginBottom: 5 }]}>685</Text>
                                <Text style={[ThemeStyling.text3, { textAlign: "center" }]}>Tasks Completed</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[ThemeStyling.container, { alignItems: "flex-start", minHeight: 1, paddingBottom: 0 }]}>
                    <View style={{ display: "flex", flexWrap: 'wrap', flexDirection: "row", justifyContent: "center", marginTop: -40 }}>
                        <View style={[ThemeStyling.card, { width: '45%', marginRight: 10 }]}>
                            <View style={ThemeStyling.cardBody}>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[ThemeStyling.listIcon, ThemeStyling.bglightPrimary, { borderRadius: 8 }]}>
                                        <FontAwesome name="tasks" size={16} style={{ color: Colors.primary_color }} />
                                    </Text>
                                </View>
                                <View>
                                    <Text style={[ThemeStyling.heading5, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', color: Colors.dark_color }]}>Total Task</Text>
                                    <Text style={[ThemeStyling.text5, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', textAlign: "left" }]}>34 new task added</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[ThemeStyling.card, { width: '45%', marginLeft: 10 }]}>
                            <View style={ThemeStyling.cardBody}>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[ThemeStyling.listIcon, ThemeStyling.bglightSuccess, { borderRadius: 8 }]}>
                                        <FontAwesome5 name="calendar-check" size={18} style={{ color: Colors.success_color }} />
                                    </Text>
                                </View>
                                <Text style={[ThemeStyling.heading5, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', color: Colors.dark_color }]}>Completed</Text>
                                <Text style={[ThemeStyling.text5, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', textAlign: "left" }]}>You have 400 ticket</Text>
                            </View>
                        </View>
                        <View style={[ThemeStyling.card, { width: '45%', marginRight: 10 }]}>
                            <View style={ThemeStyling.cardBody}>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[ThemeStyling.listIcon, ThemeStyling.bglightDanger, { borderRadius: 8 }]}>
                                        <FontAwesome name="tasks" size={16} style={{ color: Colors.errorColor }} />
                                    </Text>
                                </View>
                                <View>
                                    <Text style={[ThemeStyling.heading5, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', color: Colors.dark_color }]}>Pending</Text>
                                    <Text style={[ThemeStyling.text5, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', textAlign: "left" }]}>2 task remaining today</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[ThemeStyling.card, { width: '45%', marginLeft: 10 }]}>
                            <View style={ThemeStyling.cardBody}>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[ThemeStyling.listIcon, ThemeStyling.bglightWarning, { borderRadius: 8 }]}>
                                        <FontAwesome name="tasks" size={16} style={{ color: Colors.orange_color }} />
                                    </Text>
                                </View>
                                <View>
                                    <Text style={[ThemeStyling.heading5, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', color: Colors.dark_color }]}>In Progress</Text>
                                    <Text style={[ThemeStyling.text5, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', textAlign: "left" }]}>Track all your task</Text>
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
                                <Text style={[ThemeStyling.heading5, { color: Colors.dark_color, fontFamily: 'Poppins_600SemiBold', fontWeight: '600', marginBottom: 0 }]}>The generated Lorem Ipsum</Text>
                                <Text style={ThemeStyling.text1}>Identifying the components </Text>
                            </View>
                            <View style={{ width: '20%', marginLeft: 10, justifyContent: "flex-end", display: "flex", alignItems: "flex-end" }}>
                                <ProgressCircle
                                    percent={10}
                                    radius={25}
                                    borderWidth={4}
                                    color={Colors.grayLight}
                                    shadowColor={Colors.orange_color}
                                    bgColor="#fff"
                                >
                                    <Text style={{ fontSize: 12 }}>{'80%'}</Text>
                                </ProgressCircle>
                            </View>
                        </View>
                    </View>
                    <View style={[ThemeStyling.card]}>
                        <View style={[ThemeStyling.cardBody, { display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                            <View style={{ width: '76%' }}>
                                <Text style={[ThemeStyling.heading5, { color: Colors.dark_color, fontFamily: 'Poppins_600SemiBold', fontWeight: '600', marginBottom: 0 }]}>Get input from the report</Text>
                                <Text style={ThemeStyling.text1}>Gather feedback form doc file</Text>
                            </View>
                            <View style={{ width: '20%', marginLeft: 10, justifyContent: "flex-end", display: "flex", alignItems: "flex-end" }}>
                                <ProgressCircle
                                    percent={.9}
                                    radius={25}
                                    borderWidth={4}
                                    color={Colors.grayLight}
                                    shadowColor={Colors.primary_color}
                                    bgColor="#fff"

                                >
                                    <Text style={{ fontSize: 12 }}>{'96%'}</Text>
                                </ProgressCircle>
                            </View>
                        </View>
                    </View>
                    <View style={[ThemeStyling.card, { flex: 1 }]}>
                        <View style={[ThemeStyling.cardBody, { display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                            <View style={{ width: '76%' }}>
                                <Text style={[ThemeStyling.heading5, { color: Colors.dark_color, fontFamily: 'Poppins_600SemiBold', fontWeight: '600', marginBottom: 0 }]}>Develop a component </Text>
                                <Text style={ThemeStyling.text1}>Create a library of reusable components</Text>
                            </View>
                            <View style={{ width: '20%', marginLeft: 10, justifyContent: "flex-end", display: "flex", alignItems: "flex-end" }}>
                                <ProgressCircle
                                    percent={Math.round(100)}
                                    radius={25}
                                    borderWidth={4}
                                    color={Colors.grayLight}
                                    shadowColor={Colors.errorColor}
                                    bgColor="#fff"
                                >
                                    <Text style={{ fontSize: 12 }}>{'50%'}</Text>
                                </ProgressCircle>
                            </View>
                        </View>
                    </View>
                    <View style={[ThemeStyling.card, { flex: 1 }]}>
                        <View style={[ThemeStyling.cardBody, { display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                            <View style={{ width: '76%' }}>
                                <Text style={[ThemeStyling.heading5, { color: Colors.dark_color, fontFamily: 'Poppins_600SemiBold', fontWeight: '600', marginBottom: 0 }]}>Write clear and concise copy</Text>
                                <Text style={[ThemeStyling.text4, { textAlign: "left", color: Colors.gray_color }]}>Easy for users to understand</Text>
                            </View>
                            <View style={{ width: '20%', marginLeft: 10, justifyContent: "flex-end", display: "flex", alignItems: "flex-end" }}>
                                <ProgressCircle
                                    percent={Math.round(30)}
                                    radius={25}
                                    borderWidth={4}
                                    color={Colors.grayLight}
                                    shadowColor={Colors.success_color}
                                    bgColor="#fff"
                                >
                                    <Text style={{ fontSize: 12 }}>{'100%'}</Text>
                                </ProgressCircle>
                            </View>
                        </View>
                    </View>
                    <View style={[ThemeStyling.btnContainer, { marginBottom: 80, width: '100%' }]}>
                        <TouchableOpacity style={[ThemeStyling.btnPrimary, { width: '100%' }]} onPress={() => { this.loginUser() }} disabled={this.state?.isDisable}>
                            <Text style={ThemeStyling.btnText}>Add new</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </MainLayout>
        );
    }
}
