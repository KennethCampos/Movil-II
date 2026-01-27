import { View, Text, FlatList, StyleSheet } from "react-native";
import { useState } from "react";
import { coursesData } from "./src/data/courses";
import CourseItem from "./src/components/CourseItem";

export default function App() {
  const [availableCourses, setAvailableCourses] = useState(coursesData);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const creditPrice = 12000;

  // Mover a cursos seleccionados
  const selectCourse = (course) => {
    setAvailableCourses(availableCourses.filter(c => c.id !== course.id));
    setSelectedCourses([...selectedCourses, course]);
  };

  // Regresar a cursos disponibles
  const removeCourse = (course) => {
    setSelectedCourses(selectedCourses.filter(c => c.id !== course.id));
    setAvailableCourses([...availableCourses, course]);
  };

  const totalCredits = selectedCourses.reduce(
    (sum, course) => sum + course.creditos,
    0
  );

  const totalCost = totalCredits * creditPrice;

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Cursos Disponibles</Text>

      <FlatList
        data={availableCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseItem
            item={item}
            color="#b3e5fc"
            onPress={() => selectCourse(item)}
          />
        )}
      />

      <Text style={styles.header}> Cursos por Matricular</Text>

      <FlatList
        data={selectedCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseItem
            item={item}
            color="#c8e6c9"
            onPress={() => removeCourse(item)}
          />
        )}
      />

      <View style={styles.summary}>
        <Text>Total de créditos: {totalCredits}</Text>
        <Text>Costo total: ₡{totalCost.toLocaleString()}</Text>
      </View>
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
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15
  },
  summary: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#eeeeee",
    borderRadius: 8
  }
});
