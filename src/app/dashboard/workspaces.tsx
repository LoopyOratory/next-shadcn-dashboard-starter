'use client';

import { createFileRoute } from '@tanstack/react-router';
import PageContainer from '@/components/layout/page-container';
import { workspacesInfoContent } from '@/config/infoconfig';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const Route = createFileRoute('/dashboard/workspaces')({
  component: WorkspacesPage
});

function WorkspacesPage() {
  return (
    <PageContainer
      pageTitle='Workspaces'
      pageDescription='Manage your workspaces and switch between them'
      infoContent={workspacesInfoContent}
    >
      <Card>
        <CardHeader>
          <CardTitle>Workspaces</CardTitle>
          <CardDescription>Workspace management is available in the full version.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>
            Create and manage multiple workspaces for your team. This feature requires an
            organization management system.
          </p>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
