import * as React from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Tela 1 para o Tab Navigator com conteúdo sobre carros
function Tela1() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>🚗 Carros Clássicos</Text>
      <Text style={styles.paragraph}>
        Os carros clássicos são aqueles que têm mais de 20 anos de fabricação e são
        altamente valorizados por colecionadores. Exemplos incluem o Ford Mustang, Chevrolet
        Camaro, Porsche 911, entre outros.
      </Text>
      <Text style={styles.paragraph}>
        O Ford Mustang, por exemplo, é um carro esportivo com motor potente e design arrojado.
        Lançado em 1964, ele se tornou um ícone da cultura americana.
      </Text>
    </ScrollView>
  );
}

// Tela 2 para o Tab Navigator com conteúdo sobre carros
function Tela2() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>🏎️ Carros Elétricos</Text>
      <Text style={styles.paragraph}>
        Os carros elétricos estão ganhando popularidade devido à preocupação com a sustentabilidade
        e a redução das emissões de carbono. Marcas como Tesla, Nissan e Chevrolet estão à frente
        nesse mercado.
      </Text>
      <Text style={styles.paragraph}>
        O Tesla Model S é um dos carros elétricos mais famosos, com uma autonomia de até 600 km
        e aceleração impressionante, competindo com carros de luxo e esportivos convencionais.
      </Text>
    </ScrollView>
  );
}

// Tela 3 para o Tab Navigator com conteúdo sobre carros
function Tela3() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>🚙 Carros Off-road</Text>
      <Text style={styles.paragraph}>
        Os carros off-road são projetados para enfrentar terrenos difíceis, como lama, areia, neve
        e rochas. Modelos como o Jeep Wrangler, Toyota Land Cruiser e Land Rover Defender são
        famosos por sua durabilidade e desempenho em ambientes exigentes.
      </Text>
      <Text style={styles.paragraph}>
        O Jeep Wrangler, por exemplo, é um ícone de aventura e resistência, sendo altamente
        apreciado por entusiastas de trilhas e aventuras ao ar livre.
      </Text>
    </ScrollView>
  );
}

// Tela Inicial para o Stack Navigator
const TelaInicial = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🏠 Tela Inicial</Text>
      <Button title="Ir para Detalhes" onPress={() => navigation.navigate('Detalhes')} />
    </View>
  );
};

// Tela de Detalhes para o Stack Navigator
const TelaDetalhes = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📜 Tela de Detalhes sobre Carros</Text>
      <Text style={styles.paragraph}>
        Na tela de detalhes, você pode explorar as especificações de carros populares, como o
        desempenho de aceleração, consumo de combustível, e opções de segurança.
      </Text>
      <Button title="Voltar para Home" onPress={() => navigation.navigate('Inicial')} />
    </View>
  );
};

// Tela de Configurações para o Drawer Navigator
const TelaConfiguracoes = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>⚙️ Tela de Configurações</Text>
      <Text style={styles.paragraph}>
        Aqui você pode personalizar as configurações do aplicativo, como a escolha do tema,
        notificações, entre outras preferências.
      </Text>
    </View>
  );
};

// Criando o Tab Navigator
const Tab = createMaterialTopTabNavigator();

// Função que cria a navegação Tab
function NavegacaoTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: true,
        tabBarStyle: { backgroundColor: '#6200EE' },
        tabBarLabelStyle: { color: 'white' },
      }}
    >
      <Tab.Screen name="Carros Clássicos" component={Tela1} />
      <Tab.Screen name="Carros Elétricos" component={Tela2} />
      <Tab.Screen name="Carros Off-road" component={Tela3} />
    </Tab.Navigator>
  );
}

// Criando o Stack Navigator
const Pilha = createStackNavigator();

// Função que cria a navegação Stack
function NavegacaoPilha() {
  return (
    <Pilha.Navigator>
      <Pilha.Screen name="Inicial" component={TelaInicial} />
      <Pilha.Screen name="Detalhes" component={TelaDetalhes} />
    </Pilha.Navigator>
  );
}

// Criando o Drawer Navigator
const Gaveta = createDrawerNavigator();

// Função que cria a navegação Drawer
function NavegacaoGaveta() {
  return (
    <Gaveta.Navigator initialRouteName="Home">
      <Gaveta.Screen name="Home" component={NavegacaoPilha} />
      <Gaveta.Screen name="Configurações" component={TelaConfiguracoes} />
    </Gaveta.Navigator>
  );
}

// Componente Principal do App
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NavegacaoGaveta />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// Estilos do aplicativo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
});
