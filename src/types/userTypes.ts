export interface AppContextType {
  currentUser: userData | null;
  allUsers: any[];
  loading: boolean;
}

export interface userData {
  email: string;
  username: string;
  id: string;
  created: Date;
  gamesLibrary: [];
  gamesLists: [];
}
