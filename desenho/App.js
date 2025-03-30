import { SafeAreaView } from 'react-native';
import Desenhando from './components/Desenho.jsx';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Desenhando />
    </SafeAreaView>
  );
};

export default App;
