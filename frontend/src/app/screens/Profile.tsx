import { FlatList, Image, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PostCard from '../components/PostCard'
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { getLikedPostsApi, getMyPostsApi } from '../../services/api/posts';

export default function Profile() {
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<('posts' | 'liked')>('posts')

  const [myPosts, setMyPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchActiveTabData();
  }, [activeTab]);

  const fetchActiveTabData = async () => {
    if (activeTab === 'posts') {
      const posts = await getMyPostsApi();
      setMyPosts(posts);
    } else {
      const posts = await getLikedPostsApi();
      setLikedPosts(posts);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchActiveTabData();
    setIsRefreshing(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.updateButton} onPress={() => navigation.navigate('UpdateProfile')}><Text style={styles.updateButtonText}>Update Profile</Text></Pressable>
        <View style={styles.profileInfo}>
          <Image style={styles.profileImage} source={{ uri: user.profile_picture }} />
          <Text style={styles.displayName}>{user.display_name}</Text>
          <Text style={styles.bio}>{user.profile_description}</Text>
        </View>
      </View>
      <View style={styles.tabBar}>
        <Pressable style={styles.tab} onPress={() => setActiveTab('posts')}>
          <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTabText]}>Posts</Text>
        </Pressable>
        <Pressable style={styles.tab} onPress={() => setActiveTab('liked')}>
          <Text style={[styles.tabText, activeTab === 'liked' && styles.activeTabText]}>Liked</Text>
        </Pressable>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={activeTab === 'posts' ? myPosts : likedPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} />}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
  },
  updateButton: {
    alignSelf: 'flex-end',
    padding: 8,
    backgroundColor: '#12CE90',
    borderRadius: 100,
  },
  updateButtonText: {
    color: '#fff',
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
  },
  profileInfo: {
    marginHorizontal: 24,
    marginBottom: 32,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e4e4e4',
    marginBottom: 12,
  },
  displayName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
  },
  bio: {
    fontFamily: 'Inter_200ExtraLight',
    fontSize: 12,
    color: '#000',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e4e4e4',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#000',
  },
  activeTabText: {
    textDecorationLine: 'underline',
    fontFamily: 'Inter_700Bold',
  }
})