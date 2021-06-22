/* eslint-disable prettier/prettier */
import { Navigation } from 'react-native-navigation';
import { registerScreens } from '@navigation/screens';
import { goToNewStack } from '@navigation/navigation';
import * as Constants from '@constants/Constants';
import { Strings, Colors, Fonts } from '@res';
import { moderateScale } from '@utils/utils';
import PushNotification, {Importance} from 'react-native-push-notification';
import GetLocation from 'react-native-get-location';
import { getMyCurrentWeather } from '@services/LocationService';

/**
 * launchInitialScreen
 * @description Launch Initial Screen
 */
 const launchInitialScreen = async () => {
    global.activeComponent = Constants.LOCATIONS;
    goToNewStack(Constants.HOME_ID, Constants.LOCATIONS, {
        topBar: {
            visible: true,
            drawBehind: false,
            animate: false,
            title : {
              text: Strings.landingPageTitle,
              fontFamily: Fonts.FontMedium,
              alignment: 'center',
              fontSize: moderateScale(20),
              color: Colors.white,
            },
            leftButtons: [],
            background: {
                color: Colors.green,
            },
        },
    });
 };

Navigation.events().registerAppLaunchedListener(() => {
  registerScreens();
  launchInitialScreen();
});

const showPushNotification = (channelId, title, subTitle, description) => {
  PushNotification.localNotification({
    channelId: channelId,
    autoCancel: true,
    title: title,
    subText: subTitle,
    message: description,
    bigText: description,
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
  });
};

const getUserLocation = async () => {
  GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 0,
  }).then((location) => {
    getCurrentWeatherDetails(location.latitude, location.longitude);
  }).catch((error) => {
      console.log('Error: ', error);
  });
};

const getCurrentWeatherDetails = async (lat, lon) => {
  const { data } = await getMyCurrentWeather(lat, lon);
    if (data?.id) {
      const currentTemp = data?.main?.temp;
      const currentWeather = data?.weather?.[0].main;
      const currentTempMessage = 'Current Temperature ' + currentTemp + '°c';
      showPushNotification('weather-app-notifications', 'WeatherApp', currentWeather, currentTempMessage);
    }
};

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    getUserLocation();

    const clicked = notification.userInteraction;
    if (clicked) {
      PushNotification.removeAllDeliveredNotifications();
    }
  },
  onAction: function (notification) {
  },
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  senderID: '456151680214',
  popInitialNotification: true,
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: 'weather-app-notifications',
    channelName: 'WeatherApp Notifications',
    channelDescription: 'WeatherApp Notification Channel',
    playSound: false,
    soundName: 'default',
    importance: Importance.HIGH,
    vibrate: true,
  },
  (created) => console.log(`createChannel returned '${created}'`)
);

PushNotification.getChannels(function (channel_ids) {
  console.log('Channels');
  console.log(channel_ids);
});

