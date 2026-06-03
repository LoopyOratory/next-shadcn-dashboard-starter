import { createFileRoute } from '@tanstack/react-router';
import OverViewPage from '@/features/overview/components/overview';

export const Route = createFileRoute('/dashboard/overview')({
  component: OverViewPage
});
