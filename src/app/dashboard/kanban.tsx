import { createFileRoute } from '@tanstack/react-router';
import KanbanViewPage from '@/features/kanban/components/kanban-view-page';

export const Route = createFileRoute('/dashboard/kanban')({
  component: Page
});

function Page() {
  return <KanbanViewPage />;
}
