/* eslint-disable prettier/prettier */
import { Navigation } from 'react-native-navigation';
import { Colors, Fonts } from '@res';
import { moderateScale } from '@utils/utils';

/**
 * goToNewStack - Create new stack and sets that screen as root of stack
 * @param {*} stackId
 * @param {*} rootName
 * @param {*} options
 */
export const goToNewStack = (stackId, rootName, options) =>
  Navigation.setRoot({
    root: {
      stack: {
        id: stackId,
        children: [{
          component: {
            id: rootName,
            name: rootName,
            options: {
              ...options,
            },
          },
        }],
      },
    },
  });

/**
 * Push new screen in the current stack
 * @param {*} componentId
 * @param {*} screenName
 * @param {*} passProps
 */
export const pushNewScreen = (currentComponentId, screenName, title, options, passProps) => {

  const screenOptions = {
    ...options,
    topBar: {
        visible: true,
        drawBehind: false,
        animate: false,
        ...(options && options.topBar),
        title: {
            fontFamily: Fonts.FontMedium,
            alignment: 'center',
            fontSize: moderateScale(20),
            color: Colors.white,
            ...(options && options.topBar.title),
            text: title,
        },
        background: {
            color: Colors.green,
        },
    },
  };
  Navigation.push(currentComponentId, {
        component: {
          id: screenName,
          name: screenName,
          passProps: {
            data: passProps,
          },
          options: {
            ...screenOptions,
          },
        },
  });
};
