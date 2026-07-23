import type { Metadata, Viewport } from "next";

import "./globals.css";

import { ColorSchemeProvider } from "@/components/ColorSchemeContext";
import ThemeRegistry from "@/components/ThemeRegistry";
import { ToastProvider } from "@/components";


import Provider from "@/app/redux/Provider";
import { CompanyProvider} from "@/contexts/CompanyContext";
import { PermissionProvider } from "@/contexts/PermissionContext";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: "Your all-in-one HR management platform",
  authors: [{ name: APP_NAME }],
  keywords: ["HR", "Human Resources", "Employee Management", "Payroll"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#ffffff",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#10131f",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Provider>
          <ColorSchemeProvider>
            <ThemeRegistry>
              <CompanyProvider>
                <PermissionProvider>
                  <ToastProvider>{children}</ToastProvider>
                </PermissionProvider>
              </CompanyProvider>
            </ThemeRegistry>
          </ColorSchemeProvider>
        </Provider>
      </body>
    </html>
  );
}
