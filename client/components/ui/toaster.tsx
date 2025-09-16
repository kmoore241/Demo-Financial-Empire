// client/components/ui/toaster.tsx
import { useToast } from "@/hooks/use-toast";
import * as React from "react";
import { Toaster as SonnerToaster } from "sonner";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

// ✅ Provide a named export
export function Toaster(props: React.ComponentProps<typeof SonnerToaster>) {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...rest }) => (
        <Toast key={id} {...rest}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}

// (Optional) keep default too, if you like:
export default Toaster;
