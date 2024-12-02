import React, { createContext, useContext, useState, ReactNode } from 'react';

// Тип заметки
export type Note = {
  id: string;
  folder: string;
  title: string;
  content: string;
};

// Тип контекста
export type NotesContextType = {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (updatedNote: Note) => void;
  deleteNote: (id: string) => void; // Добавлено удаление заметки
};

// Создаем контекст
export const NotesContext = createContext<NotesContextType | undefined>(undefined);

// Типизация пропсов для NotesProvider
type NotesProviderProps = {
  children: ReactNode; // Свойство children может быть любым React-узлом
};

// Реализация провайдера контекста
export const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  // Функция для добавления новой заметки
  const addNote = (note: Note) => {
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  // Функция для обновления существующей заметки
  const updateNote = (updatedNote: Note) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  // Функция для удаления заметки
  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};

// Хук для использования контекста
export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};
