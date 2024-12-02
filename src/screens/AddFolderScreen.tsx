import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types'; // Импорт типов маршрутов


type AddFolderScreenRouteProp = RouteProp<RootStackParamList, 'AddFolder'>;

const AddFolderScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<AddFolderScreenRouteProp>();
  const { addFolder } = route.params;

  const [folderName, setFolderName] = useState('');

  const handleSave = () => {
    if (folderName.trim()) {
      addFolder(folderName);
      navigation.goBack();
    } else {
      Alert.alert('Ошибка', 'Введите название папки.', [{ text: 'ОК' }]);
    }
  };
  return (
    <View style={styles.container}>
    
      <Text style={styles.header}>Новая папка</Text>
      <TextInput
        style={styles.input}
        placeholder="Введите название папки"
        value={folderName}
        onChangeText={setFolderName}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Ок</Text>
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
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
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
    width: 100,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddFolderScreen;
