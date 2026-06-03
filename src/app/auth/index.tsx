import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/')({
  component: AuthPage
});

function AuthPage() {
  throw redirect({ to: '/auth/sign-in' });
}
