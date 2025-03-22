import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, fontFamily } from '../theme'
import ImageCard from '../components/ImageCard'


const DiscoverScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false)
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

  const onRefresh = () => {
    setRefreshing(true)
    // make api call here
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ImageCard item={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.textColor}
          />
        }
      />
    </View>
  )
}

export default DiscoverScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
  },
  title: {
    color: colors.textColor,
    fontSize: 20,
    fontFamily: fontFamily.bold,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 15,
  }
})