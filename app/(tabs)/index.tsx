import { useUser } from "@/context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const { user, setUser } = useUser();

  const [form, setForm] = useState({
    name: "",
    email: "",
    career: "",
    semester: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await AsyncStorage.getItem("user_data");

    if (data) {
      const parsed = JSON.parse(data);
      setUser(parsed);
      setForm(parsed);
    }
  };

  const saveUser = async () => {
    await AsyncStorage.setItem("user_data", JSON.stringify(form));
    setUser(form);
    alert("Guardado");
  };

  const clearUser = async () => {
    await AsyncStorage.removeItem("user_data");
    setUser({
      name: "",
      email: "",
      career: "",
      semester: "",
    });
    setForm({
      name: "",
      email: "",
      career: "",
      semester: "",
    });
  };

  const update = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>

      <TextInput placeholder="Nombre" style={styles.input} value={form.name} onChangeText={(v) => update("name", v)} />
      <TextInput placeholder="Correo" style={styles.input} value={form.email} onChangeText={(v) => update("email", v)} />
      <TextInput placeholder="Carrera" style={styles.input} value={form.career} onChangeText={(v) => update("career", v)} />
      <TextInput placeholder="Semestre" style={styles.input} value={form.semester} onChangeText={(v) => update("semester", v)} />

      <Button title="Guardar" onPress={saveUser} />
      <View style={{ height: 10 }} />
      <Button title="Eliminar" onPress={clearUser} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
});