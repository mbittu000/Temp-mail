import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Head from "./Head";
import Body from "./Body";
import Context from "../../context/Context";

export default function Home({navigation}) {
  const [mails, setMails] = useState([])
  const [refresh, setRefresh] = useState(false)
  let api=useContext(Context)
useEffect(() => {
  // api.emty('accounts')
 api.GetAllAccounts()
// api.emty('default')
}, [])
useEffect(() => {
(async()=>{
  if(api.def.id!=undefined){
    let data=await api.loadHome(api.def.token)
    console.log(data)
    setMails(data['hydra:member'])
  }
})()
}, [api.def])

let reff=async()=>{
  setRefresh(true)
  let data=await api.loadHome(api.def.token)
    console.log(data)
    setMails(data['hydra:member'])
    setRefresh(false)
}

// console.log(api.accounts)
console.log(api.def)
  return (
    <ScrollView style={styles.main}
    refreshControl={
      <RefreshControl refreshing={refresh} onRefresh={reff}/>
    }>
      <Head />
       {
        mails.map((e)=>(
          <Body navigation={navigation} key={e.id} data={e}/>
        ))
       }
      </ScrollView>
  );
}

let styles = StyleSheet.create({
  main: {
    marginTop: 35,
    flex: 1,
  },
});
