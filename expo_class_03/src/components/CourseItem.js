import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function CourseItem({ item, onPress, color }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, { backgroundColor: color }]}>
        <Text style={styles.title}>{item.codigo} - {item.nombre}</Text>
        <Text>Nivel: {item.nivel}</Text>
        <Text>Créditos: {item.creditos}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 8
  },
  title: {
    fontWeight: "bold"
  }
});
