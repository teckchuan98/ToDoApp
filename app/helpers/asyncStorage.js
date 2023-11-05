import React from 'react'
import Constants from './constants';

const firstLaunch = async() => {
    let currCategory = '';
    try {
      await AsyncStorage.setItem(Constants.FIRST_LAUNCH, "launched");
    } catch {
      console.log("Failed to detect first launch");
    }

    try {
      await AsyncStorage.setItem(Constants.CATEGORY, Constants.DEFAULT_CATEGORY);
      currCategory = Constants.DEFAULT_CATEGORY;
    } catch {
      console.log("Failed to set default category");
    }

    try {
      await AsyncStorage.setItem(currCategory, JSON.stringify(items));
    } catch {
      console.log("Failed to set default category's todo list");
    }
    
    return currCategory;
}

const notFirstLaunch = async(currCategory) => {
    // get the default category
    try {
      // why can I not useState for category ???
      await AsyncStorage.getItem(Constants.CATEGORY).then((text)=>{currCategory = text})
    } catch {
      console.log("Failed to retrieve category");
    }

    try {
      await AsyncStorage.getItem(currCategory).then((defaultList) => {
          setItems(JSON.parse(defaultList));
        }
      );
    } catch {
      console.log("Failed to retrieve to do list");
    }

  }



export default {firstLaunch, notFirstLaunch}