import React, { useEffect } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFavorite,
  clearFavorites,
} from "../store/placesSlice";

import {
  saveFavoritesToStorage,
  loadFavoritesFromStorage,
  clearFavoritesFromStorage,
} from "../utils/storage";

import PlaceCard from "../components/PlaceCard";

export default function FavoritesScreen({ navigation }) {

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.places.favorites);

  // Cargar favoritos al abrir la pantalla
  useEffect(() => {
    const loadData = async () => {
      const storedFavorites = await loadFavoritesFromStorage();
      storedFavorites.forEach((place) =>
        dispatch({ type: "places/addFavorite", payload: place })
      );
    };

    loadData();
  }, []);

  // Guardar cambios en storage cada vez que cambian favoritos
  useEffect(() => {
    saveFavoritesToStorage(favorites);
  }, [favorites]);

  const handleRemove = (place) => {
    dispatch(removeFavorite(place));
  };

  const handleClearAll = async () => {
    dispatch(clearFavorites());
    await clearFavoritesFromStorage();
  };

  return (
    <View style={{ padding: 20 }}>

      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 15 }}>
        Mis Favoritos (Máx 5)
      </Text>

      {favorites.length === 0 && (
        <Text>No tienes favoritos guardados.</Text>
      )}

      <FlatList
        data={favorites}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <PlaceCard
              place={item}
              onPress={() =>
                navigation.navigate("Detail", { place: item })
              }
            />
            <Button
              title="Eliminar"
              onPress={() => handleRemove(item)}
            />
          </View>
        )}
      />

      {favorites.length > 0 && (
        <Button
          title="Eliminar Todos"
          onPress={handleClearAll}
        />
      )}
    </View>
  );
}