import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFolders } from '../context/FoldersContext';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type EditFolderRouteProp = RouteProp<RootStackParamList, 'EditFolder'>;

const EditFolderScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<EditFolderRouteProp>();
  const { id, name: initialName } = route.params;

  const { updateFolder } = useFolders();

  const [folderName, setFolderName] = useState(initialName);

  const handleSave = () => {
    if (folderName.trim()) {
      updateFolder(id, folderName);
      navigation.goBack();
    } else {
      Alert.alert('Ошибка', 'Введите название папки.', [{ text: 'ОК' }]);
    }
  };

  return (
    <View style={styles.container}>
     

      <Text style={styles.header}>Редактирование папки</Text>

      <TextInput
        style={styles.input}
        placeholder="Введите название папки"
        value={folderName}
        onChangeText={setFolderName}
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
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

export default EditFolderScreen;
