import { createFileRoute } from '@tanstack/react-router';
import PageContainer from '@/components/layout/page-container';
import FormsShowcasePage from '@/features/forms/components/forms-showcase-page';

export const Route = createFileRoute('/dashboard/forms/multi-step')({
  component: Page
});

function Page() {
  return (
    <PageContainer pageTitle='Multi-Step Form' pageDescription='Multi-step wizard form pattern.'>
      <FormsShowcasePage />
    </PageContainer>
  );
}
