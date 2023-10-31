import "./global.css";

import React from "react";
import { Inter } from "next/font/google";

import AppNav from "@/client/AppNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard Web",
  description: "Dashboard Web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{
          display: "flex",
          maxHeight: "100vh",
          backgroundColor: "#F9F9F9",
        }}
      >
        <nav>
          <AppNav />
        </nav>
        <main style={{ width: "100%", overflow: "auto" }}>{children}</main>
      </body>
    </html>
  );
}
