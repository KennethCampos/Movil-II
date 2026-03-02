import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchCategories,
  fetchByCategory,
} from "../redux/slices/productSlice";
import { RootState, AppDispatch } from "../redux/store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, categories, loading } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      {/* Header con carrito arriba */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Fake Store</Text>

        <TouchableOpacity
          style={styles.cartTopButton}
          onPress={() => navigation.navigate("Cart")}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            🛒
          </Text>
        </TouchableOpacity>
      </View>

      {/* Categorías */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => dispatch(fetchProducts())}
        >
          <Text style={styles.categoryText}>All</Text>
        </TouchableOpacity>

        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={styles.categoryButton}
            onPress={() => dispatch(fetchByCategory(cat))}
          >
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Productos */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Detail", { product: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text numberOfLines={1} style={styles.title}>
              {item.title}
            </Text>
            <Text style={styles.price}>${item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  header: {
    fontSize: 22,
    fontWeight: "bold",
  },

  cartTopButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 25,
  },

  categoryButton: {
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 25,
    marginRight: 10,
  },

  categoryText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },

  card: {
    flex: 1,
    margin: 6,
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    elevation: 3,
  },

  image: {
    height: 100,
    resizeMode: "contain",
    marginBottom: 8,
  },

  title: {
    fontSize: 12,
  },

  price: {
    fontWeight: "bold",
    marginTop: 5,
  },
});