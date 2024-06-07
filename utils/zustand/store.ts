import create from 'zustand';

interface StoreState {
  data: any;
  setData: (newData: any) => void;
}

export const useStore = create<StoreState>((set) => ({
  data: null, // Inicialmente no hay datos
  setData: (newData: any) => set({ data: newData }),
}));
