import { Component } from "react"
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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
                    <View style={[ThemeStyling.container, { minHeight: 'auto', marginTop: 0 }]}>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                            <View style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                                <TouchableOpacity>
                                    <Ionicons name="arrow-back" style={[ThemeStyling.icon2, { fontSize: Colors.FontSize.h3, lineHeight: 30, color: Colors.dark_color, }]} />
                                </TouchableOpacity>
                                <Text style={[ThemeStyling.heading3, { marginBottom: 0, paddingBottom: 0, textAlign: "center", flex: 1 }]}>Schedule</Text>
                            </View>
                            <View>
                                <Text style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 100, shadowColor: '#000',
                                    shadowOffset: { width: -2, height: 4 },
                                    shadowOpacity: 0.4,
                                    shadowRadius: 3,
                                    backgroundColor: '#fff',
                                    textAlign: "center",
                                    lineHeight: 40
                                }}>
                                    <Ionicons name="ellipsis-vertical" size={16} style={{ color: Colors.primary_color }} />
                                </Text>
                            </View>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <View>
                                <Text style={[ThemeStyling.heading3, { marginBottom: 0, lineHeight: 25 }]}>October , 12</Text>
                                <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}>5 task today</Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <View>
                                    <Text style={[ThemeStyling.listIcon, { backgroundColor: Colors.primary_light_color }]}>
                                        <TouchableOpacity>
                                            <MaterialCommunityIcons name="calendar-clock-outline" size={18} color={Colors.primary_color} />
                                        </TouchableOpacity>
                                    </Text>
                                </View>
                                <View>
                                    <Text style={[ThemeStyling.listIcon, ThemeStyling.bglightSuccess]}>
                                        <TouchableOpacity>
                                            <MaterialCommunityIcons name="plus" size={18} color={Colors.success_color} />
                                        </TouchableOpacity>
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                <View style={[ThemeStyling.cardGroup, { height: 130 }]}>
                                    <View style={[ThemeStyling.cardStyle, ThemeStyling.card, { backgroundColor: Colors.primary_color }]}>
                                        <Text style={[ThemeStyling.text2, { color: Colors.white, marginBottom: 0 }]}>Wed</Text>
                                        <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', color: Colors.white }]}>20</Text>
                                    </View>
                                    <View style={[ThemeStyling.cardStyle, ThemeStyling.card]}>
                                        <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Thu</Text>
                                        <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', color: Colors.dark_color }]}>21</Text>
                                    </View>
                                    <View style={[ThemeStyling.cardStyle, ThemeStyling.card]}>
                                        <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Fri</Text>
                                        <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', color: Colors.dark_color }]}>22</Text>
                                    </View>
                                    <View style={[ThemeStyling.cardStyle, ThemeStyling.card]}>
                                        <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Sat</Text>
                                        <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', color: Colors.dark_color }]}>23</Text>
                                    </View>
                                    <View style={[ThemeStyling.cardStyle, ThemeStyling.card]}>
                                        <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Sun</Text>
                                        <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', color: Colors.dark_color }]}>24</Text>
                                    </View>
                                    <View style={[ThemeStyling.cardStyle, ThemeStyling.card]}>
                                        <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Mon</Text>
                                        <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', color: Colors.dark_color }]}>25</Text>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        <View style={ThemeStyling.card}>
                            <View style={ThemeStyling.cardBody}>
                                <View style={ThemeStyling.listItem}>
                                    <View>
                                        <Text style={ThemeStyling.listIcon}>
                                            <Ionicons name="location-outline" size={18} />
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={ThemeStyling.listText}>
                                            Liv Communities Pennylane (Stoney Creek)
                                        </Text>
                                        <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}><AntDesign name="clockcircleo" /> 10:00PM - 6:30PM</Text>
                                    </View>
                                </View>
                                <View style={ThemeStyling.listItem}>
                                    <View>
                                        <Text style={[ThemeStyling.listIcon, { backgroundColor: Colors.success_color }]}>
                                            <Ionicons name="location-outline" size={18} />
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={ThemeStyling.listText}>
                                            Mattamy Springwater (Markham)
                                        </Text>
                                        <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}><AntDesign name="clockcircleo" /> 12:20PM - 06:10PM</Text>
                                    </View>
                                </View>
                                <View style={ThemeStyling.listItem}>
                                    <View>
                                        <Text style={[ThemeStyling.listIcon, { backgroundColor: Colors.dark_color }]}>
                                            <Ionicons name="location-outline" size={18} />
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={ThemeStyling.listText}>
                                            Stateview Homes Kings Landing (King City)
                                        </Text>
                                        <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}><AntDesign name="clockcircleo" /> 09:30AM - 01:40PM</Text>
                                    </View>
                                </View>
                                <View style={ThemeStyling.listItem}>
                                    <View>
                                        <Text style={[ThemeStyling.listIcon, { backgroundColor: Colors.errorColor }]}>
                                            <Ionicons name="location-outline" size={18} />
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={ThemeStyling.listText}>
                                            Umbria Valleyview (Brampton)
                                        </Text>
                                        <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}><AntDesign name="clockcircleo" /> 08:50AM - 03:45PM</Text>
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