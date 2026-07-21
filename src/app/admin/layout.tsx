import type { ReactNode } from "react";

import type { Metadata } from "next";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  APP_CONFIG,
  fontVars,
  PREFERENCE_DEFAULTS,
  ThemeBootScript,
  PreferencesStoreProvider,
  DashboardLayout,
} from "@/components/dashboard";
import { requireAdmin } from "@/lib/auth/helpers";

import "@/components/dashboard/theme.css";

export const metadata: Metadata = {
  title: `Админ-панель — ${APP_CONFIG.meta.title}`,
  description: APP_CONFIG.meta.description,
};

export default async function AdminRootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  await requireAdmin();

  const {
    theme_mode,
    theme_preset,
    content_layout,
    navbar_style,
    sidebar_variant,
    sidebar_collapsible,
    font,
  } = PREFERENCE_DEFAULTS;

  return (
    <html
      lang="en"
      data-theme-mode={theme_mode}
      data-theme-preset={theme_preset}
      data-content-layout={content_layout}
      data-navbar-style={navbar_style}
      data-sidebar-variant={sidebar_variant}
      data-sidebar-collapsible={sidebar_collapsible}
      data-font={font}
      suppressHydrationWarning
    >
      <head>
        <ThemeBootScript />
      </head>
      <body className={`${fontVars} min-h-screen antialiased`}>
        <TooltipProvider>
          <PreferencesStoreProvider initialValues={PREFERENCE_DEFAULTS}>
            <DashboardLayout>{children}</DashboardLayout>
            <Toaster />
          </PreferencesStoreProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
