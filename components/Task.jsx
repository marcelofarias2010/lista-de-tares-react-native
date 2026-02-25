import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, Pressable } from "react-native";
import { colors } from "../constants/colors";
import { useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function Task({ text, initialCompleted, deleteTask }) {
  const [completed, setCompleted] = useState(initialCompleted);

  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX > 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd(() => {
      if (translateX.value > 120) {
        translateX.value = withTiming(500, {}, () => {
          runOnJS(deleteTask)();
        });
      } else {
        translateX.value = withTiming(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.rowContainer, animatedStyle]}>
        <Pressable
          onPress={() => setCompleted((prev) => !prev)}
          style={styles.pressable}
        >
          <Ionicons
            name="checkmark-circle"
            size={28}
            color={completed ? colors.primary : "gray"}
          />
          <Text
            style={[
              styles.text,
              completed && styles.textCompleted,
            ]}
          >
            {text}
          </Text>
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    marginBottom: 10,
    backgroundColor: "#FFF",
    borderRadius: 8,
    elevation: 2,
  },
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
  },
  text: {
    fontSize: 16,
  },
  textCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
});
