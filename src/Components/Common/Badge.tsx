import React, { Component } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { func, string, any } from 'prop-types';
import { Pressable } from "react-native";
import Colors from "../../utilty/Colors";
import Theming from "../../utilty/styling/theming";
import ButtonComponentInterface from "../../Interfaces/Common/ButtonComoponentInterface";
import { ThemeStyling } from "../../utilty/styling/Styles";
import BadgeInterFace from "../../Interfaces/Common/BadgeInterFace";

export default class Badge extends Component<BadgeInterFace,BadgeInterFace> {

    constructor(props: any) {
        super(props);
        this.state={
            badgeStyle:'',
            color:Colors.success_color
        }
    }
    componentDidMount(): void {
        this.setState({badgeStyle:ThemeStyling.bglightInfo,color:Colors.gray_color});
        if(this.props.title==='Pending'){
            this.setState({badgeStyle:ThemeStyling.bglightInfo,color:Colors.gray_color});
        }
        if(this.props.title==='Completed'){
            this.setState({badgeStyle:ThemeStyling.bglightSuccess,color:ThemeStyling.bgSuccess});
        }
    }
    _handleOnPress = () => {
        const { onPressCall } = this.props;
        onPressCall();
    }
    _isDisabledClas() {
        return (this.props.isDisabled === 'false') ? Theming.button.disable : ''
    }
    render() {
        return (
            <View style={{ width: 90 }}>
                <Text style={[ThemeStyling.badge, this.state?.badgeStyle, { color: this.state?.color, marginLeft: 5 }]}>{this.props.title}</Text>
            </View>
        );
    }
}