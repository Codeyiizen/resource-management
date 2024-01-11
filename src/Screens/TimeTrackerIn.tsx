import { Component } from "react"
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons, SimpleLineIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Colors from "../utilty/Colors";
import { CommonApiRequest } from "../utilty/api/commonApiRequest";
import WorkorderStateInterface from "../Interfaces/States/WorkorderStateInterface";
import MainLayout from "../Layout/MainLayout";

export default class Workorder extends Component<{}, WorkorderStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            objWorkorder: {},
            loader: false,
            serachText: '',
        }
    }
    async componentDidMount() {
        this.props?.navigation.addListener("focus", async () => {
            await this.getApiData();
        });
        this.setState({ loader: true });
        await this.getApiData()
    }
    async getApiData(params: any = "") {
        await CommonApiRequest.getUserWorkOrder(params).then((response: any) => {
            this.setState({ objWorkorder: response?.results?.data });//response?.results?.data
            this.setState({ loader: false });
        }).catch(() => {
            this.setState({ loader: false });
        });
    }
    async refreshPage() {
        await this.getApiData();
    }
    async serachingData() {
        const serahcText = "?q=" + this.state?.serachText;
        this.setState({ loader: true });
        await this.getApiData(serahcText);
    }
    retirectToDetail(data: any) {
        this.props.navigation?.navigate("WorkOrderDetail", { data: data });
    }
    render() {
        return (
            <MainLayout isTopLogo={false} onRefresh={() => { this.refreshPage() }} loader={this.state?.loader}>
                <View>
                    <View style={[ThemeStyling.container, { marginTop: 0 }]}>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                            <View style={{ display: "flex", flexDirection: "row",alignItems: "center", flex: 1 }}>
                                <TouchableOpacity>
                                    <Ionicons name="arrow-back" style={[ThemeStyling.icon2, { fontSize: Colors.FontSize.h3, lineHeight: 30, color: Colors.dark_color, }]} />
                                </TouchableOpacity>
                                <View style={{ marginLeft: "auto", marginRight: "auto" }}>
                                    <Text style={[ThemeStyling.heading3, { marginBottom: 0, paddingBottom: 0, textAlign: "center", lineHeight: 22 }]}>Punch Clock</Text>
                                    <Text style={[ThemeStyling.text4, { color: Colors.success_color }]}>September 27, 2023</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={ThemeStyling.btnIcon}>
                                    <FontAwesome name="power-off" size={25} style={{ color: Colors.white }} />
                                </Text>
                            </View>
                        </View>
                        <View>

                            <View style={{ marginBottom: 30 }}>
                                <View>
                                    <Text style={[ThemeStyling.heading2, { textAlign: "center", marginBottom: 0 }]}>Welcome John Steward</Text>
                                </View>
                                <View style={{ justifyContent: "center", flexDirection: "row" }}>
                                    <View>
                                        <Text style={[ThemeStyling.text1, { textAlign: "center" }]}>You are currently</Text>
                                    </View>
                                    <View style={{ marginLeft: 5 }}>
                                        <Text style={{ marginBottom: 0, color: Colors.success_color }}>Punched In!</Text>
                                    </View>
                                </View>
                            </View>

                            {/* <View style={{ marginBottom: 50 }}>
                                <Text style={[ThemeStyling.heading5, { textAlign: "center", marginBottom: 0, color: Colors.dark_color, fontWeight: '600', fontFamily: 'Poppins_600SemiBold', }]}></Text>
                                <Text style={[ThemeStyling.text2, { color: Colors.success_color, textAlign: "center" }]}>25 Sep at 4:24 PM</Text>
                            </View> */}
                            <View style={[ThemeStyling.threeColumnLayout, { marginBottom: 50 }]}>
                                <View>
                                    <Text style={[ThemeStyling.heading4, { marginBottom: 0, lineHeight: 22 }]}>7:55 AM</Text>
                                    <Text style={[ThemeStyling.text2, { color: Colors.secondry_color, lineHeight: 15, textAlign: "center", textTransform: "uppercase" }]}>Start Time</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: "center" }}>
                                    <FontAwesome name="circle" size={20} style={{ color: Colors.success_color }} />
                                    <Text style={[ThemeStyling.text2, { textAlign: "center", color: Colors.success_color, textTransform: "uppercase" }]}>In</Text>
                                </View>
                                <View>
                                    <Text style={[ThemeStyling.heading4, { marginBottom: 0, lineHeight: 22 }]}>0:10:00</Text>
                                    <Text style={[ThemeStyling.text2, { color: Colors.secondry_color, lineHeight: 15, textAlign: "center", textTransform: "uppercase" }]}>Duration</Text>
                                </View>
                            </View>

                            <View style={[ThemeStyling.btnContainer, { justifyContent: 'center', alignItems: "center", flex: 1, marginBottom: 20 }]}>
                                <TouchableOpacity style={[ThemeStyling.btnPrimary, { width: 150, height: 45, alignItems: "center", }]}>
                                    <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f16, color: Colors.white, marginLeft: 10 }]}>Switch Job</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ justifyContent: "center", flex: 1, flexDirection: "row", marginBottom: 10 }}>
                                <FontAwesome name="commenting-o" size={20} style={{ color: Colors.primary_color, marginRight: 5 }} />
                                <Text>Notes</Text>
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
                                <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between" }]}>
                                    <View style={ThemeStyling.twoColumnLayout}>
                                        <View style={{ marginRight: 5 }}>
                                            <MaterialCommunityIcons name="timer-outline" size={18} style={{ color: Colors.success_color }} /></View>
                                        <View>
                                            <Text style={[ThemeStyling.text2, { color: Colors.success_color, marginTop: 4 }]}>Check In Progress...</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={[ThemeStyling.text2, { color: Colors.success_color, fontFamily: 'Poppins_700Bold', fontWeight: '700' }]}>7:55 AM</Text>
                                    </View>
                                </View>
                                <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between" }]}>
                                    <View style={ThemeStyling.twoColumnLayout}>
                                        <View style={{ marginRight: 5 }}>
                                            <MaterialCommunityIcons name="timer-outline" size={18} style={{ color: Colors.primary_color }} /></View>
                                        <View>
                                            <Text style={[ThemeStyling.text2, { color: Colors.dark_color, marginTop: 4 }]}>Check In</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>9:45 AM</Text>
                                    </View>
                                </View>
                                <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between" }]}>
                                    <View style={ThemeStyling.twoColumnLayout}>
                                        <View style={{ marginRight: 5 }}>
                                            <MaterialIcons name="timer-off" size={16} style={{ color: Colors.errorColor }} /></View>
                                        <View>
                                            <Text style={[ThemeStyling.text2, { color: Colors.dark_color, marginTop: 4 }]}>Check Out</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>12:30 PM</Text>
                                    </View>
                                </View>

                                <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between" }]}>
                                    <View style={ThemeStyling.twoColumnLayout}>
                                        <View style={{ marginRight: 5 }}>
                                            <MaterialCommunityIcons name="timer-outline" size={18} style={{ color: Colors.primary_color }} /></View>
                                        <View>
                                            <Text style={[ThemeStyling.text2, { color: Colors.dark_color, marginTop: 4 }]}>Check In</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>8:15 AM</Text>
                                    </View>
                                </View>
                                <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between" }]}>
                                    <View style={ThemeStyling.twoColumnLayout}>
                                        <View style={{ marginRight: 5 }}>
                                            <MaterialIcons name="timer-off" size={16} style={{ color: Colors.errorColor }} /></View>
                                        <View>
                                            <Text style={[ThemeStyling.text2, { color: Colors.dark_color, marginTop: 4 }]}>Check Out</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>10:30 AM</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </MainLayout>
        );
    }
}