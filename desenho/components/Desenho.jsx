import { useState, useRef } from 'react';
import { View, Text, PanResponder, Animated, TouchableOpacity, ScrollView } from 'react-native';
import Estilos from './Estilos';

const Desenhando = () => {
  const [paths, setPaths] = useState([]);
  const [color, setColor] = useState('black');
  const pan = useRef(new Animated.ValueXY()).current;

  
  const colors = [
    'black', 'red', 'green', 'blue', 'yellow', 
    'purple', 'orange', 'pink', 'brown', 'grey'
  ];


  const changeColor = (newColor) => {
    setColor(newColor);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const newPath = { x: gestureState.moveX, y: gestureState.moveY, color: color };
      setPaths((prevPaths) => [...prevPaths, newPath]); 
    },
    onPanResponderRelease: () => {
      pan.setValue({ x: 0, y: 0 }); 
    },
  });

  return (
    <View style={Estilos.container}>
   
      <View
        {...panResponder.panHandlers}
        style={Estilos.canvas}
      >
        {paths.map((path, index) => (
          <Animated.View
            key={index}
            style={{
              position: 'absolute',
              left: path.x - 5,
              top: path.y - 5,
              width: 10,
              height: 10,
              backgroundColor: path.color,
              borderRadius: 5,
            }}
          />
        ))}
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={Estilos.scrollContainer}
        showsHorizontalScrollIndicator={false}
      >
        {colors.map((colorOption, index) => (
          <TouchableOpacity
            key={index}
            style={[Estilos.button, { backgroundColor: colorOption }]}
            onPress={() => changeColor(colorOption)}
          >
            <Text style={Estilos.buttonText}> </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Desenhando;
