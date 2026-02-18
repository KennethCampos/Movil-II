import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function PlaceCard({ place, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#ffffff",
        padding: 15,
        marginVertical: 8,
        borderRadius: 12,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#eee"
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>
        {place.name}
      </Text>

      {place.categoryType && (
        <Text style={{ color: "#007BFF", fontWeight: "bold", marginBottom: 5 }}>
          {place.categoryType}
        </Text>
      )}

      <Text style={{ color: "#555" }}>
        {place.address || "Dirección no disponible"}
      </Text>
    </TouchableOpacity>
  );
}