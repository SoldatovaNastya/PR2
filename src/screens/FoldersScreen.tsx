import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types'; // Типы маршрутов
import { useFolders } from '../context/FoldersContext'; // Контекст папок
import { RectButton, Swipeable } from 'react-native-gesture-handler';

// Типизация навигации для экрана Folders
type FoldersScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Folders'>;

const FoldersScreen = () => {
  const navigation = useNavigation<FoldersScreenNavigationProp>();
  const { folders, addFolder, deleteFolder  } = useFolders(); // Получаем папки и функцию добавления папок из контекста
  const renderRightActions = (folderId: string) => (
    <RectButton style={styles.deleteButton} onPress={() => deleteFolder(folderId)}>
      <Text style={styles.deleteText}>Удалить</Text>
    </RectButton>
  );

  return (
    <View style={styles.container}>
      {/* Заголовок */}
      <Text style={styles.header}>Папки</Text>

      {/* Список папок с функциями свайпа и редактирования */}
      <FlatList
        data={folders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Swipeable renderRightActions={() => renderRightActions(item.id)}>
            <TouchableOpacity
              style={styles.folderCard}
              onPress={() =>
                navigation.navigate('EditFolder', {
                  id: item.id,
                  name: item.name,
                })
              }
            >
              <Text style={styles.folderText}>{item.name}</Text>
            </TouchableOpacity>
          </Swipeable>
        )}
      />

      {/* Кнопка добавления новой папки */}
      <TouchableOpacity
  style={styles.addFolderButton}
  onPress={() => navigation.navigate('AddFolder', { addFolder })}
      >
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  backText: {
    fontSize: 20,
    color: '#000',
    marginBottom: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  folderCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  folderText: {
    fontSize: 16,
    color: '#000',
  },
  addFolderButton: {
    backgroundColor: '#007bff',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  plus: {
    fontSize: 24,
    color: '#fff',
  },
  deleteButton: { // Добавленный стиль для кнопки удаления
    backgroundColor: '#ff4d4f',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    borderRadius: 8,
    height: '85%',
  },
  deleteText: { // Текст для кнопки удаления
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FoldersScreen;
