import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  FlatList,
  ListItem,
} from "react-native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import DatePicker from "react-native-modern-datepicker";
import SelectList from "react-native-dropdown-select-list";
import DropDownPicker from "react-native-dropdown-picker";
import MultiSelect from "react-native-multiple-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import Icons from "react-native-vector-icons/FontAwesome5";

export default function App() {
  let url = "http://127.0.0.1:5000/";
  let urls = "http://localhost:3000/";

  const FirstScreen = ({ navigation }) => {
    const [carname, setname] = useState("");
    const [mileage, setmileage] = useState();
    const [getCity, setCity] = useState("");
    const [capacity, setcapacity] = useState();
    const [year, setyear] = useState();
    const [getres, setres] = useState();
    const [color, setcolor] = useState("");
    const [bodytype, setbodytype] = useState("");
    const [getcondition, setcondition] = useState(true);
    const [getmodalvisible, setModalVisible] = React.useState(false);

    // const storedata = async () => {
    //   try {
    //     console.log('Saving');
    //     var arr = [
    //       {
    //         Name: name,
    //         Engine_Type: value,
    //         Transmission: value2,
    //         Color: color,
    //         Assembly: value3,
    //         Body_Type: bodytype,
    //         Mileage: mileage,
    //         Model_Year: year,

    //       },
    //     ];
    //     await AsyncStorage.setItem('@store1:key', JSON.stringify(arr));
    //     console.log('Saving Done!');
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    const _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem("@store1:key");
        if (value !== null) {
          // We have data!!
          console.log(value);
        }
      } catch (error) {
        // Error retrieving data
      }
    };

    const submit = () => {
      let name = carname.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      );
      if (
        carname.length > 0 &&
        mileage.length > 0 &&
        getCity.length > 0 &&
        capacity.length > 0 &&
        color.length > 0 &&
        bodytype.length > 0
      ) {
        let formData = new FormData();
        formData.append("Name", name);
        formData.append("Engine_Type", value);
        formData.append("Transmission", value2);
        formData.append("Color", color);
        formData.append("Assembly", value3);
        formData.append("Body_Type", bodytype);
        formData.append("Mileage", mileage);
        formData.append("Model_Year", year);

        fetch("http://localhost:5000/predict", {
          method: "POST",
          mode: "cors",
          body: formData,
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson.Prediction);

            setres(responseJson.Prediction);
            setModalVisible(true);
          })
          .catch((error) => console.log("error", error));
      } else {
        console.log("Nahi a rha");

        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Please fill all the fields",
        });
      }
    };
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: "Petrol", value: "Petrol" },
      { label: "Diesel", value: "Diesel" },
      { label: "Hybrid", value: "Hybrid" },
    ]);

    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(null);
    const [items2, setItems2] = useState([
      { label: "Automatic", value: "Automatic" },
      { label: "Manual", value: "Manual" },
    ]);

    const [open3, setOpen3] = useState(false);
    const [value3, setValue3] = useState(null);
    const [items3, setItems3] = useState([
      { label: "Imported", value: "Imported" },
      { label: "Local", value: "Local" },
    ]);

    const [open4, setOpen4] = useState(false);
    const [value4, setValue4] = useState([]);
    const [items4, setItems4] = useState([
      { label: "ABS", name: "ABS" },
      { label: "AM/FM Radio", name: "AM/FM Radio" },
      { label: "Air Bags", name: "Air Bags" },
      { label: "Conditioning", name: "Conditioning" },
      { label: "CD Player", name: "CD Player" },
      { label: "DVD Player", name: "DVD Player" },
      { label: "Immobilizer Key", name: "Immobilizer Key" },
      { label: "Keyless Entry", name: "Keyless Entry" },
      { label: "Navigation System", name: "Navigation System" },
      { label: "Power Locks", name: "Power Locks" },
      { label: "Power Mirrors", name: "Power Mirrors" },
      { label: "Power Steering", name: "Power Steering" },
      { label: "Power Windows", name: "Power Windows" },
    ]);
    const [selectedItems, setSelectedItems] = useState([]);

    const onSelectedItemsChange = (selectedItems) => {
      // Set Selected Items
      setSelectedItems(selectedItems);
    };

    var arr = [
      {
        Name: carname,
        Engine_Type: value,
        Transmission: value2,
        Color: color,
        Assembly: value3,
        Body_Type: bodytype,
        Mileage: mileage,
        Model_Year: year,
        City: getCity,
        Capacity: capacity,
        Features: selectedItems,
        Price: getres,
      },
    ];

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fcfd" }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fffafd",
          }}
        >
          <Modal animationType="fade" visible={getmodalvisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={{ textAlign: "center" }}>
                  Your Predicted Price
                  {getres}
                </Text>
                <View>
                  <Image
                    style={{
                      resizeMode: "cover",
                      height: 90,
                      width: 100,
                    }}
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/1300/1300302.png",
                    }}
                  />
                </View>
                <View>
                  <Pressable
                    style={{
                      backgroundColor: "#829460",
                      width: 120,
                      height: 30,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 7,
                    }}
                    onPress={() => {
                      // storedata();
                      console.log(arr);
                      navigation.navigate("SecondScreen", { ar: arr });
                      setModalVisible(false);
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 13,
                        fontWeight: "bold",
                      }}
                    >
                      Do you want to save it?
                    </Text>
                  </Pressable>
                </View>
                <View>
                  <Pressable
                    style={{
                      backgroundColor: "#829460",
                      width: 120,
                      height: 30,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 7,
                    }}
                    onPress={() => {
                      // _retrieveData();
                      setModalVisible(false);
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 13,
                        fontWeight: "bold",
                      }}
                    >
                      Go back
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <ScrollView>
          <View
            style={{
              backgroundColor: "#829460",
              padding: 6,
              width: "100%",
              height: 83,
            }}
          >
            <View style={styles.header}>
              <Text style={styles.text1}>Car Price Prediction.</Text>
              <Image
                style={{
                  resizeMode: "cover",
                  height: 90,
                  width: 100,
                }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/1048/1048315.png",
                }}
              />
            </View>
          </View>

          <View>
            <Text
              style={{
                marginTop: 20,
                fontSize: 25,
                marginRight: 90,
                fontWeight: "bold",
                marginLeft: 20,
              }}
            >
              Welcome to Car Sale & Buy.
            </Text>
            <Text
              style={{
                marginTop: 7,
                fontSize: 15,
                marginRight: 100,
                marginLeft: 20,
                color: "grey",
              }}
            >
              Please fill out the following form to predict your vehicle price.
            </Text>
          </View>
          <View style={{ width: "100%" }}>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={carname}
                onChangeText={(carname) => setname(carname)}
                placeholder="Car Name"
                placeholderTextColor="#8b9cb5"
                clearButtonMode="always"
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={year}
                onChangeText={(year) => setyear(year)}
                placeholder="Year" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="number-pad"
                underlineColorAndroid="#f000"
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={mileage}
                onChangeText={(mileage) => setmileage(mileage)}
                placeholder="Mileage" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="number-pad"
                underlineColorAndroid="#f000"
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={getCity}
                onChangeText={(getCity) => setCity(getCity)}
                placeholder="Registered City"
                placeholderTextColor="#8b9cb5"
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
                marginLeft: 35,
                marginRight: 35,

                height: 47,
                flex: 1,
              }}
            >
              <DropDownPicker
                style={styles.inputStyle}
                containerStyle={{ height: 47, width: 150 }}
                placeholder="Select Engine Type"
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />
              <DropDownPicker
                style={styles.inputStyle}
                containerStyle={{ height: 47, width: 150 }}
                placeholder="Select Transmission"
                open={open2}
                value={value2}
                items={items2}
                setOpen={setOpen2}
                setValue={setValue2}
                setItems={setItems2}
              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={capacity}
                onChangeText={(capacity) => setcapacity(capacity)}
                placeholder="Engine Capacity"
                placeholderTextColor="#8b9cb5"
                keyboardType="number-pad"
                underlineColorAndroid="#f000"
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
                marginLeft: 35,
                marginRight: 35,

                height: 47,
                flex: 1,
              }}
            >
              <TextInput
                style={styles.inputStyle}
                value={color}
                onChangeText={(color) => setcolor(color)}
                placeholder="Car Color"
                placeholderTextColor="#8b9cb5"
                clearButtonMode="always"
              />
              <DropDownPicker
                style={styles.inputStyle}
                containerStyle={{ height: 47, width: 150 }}
                placeholder="Select Assembly"
                open={open3}
                value={value3}
                items={items3}
                setOpen={setOpen3}
                setValue={setValue3}
                setItems={setItems3}
              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={bodytype}
                onChangeText={(bodytype) => setbodytype(bodytype)}
                placeholder="Body Type"
                placeholderTextColor="#8b9cb5"
                clearButtonMode="always"
              />
            </View>
            <View
              style={{
                width: 330,
                height: 47,
                marginTop: 20,
                marginLeft: 35,
                marginRight: 35,
                margin: 10,
              }}
            >
              <MultiSelect
                hideTags
                items={items4}
                uniqueKey="label"
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={selectedItems}
                selectText="Pick Features"
                searchInputPlaceholderText="Search Items..."
                onChangeInput={(text) => console.log(text)}
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: "#CCC" }}
                submitButtonColor="#48d22b"
                submitButtonText="Submit"
              />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <TouchableOpacity
                style={styles.buttonstyle}
                onPress={() => {
                  submit();
                }}
              >
                <Text style={styles.buttontext}>Continue...</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  const SecondScreen = ({ navigation, route }) => {
    // var arr = AsyncStorage.getItem('@store1:key');
    var { ar } = route.params;
    const [username, setuname] = useState();
    const [phonenum, setphonenum] = useState();

    const sendrequest = () => {
      fetch("http://localhost:3000/car/addcar", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: ar[0].Name,
          Engine_Type: ar[0].Engine_Type,
          Transmission: ar[0].Transmission,
          Color: ar[0].Color,
          Assembly: ar[0].Assembly,
          Body_Type: ar[0].Body_Type,
          Mileage: ar[0].Mileage,
          City: ar[0].City,
          Capacity: ar[0].Capacity,
          Price: ar[0].Price,
          Features: ar[0].Features,
          Username: username,
          User_Contact: phonenum,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
        })
        .catch((error) => console.log("error", error));
    };

    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9fcfd",
        }}
      >
        <View
          style={{
            backgroundColor: "#829460",
            padding: 6,
            width: "100%",
            height: 83,
          }}
        >
          <View style={styles.header}>
            <Text style={styles.text1}>Car Price Prediction.</Text>
            <Image
              style={{
                resizeMode: "cover",
                height: 90,
                width: 100,
              }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/1048/1048315.png",
              }}
            />
          </View>
        </View>
        <FlatList
          style={{ marginTop: 10, width: "100%" }}
          data={ar}
          renderItem={({ item }) => {
            return (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 20,
                  }}
                >
                  <View
                    style={{
                      height: 80,
                      width: 80,
                      backgroundColor: "white",
                      borderRadius: 5,
                      shadowOffset: { width: 1, height: 2 },
                      shadowOpacity: 1.5,
                      shadowRadius: 2,
                      elevation: 4,
                    }}
                  >
                    <Image
                      style={{
                        resizeMode: "cover",
                        height: 33,
                        width: 33,
                        marginLeft: 20,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/741/741407.png",
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        marginLeft: 10,
                      }}
                    >
                      {item.Name}
                    </Text>
                  </View>

                  <View
                    style={{
                      height: 80,
                      width: 80,
                      backgroundColor: "white",
                      borderRadius: 5,
                      shadowOffset: { width: 1, height: 2 },
                      shadowOpacity: 1.5,
                      shadowRadius: 2,
                      elevation: 4,
                    }}
                  >
                    <Image
                      style={{
                        resizeMode: "cover",
                        height: 33,
                        width: 33,
                        marginLeft: 20,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/3462/3462067.png",
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        marginLeft: 10,
                      }}
                    >
                      {item.Price}
                    </Text>
                  </View>

                  <View
                    style={{
                      height: 80,
                      width: 80,
                      backgroundColor: "white",
                      borderRadius: 5,
                      shadowOffset: { width: 1, height: 2 },
                      shadowOpacity: 1.5,
                      shadowRadius: 2,
                      elevation: 4,
                    }}
                  >
                    <Image
                      style={{
                        resizeMode: "cover",
                        height: 33,
                        width: 33,
                        marginLeft: 20,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/2413/2413653.png",
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        marginLeft: 10,
                      }}
                    >
                      {item.Model_Year}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 20,
                  }}
                >
                  <View
                    style={{
                      height: 80,
                      width: 80,
                      backgroundColor: "white",
                      borderRadius: 5,
                      shadowOffset: { width: 1, height: 2 },
                      shadowOpacity: 1.5,
                      shadowRadius: 2,
                      elevation: 4,
                    }}
                  >
                    <Image
                      style={{
                        resizeMode: "cover",
                        height: 33,
                        width: 33,
                        marginLeft: 20,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/2384/2384796.png",
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        marginLeft: 10,
                      }}
                    >
                      {item.Engine_Type}
                    </Text>
                  </View>

                  <View
                    style={{
                      height: 80,
                      width: 80,
                      backgroundColor: "white",
                      borderRadius: 5,
                      shadowOffset: { width: 1, height: 2 },
                      shadowOpacity: 1.5,
                      shadowRadius: 2,
                      elevation: 4,
                    }}
                  >
                    <Image
                      style={{
                        resizeMode: "cover",
                        height: 33,
                        width: 33,
                        marginLeft: 20,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/2061/2061918.png",
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        marginLeft: 10,
                      }}
                    >
                      {item.Transmission}
                    </Text>
                  </View>

                  <View
                    style={{
                      height: 80,
                      width: 80,
                      backgroundColor: "white",
                      borderRadius: 5,
                      shadowOffset: { width: 1, height: 2 },
                      shadowOpacity: 1.5,
                      shadowRadius: 2,
                      elevation: 4,
                    }}
                  >
                    <Image
                      style={{
                        resizeMode: "cover",
                        height: 33,
                        width: 33,
                        marginLeft: 20,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/2202/2202865.png",
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        marginLeft: 10,
                      }}
                    >
                      {item.Color}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 20,
                  }}
                >
                  <View
                    style={{
                      height: 80,
                      width: 80,
                      backgroundColor: "white",
                      borderRadius: 5,
                      shadowOffset: { width: 1, height: 2 },
                      shadowOpacity: 1.5,
                      shadowRadius: 2,
                      elevation: 4,
                    }}
                  >
                    <Image
                      style={{
                        resizeMode: "cover",
                        height: 33,
                        width: 33,
                        marginLeft: 20,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/7425/7425459.png",
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        marginLeft: 10,
                      }}
                    >
                      {item.Assembly}
                    </Text>
                  </View>

                  <View
                    style={{
                      height: 80,
                      width: 80,
                      backgroundColor: "white",
                      borderRadius: 5,
                      shadowOffset: { width: 1, height: 2 },
                      shadowOpacity: 1.5,
                      shadowRadius: 2,
                      elevation: 4,
                    }}
                  >
                    <Image
                      style={{
                        resizeMode: "cover",
                        height: 33,
                        width: 33,
                        marginLeft: 20,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/1048/1048315.png",
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        marginLeft: 10,
                      }}
                    >
                      {item.Body_Type}
                    </Text>
                  </View>

                  <View
                    style={{
                      height: 80,
                      width: 80,
                      backgroundColor: "white",
                      borderRadius: 5,
                      shadowOffset: { width: 1, height: 2 },
                      shadowOpacity: 1.5,
                      shadowRadius: 2,
                      elevation: 4,
                    }}
                  >
                    <Image
                      style={{
                        resizeMode: "cover",
                        height: 33,
                        width: 33,
                        marginLeft: 20,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/1599/1599739.png",
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        marginLeft: 10,
                      }}
                    >
                      {item.Mileage}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 20,
                  }}
                >
                  <View
                    style={{
                      height: 80,
                      width: 80,
                      backgroundColor: "white",
                      borderRadius: 5,
                      shadowOffset: { width: 1, height: 2 },
                      shadowOpacity: 1.5,
                      shadowRadius: 2,
                      elevation: 4,
                    }}
                  >
                    <Image
                      style={{
                        resizeMode: "cover",
                        height: 33,
                        width: 33,
                        marginLeft: 20,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/562/562460.png",
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        marginLeft: 10,
                      }}
                    >
                      {item.City}
                    </Text>
                  </View>

                  <View
                    style={{
                      height: 80,
                      width: 80,
                      backgroundColor: "white",
                      borderRadius: 5,
                      shadowOffset: { width: 1, height: 2 },
                      shadowOpacity: 1.5,
                      shadowRadius: 2,
                      elevation: 4,
                    }}
                  >
                    <Image
                      style={{
                        resizeMode: "cover",
                        height: 33,
                        width: 33,
                        marginLeft: 20,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/7654/7654868.png",
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        marginLeft: 10,
                      }}
                    >
                      {item.Capacity}
                    </Text>
                  </View>

                  <View
                    style={{
                      height: 80,
                      width: 80,
                      backgroundColor: "white",
                      borderRadius: 5,
                      shadowOffset: { width: 1, height: 2 },
                      shadowOpacity: 1.5,
                      shadowRadius: 2,
                      elevation: 4,
                    }}
                  >
                    <Image
                      style={{
                        resizeMode: "cover",
                        height: 33,
                        width: 33,
                        marginLeft: 20,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/1541/1541425.png",
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        marginLeft: 10,
                      }}
                    >
                      {item.Features}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        <View>
          <Text
            style={{
              fontSize: 18,
              marginRight: 140,
              marginTop: 20,
              fontWeight: "bold",
              color: "#829460",
            }}
          >
            Enter You Details
          </Text>
        </View>
        <View style={{ width: "100%" }}>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              value={username}
              onChangeText={(username) => setuname(username)}
              placeholder="User Name"
              placeholderTextColor="#8b9cb5"
              clearButtonMode="always"
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              value={phonenum}
              onChangeText={(phonenum) => setphonenum(phonenum)}
              placeholder="Phone Number" //12345
              placeholderTextColor="#8b9cb5"
              keyboardType="number-pad"
              underlineColorAndroid="#f000"
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            style={{
              width: 100,
              height: 25,
              backgroundColor: "#829460",

              marginLeft: 179,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 9,
            }}
            onPress={() => {
              sendrequest();
            }}
          >
            <Text style={styles.buttontext}>Submit...</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="SecondScreen" component={SecondScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fffff",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
  },

  text1: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginRight: 40,
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: "#dadae8",
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 0,
  },
  buttonstyle: {
    width: 100,
    height: 25,
    backgroundColor: "#829460",

    marginRight: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
  },
  buttontext: {
    color: "white",
    fontSize: 14,
    padding: 0,
  },
  SectionStyle: {
    flexDirection: "row",
    height: 47,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
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
});
