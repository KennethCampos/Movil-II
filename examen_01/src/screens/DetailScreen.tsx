import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { RootStackParamList } from "../navigation/AppNavigator";

type DetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "Detail"
>;

type Props = {
  route: DetailScreenRouteProp;
};

const DetailScreen = ({ route }: Props) => {
  const { product } = route.params;
  const dispatch = useDispatch();

  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
      />

      <Text style={styles.title}>{product.title}</Text>

      <Text style={styles.price}>${product.price}</Text>

      <Text style={styles.description}>
        {product.description}
      </Text>

      <Pressable
        onPress={handleAddToCart}
        style={({ pressed }) => [
          styles.addButton,
          pressed && styles.addButtonPressed,
          added && styles.addedButton,
        ]}
      >
        <Text style={styles.addButtonText}>
          {added ? "Added ✓" : "Add to Cart"}
        </Text>
      </Pressable>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  image: {
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  description: {
    fontSize: 14,
    color: "#555",
  },

  addButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
    alignItems: "center",
  },

  addButtonPressed: {
    backgroundColor: "#333", // más oscuro cuando presionas
  },

  addedButton: {
    backgroundColor: "green", // cambia a verde cuando se agrega
  },

  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});