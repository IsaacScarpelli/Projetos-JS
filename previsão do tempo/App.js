import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Button } from 'react-native';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const WeatherScreen = ({ navigation }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const getWeather = async () => {
    setLoading(true);
    try {
      // Solicita permissão de localização
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão de localização negada. Usando localização padrão.');
        // Fallback: São Paulo
        fetchWeather(-23.5505, -46.6333);
        return;
      }

      // Pega a localização atual
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      fetchWeather(latitude, longitude);
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      setLoading(false);
    }
  };

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weathercode&timezone=auto`
      );
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  const weatherCodeToText = (code) => {
    const map = {
      0: 'Céu limpo ☀️',
      1: 'Principalmente limpo 🌤️',
      2: 'Parcialmente nublado ⛅',
      3: 'Nublado ☁️',
      45: 'Nevoeiro 🌫️',
      48: 'Nevoeiro com gelo 🌫️',
      51: 'Garoa fraca 🌧️',
      61: 'Chuva fraca 🌧️',
      80: 'Pancadas de chuva 🌦️',
      95: 'Tempestade ⛈️',
    };
    return map[code] || 'Tempo indefinido';
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Carregando previsão do tempo...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previsão do Tempo</Text>
      <Text style={styles.info}>Temperatura atual: {weather.current_weather.temperature}°C</Text>
      <Text style={styles.info}>
        Condição: {weatherCodeToText(weather.current_weather.weathercode)}
      </Text>
      <Text style={styles.subTitle}>Próximas horas:</Text>
      <FlatList
        data={weather.hourly.time.slice(0, 12)} // mostra 12 horas
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.hourItem}>
            <Text style={styles.hourText}>{item.slice(11, 16)}h</Text>
            <Text>{weather.hourly.temperature_2m[index]}°C</Text>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao aplicativo de Previsão do Tempo!</Text>
      <Button
        title="Ver Previsão do Tempo"
        onPress={() => navigation.navigate('Weather')}
      />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Weather" component={WeatherScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
  },
  hourItem: {
    padding: 12,
    margin: 6,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  hourText: {
    fontWeight: 'bold',
  },
});
