import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFolders } from '../context/FoldersContext';
import { useNotes } from '../context/NotesContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const { folders } = useFolders();
  const { notes, deleteNote } = useNotes();

  const [filter, setFilter] = useState<string>('Все');

  const filteredNotes =
    filter === 'Все' ? notes : notes.filter((note) => note.folder === filter);

  // Функция рендера кнопки удаления
  const renderRightActions = (noteId: string) => (
    <RectButton
      style={styles.deleteButton}
      onPress={() => deleteNote(noteId)}
    >
      <Text style={styles.deleteText}>Удалить</Text>
    </RectButton>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Простая заметка</Text>

      {/* Табы для фильтрации по папкам */}
      <View style={styles.tabs}>
        {folders.map((folder) => (
          <TouchableOpacity key={folder.name} onPress={() => setFilter(folder.name)}>
            <Text style={[styles.tab, filter === folder.name && styles.activeTab]}>{folder.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Список заметок */}
      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          
          <Swipeable renderRightActions={() => renderRightActions(item.id)}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditNote', {
                  id: item.id,
                  folder: item.folder,
                  title: item.title,
                  content: item.content,
                })
              }
            >
              <View style={styles.noteCard}>
                <Text style={styles.noteTitle}>{item.title}</Text>
                <Text style={styles.noteContent}>{item.content}</Text>
              </View>
            </TouchableOpacity>
          </Swipeable>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>Нет заметок для отображения</Text>
        }
      />

      {/* Кнопка открытия экрана папок */}
      <TouchableOpacity
        style={styles.folderButton}
        onPress={() => navigation.navigate('Folders')}
      >
        <Text style={styles.folderIcon}>📁</Text>
      </TouchableOpacity>

      {/* Кнопка добавления новой заметки */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AddNote')}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    fontSize: 16,
    color: '#6c757d',
    padding: 8,
  },
  activeTab: {
    color: '#007bff',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
  },
  noteCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noteContent: {
    fontSize: 14,
    color: '#6c757d',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 20,
  },
  folderButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#007bff',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  folderIcon: {
    fontSize: 24,
    color: '#fff',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    fontSize: 24,
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: '#ff4d4f',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    borderRadius: 8,
    height: '90%',
  },
  deleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
