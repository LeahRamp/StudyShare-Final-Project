import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PostCard = ({ post }) => {
  const navigation = useNavigation();

  const handleLinkPress = (url) => {
    if (url) Linking.openURL(url);
  };

  const handleDocumentPress = (docUrl) => {
    if (docUrl) Linking.openURL(docUrl);
  };

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userSection}>
            <Image source={{ uri: post.profile_image }} style={styles.avatar} />
            <View>
              <Text style={styles.username}>{post.username}</Text>
              <Text style={styles.subtext}>Shared a post</Text>
            </View>
          </View>

          {/* 3-dot menu */}
          <TouchableOpacity onPress={() => navigation.navigate('Report', { postId: post.id })}>
            <Entypo name="dots-three-horizontal" size={18} color="#FBAC74" />
          </TouchableOpacity>
        </View>

        {/* Text Content */}
        {post.text ? <Text style={styles.text}>{post.text}</Text> : null}

        {/* Optional Link */}
        {post.link ? (
          <TouchableOpacity onPress={() => handleLinkPress(post.link)}>
            <Text style={styles.link}>{post.link}</Text>
          </TouchableOpacity>
        ) : null}

        {/* Optional Image */}
        {post.image ? <Image source={{ uri: post.image }} style={styles.postImage} /> : null}

        {/* Optional Document */}
        {post.document ? (
          <TouchableOpacity style={styles.docContainer} onPress={() => handleDocumentPress(post.document)}>
            <Ionicons name="document-text-outline" size={16} color="#666" />
            <Text style={styles.docText}>{post.document.split('/').pop()}</Text>
          </TouchableOpacity>
        ) : null}

        {/* Footer - Like Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.likeButton}>
            <Ionicons name="heart-outline" size={22} color="#ff7b7b" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider line between posts */}
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    width: '100%',
    alignItems: 'stretch',
  },
  card: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical:30,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 10,
  },
  username: {
    fontFamily: 'PlayfairDisplay_700Bold', 
    fontSize: 15,
    color: '#222',
  },
  subtext: {
    fontFamily: 'Inter_400Regular',
    color: '#aaa',
    fontSize: 13,
  },
  text: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#333',
    marginVertical: 10,
    lineHeight: 20,
  },
  link: {
    fontFamily: 'Inter_400Regular',
    color: '#7CA8F8',
    textDecorationLine: 'underline',
    marginBottom: 10,
    fontSize: 14,
  },
  postImage: {
    width: '100%',
    height: 400,
    borderRadius: 12,
    marginBottom: 10,
  },
  docContainer: {
    fontFamily: 'Inter_400Regular',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  docText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#444',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#e7e7e7ff', 

  },
});

export default PostCard;
