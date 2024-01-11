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
import { RadioButton } from "react-native-paper";
import { DarkTheme } from "@react-navigation/native";
import { Dimensions } from "react-native";
export default class ChooseServices extends Component<ScreenInterfcae, ScreenStateInterfcae>{
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
            notes: '',
        }
    }
    async componentDidMount() {
        this.setState({ options: [] })
        if (this.props?.route?.params?.item) {
            this.setState({ dataObj: this.props?.route?.params?.item });
        }
        this.setState({ cameraOn: false });
        this.setState({ user: await CommonHelper.getUserData() });
        clearInterval(this.state?.intervalId);
        let { status } = await Location.requestForegroundPermissionsAsync();
        this.setState({ params: this.props.route.params?.data });
        await this.getAPiData();
        await this.getTeams();

    }
    async getAPiData() {

    }
    async getTeams() {
        // CommonApiRequest.getTeams({}).then(async (response: any) => {
        //     this.setState({ options: response?.results });
        // });
    }
    onClickMachine(data: any) {
        const optionData = this.state.options;
        const selectedServiec = this.state.selected;
        const indexOfId = optionData?.indexOf(data?.service_id);
        if (indexOfId < 0) {
            optionData?.push(data?.service_id);
            selectedServiec?.push(data)
        } else {
            optionData?.splice(indexOfId, 1);
            selectedServiec?.splice(indexOfId, 1);
        }
        this.setState({ options: optionData });
        this.setState({ selected: selectedServiec });
    }
    render() {
        return (
            <>
                <MainLayout isTopLogo={false} onRefresh={() => { }} loader={this.state?.loader} headerText="Choose Services" backButton={true} navigation={this.props.navigation}>
                    <View style={{ height: Dimensions.get('window').height - 170 }}>
                        <View style={[ThemeStyling.container, { marginTop: 0, minHeight: 'auto' }]}>
                            <View style={{ marginBottom: 15, display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <Text style={[ThemeStyling.listIcon, ThemeStyling.bglightPrimary, { borderRadius: 8, }]}>
                                    <Ionicons name="location-outline" size={16} style={{ color: Colors.primary_color, flex: 1, flexWrap: 'wrap' }} />
                                </Text>
                                <Text style={[ThemeStyling.heading5, {
                                    color: Colors.dark_color, flex: 1, flexWrap: 'wrap', fontFamily: 'Poppins_500Medium',
                                    fontWeight: '500'
                                }]}>{this.state?.dataObj?.machine_name}</Text>
                            </View>
                            <View>
                                <Text style={ThemeStyling.text1}>Services ({this.state.dataObj?.machine_services?.length})</Text>
                            </View>
                            <View>
                                {this.state.dataObj?.machine_services && this.state.dataObj?.machine_services?.map((item: any, index: number) => {
                                    return <Pressable style={ThemeStyling.checkboxContainer} onPress={() => {

                                    }} key={index}>
                                        <View>
                                            <CheckBox value={(this.state.options?.indexOf(item?.service_id) >= 0) ? true : false} onValueChange={(e) => { this.onClickMachine(item) }} />
                                        </View>
                                        <Pressable style={[ThemeStyling.label]} onPress={() => this.onClickMachine(item)}>
                                            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontWeight: '600' }}>{item?.service_name}</Text>
                                        </Pressable>
                                    </Pressable>
                                })}
                            </View>
                        </View>
                        <View style={ThemeStyling.ForBottomOfSCreen}>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('TimeTracker', { data: this.state.options, machine: this.props?.route?.params?.item,services:this.state.selected })
                            }} style={[ThemeStyling.btnPrimary]}>
                                <Text style={ThemeStyling.btnText}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </MainLayout>
            </>
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