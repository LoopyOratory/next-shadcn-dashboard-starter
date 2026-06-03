import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { DEFAULT_THEME } from '@/components/themes/theme.config';
import { ActiveThemeProvider } from '@/components/themes/active-theme';
import QueryProvider from '@/components/layout/query-provider';
import appCss from '@/styles/globals.css?url';
import { NotFound } from '@/components/shared/not-found';

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        name: 'theme-color',
        content: '#ffffff',
        media: '(prefers-color-scheme: light)'
      },
      {
        name: 'theme-color',
        content: '#09090b',
        media: '(prefers-color-scheme: dark)'
      },
      { title: 'Next Shadcn' }
    ],
    links: [{ rel: 'stylesheet', href: appCss }]
  }),
  component: RootLayout
});

function RootLayout() {
  return (
    <html lang='en' suppressHydrationWarning data-theme={DEFAULT_THEME}>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#09090b')
                }
              } catch (_) {}
            `
          }}
        />
      </head>
      <body className='bg-background overflow-x-hidden overscroll-none font-sans antialiased'>
        <QueryProvider>
          <Toaster />
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <ActiveThemeProvider initialTheme={DEFAULT_THEME}>
              <Outlet />
            </ActiveThemeProvider>
          </ThemeProvider>
        </QueryProvider>
        <TanStackRouterDevtools />
        <Scripts />
      </body>
    </html>
  );
}
