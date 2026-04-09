import { useUser } from "@/context/UserContext";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <Text>Nombre: {user.name}</Text>
      <Text>Correo: {user.email}</Text>
      <Text>Carrera: {user.career}</Text>
      <Text>Semestre: {user.semester}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
});