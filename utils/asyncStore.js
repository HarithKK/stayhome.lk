import { AsyncStorage } from 'react-native';

export const _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key,value);
      return true;
    } catch (error) {
      return false;
    }
  };

export const _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      return null;
    }
  };

  export const _removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  };