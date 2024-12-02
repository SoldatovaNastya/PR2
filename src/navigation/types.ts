export type RootStackParamList = {
    Home: undefined;
    Folders: undefined;
    AddFolder: { addFolder: (folderName: string) => void };
    AddNote: undefined;
    EditNote: {
      id: string;
      folder: string;
      title: string;
      content: string;
    };
    EditFolder: {
        id: string;
        name: string;
      };
  };
  