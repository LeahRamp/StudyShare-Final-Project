import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import PostCard from '../components/PostCard';

const dummyPosts = [
  {
    id: 1,
    username: 'John Doe',
    profile_image: 'https://i.pravatar.cc/150?img=1',
    text: 'Just finished my first React Native app!',
    link: 'https://reactnative.dev/',
    image: 'https://picsum.photos/200/300',
    document: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 2,
    username: 'Jane Smith',
    profile_image: 'https://i.pravatar.cc/150?img=2',
    text: 'Check out this cool article!',
    link: 'https://www.example.com',
    image: null,
    document: null,
  },
  {
    id: 3,
    username: 'Alex92',
    profile_image: 'https://i.pravatar.cc/150?img=3',
    text: 'No attachments here, just text!',
    link: null,
    image: null,
    document: null,
  },
];


const Home = () => {
  const [posts, setPosts] = useState(dummyPosts);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
});

export default Home
