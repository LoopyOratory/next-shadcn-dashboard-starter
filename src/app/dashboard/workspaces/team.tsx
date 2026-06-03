'use client';

import { createFileRoute } from '@tanstack/react-router';
import PageContainer from '@/components/layout/page-container';
import { teamInfoContent } from '@/config/infoconfig';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const Route = createFileRoute('/dashboard/workspaces/team')({
  component: TeamPage
});

function TeamPage() {
  return (
    <PageContainer
      pageTitle='Team Management'
      pageDescription='Manage your workspace team, members, roles, security and more.'
      infoContent={teamInfoContent}
    >
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Team management is available in the full version.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>
            Invite team members, manage roles, and configure workspace security. This feature
            requires an organization management system.
          </p>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
