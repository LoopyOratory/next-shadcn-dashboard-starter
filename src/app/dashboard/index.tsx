import { createFileRoute, redirect } from '@tanstack/react-router';
import { getSession } from '@/lib/auth-functions';

export const Route = createFileRoute('/dashboard/')({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) {
      throw redirect({ to: '/auth/sign-in' });
    }
    throw redirect({ to: '/dashboard/overview' });
  }
});
