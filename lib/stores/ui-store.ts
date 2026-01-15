import { create } from 'zustand';

interface UIState {
  searchQuery: string;
  selectedCategory: string;
  priceRange: [number, number];
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
  resetFilters: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  searchQuery: '',
  selectedCategory: '',
  priceRange: [0, 10000],
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setPriceRange: (range) => set({ priceRange: range }),
  resetFilters: () => set({ searchQuery: '', selectedCategory: '', priceRange: [0, 10000] }),
}));
