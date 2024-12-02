import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddNoteScreen from '../screens/AddNoteScreen';
import FoldersScreen from '../screens/FoldersScreen';
import AddFolderScreen from '../screens/AddFolderScreen'; // Импортируем экран папок
import { RootStackParamList } from './types'; // Импорт типов навигации
import EditNoteScreen from '../screens/EditNoteScreen';
import EditFolderScreen from '../screens/EditFolderScreen';

// Создаём стек навигации с типизацией
const Stack = createStackNavigator<RootStackParamList>();

const TabNavigator = () => {
  return (
    <Stack.Navigator>
      {/* Главный экран */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      {/* Экран добавления новой заметки */}
      <Stack.Screen
        name="AddNote"
        component={AddNoteScreen}
        options={{ headerTitle: 'Новая заметка' }}
      />

      {/* Экран папок */}
      <Stack.Screen
        name="Folders"
        component={FoldersScreen}
        options={{ headerTitle: 'Папки' }}
      />
      <Stack.Screen
        name="AddFolder"
        component={AddFolderScreen}
        options={{ headerTitle: 'Новая папка' }}
      />
      <Stack.Screen
  name="EditNote"
  component={EditNoteScreen}
  options={{ headerTitle: 'Редактирование' }}
/>
<Stack.Screen
        name="EditFolder"
        component={EditFolderScreen}
        options={{ headerTitle: 'Редактирование папки' }} // Заголовок экрана
      />
    </Stack.Navigator>

   
  );
};

export default TabNavigator;
