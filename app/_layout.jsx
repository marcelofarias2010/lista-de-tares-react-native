import {
  Alert,
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import logo from "../assets/images/checklist.png";
import { colors } from "../constants/colors";

export default function RootLayout() {
  return (
    <ScrollView style={style.mainContainer}>
      <View>
        <Image source={logo} style={style.image} />
        <Text style={style.title}>Minhas tarefas</Text>
      </View>

      <View style={style.rowContainer}>
        <TextInput style={style.input} />
        <Pressable
          onPress={() => Alert.alert("Oi")}
          style={({ pressed }) => [
            style.button,
            { backgroundColor: pressed ? "blue" : colors.primary }
          ]}
        >
          <Text style={style.buttonText}>+</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 30,
    fontFamily: "Calibri",
    fontWeight: 600,
    color: colors.primary,
  },
  input: {
    height: 40,
    paddingHorizontal: 16,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    flexGrow: 1,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  mainContainer: {
    marginTop: 20,
    margin: 20,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
});
