import create from 'zustand';

interface UserStore {
  userData: any;
  setUserData: (newUserData: any) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userData: {},
  setUserData: (newUserData) => set((state) => {
    if (newUserData !== state.userData) {
      return { userData: newUserData };
    }
    return state;
  }),
}));
