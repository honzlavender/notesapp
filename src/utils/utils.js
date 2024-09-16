import {Dimensions, NativeModules} from 'react-native';

export const {height, width} = Dimensions.get('screen');

export const {NoteManager} = NativeModules;

export const resetUserDefaults = async () => {
  try {
    const result = await NoteManager.resetUserDefaults();
    console.log(result);
  } catch (error) {
    console.error('Error resetting UserDefaults:', error);
  }
};
