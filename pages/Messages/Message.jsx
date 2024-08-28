import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import img from "../../assets/word.png";
import Context from "../../context/Context";
import axios from "axios";
const Message = ({ navigation, route }) => {
  let { data } = route.params;
  const api = useContext(Context);
  const [msg, setMsg] = useState('loading text')
  let goback = () => {
    navigation.goBack();
  };

  useEffect(() => {
      (async () => {
        try {
          let uri = `https://api.mail.tm/messages/${data.id}`;
          let res = await axios.get(uri, {
            headers: {
              Authorization: `Bearer ${api.def.token}`,
            },
          });
          // console.log("msg data", res);
          // console.log("\n\n\n",res.data.html)
          setMsg(res.data.text)
        } catch (err) {
          alert(err);
          console.log(err);
        }
      })();
    
  }, []);

  // console.log(data)
  return (
    <ScrollView style={styles.main}>
      {/* back button */}

      {/* meta data about sender */}
      <View style={styles.meta}>
        <TouchableOpacity onPress={goback}>
          <Ionicons name="chevron-back" size={24} color="gray" />
        </TouchableOpacity>
        <View style={styles.metaOne}>
          <Image
            style={styles.Image}
            source={{
              uri: "https://img.freepik.com/free-vector/retro-styled-psychedelic-pattern-background-design_1048-18147.jpg",
            }}
          />

          <View style={styles.info}>
            <Text style={styles.name}>{data.from.name}</Text>
            <Text style={styles.id}>{data.from.address}</Text>
          </View>
        </View>
        <Text style={styles.time}>10:40pm</Text>
      </View>

      {/* subject */}

      <View style={styles.subject}>
        <Text style={styles.subText}>{data.subject}</Text>
      </View>

      {/* body of the mail */}

      <View style={styles.body}>
        <Text style={styles.bodyText}>{msg}</Text>
      </View>
      {/* attachments for mails */}

      <ScrollView
        style={styles.attachments}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.attaachment}>
          <Image style={styles.icon} source={img} />
          <Text style={styles.attText}>project rules.pdf</Text>
        </View>

        <View style={styles.attaachment}>
          <Image style={styles.icon} source={img} />
          <Text style={styles.attText}>project rules.pdf</Text>
        </View>

        <View style={styles.attaachment}>
          <Image style={styles.icon} source={img} />
          <Text style={styles.attText}>project rules.pdf</Text>
        </View>

        <View style={styles.attaachment}>
          <Image style={styles.icon} source={img} />
          <Text style={styles.attText}>project rules.pdf</Text>
        </View>

        <View style={styles.attaachment}>
          <Image style={styles.icon} source={img} />
          <Text style={styles.attText}>project rules.pdf</Text>
        </View>

        <View style={styles.attaachment}>
          <Image style={styles.icon} source={img} />
          <Text style={styles.attText}>project rules.pdf</Text>
        </View>

        <View style={styles.attaachment}>
          <Image style={styles.icon} source={img} />
          <Text style={styles.attText}>project rules.pdf</Text>
        </View>

        <View style={styles.attaachment}>
          <Image style={styles.icon} source={img} />
          <Text style={styles.attText}>project rules.pdf</Text>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default Message;

const styles = StyleSheet.create({
  main: {
    marginTop: 40,
  },
  Image: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginLeft: 10,
  },
  meta: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  metaOne: {
    flexDirection: "row",
  },
  info: {
    // backgroundColor:'red',
    width: 200,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
  },
  name: {
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 1,
  },
  id: {
    fontSize: 10,
    fontWeight: "300",
    letterSpacing: 1,
  },
  time: {
    fontWeight: "300",
    fontSize: 10,
    letterSpacing: 1,
    marginTop: 5,
    color: "black",
    marginRight: 20,
  },
  back: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginBottom: 10,
    // marginRight:20,
  },
  subText: {
    fontSize: 16,
    fontWeight: "300",
    letterSpacing: 3,
  },
  subject: {
    marginLeft: 10,
    marginTop: 15,
  },
  body: {
    marginLeft: 10,
    marginRight: 10,
  },
  bodyText: {
    fontSize: 13,
    letterSpacing: 0.5,
    lineHeight: 20,
    marginTop: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  attaachment: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgray",
    width: 150,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  attachments: {
    marginTop: 30,
    marginRight: 10,
  },
  attText: {
    fontWeight: "400",
    letterSpacing: 1.5,
    fontSize: 11,
    marginLeft: 3,
  },
});
