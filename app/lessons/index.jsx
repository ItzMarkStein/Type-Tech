import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet , ImageBackground } from "react-native";
import { useRouter } from "expo-router";

const lessons = [
  { id: "1", title: "What is TechType?" },
  { id: "2", title: "Why is it called TechType?" },
];

export default function LessonsScreen() {
  const router = useRouter();

  return (
    <ImageBackground
          source={{ uri: "https://imgur.com/uXuJlj9.jpg" }} 
          style={styles.background}
          resizeMode="cover"
        >
    <View style={styles.container}>
      <Text style={styles.header}>TypeTech</Text>
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/lessons/${item.id}`)}
          >
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
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
    padding: 50, 
    backgroundColor: "rgba(26, 26, 26, 0.53)" 
  },
  header: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#ffffffff",
    marginTop: 45,
  },
  card: {
    marginBottom: 30,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "rgba(26, 26, 26, 0.7)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#777777ff",
    width: 400,
  },
  title: { fontSize: 18, fontWeight: "600", color: "#fff" },
});
