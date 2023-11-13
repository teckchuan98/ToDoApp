import Constants from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

let currCategory;

// first app launch
const firstLaunch =  async() => {
  await AsyncStorage.setItem(Constants.FIRST_LAUNCH, "launched");
  await AsyncStorage.setItem(Constants.CATEGORY, Constants.DEFAULT_CATEGORY);
  currCategory = Constants.DEFAULT_CATEGORY;
  await AsyncStorage.setItem(currCategory, JSON.stringify([]));
  return currCategory;
}

// not first app launch
const afterLaunch = async() => {
  // why can I not useState for category ???
  await AsyncStorage.getItem(Constants.CATEGORY).then((text)=>{currCategory = text})
  return currCategory;
}

// get list of todo from category
const getItemFromCategory = async() => {
  let items;
  await AsyncStorage.getItem(currCategory).then((defaultList) => {
      items = JSON.parse(defaultList);
      return items;
    }
  );
  return items;
}

export {firstLaunch, afterLaunch, getItemFromCategory};