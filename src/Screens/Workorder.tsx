import { Component } from "react"
import { Text, View, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import Colors from "../utilty/Colors";
import { CommonApiRequest } from "../utilty/api/commonApiRequest";
import WorkorderStateInterface from "../Interfaces/States/WorkorderStateInterface";
import MainLayout from "../Layout/MainLayout";
import ProgressCircle from 'react-native-progress-circle';

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
                            <View style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                                <TouchableOpacity>
                                    <Ionicons name="arrow-back" style={[ThemeStyling.icon2, { fontSize: Colors.FontSize.h3, lineHeight: 30, color: Colors.dark_color, }]} />
                                </TouchableOpacity>
                                <Text style={[ThemeStyling.heading3, { marginBottom: 0, paddingBottom: 0, textAlign: "center", flex: 1 }]}>My Task List</Text>
                            </View>
                            {/* <View>
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
                            </View> */}
                        </View>
                        <View>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                <View style={ThemeStyling.cardGroup}>
                                    <View style={[ThemeStyling.cardStyle2, ThemeStyling.card, { backgroundColor: Colors.primary_color }]}>
                                        <Text style={[ThemeStyling.text2, { color: Colors.white, marginBottom: 0, fontFamily: 'Poppins_700Bold', fontWeight: '700', }]}>All Task</Text>
                                    </View>
                                    <View style={[ThemeStyling.cardStyle2, ThemeStyling.card]}>
                                        <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Ongoing</Text>
                                    </View>
                                    <View style={[ThemeStyling.cardStyle2, ThemeStyling.card]}>
                                        <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Cancelled</Text>
                                    </View>
                                    <View style={[ThemeStyling.cardStyle2, ThemeStyling.card]}>
                                        <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Completed</Text>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", marginBottom: 5 }}>
                            <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}>You have total</Text>
                            <Text style={[ThemeStyling.textSuccess, { marginHorizontal: 5, fontFamily: 'Poppins_700Bold', fontWeight: '700', }]}>5</Text>
                            <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}>task</Text>
                        </View>
                        <View>
                            <Pressable style={ThemeStyling.card} onPress={()=>{
                                this.props.navigation.navigate("WorkOrderDetail");
                            }}>
                                <View style={[ThemeStyling.cardBody, { display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                                    <View style={{ width: '76%' }}>
                                        <Text style={[ThemeStyling.heading5, { color: Colors.dark_color, fontFamily: 'Poppins_600SemiBold', fontWeight: '600', marginBottom: 0 }]}>Empire Homes (Welland)</Text>
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}>
                                                <AntDesign name="clockcircleo" /> 10 hours 20:35 min </Text>
                                            <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}><SimpleLineIcons name="calendar" /> Sep 20, 2023</Text>
                                        </View>
                                        <View style={{ width: 70 }}>
                                            <Text style={[ThemeStyling.badge, ThemeStyling.bglightSuccess, { color: Colors.success_color, marginLeft: 5 }]}>Ongoing</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '20%', marginLeft: 10, justifyContent: "flex-end", display: "flex", alignItems: "flex-end" }}>
                                        <Feather name="pause-circle" size={45} color={Colors.success_color} />
                                    </View>
                                </View>
                            </Pressable>
                            <View style={ThemeStyling.card}>
                                <View style={[ThemeStyling.cardBody, { display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                                    <View style={{ width: '76%' }}>
                                        <Text style={[ThemeStyling.heading5, { color: Colors.dark_color, fontFamily: 'Poppins_600SemiBold', fontWeight: '600', marginBottom: 0 }]}>Fernbrook Homes Rockwell Estates (Rockwood)</Text>
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}>
                                                <AntDesign name="clockcircleo" /> 07 hours 30:05 min </Text>
                                            <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}> <SimpleLineIcons name="calendar" /> Due tomorrow</Text>
                                        </View>
                                        <View style={{ width: 70 }}>
                                            <Text style={[ThemeStyling.badge, ThemeStyling.bglightInfo, { color: Colors.gray_color, marginLeft: 5 }]}>Paused</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '20%', marginLeft: 10, justifyContent: "flex-end", display: "flex", alignItems: "flex-end" }}>
                                        <ProgressCircle
                                            percent={.9}
                                            radius={25}
                                            borderWidth={4}
                                            color={Colors.grayLight}
                                            shadowColor={Colors.gray_color}
                                            bgColor="#fff">
                                            <Text style={{ fontSize: 12 }}>{'96%'}</Text>
                                        </ProgressCircle>
                                    </View>
                                </View>
                            </View>
                            <View style={ThemeStyling.card}>
                                <View style={[ThemeStyling.cardBody, { display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                                    <View style={{ width: '76%' }}>
                                        <Text style={[ThemeStyling.heading5, { color: Colors.dark_color, fontFamily: 'Poppins_600SemiBold', fontWeight: '600', marginBottom: 0 }]}>Kingswood Homes (Thamesford) Riverside</Text>

                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}>
                                                <AntDesign name="clockcircleo" /> 8 hours 0 min</Text>
                                            <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}> <SimpleLineIcons name="calendar" /> Due today</Text>
                                        </View>
                                        <View style={{ width: 90 }}>
                                            <Text style={[ThemeStyling.badge, ThemeStyling.bglightDanger, { color: Colors.errorColor, marginLeft: 5 }]}>Completed</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '20%', marginLeft: 10, justifyContent: "flex-end", display: "flex", alignItems: "flex-end" }}>
                                        <MaterialIcons name="timer-off" size={45} color={Colors.errorColor} />
                                    </View>
                                </View>
                            </View>
                            <View style={ThemeStyling.card}>
                                <View style={[ThemeStyling.cardBody, { display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                                    <View style={{ width: '76%' }}>
                                        <Text style={[ThemeStyling.heading5, { color: Colors.dark_color, fontFamily: 'Poppins_600SemiBold', fontWeight: '600', marginBottom: 0 }]}>Marydel Homes Artisan Ridge (Thorold)</Text>
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}>
                                                <AntDesign name="clockcircleo" /> 0 hours 0 min </Text>
                                            <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}><SimpleLineIcons name="calendar" /> Sep 10, 2023</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '20%', marginLeft: 10, justifyContent: "flex-end", display: "flex", alignItems: "flex-end" }}>
                                        <Feather name="play-circle" size={45} color={Colors.primary_color} />
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