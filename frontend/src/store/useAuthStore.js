import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useAuthStore = create(
  persist(
    (set) => ({
      _id: null,
      role: null,
      userName: null,
      loading: true,
      assignUserDetails: (data) =>
        set({
          _id: data._id,
          userName: data.name,
          role: data.role,
          loading: false,
        }),
      logout: () => set({ _id: null, role: null, userName: null }),
    }),
    {
      name: "authStorage",
      partialize: (state) => ({
        _id: state._id,
        userName: state.userName,
        role: state.role,
        loading: state.loading,
      }),
    },
  ),
);
