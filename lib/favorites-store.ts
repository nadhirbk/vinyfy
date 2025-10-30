import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Vinyl } from "./vinyl-data"

interface FavoritesState {
  favorites: Vinyl[]
  addFavorite: (vinyl: Vinyl) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  toggleFavorite: (vinyl: Vinyl) => void
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (vinyl) =>
        set((state) => {
          if (state.favorites.some((item) => item.id === vinyl.id)) {
            return state
          }
          return { favorites: [...state.favorites, vinyl] }
        }),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== id),
        })),
      isFavorite: (id) => get().favorites.some((item) => item.id === id),
      toggleFavorite: (vinyl) => {
        const { isFavorite, addFavorite, removeFavorite } = get()
        if (isFavorite(vinyl.id)) {
          removeFavorite(vinyl.id)
        } else {
          addFavorite(vinyl)
        }
      },
    }),
    {
      name: "vinyfy-favorites",
    },
  ),
)
