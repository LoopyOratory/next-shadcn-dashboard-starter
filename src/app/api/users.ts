// ============================================================
// Route Handler — Users (list + create)
// ============================================================
// See the TanStack Start migration guide for pattern documentation.
// ============================================================

import { createFileRoute } from '@tanstack/react-router';
import { fakeUsers } from '@/constants/mock-api-users';

export const Route = createFileRoute('/api/users')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { searchParams } = new URL(request.url);

        const page = Number(searchParams.get('page') ?? 1);
        const limit = Number(searchParams.get('limit') ?? 10);
        const roles = searchParams.get('roles') ?? undefined;
        const search = searchParams.get('search') ?? undefined;
        const sort = searchParams.get('sort') ?? undefined;

        const data = await fakeUsers.getUsers({
          page,
          limit,
          roles,
          search,
          sort
        });

        return Response.json(data);
      },
      POST: async ({ request }) => {
        const body = await request.json();
        const data = await fakeUsers.createUser(body);
        return Response.json(data, { status: 201 });
      }
    }
  }
});
