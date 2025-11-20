import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect} from 'react';
import PostCard from '../components/PostCard';
import { getPostsApi, searchPostApi, filterPostBySubject } from '../../services/api/posts';

const subjects = [
  {label:"Biology", value:"biology"},
  {label:"Chemistry", value:"chemistry"},
  {label:"Physics", value:"physics"},
  {label:"Mathematics", value:"mathematics"},
  {label:"Computer Science", value:"computer_science"},
  {label:"Information Technology", value:"information_technology"},
  {label:"Engineering", value:"engineering"},
  {label:"Environmental Science", value:"environmental_science"},
  {label:"History", value:"history"},
  {label:"Literature", value:"literature"},
  {label:"Philosophy", value:"philosophy"},
  {label:"Languages", value:"languages"},
  {label:"Music", value:"music"},
  {label:"Fine Arts", value:"fine_arts"},
  {label:"Cultural Studies", value:"cultural_studies"},
  {label:"Psychology", value:"psychology"},
  {label:"Sociology", value:"sociology"},
  {label:"Political Science", value:"political_science"},
  {label:"Economics", value:"economics"},
  {label:"Anthropology", value:"anthropology"},
  {label:"Geography", value:"geography"},
  {label:"Accounting", value:"accounting"},
  {label:"Finance", value:"finance"},
  {label:"Marketing", value:"marketing"},
  {label:"Management", value:"management"},
  {label:"Business Administration", value:"business_administration"},
  {label:"Law", value:"law"},
  {label:"International Relations", value:"international_relations"},
  {label:"Medicine", value:"medicine"},
  {label:"Nursing", value:"nursing"},
  {label:"Pharmacy", value:"pharmacy"},
  {label:"Public Health", value:"public_health"},
  {label:"Physiotherapy", value:"physiotherapy"},
  {label:"Education", value:"education"},
  {label:"Media & Communication", value:"media_communication"},
  {label:"Architecture", value:"architecture"},
  {label:"Design", value:"design"},
  {label:"Theology / Religious Studies", value:"theology"},
];

const Explore = () => {
  const [searchInput, setSearchInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const data = await getPostsApi();
    setPosts(data);
  }

  async function handleSearch() {
    if  (searchInput.trim() === "") {
      loadPosts();
      return;
    }

    const results = await searchPostApi(searchInput);
    setPosts(results);
    setActiveFilter(null);
  }

  async function handleFilter(subject) {
    if (activeFilter === subject) {
      setActiveFilter(null);
      loadPosts();
      return;
    }

    setActiveFilter(subject);

    const filtered = await filterPostBySubject(subject);
    setPosts(filtered);
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBox}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Search by key words or subjects"
          value={searchInput}
          onChangeText={setSearchInput}
          onSubmitEditing={handleSearch}
        />
      </View>

      {/* Subject Filters */}
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterRow}
      >
        {subjects.map((subj) => (
          <TouchableOpacity
            key={subj.value}
            style={[
              styles.filterButton,
              activeFilter === subj.value && styles.activeFilter
            ]}
            onPress={() => handleFilter(subj.value)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === subj.value && styles.activeFilterText
              ]}
            >
              {subj.label}
            </Text>
          </TouchableOpacity>          
        ))}
      </ScrollView>
      <View style={styles.underline} />

      {/* Posts */}
      <FlatList 
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <PostCard post={item} />}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  searchBox: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  searchInput: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
  },
  filterRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginBottom: 10,
    height: 90,
  },
  filterButton: {
    backgroundColor: '#E5FFF5',
    height: 45,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    margin: 5,
  },
  filterText: {
    color: '#2b2b2b',
    fontFamily: 'Inter_600SemiBold',
  },
  activeFilter: {
    backgroundColor: '#2b8a6d',
  },
  activeFilterText: {
    color: 'white',
  },
  underline: {
    width: "100%",
    height: 1,
    backgroundColor: "#e7e7e7ff",
    marginTop: 3,
  },
})

export default Explore