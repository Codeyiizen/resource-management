import { Component } from "react";
import { Text, Button, View, Image, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default class RegisterScreen extends Component<{}>{
    constructor(props) {
        super(props);
    }
    navigateToLogin() {
        this.props.navigation.navigate("Login");
    }
    render() {
        return (
            <>
                {/* <Text>Register</Text>
            <Button title="Click To Login" onPress={()=>{this.navigateToLogin()}}></Button> */}
                <ScrollView style={ThemeStyling.scrollView} contentContainerStyle={{ paddingTop: 45, height: '100%', zIndex: 1, position: 'relative' }}>
                    <KeyboardAwareScrollView style={{ width: '100%', height: Dimensions.get('window').height - 45 }}>
                        <View style={{ height: Dimensions.get('window').height - 45 }}>
                            <ScrollView contentContainerStyle={[ThemeStyling.container, { flex: 1 }]}>
                                <View style={{ marginBottom: 'auto', marginTop: 'auto' }}>
                                    <View style={[ThemeStyling.imagecontainer, { marginBottom: 80 }]}>
                                        <Image style={ThemeStyling.image} source={require('../../assets/staticimages/logo.png')} />
                                    </View>
                                    <View>
                                        <Text style={[ThemeStyling.heading2, { textAlign: "center" }]}>Forgot Password?</Text>
                                    </View>
                                    <View>
                                        <Text style={[ThemeStyling.text1, { textAlign: "center" }]}>Enter your email to get a password reset link</Text>
                                    </View>
                                    <View style={[ThemeStyling.btnContainer, { marginBottom: 80 }]}>
                                        <TouchableOpacity style={[ThemeStyling.btnPrimary]}>
                                            <Text style={ThemeStyling.btnText}>Reset Password</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </KeyboardAwareScrollView>

                </ScrollView>
            </>
        );
    }
}