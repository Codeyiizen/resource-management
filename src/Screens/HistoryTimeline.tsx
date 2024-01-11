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
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20, marginHorizontal: 10 }}>
                        <View style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                            <TouchableOpacity>
                                <Ionicons name="arrow-back" style={[ThemeStyling.icon2, { fontSize: Colors.FontSize.h3, lineHeight: 30, color: Colors.dark_color, }]} />
                            </TouchableOpacity>
                            <Text style={[ThemeStyling.heading3, { marginBottom: 0, paddingBottom: 0, textAlign: "center", flex: 1 }]}>All Timeline</Text>
                        </View>
                        <View>
                            <TouchableOpacity>
                                <Feather name="filter" size={25} style={{ color: Colors.primary_color }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[ThemeStyling.twoColumnLayout, ThemeStyling.bglightPrimary, { justifyContent: "space-between", padding: 10, marginBottom: 8 }]}>
                        <View>
                            <Text style={ThemeStyling.heading6}>September 29, 2023</Text>
                        </View>
                        <View>
                            <Text style={ThemeStyling.heading6}>9.7h</Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 10 }}>
                        <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 8 }]}>
                            <View>
                                <Text style={[ThemeStyling.heading6, { fontSize: Colors.FontSize.f12 }]}>7:10 AM - 10:50 AM</Text>
                                <Text style={[ThemeStyling.text5, { textAlign: "left", color: Colors.secondry_color }]}>Subdivision Roadwork</Text>
                            </View>
                            <View>
                                <Text style={[ThemeStyling.text5, { color: Colors.secondry_color }]}>4h</Text>
                            </View>
                        </View>
                        <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 8 }]}>
                            <View>
                                <Text style={[ThemeStyling.heading6, { fontSize: Colors.FontSize.f12 }]}>11:10 AM - 1:20 PM</Text>
                                <Text style={[ThemeStyling.text5, { textAlign: "left", color: Colors.secondry_color }]}>Site
                                    DeveloPMent</Text>
                            </View>
                            <View>
                                <Text style={[ThemeStyling.text5, { color: Colors.secondry_color }]}>2.30h</Text>
                            </View>
                        </View>
                        <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 8 }]}>
                            <View>
                                <Text style={[ThemeStyling.heading6, { fontSize: Colors.FontSize.f12 }]}>2:55 AM - 6:10 PM</Text>
                                <Text style={[ThemeStyling.text5, { textAlign: "left", color: Colors.secondry_color }]}>Water
                                    Sewer</Text>
                            </View>
                            <View>
                                <Text style={[ThemeStyling.text5, { color: Colors.secondry_color }]}>3.30h</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[ThemeStyling.twoColumnLayout, ThemeStyling.bglightPrimary, { justifyContent: "space-between", padding: 10, marginBottom: 8 }]}>
                        <View>
                            <Text style={ThemeStyling.heading6}>September 28, 2023</Text>
                        </View>
                        <View>
                            <Text style={ThemeStyling.heading6}>8.15h</Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 10 }}>
                        <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 8 }]}>
                            <View>
                                <Text style={[ThemeStyling.heading6, { fontSize: Colors.FontSize.f12 }]}>8:00 AM - 11:40 PM</Text>
                                <Text style={[ThemeStyling.text5, { textAlign: "left", color: Colors.secondry_color }]}>Drainage
                                    Improvement</Text>
                            </View>
                            <View>
                                <Text style={[ThemeStyling.text5, { color: Colors.secondry_color }]}>3.40h</Text>
                            </View>
                        </View>
                        <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 8 }]}>
                            <View>
                                <Text style={[ThemeStyling.heading6, { fontSize: Colors.FontSize.f12 }]}>12:00 AM - 4:35 PM</Text>
                                <Text style={[ThemeStyling.text5, { textAlign: "left", color: Colors.secondry_color }]}>Underground
                                    Utilities</Text>
                            </View>
                            <View>
                                <Text style={[ThemeStyling.text5, { color: Colors.secondry_color }]}>4.35h</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[ThemeStyling.twoColumnLayout, ThemeStyling.bglightPrimary, { justifyContent: "space-between", padding: 10, marginBottom: 8 }]}>
                        <View>
                            <Text style={ThemeStyling.heading6}>September 27, 2023</Text>
                        </View>
                        <View>
                            <Text style={ThemeStyling.heading6}>8.5h</Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 10 }}>
                        <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 8 }]}>
                            <View>
                                <Text style={[ThemeStyling.heading6, { fontSize: Colors.FontSize.f12 }]}>9:30 AM - 6:10 PM</Text>
                                <Text style={[ThemeStyling.text5, { textAlign: "left", color: Colors.secondry_color }]}>Water
                                    Sewer</Text>
                            </View>
                            <View>
                                <Text style={[ThemeStyling.text5, { color: Colors.secondry_color }]}>8.5h</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[ThemeStyling.twoColumnLayout, ThemeStyling.bglightPrimary, { justifyContent: "space-between", padding: 10, marginBottom: 8 }]}>
                        <View>
                            <Text style={ThemeStyling.heading6}>September 26, 2023</Text>
                        </View>
                        <View>
                            <Text style={ThemeStyling.heading6}>8.5h</Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 10 }}>
                        <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 8 }]}>
                            <View>
                                <Text style={[ThemeStyling.heading6, { fontSize: Colors.FontSize.f12 }]}>11:10 AM - 1:20 PM</Text>
                                <Text style={[ThemeStyling.text5, { textAlign: "left", color: Colors.secondry_color }]}>Site
                                    DeveloPMent</Text>
                            </View>
                            <View>
                                <Text style={[ThemeStyling.text5, { color: Colors.secondry_color }]}>2.30h</Text>
                            </View>
                        </View>
                        <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 8 }]}>
                            <View>
                                <Text style={[ThemeStyling.heading6, { fontSize: Colors.FontSize.f12 }]}>7:10 AM - 10:50 AM</Text>
                                <Text style={[ThemeStyling.text5, { textAlign: "left", color: Colors.secondry_color }]}>Subdivision Roadwork</Text>
                            </View>
                            <View>
                                <Text style={[ThemeStyling.text5, { color: Colors.secondry_color }]}>4h</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </MainLayout>
        );
    }
}