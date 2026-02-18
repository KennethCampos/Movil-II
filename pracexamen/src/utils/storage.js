import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "favorites";

// Guardar favoritos
export const saveFavoritesToStorage = async (favorites) => {
  try {
    await AsyncStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(favorites)
    );
  } catch (error) {
    console.log("Error guardando favoritos:", error);
  }
};

// Cargar favoritos
export const loadFavoritesFromStorage = async () => {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Error cargando favoritos:", error);
    return [];
  }
};

// Limpiar favoritos
export const clearFavoritesFromStorage = async () => {
  try {
    await AsyncStorage.removeItem(FAVORITES_KEY);
  } catch (error) {
    console.log("Error limpiando favoritos:", error);
  }
};