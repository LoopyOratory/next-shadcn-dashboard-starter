import { createFileRoute } from '@tanstack/react-router';
import PageContainer from '@/components/layout/page-container';
import ProductViewPage from '@/features/products/components/product-view-page';
import { Suspense } from 'react';
import FormCardSkeleton from '@/components/form-card-skeleton';

export const Route = createFileRoute('/dashboard/product/$productId')({
  component: ProductPage
});

function ProductPage() {
  const { productId } = Route.useParams();

  return (
    <PageContainer>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <ProductViewPage productId={productId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
