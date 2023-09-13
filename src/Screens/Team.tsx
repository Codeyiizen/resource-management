import { Component } from "react";
import { View, Image, Text, TouchableOpacity, TextInput } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Colors from "../utilty/Colors";
import MainLayout from "../Layout/MainLayout";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import ScreenStateInterfcae from "../Interfaces/Common/ScreenStateInterface";
import { CommonHelper } from "../utilty/CommonHelper";
import { CommonApiRequest } from "../utilty/api/commonApiRequest";
import UserCard from "../Components/Common/UserCard";

export default class Team extends Component<ScreenInterfcae, ScreenStateInterfcae>{
    constructor(props: any) {
        super(props);
        this.state = {
            user: null,
            loader: false
        }
    }
    async componentDidMount() {
        this.props.navigation.addListener("focus", () => {
            this.getApiData()
        })
        this.setState({ user: await CommonHelper.getUserData() });
        this.setState({ loader: true });
        this.getApiData()
    }
    async getApiData() {
        await CommonApiRequest.getTeamsList({}).then((response: any) => {
            this.setState({ loader: false });
            this.setState({ dataObj: response?.results })
        }).catch(() => {
            this.setState({ loader: false });
        });
    }
    async refreshData() {
        this.getApiData()
    }
    render() {
        return (
            <MainLayout isTopLogo={false} loader={this.state?.loader} onRefresh={() => { this.refreshData() }}>
                <View>
                    <View style={ThemeStyling.container}>
                        <View style={{ display: "flex", flexDirection: "row", marginBottom: 20 }}>
                            <TouchableOpacity style={{ marginRight: 5 }}>
                                <Ionicons name="arrow-back" style={[ThemeStyling.icon2, { fontSize: Colors.FontSize.h3, lineHeight: 30, color: Colors.dark_color, }]} /></TouchableOpacity>
                            <Text style={[ThemeStyling.heading3, { marginBottom: 0, paddingBottom: 0 }]}>Adding new task</Text>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", alignItems:"center", marginBottom: 20 }}>
                            <Text style={[ThemeStyling.listIcon, ThemeStyling.bglightPrimary, { borderRadius: 8 }]}>
                                <FontAwesome name="tasks" size={16} style={{ color: Colors.primary_color }} />
                            </Text>
                            <Text style={[ThemeStyling.heading4, {marginBottom:0}]}>Task Title</Text>
                        </View>

                        <View style={ThemeStyling.twoColumnLayout}>
                            <View style={[ThemeStyling.formgroup2, { width: '45%', marginRight: 5 }]}>
                                <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>Start Date</Text>
                                <TextInput onChangeText={(evnt) => { this.changeText('fname', evnt) }} style={ThemeStyling.formcontrol} secureTextEntry={false} placeholder="21/09/2023" value={this.state?.fname}></TextInput>
                            </View>
                            <View style={[ThemeStyling.formgroup2, { width: '45%', marginLeft: 5 }]}>
                                <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>End Date</Text>
                                <TextInput onChangeText={(evnt) => { this.changeText('fname', evnt) }} style={ThemeStyling.formcontrol} secureTextEntry={false} placeholder="30/09/2023" value={this.state?.fname}></TextInput>
                            </View>
                        </View>

                        <View style={ThemeStyling.twoColumnLayout}>
                            <View style={[ThemeStyling.formgroup2, { width: '45%', marginRight: 5 }]}>
                                <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>Start time</Text>
                                <TextInput onChangeText={(evnt) => { this.changeText('fname', evnt) }} style={ThemeStyling.formcontrol} secureTextEntry={false} placeholder="10:30 AM" value={this.state?.fname}></TextInput>
                            </View>
                            <View style={[ThemeStyling.formgroup2, { width: '45%', marginLeft: 5 }]}>
                                <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>End time</Text>
                                <TextInput onChangeText={(evnt) => { this.changeText('fname', evnt) }} style={ThemeStyling.formcontrol} secureTextEntry={false} placeholder="2:40 PM" value={this.state?.fname}></TextInput>
                            </View>
                        </View>

                        <View style={ThemeStyling.twoColumnLayout}>
                            <View style={[ThemeStyling.formgroup2, { width: '45%', marginRight: 5 }]}>
                                <TextInput onChangeText={(evnt) => { this.changeText('fname', evnt) }} style={ThemeStyling.formcontrol} secureTextEntry={false} placeholder="Every day" value={this.state?.fname}></TextInput>
                            </View>
                            <View style={[ThemeStyling.formgroup2, { width: '45%', marginLeft: 5 }]}>
                                <TextInput onChangeText={(evnt) => { this.changeText('fname', evnt) }} style={ThemeStyling.formcontrol} secureTextEntry={false} placeholder="Select hours" value={this.state?.fname}></TextInput>
                            </View>
                        </View>
                        <View style={ThemeStyling.formgroup2}>
                            <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>Description</Text>
                            <TextInput onChangeText={(evnt) => { this.changeText('fname', evnt) }} style={[ThemeStyling.formcontrol, { paddingBottom: 30, borderRadius: 10 }]} secureTextEntry={false} placeholder="Type here your details..." value={this.state?.fname}></TextInput>
                        </View>

                        <View style={ThemeStyling.formgroup2}>
                            <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>Sub Task List</Text>
                            <TextInput onChangeText={(evnt) => { this.changeText('fname', evnt) }} style={ThemeStyling.formcontrol} secureTextEntry={false} placeholder="wireframe" value={this.state?.fname}></TextInput>
                        </View>
                        <View style={ThemeStyling.formgroup2}>
                            <TextInput onChangeText={(evnt) => { this.changeText('fname', evnt) }} style={ThemeStyling.formcontrol} secureTextEntry={false} placeholder="Final design" value={this.state?.fname}></TextInput>
                        </View>

                        <View style={ThemeStyling.twoColumnLayout}>
                            <View style={[ThemeStyling.btnContainer, { width: '45%', marginRight: 5 }]}>
                                <TouchableOpacity style={[ThemeStyling.btnPrimary, { backgroundColor: Colors.errorColor }]}>
                                    <Text style={[ThemeStyling.btnText, { color: Colors.white }]}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[ThemeStyling.btnContainer, { width: '45%', marginLeft: 5 }]}>
                                <TouchableOpacity style={[ThemeStyling.btnPrimary]}>
                                    <Text style={[ThemeStyling.btnText, { color: Colors.white }]}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>
            </MainLayout>
        );
    }
}