import React, { useState, useEffect } from "react";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
  Image,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Ico from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import Icons from "react-native-vector-icons/Ionicons";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import StarRating from "react-native-star-rating-widget";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  let url = "http://localhost:5000/";
  const Feedback = ({ navigation }) => {
    const [getlist, setlist] = useState([]);
    const [getfeedback, setfeedback] = useState([]);
    const [getarray, setarray] = useState();
    const [getcondition, setcondition] = useState(true);
    const [getmodalvisible, setModalVisible] = React.useState(false);
    const [isFetching, setIsFetching] = React.useState(false);

    //const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
      axios.get(`${url}feedback/getfeedback`).then((res) => {
        console.log(res.data);
        setlist(res.data);
        setcondition(false);
      });
      return () => {
        setlist([]);
      };
    }, [getcondition]);

    const sendrequest = () => {
      setcondition(true);
      axios
        .post(`${url}feedback/addfeedback`, {
          name: "Soban",
          userfeedback: getfeedback,
        })
        .then((res) => {
          setcondition(false);
          console.log(res);
          setModalVisible(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (getcondition) {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 30,
          }}
        >
          <ActivityIndicator animating={true} color="brown" />

          <Text>Waiting for response</Text>
        </View>
      );
    }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fcfd" }}>
        <View
          style={{
            //flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fffafd",
          }}
        >
          <Modal animationType="fade" visible={getmodalvisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={{ textAlign: "center" }}>
                  Your feedback has been posted
                </Text>
                <View>
                  <Icon name="verified" color="green" size={40} />
                </View>
                <View>
                  <Pressable
                    style={{
                      backgroundColor: "#1A3C40",
                      width: 120,
                      height: 30,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 7,
                    }}
                    onPress={() => {
                      setModalVisible(false);
                      navigation.navigate("Feedback");
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 13,
                        fontWeight: "bold",
                      }}
                    >
                      Go Back home
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View style={{ backgroundColor: "#1A3C40", padding: 6 }}>
          <View style={styles.header}>
            <Text style={styles.text1}>Feedback.</Text>
            <Icon name="feedback" color="white" size={40} />
          </View>
        </View>
        <View>
          <View style={{ marginTop: 15, padding: 5 }}>
            <TextInput
              placeholder="Enter your Feedback..."
              style={{
                margin: 5,
                padding: 5,
                backgroundColor: "white",
                color: "grey",
                shadowColor: "#000",
                height: 39,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 5,
              }}
              onChangeText={setfeedback}
            />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={styles.buttonstyle}
              onPress={() => {
                sendrequest();
              }}
            >
              <Text style={styles.buttontext}>Post</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonstyle} onPress={() => {}}>
              <Text style={styles.buttontext}>Via Email</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 15 }}>
            <FlatList
              refreshing={isFetching}
              showsVerticalScrollIndicator={false}
              data={getlist}
              extraData={getlist}
              renderItem={({ item }) => {
                return (
                  <View style={styles.cartCard}>
                    <View style={styles.circle}>
                      <Image
                        source={{ uri: item.userimage }}
                        style={{ height: 80, width: 80 }}
                      />
                    </View>
                    <View
                      style={{
                        height: 100,
                        marginLeft: 10,
                        paddingVertical: 20,
                        flex: 1,
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                        {item.username}
                      </Text>
                      <Text style={{ fontSize: 15, color: "black" }}>
                        {item.userfeedback}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          padding: 4,
                        }}
                      >
                        <Icons
                          name="ios-eye-sharp"
                          color="#315559"
                          size={25}
                          onPress={() => {
                            navigation.navigate("ReplyScreen", { data: item });
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 15,
                            color: "#315559",
                            padding: 5,
                          }}
                        >
                          View
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  };

  const FAQs = (props) => {
    const [filtered, setFilterted] = useState("");
    const [search, setSearch] = useState("");
    const [getfaqs, setfaqs] = useState();
    useEffect(() => {
      axios.get(`${url}faqs/getfaq`).then((res) => {
        console.log(res.data);
        setfaqs(res.data);
      });
      return () => {
        setfaqs([]);
      };
    }, []);
    const updateSearch = (search) => {
      const d = getfaqs.filter((item) => {
        return item.Question.match(search);
      });

      setSearch(search);
      setFilterted(d);
    };
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fcfd" }}>
        <View style={{ backgroundColor: "#1A3C40", padding: 6 }}>
          <View style={styles.header}>
            <Text style={styles.text1}>FAQs.</Text>
            <Ico name="chat-question" color="white" size={40} />
          </View>
        </View>
        <View>
          <View
            style={{
              marginTop: 40,
              flexDirection: "row",
              paddingHorizontal: 20,
            }}
          >
            <View style={styles.inputContainer}>
              <Icon name="search" size={28} />
              <TextInput
                style={{ flex: 1, fontSize: 18 }}
                placeholder="Search for FAQs"
                onChangeText={updateSearch}
              />
            </View>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filtered.length > 0 ? filtered : getfaqs}
            renderItem={({ item }) => {
              return (
                <View style={styles.cartCard2}>
                  <View
                    style={{
                      height: 100,
                      marginLeft: 10,
                      paddingVertical: 20,
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        marginBottom: 8,
                      }}
                    >
                      {item.Question}
                    </Text>
                    <Text style={{ fontSize: 15, color: "black" }}>
                      {item.Answer}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  };

  const Reviews = () => {
    const [getrev, setrev] = useState();
    const [getRating, setRating] = useState(0);
    const [getReview, setReview] = useState([]);

    const sendrequest = () => {
      axios
        .post(`${url}userreview/adduserreview`, {
          UserName: "Soooban",
          UserReview: getrev,
          UserRating: getRating,
          UserImage:
            "https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg",
        })
        .then((res) => {
          console.log(res);
          setModalVisible(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    useEffect(() => {
      axios.get(`${url}userreview/getusereview`).then((res) => {
        console.log(res.data);
        setReview(res.data);
        setcondition(false);
      });
      return () => {
        setReview([]);
      };
    }, []);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fcfd" }}>
        <View style={{ backgroundColor: "#1A3C40", padding: 4 }}>
          <View style={styles.header}>
            <Text style={styles.text2}>Suggest Changes</Text>
            <Icons
              name="ios-chatbubble-ellipses-outline"
              color="white"
              size={32}
            />
          </View>
        </View>

        <View>
          <View style={{ marginTop: 15, padding: 5 }}>
            <TextInput
              placeholder="Suggest us changes"
              style={{
                margin: 5,
                padding: 5,
                backgroundColor: "white",
                color: "grey",
                shadowColor: "#000",
                height: 70,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 5,
              }}
              onChangeText={setrev}
            />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Text>Rate Us: </Text>
            <StarRating rating={getRating} onChange={setRating} starSize={20} />
            <TouchableOpacity
              style={styles.buttonstyle}
              onPress={() => {
                sendrequest();
              }}
            >
              <Text style={styles.buttontext}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#1A3C40",
              marginRight: 100,
            }}
          >
            Users Suggestion
          </Text>
        </View>
        <View style={{ marginTop: 15 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={getReview}
            renderItem={({ item }) => {
              return (
                <View style={styles.cartCard}>
                  <View style={styles.circle}>
                    <Image
                      source={{ uri: item.UserImage }}
                      style={{ height: 80, width: 80 }}
                    />
                  </View>
                  <View
                    style={{
                      height: 100,
                      marginLeft: 10,
                      paddingVertical: 20,
                      flex: 1,
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                      {item.UserName}
                    </Text>
                    <Text style={{ fontSize: 15, color: "black" }}>
                      {item.UserReview}
                    </Text>
                    <StarRating rating={item.UserRating} starSize={20} />
                  </View>
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  };
  const ReplyScreen = ({ route }) => {
    const [getfeedbackdata, setfeedbackdata] = useState(route.params.data);
    const [getans, setans] = useState();
    //Ans
    const sendAns = () => {
      console.log(getfeedbackdata._id);
      console.log(getans);
      setcondition(true);
      fetch("http://localhost:5000/feedback/postanswer", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Admin",
          userAnswer: getans,
          feedbackId: getfeedbackdata._id,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
        })
        .catch((error) => console.log("error", error));
    };
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ padding: 3 }}>
            <View style={styles.header}>
              <Icons name="ios-chatbubbles-sharp" color="#315559" size={40} />
              <Text style={styles.text4}>Your Question</Text>
            </View>
          </View>

          <View style={styles.cartCard}>
            <View>
              <Image
                source={{ uri: getfeedbackdata.userImg }}
                style={{ height: 80, width: 80, borderRadius: 100 }}
              />
            </View>
            <View
              style={{
                height: 100,
                marginLeft: 10,
                paddingVertical: 20,
                flex: 1,
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 18, color: "black" }}
              >
                {getfeedbackdata.userName}
              </Text>
              <Text style={{ fontSize: 15, color: "black" }}>
                {getfeedbackdata.userfeedback}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 10, paddingTop: 5, marginLeft: 10 }}>
            <Text style={styles.text4}>Replied by Admin</Text>
          </View>
          <View>
            {getfeedbackdata.Answer.map((i) => (
              <View
                key={i._id}
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  paddingVertical: 5,
                  padding: 8,
                  paddingTop: 15,
                  borderRadius: 10,
                  marginTop: 15,
                  elevation: 5,
                  backgroundColor: "#ffff",
                  marginVertical: 2,
                  marginHorizontal: 10,
                  paddingHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "#333",
                    fontWeight: "700",
                    paddingLeft: 5,
                  }}
                >
                  {i.name}
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#555",
                      fontWeight: "600",
                      paddingLeft: 5,
                    }}
                  >
                    {"  "}
                    {i.userAnswer}
                  </Text>
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };
  const Stack = createStackNavigator();
  const feedbackscreens = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Feedback"
          component={Feedback}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReplyScreen"
          component={ReplyScreen}
          options={{
            title: "Responses",
            headerStyle: { height: 60 },
            headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
    );
  };
  const Tab = createMaterialTopTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarLabelStyle: {
            fontSize: 12,
            color: "grey",
            activeTintColor: "#4298a2",
          },
          tabBarItemStyle: { height: 60 },
          tabBarStyle: { backgroundColor: "#1A3C40" },
          tabBarIndicatorStyle: { backgroundColor: "#4298a2", height: 3 },
          swipeEnabled: true,
        }}
      >
        <Tab.Screen
          name="feedbackscreens"
          component={feedbackscreens}
          options={{
            title: ({ color, focused }) => (
              <Icons
                size={25}
                name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
                color={focused ? "#4298a2" : "#272727"}
                style={{ padding: 5 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="FAQs"
          component={FAQs}
          options={{
            title: ({ color, focused }) => (
              <Icons
                size={25}
                name={
                  focused
                    ? "ios-information-circle"
                    : "ios-information-circle-outline"
                }
                color={focused ? "#4298a2" : "#272727"}
                style={{ padding: 5 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Reviews"
          component={Reviews}
          options={{
            title: ({ color, focused }) => (
              <Icons
                size={25}
                name={focused ? "bulb-sharp" : "bulb-outline"}
                color={focused ? "#4298a2" : "#272727"}
                style={{ padding: 5 }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  buttonstyle: {
    width: 100,
    height: 25,
    backgroundColor: "#315559",

    marginRight: 9,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
  },
  buttontext: {
    color: "white",
    fontSize: 14,
    padding: 0,
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  text1: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginRight: 100,
  },
  cartCard: {
    height: 160,
    elevation: 15,
    backgroundColor: "#ffff",
    marginVertical: 2,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  cartCard2: {
    flexShrink: 1,
    height: 160,
    elevation: 15,
    backgroundColor: "#c1dbdb",
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#ffff",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 0,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginRight: 100,
  },
  text4: {
    fontSize: 20,
    marginRight: 50,
    textAlign: "left",
    fontWeight: "bold",
    marginTop: 10,
    width: "100%",
    padding: 5,
  },
});
