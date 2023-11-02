import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ToDo = () => {
  const [item, setItem]= useState('');
  const [items, setItems] = useState([]);

  const getCurrentCategory = () => {
    return AsyncStorage.getItem("CurrentCategory");
  }

  const handleAddItem = () => {
    // add item to list of items
    // ...items means all items append with item 
    setItems([...items, item]);
    setItem(null);
  
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
                <TouchableOpacity key={index} onPress={()=>completeTask(index)}>
                    <Text>item</Text>
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