import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, fontFamily } from '../theme'
import ImageCard from '../components/ImageCard'
import AntIcon from 'react-native-vector-icons/AntDesign'

const LikeScreen = () => {

  const data = [
    {
      id: 1,
      imageUrl: 'https://imgs.search.brave.com/OHitbAHYrFwttbW5gavNIcnsttVlZTewLFw2f6F2n9A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWd2/My5mb3Rvci5jb20v/aW1hZ2VzL2dhbGxl/cnkvZ2VuZXJhdGUt/YS1yZWFsaXN0aWMt/YWktYXZhdGFyLW9m/LWEtc3R5bGlzaC13/b21hbi1pbi1mb3Rv/cl8yMDI1LTAzLTA1/LTA5MzU1OF9zbHNo/LmpwZw',
      prompt: "What's your favorite thing about the city you live in?",
    },
    {
      id: 2,
      imageUrl: 'https://imgs.search.brave.com/OHitbAHYrFwttbW5gavNIcnsttVlZTewLFw2f6F2n9A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWd2/My5mb3Rvci5jb20v/aW1hZ2VzL2dhbGxl/cnkvZ2VuZXJhdGUt/YS1yZWFsaXN0aWMt/YWktYXZhdGFyLW9m/LWEtc3R5bGlzaC13/b21hbi1pbi1mb3Rv/cl8yMDI1LTAzLTA1/LTA5MzU1OF9zbHNo/LmpwZw',
      prompt: "What's your favorite thing about the city you live in?",
    },
    {
      id: 3,
      imageUrl: 'https://imgs.search.brave.com/OHitbAHYrFwttbW5gavNIcnsttVlZTewLFw2f6F2n9A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWd2/My5mb3Rvci5jb20v/aW1hZ2VzL2dhbGxl/cnkvZ2VuZXJhdGUt/YS1yZWFsaXN0aWMt/YWktYXZhdGFyLW9m/LWEtc3R5bGlzaC13/b21hbi1pbi1mb3Rv/cl8yMDI1LTAzLTA1/LTA5MzU1OF9zbHNo/LmpwZw',
      prompt: "What's your favorite thing about the city you live in?",
    },
    {
      id: 4,
      imageUrl: 'https://imgs.search.brave.com/OHitbAHYrFwttbW5gavNIcnsttVlZTewLFw2f6F2n9A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWd2/My5mb3Rvci5jb20v/aW1hZ2VzL2dhbGxl/cnkvZ2VuZXJhdGUt/YS1yZWFsaXN0aWMt/YWktYXZhdGFyLW9m/LWEtc3R5bGlzaC13/b21hbi1pbi1mb3Rv/cl8yMDI1LTAzLTA1/LTA5MzU1OF9zbHNo/LmpwZw',
      prompt: "What's your favorite thing about the city you live in?",
    },
    {
      id: 5,
      imageUrl: 'https://imgs.search.brave.com/OHitbAHYrFwttbW5gavNIcnsttVlZTewLFw2f6F2n9A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWd2/My5mb3Rvci5jb20v/aW1hZ2VzL2dhbGxl/cnkvZ2VuZXJhdGUt/YS1yZWFsaXN0aWMt/YWktYXZhdGFyLW9m/LWEtc3R5bGlzaC13/b21hbi1pbi1mb3Rv/cl8yMDI1LTAzLTA1/LTA5MzU1OF9zbHNo/LmpwZw',
      prompt: "What's your favorite thing about the city you live in?",
    },
    {
      id: 6,
      imageUrl: 'https://imgs.search.brave.com/OHitbAHYrFwttbW5gavNIcnsttVlZTewLFw2f6F2n9A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWd2/My5mb3Rvci5jb20v/aW1hZ2VzL2dhbGxl/cnkvZ2VuZXJhdGUt/YS1yZWFsaXN0aWMt/YWktYXZhdGFyLW9m/LWEtc3R5bGlzaC13/b21hbi1pbi1mb3Rv/cl8yMDI1LTAzLTA1/LTA5MzU1OF9zbHNo/LmpwZw',
      prompt: "What's your favorite thing about the city you live in?",
    }
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liked Image</Text>
      <FlatList 
      data={data}
      renderItem={({item})=>(
        <ImageCard 
        item={item}
        />
      )}
      keyExtractor={(item)=>item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={
        [
          styles.listContainer,
          data.length ===0 && styles.emptyListContainer
        ]
      }
      ListEmptyComponent={()=><View style={styles.emptyStateContainer}>
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