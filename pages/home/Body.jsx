import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
const Body = ({navigation,data}) => {
  return (
    <TouchableOpacity style={styles.main} activeOpacity={0.5}
    onPress={()=>{
navigation.navigate('Messages',{data})
    }}>
      <View style={styles.mid}>
        <Text style={styles.name}>{data.from.name}</Text>
        <Text style={styles.sub}>{data.subject}</Text>
        <Text style={styles.msg}>{data.intro.substring(0,37)}...</Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.time}>11:40am</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Body;

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    padding: 10,
    // borderWidth: 1,
    width: "96%",
    marginTop: 20,
    justifyContent: "space-between",
    alignSelf:'center',
    borderRadius:20
  },
  name: {
    fontWeight: "500",
    fontSize:15,
    letterSpacing:1.5
  },
  sub: {
    fontWeight: "300",
    letterSpacing:1,
    fontSize:13,
    marginTop:3,
    marginBottom:3
  },
  msg: {
    color: "#888",
    fontSize: 11,
    letterSpacing:1,
  },time:{
    textTransform:'uppercase',
    fontSize:12,
    letterSpacing:1.5
  }
});
