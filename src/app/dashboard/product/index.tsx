import { createFileRoute } from '@tanstack/react-router';
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import ProductListingPage from '@/features/products/components/product-listing';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Link } from '@tanstack/react-router';
import { productInfoContent } from '@/config/infoconfig';

export const Route = createFileRoute('/dashboard/product/')({
  component: Page
});

function Page() {
  return (
    <PageContainer
      pageTitle='Products'
      pageDescription='Manage products (TanStack URL state + React Query table pattern.)'
      infoContent={productInfoContent}
      pageHeaderAction={
        <Link to='/dashboard/product/new' className={cn(buttonVariants(), 'text-xs md:text-sm')}>
          <Icons.add className='mr-2 h-4 w-4' /> Add New
        </Link>
      }
    >
      <ProductListingPage />
    </PageContainer>
  );
}
