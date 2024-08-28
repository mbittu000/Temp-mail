import React, { useState } from "react";
import Context from "./Context";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export default function Main({ children }) {
  let uri = "https://api.mail.tm/";
  const [accounts, setAccounts] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [mails, setMails] = useState([])
  const [def, setDef] = useState({})

  // get all accounts
  let GetAllAccounts = async () => {
    let data = await SecureStore.getItemAsync("accounts");
    let defAcc=await SecureStore.getItemAsync('default')
    if (data == null) {
      let newAcc=await RandomAccount();
      setDef(newAcc);
      // console.log(newAcc)
       SecureStore.setItemAsync('default',JSON.stringify(newAcc))
    } else {
      let parse = JSON.parse(data);
      console.log('first',parse)
      setAccounts(parse);
      setDef(JSON.parse(defAcc))
      // console.log(parse);
    }
  };

  // create a new account and save

  let RandomAccount = async () => {
    let chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split(
        ""
      );
    let char = [];
    let pass = [];
    for (let i = 0; i < 8; i++) {
      let ran = Math.floor(Math.random() * 63);
      let p = Math.floor(Math.random() * 63);
      char.push(chars[ran]);
      pass.push(chars[p]);
    }
    let address = char.join("") + "@belgianairways.com";
    let password = pass.join("");

    try {
      let url = `${uri}accounts`;
      let reg = await axios.post(url, {
        address,
        password,
      });

      let lurl = `${uri}token`;
      // console.log("first");
      let { data } = await axios.post(lurl, {
        address: reg.data.address,
        password,
      });
      setAccounts((n)=>n.push({ address, password, token: data.token, id: data.id }));
      await SetItem("accounts", {
        address,
        password,
        token: data.token,
        id: data.id,
      });
      // setAccounts((n) => n.push({ address, password }));
      // console.log("login", data);
      return { address, password, token: data.token, id: data.id }
    } catch (err) {
      console.log(err);
    }
    // setAccounts((n) => n.push({ address, password }));
    // // await SetItem("accounts", { address, password });
    // console.log({ address, password });

  };

  // set functionality

  let SetItem = async (key, newData) => {
    let data = await SecureStore.getItemAsync(key);
    if (data == null) {
      let arr = [];
      arr.push(newData);

       SecureStore.setItemAsync(key, JSON.stringify(arr));
    } else {
      let parse = JSON.parse(data);
      parse.push(newData);

       SecureStore.setItemAsync(key, JSON.stringify(parse));
    }
  };

  // set emty the store
  let emty = async (key) => {
    await SecureStore.deleteItemAsync(key);
  };

  // load home page
  let loadHome= async (token) => {
    console.log(token)
    let url = `${uri}messages?page=1`;
    let { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }


  return (
    <Context.Provider
      value={{
        GetAllAccounts,
        RandomAccount,
        setAccounts,
        accounts,
        emty,
        loadHome,
        mails,
        def,
        setDef
      }}
    >
      {children}
    </Context.Provider>
  );
}
