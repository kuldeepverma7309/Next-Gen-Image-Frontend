import { ActivityIndicator, Linking, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, fontFamily } from '../theme'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import ImageCard from '../components/ImageCard'
import axios from 'axios'
import { api } from '../utils/api'

const HomeScreen = () => {
  const [prompt, setPrompt] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [image, setImage] = React.useState("");
  const handleOpenLink = () => {
    const url = 'https://www.linkedin.com/in/kuldeepverma7309';
    Linking.openURL(url)
      .then(() => console.log('URL successfully opened'))
      .catch(err => console.log('Error opening URL:', err));
  };

  const handleGenerateImage = async () => {
    try {
      if (prompt.length === 0) {
        ToastAndroid.show('Please enter prompt', ToastAndroid.SHORT);
        return;
      }
      setIsLoading(true);
      const response = await api.post('/generate-image', {
        prompt: prompt
      })
      console.log(response.data.image.imageUrl);
      setImage(response.data.image.imageUrl);
      ToastAndroid.show('Image generated successfully', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.appLogoContainer}>
        <Text style={styles.appName}>Next Gen-Image</Text>
        <TouchableOpacity onPress={handleOpenLink}>
          <Text style={styles.madeby}>Made by {" "}
            <Text style={[styles.madeby, { textDecorationLine: 'underline' }]}>Kuldeep Verma</Text>
          </Text>
        </TouchableOpacity>
      </View>
      {/* input container */}

      <View style={styles.textInputWrapper}>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder='Enter your prompt...'
            placeholderTextColor={"#808080"}
            multiline={true}
            style={styles.textInput}
            value={prompt}
            onChangeText={(text) => setPrompt(text)}
          />
          {
            prompt.length > 0 && (
              <TouchableOpacity style={styles.clearButton} onPress={() => setPrompt('')}>
                <MaterialIcon name="close" size={24} color={colors.textColor} />
              </TouchableOpacity>
            )
          }
        </View>
      </View>
      {/* generate Button */}
      <TouchableOpacity style={styles.generateButton} onPress={handleGenerateImage}>
        {
          isLoading ? (
            <ActivityIndicator size={'small'} color={colors.textColor} />
          ) : (
            <Text style={styles.generateText}>Generate</Text>
          )
        }
      </TouchableOpacity>
      {/* description */}
      {
        !image && (
          <Text style={styles.description}>
            Generate high quality images with a single click. Just enter your prompt and click on generate button.
          </Text>
        )
      }

      {
        image && (
          <View style={styles.imageWrapper}>
            {/* image card */}
            <ImageCard item={{ imageUrl: image, prompt: "Generate an AI Image" }} />
          </View>
        )
      }

      {/* footer */}
      {
        !image && (
          <View>
            <Text style={styles.footer}>
              Powered by Together.ai & Flux
            </Text>
          </View>
        )
      }
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 30,
  },

  appLogoContainer: {
    alignItems: 'center',
    marginTop: 30,
  },

  appName: {
    color: colors.textColor,
    fontFamily: fontFamily.bold,
    fontSize: 32,
    textAlign: 'center',
  },

  madeby: {
    color: colors.textColor,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },

  // input container

  textInputWrapper: {
    marginTop: 30,
  },

  textInputContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 10,
    position: 'relative',
  },

  textInput: {
    color: colors.textColor,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    width: '100%',
    maxHeight: 400,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#222",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  clearButton: {
    position: 'absolute',
    right: 12,
    top: 12,
  },

  // generate Button

  generateButton: {
    backgroundColor: colors.buttonBackground,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    borderWidth: 1,
    // borderBottomWidth: 10,
    borderColor: '#f8f2f2',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },

  generateText: {
    color: colors.buttonText,
    fontFamily: fontFamily.semiBold,
    fontSize: 20,
    textAlign: 'center',
  },

  // description
  description: {
    color: colors.textColor,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },

  // footer
  footer: {
    color: colors.textColor,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
  },

  imageWrapper: {
    marginTop: 20,
    alignItems: 'center',

  }
})