import AsyncStorage from '@react-native-async-storage/async-storage'
/**
 * 
 *  {string} name
 *  {bool} isLogin
 *  {number} accountInfoStatus 0 is none, 1 is verigying, 2 is error
 */

export const setMySetting = (key, value) => AsyncStorage.setItem(key, value)
export const getMySetting = (key) => AsyncStorage.getItem(key)
export const removeMySetting = (key) => AsyncStorage.removeItem(key)