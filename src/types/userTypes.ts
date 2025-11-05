export interface AppContextType {
  currentUser: userData | null;
  allUsers: any[];
  loading: boolean;
}

export interface userData {
  email: string;
  username: string;
  id: string;
  bio: string;
  created: Date;
  gamesLibrary: object[];
  favourites: object[];
  gamesLists: object[];
}
