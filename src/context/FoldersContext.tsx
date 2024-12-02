import React, { createContext, useContext, useState } from 'react';

// Тип папки
type Folder = {
  id: string;
  name: string;
};

// Тип контекста
type FoldersContextType = {
  folders: Folder[];
  addFolder: (folderName: string) => void;
  updateFolder: (id: string, newName: string) => void;
  deleteFolder: (id: string) => void;
};

// Создание контекста
const FoldersContext = createContext<FoldersContextType | undefined>(undefined);

// Провайдер контекста
export const FoldersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [folders, setFolders] = useState<Folder[]>([
    { id: '1', name: 'Все' },
    { id: '2', name: 'Личное' },
    { id: '3', name: 'Учёба' },
    { id: '4', name: 'Работа' },
  ]);

  // Функция добавления папки
  const addFolder = (folderName: string) => {
    setFolders((prev) => [...prev, { id: Date.now().toString(), name: folderName }]);
  };

  // Функция редактирования папки
  const updateFolder = (id: string, newName: string) => {
    setFolders((prev) =>
      prev.map((folder) => (folder.id === id ? { ...folder, name: newName } : folder))
    );
  };

  // Функция удаления папки
  const deleteFolder = (folderId: string) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== folderId));
  };

  return (
    <FoldersContext.Provider value={{ folders, addFolder, updateFolder, deleteFolder }}>
      {children}
    </FoldersContext.Provider>
  );
};

// Хук для использования контекста
export const useFolders = () => {
  const context = useContext(FoldersContext);
  if (!context) {
    throw new Error('useFolders must be used within a FoldersProvider');
  }
  return context;
};
