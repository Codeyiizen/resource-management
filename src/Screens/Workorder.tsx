import { Component } from "react"
import { Text, View, ScrollView, } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { AntDesign, Feather } from '@expo/vector-icons';
import Colors from "../utilty/Colors";
import { CommonApiRequest } from "../utilty/api/commonApiRequest";
import WorkorderStateInterface from "../Interfaces/States/WorkorderStateInterface";
import MainLayout from "../Layout/MainLayout";


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
            <MainLayout isTopLogo={true} onRefresh={() => { this.refreshPage() }} loader={this.state?.loader}>
                <View>
                    <View style={[ThemeStyling.container, { minHeight: 'auto', marginTop: 20 }]}>
                        {/* Task Summary */}
                        <View>
                            <Text style={ThemeStyling.heading3}>Task Summary</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                <View style={[ThemeStyling.cardGroup, { height: 130 }]}>
                                    <View style={[ThemeStyling.cardStyle, ThemeStyling.card, { backgroundColor: Colors.primary_color }]}>
                                        <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', color: Colors.white }]}>20</Text>
                                        <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', color: Colors.white }]}>Wed</Text>
                                    </View>
                                    <View style={[ThemeStyling.cardStyle, ThemeStyling.card]}>
                                        <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', }]}>21</Text>
                                        <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', }]}>Thu</Text>
                                    </View>
                                    <View style={[ThemeStyling.cardStyle, ThemeStyling.card]}>
                                        <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', }]}>22</Text>
                                        <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', }]}>Fri</Text>
                                    </View>
                                    <View style={[ThemeStyling.cardStyle, ThemeStyling.card]}>
                                        <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', }]}>23</Text>
                                        <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', }]}>Sat</Text>
                                    </View>
                                    <View style={[ThemeStyling.cardStyle, ThemeStyling.card]}>
                                        <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', }]}>24</Text>
                                        <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', }]}>Sun</Text>
                                    </View>
                                    <View style={[ThemeStyling.cardStyle, ThemeStyling.card]}>
                                        <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', }]}>25</Text>
                                        <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', }]}>Mon</Text>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        <View style={ThemeStyling.card}>
                            <View style={ThemeStyling.cardBody}>
                                <View style={ThemeStyling.listItem}>
                                    <View>
                                        <Text style={ThemeStyling.listIcon}>
                                            <AntDesign name="shoppingcart" size={18} />
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={ThemeStyling.listText}>
                                            Lorem Ipsum is simply dummy text
                                        </Text>
                                        <View style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                                            <View>
                                                <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}>Due date 20 , Sep 2023</Text>
                                            </View>
                                            <View>
                                                <View style={[ThemeStyling.badge, ThemeStyling.bgGray, { marginLeft: 5 }]}>
                                                    <Text style={[ThemeStyling.text6, { marginBottom: 0, color: Colors.primary_color }]}>In Progress</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={ThemeStyling.listItem}>
                                    <View>
                                        <Text style={[ThemeStyling.listIcon, { backgroundColor: Colors.success_color }]}>
                                            <Feather name="globe" size={18} />
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={ThemeStyling.listText}>
                                            Many desktop publishing packages
                                        </Text>
                                        <View style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                                            <View>
                                                <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}>Due date 25 , Nov 2023</Text>
                                            </View>
                                            <View>
                                                <View style={[ThemeStyling.badge, ThemeStyling.bglightSuccess, { marginLeft: 5 }]}>
                                                    <Text style={[ThemeStyling.text6, { marginBottom: 0, color: Colors.success_color }]}>Completed</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={ThemeStyling.listItem}>
                                    <View>
                                        <Text style={[ThemeStyling.listIcon, { backgroundColor: Colors.dark_color }]}>
                                            <Feather name="shopping-bag" size={18} />
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={ThemeStyling.listText}>
                                            There are many variations of passages
                                        </Text>
                                        <View style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                                            <View>
                                                <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}>Due date 25 , Nov 2023</Text>
                                            </View>
                                            <View>
                                                <View style={[ThemeStyling.badge, ThemeStyling.bglightInfo, { marginLeft: 5 }]}>
                                                    <Text style={[ThemeStyling.text6, { marginBottom: 0, color: Colors.dark_color }]}>Working</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={ThemeStyling.listItem}>
                                    <View>
                                        <Text style={[ThemeStyling.listIcon, { backgroundColor: Colors.errorColor }]}>
                                            <AntDesign name="tagso" size={18} />
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={ThemeStyling.listText}>
                                            All the Lorem Ipsum generators on the Internet
                                        </Text>
                                        <View style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                                            <View>
                                                <Text style={[ThemeStyling.text4, { color: Colors.secondry_color, textAlign: "left" }]}>Due date 25 , Nov 2023</Text>
                                            </View>
                                            <View>
                                                <View style={[ThemeStyling.badge, ThemeStyling.bgDanger, { marginLeft: 5 }]}>
                                                    <Text style={[ThemeStyling.text6, { marginBottom: 0, color: Colors.errorColor }]}>Pending</Text>
                                                </View>
                                            </View>
                                        </View>
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