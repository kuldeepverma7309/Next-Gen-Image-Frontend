import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fontFamily } from '../theme'
import ImageCard from '../components/ImageCard'
import { api } from '../utils/api'


const DiscoverScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false)
  const [page, setPage] = React.useState(1)
  const [images, setImages] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(true)

  // const handleFetchImages = async () => {
  //   try {
  //     setLoading(true)
  //     const response = await api.get('/discover-image', {
  //       params: {
  //         limit: 10,
  //         page
  //       }
  //     })
  //     console.log(response.data)
  //     setImages((prev:any)=>[...prev, ...response.data.images])
  //     setHasNextPage(response.data.totalPages > page)
  //   } catch (error) {
  //     ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
  //     console.log(error);
  //   }
  //   finally {
  //     setLoading(false)
  //   }
  // }

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);

    try {
      const response = await api.get('/discover-image', { params: { limit: 10, page: 1 } });
      setImages(response.data.images); // Purana data hata diya
      setHasNextPage(response.data.totalPages > 1);
    } catch (error) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleFetchImages = async () => {
    if (loading || !hasNextPage) return;

    try {
      setLoading(true);
      const response = await api.get('/discover-image', {
        params: { limit: 10, page }
      });

      // New data ko old data ke sath merge karte hue, duplicates ko filter karenge
      setImages((prev: any) => {
        const mergedData = [...prev, ...response.data.images];
        const uniqueImages = Array.from(new Map(mergedData.map(item => [item._id, item])).values());
        return uniqueImages;
      });

      setHasNextPage(response.data.totalPages > page);
    } catch (error) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };



  const handleLoadMore = async () => {
    if (hasNextPage) {
      setPage(page + 1)
    }
  }

  // const onRefresh = async () => {
  //   setRefreshing(true);
  //   setImages([]); // Purana data clear karo
  //   setPage(1);

  //   try {
  //     const response = await api.get('/discover-image', { params: { limit: 10, page: 1 } });
  //     setImages(response.data.images);
  //     setHasNextPage(response.data.totalPages > 1);
  //   } catch (error) {
  //     ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
  //     console.log(error);
  //   } finally {
  //     setRefreshing(false);
  //   }
  // };



  useEffect(() => {
    handleFetchImages()
  }, [page, refreshing])


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover</Text>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <ImageCard item={item} />
        )}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.textColor}
          />
        }
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color={colors.textColor} /> : null
        }
        onEndReached={handleLoadMore}
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