import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Formiq",
  description: "AI Generated Form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark">
        <Toaster
          position="top-right"
          expand={false}
          richColors={true}
        />
        {children}
      </body>
    </html>
  );
}
