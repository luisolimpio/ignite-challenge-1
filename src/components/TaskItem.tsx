import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Task } from './TasksList';

import trashIcon from '../assets/icons/trash/trash.png'
import penIcon from '../assets/icons/pen/pen.png'

interface TaskItemProps {
  item: Task
  index: number;
  toggleTaskDone: (id: number) => void;
  editTask: (id: number, taskNewTitle: string) => void;
  removeTask: (id: number) => void;
};

export function TaskItem({ item, index, toggleTaskDone, editTask, removeTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(item.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskTitle(item.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    if (!taskTitle) {
      return;
    }

    editTask(item.id, taskTitle);
    setIsEditing(false);
  }

  function handleRemoveTask(id: number) {
    removeTask(id);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return(
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { item.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput 
            ref={textInputRef}
            style={item.done ? styles.taskTextDone : styles.taskText}
            value={taskTitle}
            onChangeText={setTaskTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
          />
  
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isEditing ? (
          <TouchableOpacity
            style={{ paddingRight: 12, paddingLeft: 20 }}
            onPress={handleCancelEditing}
          >
            <Icon
              name="x"
              size={24}
              color="#B2B2B2"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ paddingRight: 12, paddingLeft: 20 }}
            onPress={handleStartEditing}
          >
            <Image source={penIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.iconsDivider} />

        <TouchableOpacity
          testID={`trash-${index}`}
          disabled={isEditing}
          style={{ paddingRight: 20, paddingLeft: 12 }}
          onPress={() => handleRemoveTask(item.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconsDivider: {
    height: 24,
    width: 1,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
    maxWidth: '75%',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
    maxWidth: '75%',
  }
});