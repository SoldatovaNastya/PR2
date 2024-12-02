import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useNotes } from '../context/NotesContext';

type EditNoteScreenRouteProp = RouteProp<RootStackParamList, 'EditNote'>;

const EditNoteScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<EditNoteScreenRouteProp>(); // Типизация route.params
  const { id, folder, title: initialTitle, content: initialContent } = route.params;

  const { updateNote } = useNotes();

  const [editedTitle, setEditedTitle] = useState(initialTitle);
  const [editedContent, setEditedContent] = useState(initialContent);
  const [selectedFolder, setSelectedFolder] = useState(folder);

  const handleSave = () => {
    if (editedTitle.trim() && editedContent.trim()) {
      updateNote({
        id,
        folder: selectedFolder,
        title: editedTitle,
        content: editedContent,
      });

      navigation.goBack();
    } else {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля.', [{ text: 'ОК' }]);
    }
  };

  return (
    <View style={styles.container}>
   
      <Text style={styles.header}>Редактирование</Text>

      <View style={styles.folders}>
        {['Все', 'Личное', 'Учёба', 'Работа'].map((folder) => (
          <TouchableOpacity key={folder} onPress={() => setSelectedFolder(folder)}>
            <Text
              style={[
                styles.folderText,
                selectedFolder === folder && styles.selectedFolder,
              ]}
            >
              {folder}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Заголовок"
        value={editedTitle}
        onChangeText={setEditedTitle}
      />
      <TextInput
        style={styles.textArea}
        placeholder="Текст заметки"
        value={editedContent}
        onChangeText={setEditedContent}
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
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  folderText: {
    fontSize: 16,
    color: '#6c757d',
  },
  selectedFolder: {
    color: '#007bff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
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
    width: 150,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditNoteScreen;
