/* eslint-disable prettier/prettier */
import { Alert } from 'react-native';
import { Strings } from '@res';

export const showAlert = (description, title = '', callback = () => {}) => {
	return 	Alert.alert(title, description,
        [
            {text: 'OK', onPress: () => callback()},
        ]
    );
};

export const showConfirm = (title, description, successCallback = () => {}, cancelCallback = () => {}) => {
	return 	Alert.alert(title, description,
        [
            {
              text: 'No',
              onPress: () => cancelCallback(),
              style: 'cancel',
            },
            {text: 'Yes', onPress: () => successCallback()},
        ],
        {cancelable: true}
    );
};

export const showForceUpdate = (title, description, successCallback = () => {}, cancelCallback = () => {}) => {
	return 	Alert.alert(title, description,
        [
            {
              text: Strings.no_update,
              onPress: () => cancelCallback(),
              style: 'cancel',
            },
            {text: Strings.update, onPress: () => successCallback()},
        ],
        {cancelable: false}
    );
};
