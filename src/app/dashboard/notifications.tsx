import { createFileRoute } from '@tanstack/react-router';
import NotificationsPage from '@/features/notifications/components/notifications-page';

export const Route = createFileRoute('/dashboard/notifications')({
  component: Page
});

function Page() {
  return <NotificationsPage />;
}
