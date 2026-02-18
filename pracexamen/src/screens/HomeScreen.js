import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";

import { getPlaces } from "../api/api";
import { setPlaces, setLoading } from "../store/placesSlice";
import PlaceCard from "../components/PlaceCard";

export default function HomeScreen({ navigation }) {

  const dispatch = useDispatch();
  const places = useSelector((state) => state.places.places);
  const loading = useSelector((state) => state.places.loading);

  const [city, setCity] = useState("Barcelona");
  const [category, setCategory] = useState("attraction");
  const [count, setCount] = useState(0);

  const cities = [
    "Amsterdam",
    "Barcelona",
    "Berlin",
    "Dubai",
    "London",
    "Paris",
    "Rome",
    "Tuscany"
  ];

  const fetchPlaces = async (selectedCategory = category) => {
    try {
      dispatch(setLoading(true));

      const results = await getPlaces(city, selectedCategory, "");

      setCount(results.length);
      dispatch(setPlaces(results));
      setCategory(selectedCategory);

    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchPlaces("attraction");
  }, []);

  return (
    <View style={{ padding: 20 }}>

      {/* BOTÓN FAVORITOS */}
      <Button
        title="Ver Favoritos"
        onPress={() => navigation.navigate("Favorites")}
      />

      {/* SELECTOR DE CIUDAD */}
      <Text style={{ fontWeight: "bold", marginTop: 10 }}>
        Selecciona Ciudad:
      </Text>

      <Picker
        selectedValue={city}
        onValueChange={(itemValue) => setCity(itemValue)}
      >
        {cities.map((c) => (
          <Picker.Item key={c} label={c} value={c} />
        ))}
      </Picker>

      <Button
        title="Buscar en esta ciudad"
        onPress={() => fetchPlaces(category)}
      />

      {/* BOTONES DE CATEGORÍA */}
      <View style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginVertical: 10
      }}>
        <Button title="Atracciones" onPress={() => fetchPlaces("attraction")} />
        <Button title="Restaurantes" onPress={() => fetchPlaces("restaurant")} />
        <Button title="Alojamientos" onPress={() => fetchPlaces("accommodation")} />
        <Button title="POI" onPress={() => fetchPlaces("poi")} />
      </View>

      {/* CONTADOR */}
      <Text style={{ marginVertical: 10, fontWeight: "bold" }}>
        Hay {count} {category} en {city}
      </Text>

      {loading && <Text>Cargando...</Text>}

      <FlatList
        data={places}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <PlaceCard
            place={item}
            onPress={() =>
              navigation.navigate("Detail", { place: item })
            }
          />
        )}
      />

    </View>
  );
}