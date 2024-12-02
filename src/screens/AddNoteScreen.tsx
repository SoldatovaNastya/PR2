import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNotes } from '../context/NotesContext';
import { useFolders } from '../context/FoldersContext'; // Добавляем использование контекста папок
import uuid from 'react-native-uuid';

const AddNoteScreen = () => {
  const navigation = useNavigation();
  const { addNote } = useNotes();
  const { folders } = useFolders(); // Получаем список папок из контекста

  const [selectedFolder, setSelectedFolder] = useState<string>('Все');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      const newNoteId = uuid.v4(); // Генерация уникального ID для заметки

      addNote({
        id: newNoteId as string,
        folder: selectedFolder,
        title,
        content,
      });

      navigation.goBack();
    } else {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля.', [{ text: 'ОК' }]);
    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.header}>Новая заметка</Text>

      {/* Динамический список папок */}
      <View style={styles.folders}>
  <FlatList
    data={folders}
    keyExtractor={(item) => item.name}
    horizontal
    showsHorizontalScrollIndicator={false}
    renderItem={({ item }) => (
      <TouchableOpacity
        key={item.name}
        onPress={() => setSelectedFolder(item.name)}
        style={[
          styles.folderButton,
          selectedFolder === item.name && styles.selectedFolder,
        ]}
      >
        <Text
          style={[
            styles.folderText,
            selectedFolder === item.name && styles.selectedFolderText,
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    )}
  />
</View>

      <TextInput
        style={styles.input}
        placeholder="Заголовок"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.textArea}
        placeholder="Текст заметки"
        value={content}
        onChangeText={setContent}
        multiline={true}
        textAlignVertical="top"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Сохранить</Text>
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
  folders: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  folderButton: {
    paddingHorizontal: 12, // Отступы слева и справа для текста
    paddingVertical: 8,    // Отступы сверху и снизу
    backgroundColor: '#f1f1f1',
    borderRadius: 20,      // Округлённые кнопки
    marginHorizontal: 4,   // Расстояние между кнопками
  },
  selectedFolder: {
    backgroundColor: '#007bff',
  },
  folderText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
  selectedFolderText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    minHeight: 150,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: 200,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddNoteScreen;
