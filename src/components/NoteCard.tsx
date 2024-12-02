import React, { createContext, useContext, useState } from 'react';

// Тип для заметки
type Note = {
  id: string;
  folder: string;
  title: string;
  content: string;
};

type NotesContextType = {
  notes: Note[];
  addNote: (note: Note) => void;
};

// Создаём контекст
const NotesContext = createContext<NotesContextType | undefined>(undefined);

// Провайдер для контекста
export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  // Функция добавления новой заметки
  const addNote = (note: Note) => {
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  return (
    <NotesContext.Provider value={{ notes, addNote }}>
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
