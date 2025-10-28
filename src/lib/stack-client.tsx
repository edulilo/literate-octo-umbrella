"use client";
import { StackProvider, StackTheme, StackClientApp } from "@stackframe/stack";

const stackApp = new StackClientApp({
  tokenStore: "cookie",
});

export function StackAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <StackProvider app={stackApp}>
      <StackTheme>
        {children}
      </StackTheme>
    </StackProvider>
  );
}
