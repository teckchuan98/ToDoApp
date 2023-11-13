import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../helpers/constants';
import {firstLaunch, afterLaunch, getItemFromCategory} from '../helpers/asyncStorage';
import Item from '../components/item';

let currCategory = '';

const ToDo = () => {
  useEffect(()=>{
      checkFirstLaunch()
    }, []
  );

  const [item, setItem]= useState();
  const [items, setItems] = useState([]);

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

  // check first app launch or ..
  const checkFirstLaunch = async() => {
    let launched = await AsyncStorage.getItem(Constants.FIRST_LAUNCH);
    console.log(launched);
    if (launched) {
      isNotFirstLaunch() ;
    } else {
      isFirstLaunch();
    }
  }

  const isNotFirstLaunch = async() => {
    await afterLaunch().then(
      value => {
        currCategory = value;
      }
    ).catch(err => console.log(err));
    await getItemFromCategory().then(
      (list) => {
        setItems(list);
      }
    ).catch(err=>console.log(err))
  }

  const isFirstLaunch = async() => {
    await firstLaunch().then(
      value => {
        currCategory = value;
      }
    ).catch(err => console.log(err));
  }

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
                <TouchableOpacity onPress={()=>{console.log("Outer")}}>
                    <Item id ={index} text={item}/>
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
    marginBottom: 15

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