import { createFileRoute } from '@tanstack/react-router';
import SignInViewPage from '@/features/auth/components/sign-in-view';

export const Route = createFileRoute('/auth/sign-in')({
  component: Page
});

async function Page() {
  return <SignInViewPage />;
}
