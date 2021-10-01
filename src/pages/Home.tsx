import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExists = tasks.some(task => task.title === newTaskTitle);

    if (taskExists) {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      );
      return;
    }

    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(prevState => [...prevState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const taskExists = tasks.some(task => task.id === id);

    if(!taskExists) {
      return;
    }

    setTasks(prevState => prevState.map(task => task.id === id ? { ...task, done: !task.done } : task));
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const taskExists = tasks.some(task => task.id === taskId);

    if(!taskExists) {
      return;
    }

    setTasks(prevState => prevState.map(task => task.id === taskId ? { ...task, title: taskNewTitle } : task))
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          onPress: () => 
            setTasks(prevState => prevState.filter(task => task.id !== id))
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})