import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

//Guideline sizes are based on the designs for iPhone X screen mobile device
//iPhone X Resolution: 375 x 667 dp.
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

// check if Device is IphoneX
// const IS_IPHONEX = () => height === 812;

export function isIphoneX() {
    
    return (
      // This has to be iOS
      Platform.OS === 'ios' &&
      
      // Check either, iPhone X or XR
      (isIPhoneXSize() || isIPhoneXrSize())
    );
}
  
  export function isIPhoneXSize() {
    return height == 812 || width == 812;
  }
  
  export function isIPhoneXrSize() {
    return height == 896 || width == 896;
  }
  
  
export { scale, verticalScale, moderateScale };
export { width, height };
