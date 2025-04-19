import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Search, Bookmark, Bell, User, Film, TrendingUp, Play, Star, Clock, Menu, Heart, Download, Share2, ChevronDown, Filter, Calendar, Award } from "lucide-react-native";

export default function MovieHomeScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("For you");
  const [bookmarkedMovies, setBookmarkedMovies] = useState([] as number[]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);

  const handleNotificationPress = () => {
    router.push("/notification");
  };

  const handleProfilePress = () => {
    router.push("/profile");
  };

  const handleMoviePress = (movieId: number) => {
    return;
  };

  const toggleBookmark = (movieId: number) => {
    if (bookmarkedMovies.includes(movieId)) {
      setBookmarkedMovies(bookmarkedMovies.filter(id => id !== movieId));
    } else {
      setBookmarkedMovies([...bookmarkedMovies, movieId]);
    }
  };

  const movieCategories = ["For you", "Trending", "Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Animation"];

  const genreOptions = ["All", "Action", "Comedy", "Drama", "Documentary", "Fantasy", "Horror", "Romance", "Sci-Fi", "Thriller"];

  const trendingMovies = [
    {
      id: 1,
      title: "Interstellar Adventure",
      category: "Sci-Fi",
      rating: "8.5",
      image: "https://picsum.photos/400/200",
      time: "2h 30m",
      year: 2023
    },
    {
      id: 2,
      title: "Ocean's Mystery",
      category: "Adventure",
      rating: "7.8",
      image: "https://picsum.photos/400/201",
      time: "1h 55m",
      year: 2024
    },
    {
      id: 3,
      title: "City Lights",
      category: "Drama",
      rating: "9.1",
      image: "https://picsum.photos/400/202",
      time: "2h 15m",
      year: 2023
    },
    {
      id: 4,
      title: "Desert Storm",
      category: "Action",
      rating: "8.3",
      image: "https://picsum.photos/400/203",
      time: "2h 05m",
      year: 2024
    },
    {
      id: 5,
      title: "Moonlight Sonata",
      category: "Romance",
      rating: "7.9",
      image: "https://picsum.photos/400/204",
      time: "1h 48m",
      year: 2023
    }
  ];

  const recentMovies = [
    {
      id: 1,
      title: "The Lost Kingdom",
      description: "Epic fantasy journey to recover a hidden treasure",
      rating: "8.2",
      director: "Emma Thompson",
      genre: "Fantasy"
    },
    {
      id: 2,
      title: "Midnight in Paris",
      description: "Romantic comedy set in the city of lights",
      rating: "7.9",
      director: "Michael Bay",
      genre: "Romance"
    },
    {
      id: 3,
      title: "The Last Detective",
      description: "Mystery thriller with unexpected twists",
      rating: "8.7",
      director: "Christopher Nolan",
      genre: "Thriller"
    },
    {
      id: 4,
      title: "Kingdom of Dreams",
      description: "Animation film about magical world exploration",
      rating: "8.4",
      director: "Laura Jenkins",
      genre: "Animation"
    },
    {
      id: 5,
      title: "Silent Echo",
      description: "Psychological drama exploring human consciousness",
      rating: "9.0",
      director: "David Fincher",
      genre: "Drama"
    }
  ];

  const comingSoonMovies = [
    {
      id: 101,
      title: "Parallel Lives",
      category: "Sci-Fi",
      releaseDate: "May 15, 2025",
      image: "https://picsum.photos/400/205"
    },
    {
      id: 102,
      title: "The Dynasty",
      category: "Historical Drama",
      releaseDate: "June 3, 2025",
      image: "https://picsum.photos/400/206"
    },
    {
      id: 103,
      title: "Red Mountain",
      category: "Action/Thriller",
      releaseDate: "June 28, 2025",
      image: "https://picsum.photos/400/207"
    }
  ];

  const topRatedMovies = [
    {
      id: 201,
      title: "The Shawshank Redemption",
      rating: "9.3",
      year: "1994",
      director: "Frank Darabont",
      image: "https://picsum.photos/400/210"
    },
    {
      id: 202,
      title: "The Godfather",
      rating: "9.2",
      year: "1972",
      director: "Francis Ford Coppola",
      image: "https://picsum.photos/400/211"
    },
    {
      id: 203,
      title: "Pulp Fiction",
      rating: "8.9",
      year: "1994",
      director: "Quentin Tarantino",
      image: "https://picsum.photos/400/212"
    }
  ];

  const renderFeaturedFilmBadge = () => (
    <View className="absolute top-4 left-4 bg-[#05422C] px-3 py-1 rounded-full">
      <Text className="text-white text-sm font-bold">FEATURED FILM</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#FCFCFC]">
      <StatusBar barStyle="dark-content" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-4 pb-2">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Text className="text-[#05422C] text-3xl font-semibold mr-1 font-redrose">CILVER</Text>
            </View>
            <View className="flex-row gap-2">
              <TouchableOpacity
                className="bg-[#E0EBE3] p-2 rounded-full"
                onPress={handleNotificationPress}
              >
                <Bell stroke="#05422C" size={22} />
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-[#E0EBE3] p-2 rounded-full"
                onPress={handleProfilePress}
              >
                <User stroke="#05422C" size={22} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="px-4 pt-2">
          <View className="rounded-3xl overflow-hidden relative shadow-lg">
            <Image
              source={{ uri: "https://picsum.photos/400/200" }}
              className="w-full h-72"
              resizeMode="cover"
            />
            <View className="absolute inset-0 bg-black bg-opacity-30" />
            {renderFeaturedFilmBadge()}
            <TouchableOpacity
              className="absolute inset-0 items-center justify-center"
              onPress={() => handleMoviePress(999)}
            >
              <View className="bg-white bg-opacity-50 p-4 rounded-full backdrop-blur-md">
                <Play color={'black'} size={22} />
              </View>
            </TouchableOpacity>
            <View className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-black/70 to-transparent">
              <View className="flex-row justify-between items-end">
                <View className="flex-1 mr-3">
                  <Text className="text-white text-xl font-bold mb-2">The Avengers: Endgame</Text>
                  <View className="flex-row items-center">
                    <View className="bg-[#05422C] rounded-full px-3 py-1 mr-3">
                      <Text className="text-white text-sm">Action</Text>
                    </View>
                    <Star fill="#05422C" stroke="none" size={16} />
                    <Text className="text-white ml-1 mr-3 text-md font-medium">9.2</Text>
                    <Clock stroke="#FFFFFF" size={14} />
                    <Text className="text-white ml-1 text-md">3h 2m</Text>
                  </View>
                </View>
                <View className="flex-row">
                  <TouchableOpacity
                    className="bg-white bg-opacity-20 p-3 rounded-full backdrop-blur-sm mr-2"
                    onPress={() => toggleBookmark(999)}
                  >
                    <Bookmark
                      stroke={bookmarkedMovies.includes(999) ? "#05422C" : "grey"}
                      fill={bookmarkedMovies.includes(999) ? "#05422C" : "none"}
                      size={20}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-[#05422C] p-3 rounded-full">
                    <Share2 stroke="#FFFFFF" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-6">
          <View className="px-6 mb-4 flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Text className="text-[#05422C] text-lg font-medium mr-2">Trending Now</Text>
              <TrendingUp stroke="#05422C" size={18} />
            </View>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-[#05422C] text-md font-medium">View all</Text>
            </TouchableOpacity>
          </View>


          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6">
            {trendingMovies.map((movie) => (
              <TouchableOpacity
                key={movie.id}
                className="mr-4 rounded-2xl overflow-hidden bg-white shadow-md"
                style={{ width: 180 }}
                onPress={() => handleMoviePress(movie.id)}
              >
                <View className="relative">
                  <Image
                    source={{ uri: `https://picsum.photos/400/240?random=${movie.id}` }}
                    className="w-full h-28"
                    resizeMode="cover"
                  />
                  <View className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full px-2 py-1">
                    <Text className="text-white text-sm font-medium">{movie.time}</Text>
                  </View>
                  <TouchableOpacity
                    className="absolute top-2 left-2 bg-white bg-opacity-20 p-2 rounded-full backdrop-blur-sm"
                    onPress={(e) => {
                      e.stopPropagation();
                      toggleBookmark(movie.id);
                    }}
                  >
                    <Bookmark
                      stroke={bookmarkedMovies.includes(movie.id) ? "#05422C" : "grey"}
                      fill={bookmarkedMovies.includes(movie.id) ? "#05422C" : "none"}
                      size={16}
                    />
                  </TouchableOpacity>
                </View>
                <View className="p-3 bg-zinc-100">
                  <Text className="text-gray-900 text-md font-bold mb-1" numberOfLines={1}>{movie.title}</Text>
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <Text className="text-gray-600 text-sm mr-2">{movie.category}</Text>
                      <Text className="text-gray-600 text-sm">{movie.year}</Text>
                    </View>
                    <View className="flex-row items-center bg-white px-2 py-1 rounded-full">
                      <Star fill="#05422C" stroke="none" size={12} />
                      <Text className="text-[#05422C] text-sm ml-1 font-bold">{movie.rating}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Coming Soon */}
        <View className="mt-6">
          <View className="px-6 mb-4 flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Calendar stroke="#05422C" size={18} className="mr-2" />
              <Text className="text-gray-900 text-lg font-bold ml-2">Coming Soon</Text>
            </View>
            <TouchableOpacity >
              <Text className="text-[#05422C] text-md font-medium">More</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6">
            {comingSoonMovies.map((movie) => (
              <TouchableOpacity
                key={movie.id}
                className="mr-4 rounded-2xl overflow-hidden bg-white shadow-md"
                style={{ width: 260 }}

              >
                <View className="relative">
                  <Image
                    source={{ uri: movie.image }}
                    className="w-full h-36"
                    resizeMode="cover"
                  />
                  <View className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <TouchableOpacity
                      className="bg-[#05422C] bg-opacity-90 p-3 rounded-full"
                      onPress={(e) => {
                        e.stopPropagation();

                      }}
                    >
                      <Play fill="#FFFFFF" stroke="none" size={20} />
                    </TouchableOpacity>
                  </View>
                  <View className="absolute top-2 left-2 bg-[#05422C] rounded-lg px-2 py-1">
                    <Text className="text-white text-sm font-bold">COMING SOON</Text>
                  </View>
                </View>
                <View className="p-3 bg-zinc-100">
                  <Text className="text-gray-900 text-base font-bold mb-1">{movie.title}</Text>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-gray-600 text-sm">{movie.category}</Text>
                    <View className="flex-row items-center">
                      <Calendar stroke="#05422C" size={12} />
                      <Text className="text-[#05422C] text-sm ml-1 font-medium">{movie.releaseDate}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    className="mt-3 bg-[#E0EBE3] py-2 rounded-full flex-row justify-center items-center"
                    onPress={(e) => {
                      e.stopPropagation();

                    }}
                  >
                    <Bell stroke="#05422C" size={14} className="mr-1" />
                    <Text className="text-[#05422C] text-sm font-medium">Set Reminder</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Top Rated */}
        <View className="mt-6">
          <View className="px-6 mb-4 flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Award stroke="#05422C" size={18} className="mr-2" />
              <Text className="text-gray-900 text-lg font-bold">Top Rated</Text>
            </View>
            <TouchableOpacity>
              <Text className="text-[#05422C] text-md font-medium">View all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6">
            {topRatedMovies.map((movie) => (
              <TouchableOpacity
                key={movie.id}
                className="mr-4 rounded-2xl overflow-hidden bg-white shadow-md"
                style={{ width: 200 }}
                onPress={() => handleMoviePress(movie.id)}
              >
                <Image
                  source={{ uri: movie.image }}
                  className="w-full h-28"
                  resizeMode="cover"
                />
                <View className="p-3">
                  <Text className="text-gray-900 text-md font-bold mb-1">{movie.title}</Text>
                  <Text className="text-gray-600 text-sm mb-2">Dir. {movie.director} • {movie.year}</Text>
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center bg-[#E0EBE3] px-3 py-1 rounded-full">
                      <Star fill="#FFD700" stroke="none" size={14} />
                      <Text className="text-[#05422C] text-md ml-1 font-bold">{movie.rating}</Text>
                    </View>
                    <TouchableOpacity
                      className="bg-[#E0EBE3] p-2 rounded-full"
                      onPress={(e) => {
                        e.stopPropagation();
                        toggleBookmark(movie.id);
                      }}
                    >
                      <Bookmark
                        stroke={bookmarkedMovies.includes(movie.id) ? "#05422C" : "#05422C"}
                        fill={bookmarkedMovies.includes(movie.id) ? "#05422C" : "none"}
                        size={16}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recently Added */}
        <View className="mt-6 mb-6">
          <View className="px-6 mb-4 flex-row justify-between items-center">
            <Text className="text-gray-900 text-lg font-bold">Recently Added</Text>
            <View className="flex-row items-center">
              <TouchableOpacity className="mr-3 bg-[#E0EBE3] p-2 rounded-full">
                <Filter stroke="#05422C" size={16} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Text className="text-[#05422C] text-md font-medium">More</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="px-6">
            {recentMovies.map((movie) => (
              <TouchableOpacity
                key={movie.id}
                className="mb-4 flex-row bg-white rounded-2xl overflow-hidden shadow-sm"
                onPress={() => handleMoviePress(movie.id)}
              >
                <Image
                  source={{ uri: `https://picsum.photos/200/300?random=${movie.id + 10}` }}
                  className="w-24 h-32"
                  resizeMode="cover"
                />
                <View className="flex-1 p-3 justify-between">
                  <View>
                    <View className="flex-row justify-between items-start">
                      <Text className="text-gray-900 text-base font-bold mb-1 flex-1 mr-2">{movie.title}</Text>
                      <TouchableOpacity
                        onPress={(e) => {
                          e.stopPropagation();
                          toggleBookmark(movie.id);
                        }}
                      >
                        <Bookmark
                          stroke={bookmarkedMovies.includes(movie.id) ? "#05422C" : "#05422C"}
                          fill={bookmarkedMovies.includes(movie.id) ? "#05422C" : "none"}
                          size={18}
                        />
                      </TouchableOpacity>
                    </View>
                    <Text className="text-gray-500 text-sm mb-2" numberOfLines={2}>
                      {movie.description}
                    </Text>
                    <Text className="text-gray-600 text-sm mb-1">
                      Directed by <Text className="font-medium">{movie.director}</Text>
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <View className="bg-[#E0EBE3] px-2 py-1 rounded-full mr-2">
                        <Text className="text-[#05422C] text-sm">{movie.genre}</Text>
                      </View>
                      <View className="flex-row items-center">
                        <Star fill="#FFD700" stroke="none" size={14} />
                        <Text className="text-gray-700 text-sm ml-1 font-medium">{movie.rating}</Text>
                      </View>
                    </View>
                    <View className="flex-row">
                      <TouchableOpacity
                        className="bg-[#E0EBE3] p-2 rounded-full mr-2"
                        onPress={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Download stroke="#05422C" size={16} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="bg-[#05422C] p-2 rounded-full"
                        onPress={(e) => {
                          e.stopPropagation();

                        }}
                      >
                        <Play fill="#FFFFFF" stroke="none" size={16} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="pb-20">
          <View className="px-6 mb-3 flex-row justify-between items-center">
            <Text className="text-gray-900 text-lg font-medium">Genres</Text>
            <TouchableOpacity className="flex-row items-center" onPress={() => setShowGenreDropdown(!showGenreDropdown)}>
              <Text className="text-[#05422C] text-md font-semibold mr-1">{selectedGenre}</Text>
              <ChevronDown stroke="#05422C" size={16} />
            </TouchableOpacity>
          </View>

          {showGenreDropdown && (
            <View className="mx-6 mb-3 bg-white rounded-xl shadow-md p-3">
              <FlatList
                data={genreOptions}
                horizontal={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="py-2"
                    onPress={() => {
                      setSelectedGenre(item);
                      setShowGenreDropdown(false);
                    }}
                  >
                    <Text className={`text-md ${item === selectedGenre ? 'text-[#05422C] font-bold' : 'text-gray-600'}`}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
              />
            </View>
          )}

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
            {movieCategories.map((category, index) => (
              <TouchableOpacity
                key={index}
                className={`mx-2 py-3 px-6 rounded-full ${category === activeCategory ? 'bg-[#05422C]' : 'bg-[#E0EBE3]'
                  }`}
                onPress={() => setActiveCategory(category)}
              >
                <Text
                  className={`${category === activeCategory ? 'text-white' : 'text-gray-700'
                    } text-md font-medium`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6 pt-5">
            {trendingMovies.map((movie) => (
              <TouchableOpacity
                key={movie.id}
                className="mr-4 rounded-2xl overflow-hidden bg-white shadow-md"
                style={{ width: 180 }}
                onPress={() => handleMoviePress(movie.id)}
              >
                <View className="relative">
                  <Image
                    source={{ uri: `https://picsum.photos/400/240?random=${movie.id}` }}
                    className="w-full h-28"
                    resizeMode="cover"
                  />
                  <View className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full px-2 py-1">
                    <Text className="text-white text-sm font-medium">{movie.time}</Text>
                  </View>
                  <TouchableOpacity
                    className="absolute top-2 left-2 bg-white bg-opacity-20 p-2 rounded-full backdrop-blur-sm"
                    onPress={(e) => {
                      e.stopPropagation();
                      toggleBookmark(movie.id);
                    }}
                  >
                    <Bookmark
                      stroke={bookmarkedMovies.includes(movie.id) ? "#05422C" : "grey"}
                      fill={bookmarkedMovies.includes(movie.id) ? "#05422C" : "none"}
                      size={16}
                    />
                  </TouchableOpacity>
                </View>
                <View className="p-3 bg-zinc-100">
                  <Text className="text-gray-900 text-md font-bold mb-1" numberOfLines={1}>{movie.title}</Text>
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <Text className="text-gray-600 text-sm mr-2">{movie.category}</Text>
                      <Text className="text-gray-600 text-sm">{movie.year}</Text>
                    </View>
                    <View className="flex-row items-center bg-white px-2 py-1 rounded-full">
                      <Star fill="#05422C" stroke="none" size={12} />
                      <Text className="text-[#05422C] text-sm ml-1 font-bold">{movie.rating}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}