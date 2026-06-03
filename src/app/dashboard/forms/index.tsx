import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/forms/')({
  component: Page
});

function Page() {
  throw redirect({ to: '/dashboard/forms/basic' });
}
