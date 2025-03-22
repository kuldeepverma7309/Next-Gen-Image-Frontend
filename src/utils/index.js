import { Alert, PermissionsAndroid, Platform } from "react-native";

export const requestWriteStoragePermission = async () => {
  try {
    console.log('Platform.version: ', Platform.Version)
    if (Platform.Version >= 33) {
      console.log("No permission needed for this version");
      return true;
    }
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Next Gen-Image Storage Permisson',
        message:
          'Next Gen-Image needs access to your storage ' +
          'to download the pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the storage');
      return true
    } else {
      Alert.alert("Permission Denied", "You need to give storage permission to download the images", [{ text: "OK" }]);
      console.log('Storage permission denied');
      return false;
    }
  } catch (err) {
    console.log(err);
    Alert.alert("Error","There is an issue requesting storage permission. Please try again", [{ text: "OK" }]);
    return false;
  }
};