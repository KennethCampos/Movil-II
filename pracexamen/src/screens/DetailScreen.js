import React from "react";
import { View, Text, Button, Linking, ScrollView, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../store/placesSlice";

export default function DetailScreen({ route }) {

  const { place } = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.places.favorites);

  const openWebsite = () => {
    if (place.website) {
      Linking.openURL(place.website);
    }
  };

  const handleAddFavorite = () => {
    if (favorites.length >= 5) {
      Alert.alert("Límite alcanzado", "Solo puedes guardar 5 favoritos.");
      return;
    }

    dispatch(addFavorite(place));
    Alert.alert("Éxito", "Lugar agregado a favoritos.");
  };

  return (
    <ScrollView style={{ padding: 20 }}>

      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        {place.name}
      </Text>

      <Text style={{ marginBottom: 10 }}>
        {place.description || "Sin descripción disponible."}
      </Text>

      <Text>Dirección: {place.address || "No disponible"}</Text>
      <Text>Teléfono: {place.phone || "No disponible"}</Text>
      <Text>Email: {place.email || "No disponible"}</Text>
      <Text>Horario: {place.openingHours || "No disponible"}</Text>

      <View style={{ marginTop: 15 }}>
        {place.website && (
          <Button
            title="Abrir Sitio Web"
            onPress={openWebsite}
          />
        )}
      </View>

      <View style={{ marginTop: 15 }}>
        <Button
          title="Agregar a Favoritos"
          onPress={handleAddFavorite}
        />
      </View>

    </ScrollView>
  );
}