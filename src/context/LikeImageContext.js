import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { createContext, useState } from "react";
import { ToastAndroid } from "react-native";

const LikeImagesContext = createContext();

const LikeImagesProvider = ({ children }) => {
    const [likeImages, setLikeImages] = useState([]);

    const toggleLikeImage = async (genImage) => {
        try {
            let likedImages = await AsyncStorage.getItem('likedImages');
            likedImages = likedImages ? JSON.parse(likedImages) : [];
            const imageExist = likedImages.some((item) => item._id === genImage._id);
            if (imageExist) {
                likedImages = likedImages.filter((item) => item._id !== genImage._id);
                ToastAndroid.show("Image removed from liked images", ToastAndroid.SHORT);
            } else {
                likedImages.push(genImage);
                ToastAndroid.show("Image added to liked images", ToastAndroid.SHORT);
            }
            await AsyncStorage.setItem('likedImages', JSON.stringify(likedImages));
            setLikeImages(likedImages);
        } catch (error) {
            console.error("Error toggling like image: ", error);
            ToastAndroid.show("An error occurred", ToastAndroid.SHORT);
        }
    }

    const clearLikedImages = async () => {
        try {
            await AsyncStorage.clear();
            setLikeImages([]);
            ToastAndroid.show("All liked images cleared", ToastAndroid.SHORT);
        } catch (error) {
            console.error("Error clearing liked images: ", error);
            ToastAndroid.show("An error occurred", ToastAndroid.SHORT);
        }
    }

    return (
        <LikeImagesContext.Provider value={{ likeImages, setLikeImages, toggleLikeImage, clearLikedImages }}>
            {children}
        </LikeImagesContext.Provider>
    );
}

export { LikeImagesProvider, LikeImagesContext };