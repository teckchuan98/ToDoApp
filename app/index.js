import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from './helpers/constants';
import {firstLaunch} from './helpers/asyncStorage';

let currCategory = '';

const ToDo = () => {
  const [item, setItem]= useState('');
  const [items, setItems] = useState([]);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  const handleAddItem = async() => {
    // add item to list of items
    // ...items means all items append with item 
    // add into the async storage
    items.push(item);
    setItems(items);
    setItem(null);
    try {
      await AsyncStorage.setItem(currCategory, JSON.stringify(items));
    } catch {
      console.log("Adding Items Into List Failed");
    }

  }

  const checkFirstLaunch = async() => {
    let launched = await AsyncStorage.getItem(Constants.FIRST_LAUNCH);
    console.log(launched);
    if (launched) {
      currCategory = notFirstLaunch();
    } else {
      currCategory = firstLaunch();
    }
    
  }

  const firstLaunch = async() => {
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
  }

  const notFirstLaunch = async() => {
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


  useEffect(()=>{
      checkFirstLaunch()
    }, []
  );

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>
          Today's Tasks
        </Text>

        <View style={styles.items}>
          {
            items.map((item, index)=> {
              return (
                <TouchableOpacity key={index} onPress={()=>completeTask(index)}>
                    <Text>{item}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
      
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"} style = {styles.writeTaskWrapper}>

        <TextInput style={styles.input} placeholder='Add a Task' value={item} onChangeText={inputText => setItem(inputText)}/>

        <TouchableOpacity onPress={handleAddItem}>
            <View style = {styles.addWrapper}>
                <Text style={styles.addText}>+</Text>
            </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>

  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  tasksWrapper:{
    flex:1,
    paddingTop:80,
  },
  sectionTitle:{
    //title style
    alignSelf:'center',

  },
  items:{
    //style of the item in categories
  },
  writeTaskWrapper:{
    position:'absolute',
    bottom:90,
    width:"100%",
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around'
  },
  input:{
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1
  },
  addWrapper:{
    width: 50,
    height: 50,
    backgroundColor:'#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1
  },
})


export default ToDo;