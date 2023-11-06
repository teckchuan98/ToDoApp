import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Item = (props) => {
    return (
        <View style={styles.item}>
            <View style={styles.objectLeft}>
                <TouchableOpacity style={styles.square} onPress={()=>{console.log("Pressed")}}></TouchableOpacity>
                <Text style= {styles.itemText}>{props.text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
    item:{
        backgroundColor:'#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    objectLeft:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:'center'
    },
    square:{
        width: 24,
        height: 24,
        backgroundColor:'#55BCF6',
        opacity:0.4,
        borderRadius: 5,
        marginRight: 15,
        
    },
    itemText:{
        maxWidth: '80%',

    },
    circular:{
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5
    }
})

export default Item;