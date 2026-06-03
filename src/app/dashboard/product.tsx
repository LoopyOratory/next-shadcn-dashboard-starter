import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/product')({
  component: ProductLayout
});

function ProductLayout() {
  return <Outlet />;
}
