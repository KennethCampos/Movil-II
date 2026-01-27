import { View, Text, Image, StyleSheet } from "react-native";

export default function ZodiacItem({ item }) {
  return (
    <View style={styles.card}>
      <Image source={item.imagen} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title}>{item.nombre}</Text>
        <Text> {item.fechas}</Text>
        <Text> Elemento: {item.elemento}</Text>
        <Text> Astro: {item.astro}</Text>
        <Text>Piedra: {item.piedra}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#f2f2f2",
    borderRadius: 10
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  info: {
    flex: 1,
    justifyContent: "center"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold"
  }
});
