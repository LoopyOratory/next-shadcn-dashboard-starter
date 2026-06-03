'use client';

import { createFileRoute } from '@tanstack/react-router';
import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const Route = createFileRoute('/dashboard/exclusive')({
  component: ExclusivePage
});

function ExclusivePage() {
  return (
    <PageContainer>
      <div className='space-y-6'>
        <Alert>
          <Icons.lock className='h-5 w-5 text-yellow-600' />
          <AlertDescription>
            <div className='mb-1 text-lg font-semibold'>Exclusive Area</div>
            <div className='text-muted-foreground'>
              This page showcases exclusive features. Plan-based gating requires a billing
              integration.
            </div>
          </AlertDescription>
        </Alert>
        <div>
          <h1 className='flex items-center gap-2 text-3xl font-bold tracking-tight'>
            <Icons.badgeCheck className='h-7 w-7 text-green-600' />
            Exclusive Area
          </h1>
          <p className='text-muted-foreground'>Welcome! This page contains exclusive features.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Thank You for Checking Out the Exclusive Page</CardTitle>
            <CardDescription>
              This content is available to all authenticated users in this demo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='text-lg'>Have a wonderful day!</div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
