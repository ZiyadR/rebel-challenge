import create, { SetState, GetState } from 'zustand';

interface LayoutStore {
  selected: string,
  setSelected: (selected: string) => void,
};

const useLayoutStore = create<LayoutStore>((set: SetState<LayoutStore>, get: GetState<LayoutStore>) => ({
  selected: window.location.pathname,
  setSelected: (selected) => set(() => ({ selected })),
}));

export default useLayoutStore;