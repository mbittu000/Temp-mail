import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as Clipboard from 'expo-clipboard';
import {
  Ionicons,
  MaterialIcons,
  EvilIcons,
  MaterialCommunityIcons,
  Feather
} from "@expo/vector-icons";
import Context from "../../context/Context";
import axios from "axios";

const Model = ({ show, toggle }) => {
  const api = useContext(Context);
  const [acc, setAcc] = useState([])
  useEffect(() => {
    if(api.accounts.length > 0){
      setAcc(api.accounts)
    }
  }, [api.accounts])

  let copy=async(id)=>{
await Clipboard.setStringAsync(id)
ToastAndroid.show('Mail Copyed',ToastAndroid.SHORT)
  }

  let change=async(data)=>{
    api.setDef(data)
    await SecureStore.setItemAsync('default',JSON.stringify(data))
console.log(data)
  }

  let deleteAcc=async(data)=>{
    // alert(data.address)
    let uri = `https://api.mail.tm/accounts/${data.id}`;
    let res = await axios.delete(uri, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      }
    });
    
let fil=api.accounts.filter((n)=>n.id!=data.id)
api.setAccounts(fil)
setAcc(fil)
await SecureStore.setItemAsync('accounts',JSON.stringify(fil))
await change(fil[0])
console.log(res.data)
console.log(fil.length)

  }
  
  // console.log("account", typeof api.accounts);
  // console.log(api.accounts)
  return (
    <Modal visible={show} transparent={true} animationType="slide">
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" animated={true} />
      <TouchableOpacity style={styles.btn} onPress={toggle}>
        <TouchableOpacity style={styles.main} activeOpacity={1}>
          {/* manage account section */}
          <View style={styles.detail}>
            <View style={styles.icon}>
              <MaterialIcons name="layers" size={24} color="blue" />
            </View>

            <View style={styles.info}>
              <Text style={styles.title}>Manage accounts</Text>
              <Text style={styles.direction}>
                Switch and manage your accounts.
              </Text>
            </View>

            <TouchableOpacity style={styles.close} onPress={toggle}>
              <EvilIcons
                name="close"
                size={20}
                color="black"
                style={{ marginBottom: 2 }}
              />
            </TouchableOpacity>
          </View>

          {/* accounts section */}
          <ScrollView>
            <View style={styles.accounts}>
              {acc.map((e, i) => (
                <TouchableOpacity key={e.id} onPress={()=>{change(e)}}>
                  <View
                    style={[
                      styles.account,
                      api.def.id == e.id ? styles.active : styles.none,
                    ]}
                  >
                    <View style={styles.pic}>
                      <Image
                        style={styles.profile}
                        source={{
                          uri: "https://img.freepik.com/free-vector/retro-styled-psychedelic-pattern-background-design_1048-18147.jpg",
                        }}
                      />
                    </View>

                    <View style={styles.meta}>
                      <Text style={styles.id}>{e.address}</Text>
                      <TouchableOpacity onPress={()=>{copy(e.address)}} style={styles.touch}>
                      <View style={styles.copy}>
                      {/* <Text style={styles.time}>copy mail id</Text> */}
                      <Feather name="copy" size={16} color="black" />
                        </View>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.delete} onPress={()=>{deleteAcc(e)}}>
                      <MaterialCommunityIcons
                        name="delete-empty-outline"
                        size={24}
                        color="red"
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* add account button */}
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={api.RandomAccount}>
              <View style={styles.add}>
                <Ionicons name="add-circle-outline" size={24} color="blue" />
                <Text style={styles.btnText}>Add account</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default Model;

const styles = StyleSheet.create({
  main: {
    width: "90%",
    height: "60%",
    backgroundColor: "lightgray",
    borderRadius: 20,
    paddingTop: 20,
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop:50,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  pro: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginLeft: 10,
  },
  detail: {
    flexDirection: "row",
    justifyContent:'space-evenly'
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    // marginLeft: 10,
  },
  info: {
    // marginLeft: 10,
    // backgroundColor:'red',
    width:200
  },
  close: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    // marginRight: 10,
    // marginLeft: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  title: {
    fontSize: 16,
    fontWeight: "300",
    letterSpacing: 2,
  },
  direction: {
    fontSize: 11,
    color: "gray",
    letterSpacing: 1,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 10,
    // marginLeft: 10,
  },
  account: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
    width: 290,
    padding: 5,
  },
  meta: {
    // backgroundColor:'red',
    width: 190,
    marginLeft: 7,
    height: 40,
  },
  id: {
    fontSize: 10,
    fontWeight: "00",
    letterSpacing: 1.5,
  },
  time: {
    fontSize: 8,
    fontWeight: "300",
    letterSpacing: 1,
    marginTop: 3,
    color: "gray",
  },
  delete: {
    marginRight: 10,
    // backgroundColor:'blue',
    justifyContent: "center",
    width: 40,
    alignItems: "center",
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    marginRight: 10,
  },
  accounts: {
    // marginTop:10
    alignItems: "center",
  },
  active: {
    borderWidth: 1.5,
    borderColor: "blue",
    borderRadius: 10,
  },
  add: {
    flexDirection: "row",
    // backgroundColor:'red',
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 290,
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 10,
  },
  btnText: {
    color: "blue",
    letterSpacing: 1,
    fontWeight: "300",
  },copy:{
    marginTop:3,
    // backgroundColor:'red',
    width: 30,
    justifyContent:'center',
    alignItems:'center',
  },touch:{
// backgroundColor:'red',
width: 30,
  }
});
