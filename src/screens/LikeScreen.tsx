import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { colors, fontFamily } from '../theme'
import ImageCard from '../components/ImageCard'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { LikeImagesContext } from '../context/LikeImageContext'

const LikeScreen = () => {
  const { likeImages, clearLikedImages } = React.useContext(LikeImagesContext)
  console.log("likeImages", likeImages)
  return (
    <View style={styles.container}>
      {/* remove all liked images */}
      {
        likeImages.length > 0 && <TouchableOpacity onPress={clearLikedImages}>
        <Text style={{ color: colors.textColor, textAlign: 'right' }}>Clear all</Text>
      </TouchableOpacity>
      }
        <Text style={styles.title}>Liked Image</Text>
        <FlatList
          data={likeImages}
          renderItem={({ item }) => (
            <ImageCard
              item={item}
            />
          )}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            [
              styles.listContainer,
              likeImages.length === 0 && styles.emptyListContainer
            ]
          }
          ListEmptyComponent={() => <View style={styles.emptyStateContainer}>
            <AntIcon name={'hearto'} size={80} color={colors.textColor} />
            <Text style={styles.emptyStateText}>No Liked Image</Text>
            <Text style={styles.subText}>Browse and like images to see them here</Text>
          </View>}
        />
    </View>
  )
}

export default LikeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
  },
  title: {
    color: colors.textColor,
    fontSize: 28,
    fontFamily: fontFamily.bold,
    marginVertical: 20,
    textAlign: 'center',
  },
  emptyStateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    flex: 1,
  },
  emptyStateText: {
    color: colors.textColor,
    fontSize: 20,
    fontFamily: fontFamily.medium,
    marginTop: 20,
    textAlign: 'center',
  },
  subText: {
    color: colors.textColor,
    fontSize: 16,
    fontFamily: fontFamily.regular,
    marginTop: 10,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 50,
  },
  emptyListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})