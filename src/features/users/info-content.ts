import type { InfobarContent } from '@/components/ui/infobar';

export const usersInfoContent: InfobarContent = {
  title: 'Users — TanStack URL State + React Query',
  sections: [
    {
      title: 'Overview',
      description:
        'This page demonstrates client-side data fetching with React Query combined with TanStack Router URL search params. Both patterns use the same DataTable and useDataTable hook for URL-synced table state.',
      links: [
        {
          title: 'TanStack Query SSR Docs',
          url: 'https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr'
        }
      ]
    },
    {
      title: 'Server Prefetch + Client Hydration',
      description:
        'The server reads search params, builds filters, and calls queryClient.prefetchQuery(). The dehydrated state is passed to HydrationBoundary so the client starts with cached data. The client component reads the same search params from the URL and calls useSuspenseQuery with matching filters.',
      links: []
    },
    {
      title: 'URL State with TanStack Router',
      description:
        "Pagination, search, and role filters are synced to the URL via TanStack Router's useLocation and useNavigate. The useDataTable hook manages the TanStack Table state and debounces filter changes before updating the URL. When the URL changes, React Query automatically refetches because the query key includes the filters.",
      links: [
        {
          title: 'TanStack Router Search Params',
          url: 'https://tanstack.com/router/latest/docs/framework/react/guide/search-params'
        }
      ]
    },
    {
      title: 'Products vs Users Pattern',
      description:
        'Products: URL search params → fetch → pass data as props to client table. Users: URL search params → server prefetch → HydrationBoundary → client useSuspenseQuery. The Users pattern enables background refetching, cache sharing across components, and optimistic mutations.',
      links: []
    }
  ]
};
