"use client";

import { ThemeProvider } from "next-themes";

export default function ThemeContextProvider({ children }) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
