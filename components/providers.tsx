"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { ThemeProviderComponent } from "@/components/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProviderComponent>{children}</ThemeProviderComponent>
    </Provider>
  );
}
