import { Image, View, FlatList, StyleSheet, Text } from "react-native";
import { zodiacData } from "./src/data/zodiacData";
import ZodiacItem from "./src/components/ZodiacItem";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}> Zodiaco</Text>

      <FlatList
        data={zodiacData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ZodiacItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10
  }
});
