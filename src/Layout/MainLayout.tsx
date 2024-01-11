import { Component } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Home from "../Screens/Home";
import i18n from '../localization/i18n';
import { ActivityIndicator, DeviceEventEmitter, Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import LayoutInterface from "../Interfaces/Common/LayoutInterface";
import Colors from "../utilty/Colors";
import { Snackbar } from "react-native-paper";
import LayoutStateInterface from "../Interfaces/States/LayoutStateInterface";
import { ConstantsVar } from "../utilty/ConstantsVar";
import { Ionicons } from '@expo/vector-icons';
const Stack = createStackNavigator();
export default class MainLayout extends Component<LayoutInterface, LayoutStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            refresh: false,
            visible: false,
            top: 50,
            color: Colors.theme_success_color,
            msgData: { head: null, subject: null }
        }
    }
    refreshData() {
        if (this.props?.onRefresh) {
            this.props?.onRefresh({ data: 'data' });
        }
    }
    componentDidMount() {
        DeviceEventEmitter.addListener(ConstantsVar.API_ERROR, (data: any) => {
            this.setState({ visible: true })
            this.setState({
                color: data?.color,
                msgData: data?.msgData
            })
            if (data?.top) {
                this.setState({
                    top: data?.top
                });
            }
        });
    }

    render() {
        return (
            <>
                <ScrollView refreshControl={<RefreshControl
                    refreshing={this.state?.refresh}
                    //refresh control used for the Pull to Refresh
                    onRefresh={this.refreshData.bind(this)}
                />} style={[ThemeStyling.scrollView, this.props?.style]} contentContainerStyle={{ paddingTop: 45,height:'100%' }}>
                    {this.props?.isTopLogo &&
                        <View style={ThemeStyling.imagecontainer}>
                            <Image style={ThemeStyling.image} source={require('../../assets/staticimages/logo.png')} />
                        </View>
                    }
                    {this.props?.loader &&
                        <View style={ThemeStyling.loader}>
                            <ActivityIndicator size="large" color={Colors.primary_color} />
                        </View>
                    }

                    <RefreshControl
                        refreshing={this.state?.refresh}
                        onRefresh={this.refreshData.bind(this)}
                    />
                    {this.props?.headerText &&
                        <View style={[{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 18,marginBottom:10, paddingLeft: 15 }]}>
                            <View style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                                {this.props?.backButton &&
                                    <TouchableOpacity onPress={() => {
                                        this.props.navigation.goBack()
                                    }}>
                                        <Ionicons name="arrow-back" style={[ThemeStyling.icon2, { fontSize: Colors.FontSize.h3, lineHeight: 30, color: Colors.dark_color, }]} />
                                    </TouchableOpacity>
                                }
                                <Text style={[ThemeStyling.heading3, { marginBottom: 0, paddingBottom: 0, textAlign: "center", flex: 1,marginLeft:0 }]}>{this.props?.headerText}</Text>
                            </View>
                        </View>
                    }
                    {this.props?.children}
                </ScrollView>
                <Snackbar
                    visible={(this.state?.visible) ? true : false}
                    onDismiss={() => this.setState({ visible: false })}
                    duration={5000}
                    style={{ backgroundColor: this.state.color, top: 0 }}
                    wrapperStyle={{ top: this.state.top }}
                >
                    <View>
                        {this.state?.msgData?.head &&
                            <Text style={[ThemeStyling.heading3, { marginBottom: 0, color: Colors.white }]}>{this.state?.msgData?.head} : </Text>
                        }
                        {this.state?.msgData?.subject &&
                            <Text style={[ThemeStyling.text1, { fontWeight: '400', color: Colors.white, marginBottom: 0, flexWrap: 'wrap' }]}>{this.state?.msgData?.subject}</Text>
                        }
                    </View>
                </Snackbar>
            </>
        );
    }
}