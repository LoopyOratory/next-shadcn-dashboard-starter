import { createFileRoute } from '@tanstack/react-router';
import PageContainer from '@/components/layout/page-container';
import UserListingPage from '@/features/users/components/user-listing';
import { usersInfoContent } from '@/features/users/info-content';
import { UserFormSheetTrigger } from '@/features/users/components/user-form-sheet';

export const Route = createFileRoute('/dashboard/users')({
  component: UsersPage
});

function UsersPage() {
  return (
    <PageContainer
      pageTitle='Users'
      pageDescription='Manage users (TanStack URL state + React Query table pattern.)'
      infoContent={usersInfoContent}
      pageHeaderAction={<UserFormSheetTrigger />}
    >
      <UserListingPage />
    </PageContainer>
  );
}
