import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Dimensions, StyleSheet } from 'react-native';
import Svg, { Rect, Circle } from 'react-native-svg';

// Obtém a largura e altura da tela do dispositivo
const { width, height } = Dimensions.get('window');

// Constantes para controle do jogo
const MOVE_SPEED = 3; // Velocidade do movimento dos canos
const GRAVITY = 0.5; // Gravidade que afeta o pássaro
const JUMP_FORCE = -7.6; // Força do pulo do pássaro
const PIPE_WIDTH = 60; // Largura dos canos
const PIPE_GAP = 150; // Espaço entre os canos superior e inferior

const FlappyBird = () => {
  // Estados do jogo
  const [birdY, setBirdY] = useState(height / 2); // Posição vertical do pássaro
  const [velocity, setVelocity] = useState(0); // Velocidade do pássaro
  const [pipes, setPipes] = useState([]); // Lista de canos
  const [score, setScore] = useState(0); // Pontuação do jogador
  const [gameState, setGameState] = useState('Start'); // Estado do jogo: 'Start', 'Play', 'End'
  
  // Loop principal do jogo
  useEffect(() => {
    if (gameState === 'Play') {
      const gameLoop = setInterval(() => {
        setBirdY(prev => prev + velocity); // Atualiza posição do pássaro
        setVelocity(prev => prev + GRAVITY); // Aplica gravidade
        movePipes(); // Move os canos
      }, 30);
      return () => clearInterval(gameLoop);
    }
  }, [gameState, velocity]);

  // Gera o primeiro cano ao iniciar o jogo
  useEffect(() => {
    if (pipes.length === 0) spawnPipe();
  }, []);

  // Cria um novo cano com altura aleatória
  const spawnPipe = () => {
    let pipeHeight = Math.random() * (height / 2);
    setPipes(prev => [...prev, { x: width, topHeight: pipeHeight, scored: false }]);
  };

  // Move os canos para a esquerda e gera novos quando necessário
  const movePipes = () => {
    setPipes(prev => prev.map(pipe => ({ ...pipe, x: pipe.x - MOVE_SPEED }))
      .filter(pipe => pipe.x > -PIPE_WIDTH));
    if (pipes.length > 0 && pipes[0].x < width / 2 && pipes.length < 2) spawnPipe();
  };

  // Faz o pássaro pular ao tocar na tela
  const jump = () => {
    if (gameState === 'Play') {
      setVelocity(JUMP_FORCE);
    } else {
      restartGame();
    }
  };

  // Reinicia o jogo após o Game Over
  const restartGame = () => {
    setBirdY(height / 2);
    setVelocity(0);
    setPipes([]);
    setScore(0);
    setGameState('Play');
    spawnPipe();
  };

  // Verifica colisões com canos e limites da tela
  useEffect(() => {
    if (birdY > height || birdY < 0) {
      setGameState('End');
    }
    pipes.forEach(pipe => {
      if (
        pipe.x < 50 && pipe.x + PIPE_WIDTH > 0 &&
        (birdY < pipe.topHeight || birdY > pipe.topHeight + PIPE_GAP)
      ) {
        setGameState('End');
      } else if (pipe.x < 50 && !pipe.scored) {
        setScore(prev => prev + 1);
        pipe.scored = true;
      }
    });
  }, [birdY, pipes]);

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <Svg height={height} width={width} style={styles.fullScreen}>
          {/* Renderiza o pássaro */}
          <Circle cx="50" cy={birdY} r="20" fill="yellow" />
          
          {/* Renderiza os canos */}
          {pipes.map((pipe, index) => (
            <>
              <Rect key={index + 'top'} x={pipe.x} y={0} width={PIPE_WIDTH} height={pipe.topHeight} fill="green" />
              <Rect key={index + 'bottom'} x={pipe.x} y={pipe.topHeight + PIPE_GAP} width={PIPE_WIDTH} height={height} fill="green" />
            </>
          ))}
        </Svg>
        
        {/* Exibe a pontuação */}
        <Text style={styles.score}>{score}</Text>

        {/* Mensagem de Game Over */}
        {gameState === 'End' && (
          <Text style={styles.gameOverText}>Lagou! Toque para reinicar a game play.</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

// Estilos da interface
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  score: {
    position: 'absolute',
    top: 50,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  gameOverText: {
    position: 'absolute',
    top: height / 2 - 50,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default FlappyBird;
