import { Component, ReactNode } from "react"
import { Text, Button, View, Image, ScrollView, TouchableOpacity, DeviceEventEmitter, Alert, StyleSheet, Pressable } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesome, AntDesign, Ionicons, Feather, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from "../utilty/Colors";
import MainLayout from "../Layout/MainLayout";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import ScreenStateInterfcae from "../Interfaces/Common/ScreenStateInterface";
import { CommonApiRequest } from "../utilty/api/commonApiRequest";
import * as Location from 'expo-location';
import { ConstantsVar } from "../utilty/ConstantsVar";
import { CommonHelper } from "../utilty/CommonHelper";
import CheckBox from 'expo-checkbox';
export default class WorkorderDetails extends Component<ScreenInterfcae, ScreenStateInterfcae>{
    constructor(props: any) {
        super(props);
        this.state = {
            params: {},
            dataObj: null,
            isStarted: false,
            loader: false,
            currentDate: new Date(),
            rawMiliSeconds: 0,
            selected: [],
            cameraOn: false,
            isLogo: true,
            options: [],
            isFocus: false,
            capturedImage: null,
            notes: ''
        }
    }
    async componentDidMount() {
        this.setState({ cameraOn: false });
        this.setState({ user: await CommonHelper.getUserData() });
        clearInterval(this.state?.intervalId);
        let { status } = await Location.requestForegroundPermissionsAsync();
        this.setState({ params: this.props.route.params?.data });
        await this.getAPiData();
        await this.getTeams();

    }
    async getAPiData() {
        CommonApiRequest.getWorkOrderDetail(this.props.route.params?.data?.id).then(async (response: any) => {
            if (response?.status == 200) {
                this.setState({ dataObj: response?.results });
                this.setState({ isStarted: response?.results?.is_started });
                const diffTime = await CommonHelper.diffrenceBetween2date(new Date(response?.results?.work_order_start_date), new Date(this.state?.currentDate));
                this.setState({ rawMiliSeconds: diffTime });
                if (this.state.isStarted) {
                    this.setState({
                        intervalId: setInterval(() => {
                            this.setState({ rawMiliSeconds: this.state.rawMiliSeconds + 1000 });
                        }, 1000)
                    })
                }
            }
        })
    }
    async getTeams() {
        CommonApiRequest.getTeams({}).then(async (response: any) => {
            this.setState({ options: response?.results });
        });
    }
    async startTimer() {
        if (this.state.capturedImage && this.state.selected?.length > 0) {

            this.setState({ loader: true });
            let location = await Location.getCurrentPositionAsync({});
            const dataSend = {
                work_order_id: this.state?.dataObj?.id,
                work_order_start_date: new Date().toString(),
                location: location,
                photo: "image/png;base64," + this.state.capturedImage?.base64,
                teams: this.state.selected
            }
            CommonApiRequest.startWorkoutTimer(dataSend).then((response) => {
                this.setState({ loader: false });
                if (response?.status == 200) {
                    DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.theme_success_color, msgData: { head: 'Success', subject: 'Your hours log-in start successfully!', top: 20 } })
                    this.setState({ dataObj: response?.results });
                    this.setState({ isStarted: true, capturedImage: null });

                } else {
                    if (response?.msg) {
                        DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.errorColor, msgData: { head: 'Error', subject: response?.msg, top: 20 } })
                    }
                }
            }).catch(() => {
                this.setState({ loader: false });
            });
        } else {
            DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.errorColor, msgData: { head: 'Error', subject: "Please select teams and click picture before start timer", top: 20 } })
        }

    }
    async stopTimer() {
        if (this.state.capturedImage) {
            Alert.alert(
                'Stop Work',
                'Are you sure? You want to stop the work?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => {
                            return null;
                        },
                    },
                    {
                        text: 'Confirm',
                        onPress: async () => {
                            await this.stopWork();
                        },
                    },
                ],
                { cancelable: false },
            );
        } else {
            DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.errorColor, msgData: { head: 'Error', subject: "Please select  click picture before end timer", top: 20 } })
        }
    }
    refreshAPiData() {
        clearInterval(this.state?.intervalId);
        this.getAPiData();
    }
    async stopWork() {
        this.setState({ loader: true });
        let location = await Location.getCurrentPositionAsync({});
        const dataSend = {
            work_order_id: this.state?.dataObj?.id,
            work_order_end_date: new Date().toString(),
            location: location,
            photo: "image/png;base64," + this.state.capturedImage?.base64,
            note: this.state.notes
        }
        CommonApiRequest.endWorkoutTimer(dataSend).then((response) => {
            if (response?.status == 200) {
                clearInterval(this.state?.intervalId);
                DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.theme_success_color, msgData: { head: 'Success', subject: 'Your hours logged successfully!', top: 20 } })
                this.setState({ loader: false });
                this.setState({ dataObj: response?.results });
                this.setState({ isStarted: false });
            }
        }).catch((error: any) => {
            this.setState({ loader: false });
        });
    }
    setSelected(data: any) {
        this.setState({ selected: data });
    }
    openCamera() {
        this.setState({ cameraOn: true, isLogo: false });
    }
    onCaptureImageFromCamera(data: any) {
        this.setState({ capturedImage: { uri: data?.uri, base64: data?.base64 } });
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
                                <Text style={[ThemeStyling.heading3, { marginBottom: 0, paddingBottom: 0, textAlign: "center", flex: 1 }]}>Jobsite Details</Text>
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
                        <View style={{ marginBottom: 15, display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Text style={[ThemeStyling.listIcon, ThemeStyling.bglightPrimary, { borderRadius: 8, }]}>
                                <Ionicons name="location-outline" size={16} style={{ color: Colors.primary_color, flex: 1, flexWrap: 'wrap' }} />
                            </Text>
                            <Text style={[ThemeStyling.heading5, {
                                color: Colors.dark_color, flex: 1, flexWrap: 'wrap', fontFamily: 'Poppins_500Medium',
                                fontWeight: '500'
                            }]}>Crystal Grand River Woods (Cambridge)</Text>
                        </View>
                        <View>
                            <Text style={ThemeStyling.text1}>Services (13)</Text>
                        </View>
                        
                        <Pressable style={ThemeStyling.checkboxContainer} onPress={() => {
                            this.props.navigation.navigate("TimeTracker");
                        }}>
                            <View><CheckBox /></View>
                            <View style={ThemeStyling.label}>
                                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontWeight: '600' }}>Backfill</Text>
                                <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Incomplete</Text>
                            </View>
                        </Pressable>

                        <View style={ThemeStyling.checkboxContainer}>
                            <View><CheckBox /></View>
                            <View style={ThemeStyling.label}>
                                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontWeight: '600' }}>Rough Grade</Text>
                                <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Incomplete</Text>
                            </View>
                        </View>
                        <View style={ThemeStyling.checkboxContainer}>
                            <View><CheckBox /></View>
                            <View style={ThemeStyling.label}>
                                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontWeight: '600' }}>Stockpile</Text>
                                <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Incomplete</Text>
                            </View>
                        </View>
                        <View style={ThemeStyling.checkboxContainer}>
                            <View><CheckBox /></View>
                            <View style={ThemeStyling.label}>
                                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontWeight: '600' }}>Rip Frost</Text>
                                <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Incomplete</Text>
                            </View>
                        </View>
                        <View style={ThemeStyling.checkboxContainer}>
                            <View><CheckBox /></View>
                            <View style={ThemeStyling.label}>
                                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontWeight: '600' }}>Training</Text>
                                <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Incomplete</Text>
                            </View>
                        </View>
                        <View style={ThemeStyling.checkboxContainer}>
                            <View><CheckBox /></View>
                            <View style={ThemeStyling.label}>
                                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontWeight: '600' }}>Spread Fill</Text>
                                <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Incomplete</Text>
                            </View>
                        </View>
                        <View style={ThemeStyling.checkboxContainer}>
                            <View><CheckBox /></View>
                            <View style={ThemeStyling.label}>
                                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontWeight: '600' }}>Other</Text>
                                <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Incomplete</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </MainLayout>
        );
    }
}
const styles = StyleSheet.create({
    container: { padding: 0 },
    dropdown: {
        height: 30,
        backgroundColor: 'transparent',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    selectedStyle: {
        borderRadius: 12,
    },
    marginBotton: {
        marginBottom: 20
    }
});