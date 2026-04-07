import { create } from "zustand";
import { persist } from "zustand/middleware";

export const currentTabStore = create(
  persist(
    (set) => ({
      isItem: true,
      isOrder: false,
      isAddItem: false,
      selectItems: () => {
        set({
          isItem: true,
          isOrder: false,
          isAddItem: false,
        });
      },
      selectOrders: () => {
        set({
          isItem: false,
          isOrder: true,
          isAddItem: false,
        });
      },
      selectAddItem: () => {
        set({
          isItem: false,
          isOrder: false,
          isAddItem: true,
        });
      },
      resetTabs: () => set({ isItem: true, isOrder: false, isAddItem: false }),
    }),
    {
      name: "tabStatusStore",
      partialize: (state) => ({
        isItem: state.isItem,
        isOrder: state.isOrder,
        isAddItem: state.isAddItem,
      }),
    },
  ),
);
