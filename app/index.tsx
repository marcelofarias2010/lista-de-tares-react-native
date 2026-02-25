import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TaskItem from "../components/Task";
import { colors } from "../constants/colors";
import { Task } from "../types/task";

// const initialTasks = [
//   { id: 1, completed: true, text: "Fazer café" },
//   { id: 2, completed: false, text: "Estudar React Native" },
//   { id: 3, completed: false, text: "Academia" },
// ];

const STORAGE_KEY = "@tasks";

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState("");

  /* =========================
     🔹 CARREGAR TASKS
  ========================== */
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const json = await AsyncStorage.getItem("tasks");
        if (json) {
          setTasks(JSON.parse(json));
        }
      } catch (err) {
        console.error("Erro ao carregar tarefas:", err);
      }
    };

    loadTasks();
  }, []);

  /* =========================
     🔹 SALVAR TASKS
  ========================== */
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      } catch (err) {
        console.error("Erro ao salvar tarefas:", err);
      }
    };

    saveTasks();
  }, [tasks]);

  /* =========================
     🔹 ADICIONAR TASK
  ========================== */
  const addTask = () => {
    if (!text.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
    setText("");
  };

  /* =========================
     🔹 REMOVER TASK
  ========================== */
  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.rowContainer}>
        <Image source={require("../assets/images/check.png")} style={styles.image} />
        <Text style={styles.title}>Minhas Tarefas</Text>
      </View>

      <View style={styles.rowContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          style={styles.input}
          //keyboardType="number-pad"
          //keyboardType="email-address"
          //keyboardType="phone-pad"
        />

        <Pressable
          onPress={addTask}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? "#3a5bdc" : colors.primary },
          ]}
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            text={item.text}
            initialCompleted={item.completed}
            deleteTask={() =>
              setTasks((prev) => prev.filter((t) => t.id !== item.id))
            }
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
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
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  mainContainer: {
    margin: 20,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
});
