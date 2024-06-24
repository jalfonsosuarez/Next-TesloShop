'use client';

interface Props {
  children: React.ReactNode;
}


import { SessionProvider } from "next-auth/react";

export const Provider = ({ children }: Props) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
