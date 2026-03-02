import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../redux/slices/cartSlice";

const CartScreen = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = () => {
    Alert.alert("Payment", "Payment Successful ✅");
    dispatch(clearCart());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping Cart</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 140 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Cart is empty
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Imagen */}
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>

              {/* Botones cantidad */}
              <View style={styles.qtyContainer}>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => dispatch(decreaseQty(item.id))}
                >
                  <Text style={styles.qtyText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.quantity}>
                  {item.quantity}
                </Text>

                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => dispatch(increaseQty(item.id))}
                >
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => dispatch(removeFromCart(item.id))}
              >
                <Text style={{ color: "white" }}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Sección inferior fija */}
      {items.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.total}>
            Total: ${total.toFixed(2)}
          </Text>

          <TouchableOpacity
            style={styles.payButton}
            onPress={handlePayment}
          >
            <Text style={styles.buttonText}>Pay Now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => dispatch(clearCart())}
          >
            <Text style={styles.buttonText}>
              Clear Cart
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    marginRight: 10,
  },

  title: {
    fontWeight: "600",
  },

  price: {
    marginTop: 4,
    fontWeight: "bold",
  },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },

  qtyButton: {
    backgroundColor: "black",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  qtyText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
  },

  removeButton: {
    backgroundColor: "#d9534f",
    padding: 6,
    borderRadius: 8,
    marginTop: 5,
    alignItems: "center",
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "right",
  },

  payButton: {
    backgroundColor: "green",
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
    alignItems: "center",
  },

  clearButton: {
    backgroundColor: "black",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});