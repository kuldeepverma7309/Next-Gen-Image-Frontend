import { Image, Modal, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, fontFamily } from '../theme'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { requestWriteStoragePermission } from '../utils'
import ReactNativeBlobUtil from 'react-native-blob-util'
import Share from 'react-native-share';
import Clipboard from '@react-native-clipboard/clipboard';


interface propsType {
  item: {
    imageUrl: string,
    prompt: string
  }
}
const ImageCard = ({ item }: propsType) => {
  // const [showModal, setShowModal] = React.useState(false)
  const [isDownloading, setIsDownloading] = React.useState(false)
  const [downloadProgress, setDownloadProgress] = React.useState(0)
  const [isProcessing, setIsProcessing] = React.useState(false)

  const handleDownload = async () => {
    // ask the permissions from local memory for downloading
    const isGranted = await requestWriteStoragePermission()
    if (!isGranted) return
    // download the file using react-native blob utils
    const imageUrl = item.imageUrl
    let PictureDir = ReactNativeBlobUtil.fs.dirs.PictureDir;
    const filePath = `${PictureDir}/download_image_${new Date().getTime()}.png`
    setIsDownloading(true)
    ReactNativeBlobUtil.config({
      path: filePath,
      appendExt: 'png',
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: filePath,
        description: "Downloading Image",
        mime: "image/png",
        mediaScannable: true
      }
    }).fetch('GET', imageUrl).progress({ interval: 100 }, (received, total) => {
      console.log(`received: ${received} total: ${total}`)
      let percentage = Math.floor(received / total) * 100
      setDownloadProgress(percentage)
    }).then((res) => {
      // console.log('The file saved to ', res.path())
      copyMediaToStorage(filePath, filePath)
      setIsDownloading(false)
      setDownloadProgress(0)
      ToastAndroid.show('Image downloaded successfully', ToastAndroid.SHORT)
    }).catch((error) => {
      console.log('Error downloading the file', error)
      setIsDownloading(false)
    })
  }

  const copyMediaToStorage = async (filePath: string, fileName: string) => {
    try {
      await ReactNativeBlobUtil.MediaCollection.copyToMediaStore({
        name: fileName,
        parentFolder: "Next Gen-Image",
        mimeType: "image/png",
      },
        "Download",
        filePath
      )
      console.log("file copied to media store")
    } catch (error) {
      console.log("Failed to copy file to media store", error)
    }
  }

  const processImageToShare = async () => {
    // ask the permissions from local memory for downloading
    const isGranted = await requestWriteStoragePermission()
    if (!isGranted) return
    // download the file using react-native blob utils
    const imageUrl = item.imageUrl
    let PictureDir = ReactNativeBlobUtil.fs.dirs.PictureDir;
    const filePath = `${PictureDir}/download_image_${new Date().getTime()}.png`
    setIsProcessing(true)
    ReactNativeBlobUtil.config({
      path: filePath,
      appendExt: 'png',
      fileCache: true,
      // addAndroidDownloads: {
      //   useDownloadManager: false,
      //   notification: false,
      //   path: filePath,
      //   description: "Downloading Image",
      //   mime: "image/png",
      //   mediaScannable: true
      // }
    }).fetch('GET', imageUrl).progress({ interval: 100 }, (received, total) => {
      console.log(`received: ${received} total: ${total}`)
      let percentage = Math.floor(received / total) * 100
      setDownloadProgress(percentage)
    }).then((res) => {
      setIsProcessing(false)
      setDownloadProgress(0)
      // ToastAndroid.show('Image downloaded successfully', ToastAndroid.SHORT)
      const base64Data = res.data
      if (!base64Data) {
        ToastAndroid.show('No Image to share', ToastAndroid.SHORT)
        return null
      }
      const options = {
        title: 'Share Image',
        message: 'Checkout this image',
        url: `file://${base64Data}`,
        type: 'image/png',
      }
      Share.open(options)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });
    }).catch((error) => {
      console.log('Error downloading the file', error)
      setIsProcessing(false)
      return null
    })
  }

  const handleShare = async () => {
    // you have to download the image first and then get base64 data format and then share it
    await processImageToShare()
  }

  const handleCopy = () => {
    const imageUrl = item.imageUrl;
    // copy the url into clipboard
    Clipboard.setString(imageUrl)
    ToastAndroid.show('Image URL copied to clipboard', ToastAndroid.SHORT)
  }

  return (
    <View style={styles.imageCard}>
      {/* image */}
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image} resizeMode='cover'
      />
      {/* prompt */}
      <Text style={styles.prompt} numberOfLines={2} ellipsizeMode='tail'>
        {item?.prompt || 'No Prompt'}
      </Text>
      {/* button container */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
          <Ionicons name='download-outline' size={20} color={colors.textColor} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Ionicons name='share-social-outline' size={20} color={colors.textColor} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleCopy}>
          <Ionicons name='copy-outline' size={20} color={colors.textColor} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name='heart-outline' size={20} color={colors.textColor} />
        </TouchableOpacity>
      </View>

      {/* modal */}
      <Modal transparent={true} visible={isDownloading || isProcessing} animationType='slide'>
        <View style={styles.overlay}>
          <View style={styles.progressContainer}>
            <Text style={styles.progressTitle}>
              {isDownloading ? 'Downloading Image' : 'Processing Image'}
            </Text>
            <Text style={styles.progressText}>
             {
                isDownloading ? `${downloadProgress}%` : 'Processing'
             }
            </Text>
            <Text style={styles.progressDescription}>
              {isDownloading ? 'Please wait while we download the image' : 'Please wait while we process the image'}
            </Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${downloadProgress}%` }]}>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ImageCard

const styles = StyleSheet.create({
  imageCard: {
    width: '100%',
    padding: 20,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  prompt: {
    color: colors.textColor,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    backgroundColor: colors.secondary,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  progressTitle: {
    color: colors.textColor,
    fontFamily: fontFamily.bold,
    fontSize: 20,
    marginBottom: 10,
  },
  progressText: {
    color: colors.textColor,
    fontFamily: fontFamily.bold,
    fontSize: 24,
    marginBottom: 10,
  },
  progressDescription: {
    color: colors.textColor,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  progressBarContainer: {
    backgroundColor: colors.primary,
    width: '100%',
    height: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  progressBar: {
    backgroundColor: colors.accent,
    height: 10,
    borderRadius: 5,
  },

})