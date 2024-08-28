import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import logo from'../../assets/mail-inbox-app (1).png'
import Model from "../../components/accounts/Model";

export default function Head() {
  const [show, setShow] = useState(false);
  let toggle=()=>{
    setShow(!show)
  }
  return (
    <>
    <View style={styles.main}>
      <View style={styles.top}>
<Image source={logo} style={styles.logo} />

      <TouchableOpacity activeOpacity={0.5} onPress={toggle}>
      <Image
          source={{
            uri: "https://img.freepik.com/free-vector/retro-styled-psychedelic-pattern-background-design_1048-18147.jpg",
          }}
          style={styles.img}
        />
      </TouchableOpacity>
        
      </View>

      <View style={styles.mid}>
        <Text style={styles.text}>Inbox</Text>
        <EvilIcons
          name="search"
          size={36}
          color="black"
          style={styles.search}
        />
      </View>

      <View style={styles.low}>
        <TouchableWithoutFeedback>
          <View style={[styles.btn, styles.active]}>
            <Text style={[styles.BtnText,styles.activeText]}>All</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <View style={[styles.btn]}>
            <Text style={styles.BtnText}>Unread</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
<Model show={show} toggle={toggle}/>
    </>
  );
}

const styles = StyleSheet.create({
  main: {},
  top: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    // backgroundColor:'red',
    height:50
  },logo:{
    width: 30,
    height: 30,
    marginLeft:20
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 20,
  },
  mid: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    // backgroundColor:'red'
  },
  text: {
    fontSize: 25,
    fontWeight: "200",
    marginLeft: 10,
    letterSpacing:5
  },
  search: {
    marginRight: 10,
  },
  low: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    backgroundColor: "lightgray",
    height: 50,
    borderRadius: 10,
  },
  btn: {
    height: "80%",
    width: 130,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },active:{
    backgroundColor:'blue',
   
  },activeText:{
 color:'white'
  },BtnText:{
    letterSpacing:2,
    fontWeight:'300'
  }
});
