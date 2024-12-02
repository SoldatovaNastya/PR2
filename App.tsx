import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';
import { NotesProvider } from './src/context/NotesContext';
import { FoldersProvider } from './src/context/FoldersContext';

const App = () => {
  return (
    <FoldersProvider>
      <NotesProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </NotesProvider>
    </FoldersProvider>
  );
};

export default App;
