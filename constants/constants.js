import { Dimensions } from "react-native";
import { Platform } from "react-native";

export const screenWidth = Dimensions.get('screen').width;
export const screenHeight = Dimensions.get('screen').height;
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';