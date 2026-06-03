'use client';

import { createFileRoute } from '@tanstack/react-router';
import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Icons } from '@/components/icons';
import { billingInfoContent } from '@/config/infoconfig';

export const Route = createFileRoute('/dashboard/billing')({
  component: BillingPage
});

function BillingPage() {
  return (
    <PageContainer
      accessFallback={
        <div className='flex min-h-[400px] items-center justify-center'>
          <div className='space-y-2 text-center'>
            <h2 className='text-2xl font-semibold'>Billing</h2>
            <p className='text-muted-foreground'>
              Billing management is available in the full version.
            </p>
          </div>
        </div>
      }
      infoContent={billingInfoContent}
      pageTitle='Billing & Plans'
      pageDescription='Manage your subscription and usage limits'
    >
      <div className='space-y-6'>
        <Alert>
          <Icons.info className='h-4 w-4' />
          <AlertDescription>
            Billing and subscription management will be integrated here. Subscribe to a plan to
            unlock features and higher limits.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Available Plans</CardTitle>
            <CardDescription>Choose a plan that fits your needs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground'>
              Plans and billing are managed through your authentication provider.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
