import { createFileRoute } from '@tanstack/react-router';
import IconsViewPage from '@/features/elements/components/icons-view-page';

export const Route = createFileRoute('/dashboard/elements/icons')({
  component: Page
});

function Page() {
  return <IconsViewPage />;
}
