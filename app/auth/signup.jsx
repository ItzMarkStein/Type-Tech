import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet , ImageBackground } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { router } from "expo-router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ImageBackground
          source={{ uri: "https://imgur.com/NVebnT0.jpg" }} 
          style={styles.background}
          resizeMode="cover"
        >
    <View style={styles.container}>
      <Text style={styles.title}>TypeTech</Text>
      <Text style={styles.subtitle}>Create your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Text style={styles.link}>Log in instead?</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background : {
    flex:1 ,
  },
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgba(26, 26, 26, 0.53)",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 50,
    color: "#ffffffff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#181818ff",
    color: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
    width: 400,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#ffffffff",
    padding: 13,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    width: 300,
  },
  buttonText: {
    color: "#1a1a1a",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#ffffffff",
    textAlign: "center",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
