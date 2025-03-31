import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const App = () => {

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    loadTasks();
  }, []);
  
  const loadTasks = async () => {
    const savedTasks = await AsyncStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  };
  
  const addTask = async () => {
    if (taskName.trim() === '') return;
    
    const newTask = {
      id: new Date().toISOString(),
      name: taskName,
      description: taskDescription,
      status: 'Nova',
      priority: 'Normal',
    };
    
    const updatedTasks = [...tasks, newTask];
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setTaskName('');
    setTaskDescription('');
  };
  
  const deleteTask = async (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };
  
  const editTask = async (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    setTaskName(taskToEdit.name);
    setTaskDescription(taskToEdit.description);
    
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };
  
  const changeStatus = async (taskId, newStatus) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const changePriority = async (taskId, newPriority) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, priority: newPriority } : task
    );
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Nova" children={() => <TaskList tasks={tasks.filter(task => task.status === 'Nova')} changeStatus={changeStatus} deleteTask={deleteTask} editTask={editTask} changePriority={changePriority} />} />
        <Tab.Screen name="Em Andamento" children={() => <TaskList tasks={tasks.filter(task => task.status === 'Em andamento')} changeStatus={changeStatus} deleteTask={deleteTask} editTask={editTask} changePriority={changePriority} />} />
        <Tab.Screen name="Concluída" children={() => <TaskList tasks={tasks.filter(task => task.status === 'Concluída')} changeStatus={changeStatus} deleteTask={deleteTask} editTask={editTask} changePriority={changePriority} />} />
      </Tab.Navigator>
      <View style={styles.addTaskContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome da Tarefa"
          value={taskName}
          onChangeText={setTaskName}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={taskDescription}
          onChangeText={setTaskDescription}
        />
        <Button title="Adicionar Tarefa" onPress={addTask} />
      </View>
    </NavigationContainer>
  );
};

const TaskList = ({ tasks, changeStatus, deleteTask, editTask, changePriority }) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={task => task.id}
      renderItem={({ item }) => (
        <View style={styles.taskContainer}>
          <View style={[styles.taskItem, item.priority === 'Alta' && styles.highPriority]}>
            <Text style={styles.taskName}>{item.name}</Text>
            <Text style={styles.taskDescription}>{item.description}</Text>
            
            <View style={styles.taskActions}>
              <TouchableOpacity onPress={() => editTask(item.id)}>
                <Text style={styles.editButton}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Text style={styles.deleteButton}>❌</Text>
              </TouchableOpacity>
              {item.status !== 'Concluída' && (
                <TouchableOpacity onPress={() => changeStatus(item.id, 'Concluída')}>
                  <Text style={styles.statusButton}>✔️</Text>
                </TouchableOpacity>
              )}
              {item.status !== 'Em andamento' && item.status !== 'Concluída' && (
                <TouchableOpacity onPress={() => changeStatus(item.id, 'Em andamento')}>
                  <Text style={styles.statusButton}>🛠️</Text>
                </TouchableOpacity>
              )}
              {item.priority === 'Normal' && (
                <TouchableOpacity onPress={() => changePriority(item.id, 'Alta')}>
                  <Text style={styles.priorityButton}>🔴</Text>
                </TouchableOpacity>
              )}
              {item.priority === 'Alta' && (
                <TouchableOpacity onPress={() => changePriority(item.id, 'Baixa')}>
                  <Text style={styles.priorityButton}>🟢</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  addTaskContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  taskContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  taskItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  highPriority: {
    backgroundColor: '#ffcccc',
  },
  taskName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  taskDescription: {
    fontSize: 14,
    color: '#555',
  },
  taskActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    color: '#007BFF',
    fontSize: 18,
  },
  deleteButton: {
    color: '#FF0000',
    fontSize: 18,
  },
  statusButton: {
    color: '#28a745',
    fontSize: 18,
  },
  priorityButton: {
    color: '#FF4500',
    fontSize: 18,
  },
});

export default App;
