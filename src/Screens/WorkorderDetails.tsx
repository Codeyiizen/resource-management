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
            notes: '',
        }
    }
    async componentDidMount() {
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
        CommonApiRequest.getTeams({}).then(async (response: any) => {
            this.setState({ options: response?.results });
        });
    }
    onClickMachine(data: any) {
        this.setState({ params: data });
        this.props.navigation.navigate("ChooseServices",{item:data,machine_id:data?.machine_id});
    }
    render() {
        return (
            <MainLayout isTopLogo={false} onRefresh={() => { }} loader={this.state?.loader} headerText="Select Machine" navigation={this.props?.navigation} backButton={true}>
                <View>
                    <View style={[ThemeStyling.container, { marginTop: 0 }]}>
                        <View style={{ marginBottom: 15, display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Text style={[ThemeStyling.listIcon, ThemeStyling.bglightPrimary, { borderRadius: 8, }]}>
                                <Ionicons name="location-outline" size={16} style={{ color: Colors.primary_color, flex: 1, flexWrap: 'wrap' }} />
                            </Text>
                            <Text style={[ThemeStyling.heading5, {
                                color: Colors.dark_color, flex: 1, flexWrap: 'wrap', fontFamily: 'Poppins_500Medium',
                                fontWeight: '500'
                            }]}>{this.state?.dataObj?.job_name} ({this.state?.dataObj?.job_address})</Text>
                        </View>
                        <View>
                            <Text style={ThemeStyling.text1}>Machines ({this.state.dataObj?.job_machines?.length})</Text>
                        </View>
                        <RadioButton.Group
                            onValueChange={value => this.onClickMachine(value)}
                            value={this.state?.params}
                        >
                            {this.state.dataObj?.job_machines && this.state.dataObj?.job_machines?.map((item: any, index: number) => {
                                return <Pressable style={[ThemeStyling.checkboxContainer]} onPress={() => {
                                }} key={index}>
                                        <View>
                                            <RadioButton.Item
                                                value={item}
                                                color={Colors.primary_color}
                                                status={this.state?.params === item ? 'checked' : 'unchecked'}
                                                //uncheckedColor={Colors.primary_color}
                                                theme={{
                                                    version: 3,
                                                    mode: 'exact',
                                                }}
                                                label={item?.machine_name}
                                                uncheckedColor={Colors.primary_color}
                                                mode="android"
                                                position="leading"
                                                style={{margin:0,padding:0}}
                                            />
                                        </View>
                                </Pressable>
                            })}
                        </RadioButton.Group>
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