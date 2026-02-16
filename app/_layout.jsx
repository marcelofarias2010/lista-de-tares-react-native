import { Alert, Button, Image, ScrollView, Text, TextInput } from "react-native";
import logo from "../assets/images/checklist.png";

export default function RootLayout() {
    return (
      <ScrollView>
        <Image source={logo} />
        <Text>Olá mundo</Text>
        <TextInput />
        <Button
          title="+"
          onPress={() => Alert.alert("Olá")}
        />
      </ScrollView>
    )
}
