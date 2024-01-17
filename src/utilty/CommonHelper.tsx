import AsyncStorage from "@react-native-async-storage/async-storage";
import { ConstantsVar } from "./ConstantsVar";
import Colors from "./Colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const CommonHelper = {
    registerValidation: async function (params: any) {
        var emailValidation: boolean = false;
        var passwordValidation: boolean = false;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        var passwordReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (reg.test(params?.email) !== false) {
            emailValidation = true;
        }
        if (passwordReg.test(params?.password) !== false) {
            passwordValidation = true;
        }
        return {
            email: emailValidation,
            password: passwordValidation,
            isValidated: (emailValidation && passwordValidation) ? true : false
        };
    },
    saveStorageData: async function (key: any, data: any) {
        await AsyncStorage.setItem(key, data);
    },
    removeData: async function (key: any) {
        await AsyncStorage.removeItem(key);
    },
    getData: async function (key: any) {
        const jsondata = await AsyncStorage.getItem(key);
        if (jsondata) {
            return JSON.parse(jsondata);
        } else {
            return jsondata;
        }
    },
    getUserData: async function () {
        const jsondata = await AsyncStorage.getItem(ConstantsVar.USER_STORAGE_KEY);
        if (jsondata) {
            return JSON.parse(jsondata);
        } else {
            return jsondata;
        }
    },
    diffrenceBetween2date: async function (date1: any, date2: any) {
        if (date1 && date2) {
            return date2?.getTime() - date1?.getTime();
        }
    },
    convertTimeToHours: function (millisec: any) {
        var seconds: any = (millisec / 1000).toFixed(0);
        var minutes: any = Math.floor(seconds / 60);
        var hours: any;
        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            hours = (hours >= 10) ? hours : "0" + hours;
            minutes = minutes - (hours * 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;

        }

        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        if (hours != "") {
            hours = (hours) ? hours : "00";
            return hours + ":" + minutes + ":" + seconds;
        }
        return minutes + ":" + seconds;
    },
    getUserName: function (dataObj: any) {
        return (dataObj?.fname) ? dataObj?.fname + " " + dataObj?.lname : '';
    },
    getJobName: function (dataObj: any) {
        return dataObj?.job_name + " (" + dataObj?.job_address + ")"
    },
    calculateDistance: async function (origin: { latitude: number; longitude: number }, destination: { latitude: number; longitude: number }, unit: 'km' | 'mi' = 'km'
    ) {
        return (
            ((Math.acos(
                Math.sin((origin.latitude * Math.PI) / 180) *
                Math.sin((destination.latitude * Math.PI) / 180) +
                Math.cos((origin.latitude * Math.PI) / 180) *
                Math.cos((destination.latitude * Math.PI) / 180) *
                Math.cos(((origin.longitude - destination.longitude) *
                    Math.PI) / 180)
            ) * 180) /
                Math.PI) *
            60 * 1.1515 *
            (unit === 'mi' ? 1000 : 1)
        );
    },
    convertDateTimeToDateAndTime: function (dataObj: any, date: any) {
        if (dataObj) {
            const arrObj = dataObj.split(",")
            var myDateObj = new Date(date);
            const month = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"][myDateObj.getMonth()]
            return myDateObj.getDate() + " " + month + " at " + arrObj?.[1];
        } else {
            return "";
        }
    },
    getCurrentDate(){
        var myDateObj = new Date();
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][myDateObj.getMonth()]
        const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
        "Sunday"][myDateObj.getDay()]
        return day+", "+myDateObj.getDate() + " " + month + " " +myDateObj.getFullYear();
    },
    getClockType(data:any){
        if(data?.type_id===1){
            return <MaterialCommunityIcons name="timer-outline" size={18} style={{ color: Colors.primary_color }} />
        } else {
            return <MaterialCommunityIcons name="timer-off-outline" size={18} style={{ color: Colors.errorColor }} />
        }
    }

}