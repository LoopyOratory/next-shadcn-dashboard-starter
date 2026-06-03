// ============================================================
// Route Handler — Products (list + create)
// ============================================================
// See the TanStack Start migration guide for pattern documentation.
// ============================================================

import { createFileRoute } from '@tanstack/react-router';
import { fakeProducts } from '@/constants/mock-api';

export const Route = createFileRoute('/api/products')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { searchParams } = new URL(request.url);

        const page = Number(searchParams.get('page') ?? 1);
        const limit = Number(searchParams.get('limit') ?? 10);
        const categories = searchParams.get('categories') ?? undefined;
        const search = searchParams.get('search') ?? undefined;
        const sort = searchParams.get('sort') ?? undefined;

        const data = await fakeProducts.getProducts({
          page,
          limit,
          categories,
          search,
          sort
        });

        return Response.json(data);
      },
      POST: async ({ request }) => {
        const body = await request.json();
        const data = await fakeProducts.createProduct(body);
        return Response.json(data, { status: 201 });
      }
    }
  }
});
