import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';

import Home from './src/app/screens/Home';
import Explore from './src/app/screens/Explore';
import { AuthProvider, useAuth } from './src/app/context/AuthContext';
import AuthStack from './src/app/navigation/AuthStack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#7CA8F8',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: {
          height: 60,
          backgroundColor: '#ffffffff',
          borderColor: '#fff',
          borderWidth: 3,
        },
      }}
    >
      <Tab.Screen 
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerShown: true,
          headerTitle: () => (
            <View>
              <Text style={{ 
                fontSize: 20, 
                fontFamily: 'PlayfairDisplay_700Bold', 
                color: '#7CA8F8' 
              }}>
                StudyShare
              </Text>
            </View>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Explore"
        component={Explore}
        options={{
          title: 'Explore',
          headerShown: true,
          headerTitle: () => (
            <View>
              <Text style={{ 
                fontSize: 20, 
                fontFamily: 'PlayfairDisplay_700Bold', 
                color: '#7CA8F8' 
              }}>
                StudyShare
              </Text>
            </View>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AppNav() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      { user ? (
        <Stack.Navigator initialRouteName="HomeTabs">
          <Stack.Screen
            name="HomeTabs"
            component={HomeTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <AuthStack />
      )}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

// added AppNav because useAuth has to be after AuthProvider
export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    PlayfairDisplay_700Bold,
  });

  if (!fontsLoaded) {
    return null; // or a simple loading indicator
  }

  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
