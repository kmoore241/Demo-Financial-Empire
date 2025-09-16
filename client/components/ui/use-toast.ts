import { toast as sonnerToast } from 'sonner';

type ToastInput =
  | string
  | { title?: string; description?: string; action?: React.ReactNode; [k: string]: any };

export function useToast() {
  return {
    // Allow existing code to call useToast().toast(...)
    toast(input: ToastInput) {
      if (typeof input === 'string') return sonnerToast(input);
      const message = input.title ?? input.description ?? '';
      return sonnerToast(message);
    },
    // Kept for API compatibility; not used with Sonner rendering
    toasts: [] as any[]
  };
}
