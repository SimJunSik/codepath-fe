// CodePath Frontend - UI Store
// UI 상태 관리 (사이드바, 모달, 토스트 등)

import { create } from 'zustand';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

interface UIState {
  sidebarOpen: boolean;
  modalStack: string[];
  theme: 'light' | 'dark';
  toast: Toast | null;
}

interface UIActions {
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  setTheme: (theme: UIState['theme']) => void;
  showToast: (toast: Omit<Toast, 'id'>) => void;
  hideToast: () => void;
}

export const useUIStore = create<UIState & UIActions>((set) => ({
  sidebarOpen: true,
  modalStack: [],
  theme: 'light',
  toast: null,

  toggleSidebar: () =>
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    })),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  openModal: (modalId) =>
    set((state) => ({
      modalStack: [...state.modalStack, modalId],
    })),

  closeModal: () =>
    set((state) => ({
      modalStack: state.modalStack.slice(0, -1),
    })),

  setTheme: (theme) => set({ theme }),

  showToast: (toast) =>
    set({
      toast: { ...toast, id: Date.now().toString() },
    }),

  hideToast: () => set({ toast: null }),
}));
