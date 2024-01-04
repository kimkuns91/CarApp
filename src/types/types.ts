export type RootStackParamList = {
  Splash: undefined;
  SignUp: undefined;
  SignIn: undefined;
  SignInByEmail: undefined;
  BottomTab: undefined;
  Loading: undefined;
  Chat: {
    userIds: string[];
  };
};

export type BottomTabParamList = {
  Home: undefined;
  Community: undefined;
  Search: undefined;
  Alert: undefined;
  MyPage: undefined;
};

export interface User {
  userId: string;
  email: string;
  name: string;
  profileUrl?: string;
}

export enum Collections {
  USERS = 'users',
  CHATS = 'chats',
  MESSAGES = 'messages',
}
