import { Component } from "react"
import { Text, View, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import Colors from "../utilty/Colors";
import { CommonApiRequest } from "../utilty/api/commonApiRequest";
import WorkorderStateInterface from "../Interfaces/States/WorkorderStateInterface";
import MainLayout from "../Layout/MainLayout";
import ProgressCircle from 'react-native-progress-circle';
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import { CommonHelper } from "../utilty/CommonHelper";
import * as Location from "expo-location";
import Badge from "../Components/Common/Badge";

export default class Jobsite extends Component<ScreenInterfcae, WorkorderStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            objWorkorder: {},
            loader: false,
            serachText: '',
            objStatus: {},
            selectedFilter: "",
            location: {}
        }
    }
    async componentDidMount() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        this.props?.navigation.addListener("focus", async () => {
            await this.getApiData();
        });
        this.setState({ loader: true });
        this.getTaskStatus();
        await this.getApiData()
    }
    async getApiData(params: any = "") {
        //let location = await Location.getCurrentPositionAsync({});
        CommonApiRequest.getUserWorkOrder(params).then(async (response: any) => {
            //const origin = { latitude: response?.results?.data?.[0]?.latitude, longitude: response?.results?.data?.[0]?.longitude }
            //const destination = { latitude: location?.coords?.latitude, longitude: location?.coords?.longitude }
            //const des = await CommonHelper.calculateDistance(origin, destination, 'mi');
            this.setState({ objWorkorder: response?.results?.data });//response?.results?.data
            this.setState({ loader: false });
        }).catch(() => {
            this.setState({ loader: false });
        });
    }
    async getTaskStatus() {
        CommonApiRequest.getTaskStatus().then(async (response: any) => {
            this.setState({ objStatus: response?.results })
        })
    }
    async refreshPage() {
        const serahcText = "?q=" + this.state.selectedFilter;
        await this.getApiData(serahcText);
    }
    async serachingData() {
        const serahcText = "?q=" + this.state?.serachText;
        this.setState({ loader: true });
        await this.getApiData(serahcText);
    }
    retirectToDetail(data: any) {
        this.props.navigation?.navigate("WorkOrderDetail", { data: data });
    }
    filterByStatus(data: any) {
        this.setState({ selectedFilter: data });
        const serahcText = "?q=" + data;
        this.getApiData(serahcText);
    }
    render() {
        return (
            <MainLayout isTopLogo={false} onRefresh={() => { this.refreshPage() }} loader={this.state?.loader} headerText="My Task List" navigation={this.props?.navigation} backButton={false}>
                <View>
                    <View style={[ThemeStyling.container, { marginTop: 0 }]}>
                        <View>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                <View style={ThemeStyling.cardGroup}>
                                    {this.state?.objStatus?.length > 0 && this.state?.objStatus?.map((item: any, index: number) => {
                                        return <TouchableOpacity
                                            style={[ThemeStyling.cardStyle2, ThemeStyling.card, (this.state.selectedFilter === item?.value) ? ThemeStyling.activeCard : ThemeStyling.deActiveCard]}
                                            key={index}
                                            onPress={() => {
                                                this.filterByStatus(item?.value);
                                            }}>
                                            <Text style={[ThemeStyling.text2, (this.state.selectedFilter === item?.value) ? ThemeStyling.activeTextColor : ThemeStyling.deActiveTextColor]}>{item?.name}</Text>
                                        </TouchableOpacity>
                                    })}
                                    
                                </View>
                            </ScrollView>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", marginBottom: 5 }}>
                            <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}>You have total</Text>
                            <Text style={[ThemeStyling.textSuccess, { marginHorizontal: 5, fontFamily: 'Poppins_700Bold', fontWeight: '700', }]}>{(this?.state?.objWorkorder?.length)?this?.state?.objWorkorder?.length:0}</Text>
                            <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}>task</Text>
                        </View>
                        <View>
                            {this?.state?.objWorkorder?.length > 0 && this?.state?.objWorkorder?.map((item: any, index: number) => {
                                return <Pressable key={index} style={ThemeStyling.card} onPress={() => {
                                    this.props.navigation.navigate("WorkOrderDetail", { item: item });
                                }}>
                                    <View style={[ThemeStyling.cardBody, { display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                                        <View style={{ width: '76%' }}>
                                            <Text style={[ThemeStyling.heading5, { color: Colors.dark_color, fontFamily: 'Poppins_600SemiBold', fontWeight: '600', marginBottom: 0 }]}>{CommonHelper.getJobName(item)}</Text>
                                            <View style={{ display: "flex", flexDirection: "row" }}>
                                                <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}>
                                                    <AntDesign name="clockcircleo" /> 10 hours 20:35 min </Text>
                                                <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}><SimpleLineIcons name="calendar" /> Sep 20, 2023</Text>
                                            </View>
                                            <Badge title={item?.job_status_text}></Badge>
                                        </View>
                                        <View style={{ width: '20%', marginLeft: 10, justifyContent: "flex-end", display: "flex", alignItems: "flex-end" }}>
                                            <Feather name="pause-circle" size={45} color={Colors.success_color} />
                                        </View>
                                    </View>
                                </Pressable>
                            })}

                            {/* <View style={ThemeStyling.card}>
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
                            </View> */}
                        </View>
                    </View>
                </View>
            </MainLayout>
        );
    }
}