import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList
} from 'react-native';
import { Search as SearchIcon, X, Filter, Star, Play, Clock, Bookmark } from 'lucide-react-native';

interface Movie {
  id: number;
  title: string;
  category: string;
  year: string;
  rating: string;
  time: string;
  image: string;
}

export default function Search(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'The Avengers', 'Inception', 'Interstellar', 'Tenet'
  ]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [categories, setCategories] = useState<string[]>([
    'All', 'Movies', 'TV Shows', 'Documentaries', 'Animation'
  ]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [bookmarkedMovies, setBookmarkedMovies] = useState<number[]>([]);

  // Mock search results based on query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    // Simulate search results
    const mockResults: Movie[] = [
      {
        id: 1,
        title: 'The Avengers: Endgame',
        category: 'Action',
        year: '2019',
        rating: '9.2',
        time: '3h 2m',
        image: 'https://picsum.photos/400/240?random=1'
      },
      {
        id: 2,
        title: 'Inception',
        category: 'Sci-Fi',
        year: '2010',
        rating: '8.8',
        time: '2h 28m',
        image: 'https://picsum.photos/400/240?random=2'
      },
      {
        id: 3,
        title: 'Interstellar',
        category: 'Sci-Fi',
        year: '2014',
        rating: '8.6',
        time: '2h 49m',
        image: 'https://picsum.photos/400/240?random=3'
      },
      {
        id: 4,
        title: 'The Dark Knight',
        category: 'Action',
        year: '2008',
        rating: '9.0',
        time: '2h 32m',
        image: 'https://picsum.photos/400/240?random=4'
      },
      {
        id: 5,
        title: 'Pulp Fiction',
        category: 'Crime',
        year: '1994',
        rating: '8.9',
        time: '2h 34m',
        image: 'https://picsum.photos/400/240?random=5'
      }
    ];

    setSearchResults(
      mockResults.filter(movie => 
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  const handleClearSearch = (): void => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const saveRecentSearch = (query: string): void => {
    if (query.trim() === '') return;
    
    if (!recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 3)]);
    }
  };

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
    saveRecentSearch(query);
  };

  const removeRecentSearch = (query: string): void => {
    setRecentSearches(recentSearches.filter(item => item !== query));
  };
  
  const toggleBookmark = (movieId: number): void => {
    if (bookmarkedMovies.includes(movieId)) {
      setBookmarkedMovies(bookmarkedMovies.filter(id => id !== movieId));
    } else {
      setBookmarkedMovies([...bookmarkedMovies, movieId]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFCFC]">
      <StatusBar barStyle="dark-content" />
      <View className="flex-1 px-6 pt-2">
        {/* Search Header */}
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-[#05422C] text-2xl font-semibold font-redrose">Search</Text>
        </View>
        
        {/* Search Input */}
        <View className="flex-row items-center bg-[#E0EBE3] rounded-xl px-4 mb-6">
          <SearchIcon stroke="#05422C" size={20} />
          <TextInput
            className="flex-1 py-3 px-2 text-[#05422C]"
            placeholder="Search movies, TV shows..."
            placeholderTextColor="#05422C80"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch}>
              <X stroke="#05422C" size={20} />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mb-6 max-h-[4%]"
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              className={`mr-3 py-2 px-5 rounded-full h-fit ${
                category === activeCategory ? 'bg-[#05422C]' : 'bg-[#E0EBE3]'
              }`}
              onPress={() => setActiveCategory(category)}
            >
              <Text
                className={`${
                  category === activeCategory ? 'text-white' : 'text-[#05422C]'
                } text-md font-medium h-fit`}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Content - Search Results or Recent Searches */}
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {searchQuery.length > 0 ? (
            <>
              {/* Search Results */}
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-gray-900 text-lg font-medium">Search Results</Text>
                <TouchableOpacity className="bg-[#E0EBE3] p-2 rounded-full">
                  <Filter stroke="#05422C" size={16} />
                </TouchableOpacity>
              </View>

              {searchResults.length > 0 ? (
                <View>
                  {searchResults.map((movie) => (
                    <TouchableOpacity
                      key={movie.id}
                      className="mb-4 flex-row bg-white rounded-2xl overflow-hidden shadow-sm"
                    >
                      <Image
                        source={{ uri: movie.image }}
                        className="w-24 h-32"
                        resizeMode="cover"
                      />
                      <View className="flex-1 p-3 justify-between">
                        <View>
                          <View className="flex-row justify-between items-start">
                            <Text className="text-gray-900 text-base font-bold mb-1 flex-1 mr-2">
                              {movie.title}
                            </Text>
                            <TouchableOpacity
                              onPress={() => toggleBookmark(movie.id)}
                            >
                              <Bookmark
                                stroke={bookmarkedMovies.includes(movie.id) ? "#05422C" : "#05422C"}
                                fill={bookmarkedMovies.includes(movie.id) ? "#05422C" : "none"}
                                size={18}
                              />
                            </TouchableOpacity>
                          </View>
                          <View className="flex-row items-center mb-2">
                            <View className="bg-[#E0EBE3] px-2 py-1 rounded-full mr-2">
                              <Text className="text-[#05422C] text-xs">{movie.category}</Text>
                            </View>
                            <Text className="text-gray-600 text-xs mr-2">{movie.year}</Text>
                            <Clock stroke="#05422C" size={12} />
                            <Text className="text-gray-600 text-xs ml-1">{movie.time}</Text>
                          </View>
                        </View>
                        <View className="flex-row justify-between items-center">
                          <View className="flex-row items-center">
                            <Star fill="#FFD700" stroke="none" size={14} />
                            <Text className="text-gray-700 text-sm ml-1 font-medium">{movie.rating}</Text>
                          </View>
                          <TouchableOpacity
                            className="bg-[#05422C] p-2 rounded-full"
                          >
                            <Play fill="#FFFFFF" stroke="none" size={16} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View className="items-center justify-center py-10">
                  <Text className="text-gray-500 text-center">
                    No results found for "{searchQuery}"
                  </Text>
                </View>
              )}
            </>
          ) : (
            <>
              {/* Recent Searches */}
              <View className="mb-6">
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-gray-900 text-lg font-medium">Recent Searches</Text>
                  {recentSearches.length > 0 && (
                    <TouchableOpacity onPress={() => setRecentSearches([])}>
                      <Text className="text-[#05422C] text-sm font-medium">Clear All</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {recentSearches.length > 0 ? (
                  recentSearches.map((search, index) => (
                    <View key={index} className="flex-row items-center justify-between mb-3">
                      <TouchableOpacity 
                        className="flex-1"
                        onPress={() => handleSearch(search)}
                      >
                        <Text className="text-gray-700">{search}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => removeRecentSearch(search)}>
                        <X stroke="#05422C" size={16} />
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <Text className="text-gray-500">No recent searches</Text>
                )}
              </View>

              {/* Popular Searches */}
              <View>
                <Text className="text-gray-900 text-lg font-medium mb-4">Popular Searches</Text>
                <View className="flex-row flex-wrap">
                  {['Action Movies', 'Top Rated', 'New Releases', 'Marvel', 'DC', 'Oscar Winners', 'Science Fiction'].map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      className="mb-3 mr-3 py-2 px-4 bg-[#E0EBE3] rounded-full"
                      onPress={() => handleSearch(item)}
                    >
                      <Text className="text-[#05422C]">{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Recommended for You */}
              <View className="mt-8 mb-10">
                <Text className="text-gray-900 text-lg font-medium mb-4">Recommended for You</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {[1, 2, 3, 4, 5].map((id) => (
                    <TouchableOpacity
                      key={id}
                      className="mr-4 rounded-2xl overflow-hidden bg-white shadow-md"
                      style={{ width: 180 }}
                    >
                      <View className="relative">
                        <Image
                          source={{ uri: `https://picsum.photos/400/240?random=${id + 10}` }}
                          className="w-full h-28"
                          resizeMode="cover"
                        />
                        <View className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full px-2 py-1">
                          <Text className="text-white text-xs font-medium">2h 15m</Text>
                        </View>
                        <TouchableOpacity
                          className="absolute top-2 left-2 bg-white bg-opacity-20 p-2 rounded-full backdrop-blur-sm"
                          onPress={() => toggleBookmark(id + 10)}
                        >
                          <Bookmark
                            stroke={bookmarkedMovies.includes(id + 10) ? "#05422C" : "grey"}
                            fill={bookmarkedMovies.includes(id + 10) ? "#05422C" : "none"}
                            size={16}
                          />
                        </TouchableOpacity>
                      </View>
                      <View className="p-3 bg-zinc-100">
                        <Text className="text-gray-900 text-md font-bold mb-1" numberOfLines={1}>
                          Recommended Movie {id}
                        </Text>
                        <View className="flex-row justify-between items-center">
                          <Text className="text-gray-600 text-xs">2023</Text>
                          <View className="flex-row items-center bg-white px-2 py-1 rounded-full">
                            <Star fill="#05422C" stroke="none" size={12} />
                            <Text className="text-[#05422C] text-xs ml-1 font-bold">8.{id}</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}