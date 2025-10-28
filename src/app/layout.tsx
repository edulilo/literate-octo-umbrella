import type { Metadata } from "next";
import { StackAuthProvider } from "@/lib/stack-client";
import "./globals.css";

export const metadata: Metadata = {
  title: "Japanese Learning App",
  description: "Learn Japanese with our interactive app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StackAuthProvider>
          {children}
        </StackAuthProvider>
      </body>
    </html>
  );
}
