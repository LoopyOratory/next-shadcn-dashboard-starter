import { createFileRoute } from '@tanstack/react-router';
import ProfileViewPage from '@/features/profile/components/profile-view-page';

export const Route = createFileRoute('/dashboard/profile')({
  component: Page
});

function Page() {
  return <ProfileViewPage />;
}
