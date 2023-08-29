import { Component, ReactNode } from "react";
import { Image, Text, View } from "react-native";
import { ThemeStyling } from "../../utilty/styling/Styles";
import ImageGalleryInterface from "../../Interfaces/Common/ImageGalleryInterface";

export default class ImageGallery extends Component<ImageGalleryInterface>{
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <View style={ThemeStyling.gallery}>
                {this.props?.objdata && this.props?.objdata?.length > 0 && this.props?.objdata?.map((item: any, index: number) => {
                    return (
                        <View style={[ThemeStyling.galleryItem, { alignItems: 'center' }]} key={index}>
                            <Image style={[ThemeStyling.profileImage, { borderRadius: 10 }]} source={{ uri: item?.url }} />
                            {item?.text &&
                                <Text>{item?.text}</Text>
                            }
                        </View>
                    );
                })}

            </View>
        );
    }
}