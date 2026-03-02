import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItem, AuthUser } from "../types";

// Keys
const USER_KEY = "USER_DATA";
const CART_KEY = "CART_DATA";

// USER STORAGE


export const saveUser = async (user: AuthUser) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.log("Error saving user", error);
  }
};

export const getUser = async (): Promise<AuthUser | null> => {
  try {
    const data = await AsyncStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log("Error getting user", error);
    return null;
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.log("Error removing user", error);
  }
};


//  CART STORAGE


export const saveCart = async (cart: CartItem[]) => {
  try {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.log("Error saving cart", error);
  }
};

export const getCart = async (): Promise<CartItem[]> => {
  try {
    const data = await AsyncStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Error getting cart", error);
    return [];
  }
};

export const removeCart = async () => {
  try {
    await AsyncStorage.removeItem(CART_KEY);
  } catch (error) {
    console.log("Error removing cart", error);
  }
};