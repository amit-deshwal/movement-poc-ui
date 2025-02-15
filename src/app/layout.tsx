"use client";

import React from "react";
import { WalletProvider, useWallet, ConnectButton } from "@razorlabs/razorkit";
import "@razorlabs/razorkit/style.css";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css";
import LandingPage from "@/components/LandingPage";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletProvider autoConnect={true}>
          <LayoutContent>{children}</LayoutContent>
        </WalletProvider>
      </body>
    </html>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const wallet = useWallet();
  const pathname = usePathname();

  // Show landing page if wallet is NOT connected
  if (!wallet.connected) {
    return <LandingPage />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <div className="absolute top-4 right-4 z-50">
          <ConnectButton />
        </div>

        <Sidebar>
          <SidebarHeader>
            <h2 className="text-lg font-semibold p-4">AI Trader</h2>
          </SidebarHeader>
          <SidebarContent>
            <nav className="space-y-2 p-4">
              <Link
                href="/"
                className={`block p-2 rounded ${
                  pathname === "/" ? "bg-gray-200" : ""
                }`}
              >
                Portfolio
              </Link>
              <Link
                href="/chat"
                className={`block p-2 rounded ${
                  pathname === "/chat" ? "bg-gray-200" : ""
                }`}
              >
                Chat
              </Link>
            </nav>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 w-full">{children}</main>
      </div>
    </SidebarProvider>
  );
}
