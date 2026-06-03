import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { useSession, authClient } from '@/lib/auth-client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icons } from '@/components/icons';
import { PageTransition } from '@/components/animations/page-transition';
import { StaggerContainer, StaggerItem } from '@/components/animations/stagger-children';

export default function ProfileViewPage() {
  const navigate = useNavigate();
  const { data: session, isPending, refetch } = useSession();

  const [name, setName] = useState('');
  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [nameEditing, setNameEditing] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  if (isPending) {
    return <ProfileSkeleton />;
  }

  if (!session) {
    return (
      <div className='flex flex-1 flex-col items-center justify-center p-8'>
        <Icons.account className='text-muted-foreground mb-4 h-16 w-16' />
        <h2 className='text-xl font-semibold'>Not signed in</h2>
        <p className='text-muted-foreground mt-1 text-sm'>Please sign in to view your profile.</p>
        <Button className='mt-4' onClick={() => navigate({ to: '/auth/sign-in' })}>
          Sign In
        </Button>
      </div>
    );
  }

  const user = session.user;
  const currentSession = session.session;

  const userInitials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : user.email.slice(0, 2).toUpperCase();

  const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleUpdateName = async () => {
    if (!name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }
    setIsUpdatingName(true);
    try {
      const result = await authClient.updateUser({ name: name.trim() });
      if (result.error) {
        toast.error(result.error.message || 'Failed to update name');
      } else {
        toast.success('Name updated successfully');
        await refetch();
        setNameEditing(false);
      }
    } catch {
      toast.error('An unexpected error occurred');
    } finally {
      setIsUpdatingName(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('All password fields are required');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('New password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setIsChangingPassword(true);
    try {
      const result = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: false
      });
      if (result.error) {
        toast.error(result.error.message || 'Failed to change password');
      } else {
        toast.success('Password changed successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch {
      toast.error('An unexpected error occurred');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const cancelNameEdit = () => {
    setNameEditing(false);
    setName('');
  };

  return (
    <PageTransition>
      <div className='flex w-full flex-col gap-6 p-4 md:p-6'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Profile</h1>
          <p className='text-muted-foreground text-sm'>
            Manage your account settings and preferences.
          </p>
        </div>

        <StaggerContainer>
          <StaggerItem>
            <Card className='max-w-2xl'>
              <CardHeader className='flex flex-row items-center gap-4'>
                <Avatar className='h-16 w-16'>
                  <AvatarImage src={user.image || ''} alt={user.name || user.email} />
                  <AvatarFallback className='text-lg'>{userInitials}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className='text-xl'>{user.name || 'Unnamed User'}</CardTitle>
                  <CardDescription className='flex items-center gap-2'>
                    {user.email}
                    {user.emailVerified && (
                      <Badge variant='secondary' className='text-xs'>
                        Verified
                      </Badge>
                    )}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </StaggerItem>

          <StaggerItem>
            <Tabs defaultValue='profile' className='w-full'>
              <TabsList className='w-full max-w-md'>
                <TabsTrigger value='profile' className='flex-1'>
                  Profile
                </TabsTrigger>
                <TabsTrigger value='security' className='flex-1'>
                  Security
                </TabsTrigger>
                <TabsTrigger value='sessions' className='flex-1'>
                  Sessions
                </TabsTrigger>
              </TabsList>

              <TabsContent value='profile' className='mt-4 space-y-4'>
                <Card className='max-w-2xl'>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your display name and profile details.</CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        name='email'
                        value={user.email}
                        disabled
                        className='max-w-md'
                      />
                      <p className='text-muted-foreground text-xs'>
                        Email changes require verification. Contact support to update your email.
                      </p>
                    </div>

                    <Separator />

                    {!nameEditing ? (
                      <div className='space-y-2'>
                        <Label>Display Name</Label>
                        <div className='flex items-center gap-3'>
                          <span className='text-sm'>{user.name || 'Not set'}</span>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => {
                              setName(user.name || '');
                              setNameEditing(true);
                            }}
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className='space-y-2'>
                        <Label htmlFor='name'>Display Name</Label>
                        <div className='flex items-center gap-2'>
                          <Input
                            id='name'
                            name='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Enter your display name'
                            className='max-w-xs'
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleUpdateName();
                              if (e.key === 'Escape') cancelNameEdit();
                            }}
                          />
                          <Button
                            size='sm'
                            onClick={handleUpdateName}
                            disabled={isUpdatingName || !name.trim()}
                          >
                            {isUpdatingName ? (
                              <Icons.spinner className='h-4 w-4 animate-spin' />
                            ) : (
                              'Save'
                            )}
                          </Button>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={cancelNameEdit}
                            disabled={isUpdatingName}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}

                    <Separator />

                    <div className='space-y-2'>
                      <Label>Member Since</Label>
                      <p className='text-muted-foreground text-sm'>{memberSince}</p>
                    </div>

                    <div className='space-y-2'>
                      <Label>User ID</Label>
                      <p className='text-muted-foreground font-mono text-xs'>{user.id}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='security' className='mt-4 space-y-4'>
                <Card className='max-w-2xl'>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                      Update your password. You'll need your current password.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='max-w-md space-y-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='currentPassword'>Current Password</Label>
                        <Input
                          id='currentPassword'
                          name='currentPassword'
                          type='password'
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder='Enter current password'
                        />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='newPassword'>New Password</Label>
                        <Input
                          id='newPassword'
                          name='newPassword'
                          type='password'
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder='Enter new password (min 8 characters)'
                        />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='confirmPassword'>Confirm New Password</Label>
                        <Input
                          id='confirmPassword'
                          name='confirmPassword'
                          type='password'
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder='Confirm new password'
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleChangePassword();
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={handleChangePassword}
                      disabled={
                        isChangingPassword || !currentPassword || !newPassword || !confirmPassword
                      }
                    >
                      {isChangingPassword ? (
                        <>
                          <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                          Changing...
                        </>
                      ) : (
                        'Change Password'
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value='sessions' className='mt-4 space-y-4'>
                <Card className='max-w-2xl'>
                  <CardHeader>
                    <CardTitle>Active Session</CardTitle>
                    <CardDescription>Details about your current login session.</CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-3'>
                    <div className='grid gap-2'>
                      <div className='flex justify-between text-sm'>
                        <span className='text-muted-foreground'>Session ID</span>
                        <span className='font-mono text-xs'>{currentSession.id}</span>
                      </div>
                      <Separator />
                      <div className='flex justify-between text-sm'>
                        <span className='text-muted-foreground'>Created</span>
                        <span>{new Date(currentSession.createdAt).toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className='flex justify-between text-sm'>
                        <span className='text-muted-foreground'>Expires</span>
                        <span>{new Date(currentSession.expiresAt).toLocaleString()}</span>
                      </div>
                      {currentSession.ipAddress && (
                        <>
                          <Separator />
                          <div className='flex justify-between text-sm'>
                            <span className='text-muted-foreground'>IP Address</span>
                            <span className='font-mono text-xs'>{currentSession.ipAddress}</span>
                          </div>
                        </>
                      )}
                      {currentSession.userAgent && (
                        <>
                          <Separator />
                          <div className='flex justify-between text-sm'>
                            <span className='text-muted-foreground'>User Agent</span>
                            <span className='max-w-[300px] truncate font-mono text-xs'>
                              {currentSession.userAgent}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </PageTransition>
  );
}

function ProfileSkeleton() {
  return (
    <div className='flex w-full flex-col gap-6 p-4 md:p-6'>
      <div>
        <Skeleton className='h-8 w-32' />
        <Skeleton className='mt-1 h-4 w-64' />
      </div>

      <Card>
        <CardHeader className='flex flex-row items-center gap-4'>
          <Skeleton className='h-16 w-16 rounded-full' />
          <div className='space-y-2'>
            <Skeleton className='h-6 w-40' />
            <Skeleton className='h-4 w-56' />
          </div>
        </CardHeader>
      </Card>

      <div className='flex gap-2'>
        <Skeleton className='h-10 w-24' />
        <Skeleton className='h-10 w-24' />
        <Skeleton className='h-10 w-24' />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-48' />
          <Skeleton className='h-4 w-72' />
        </CardHeader>
        <CardContent className='space-y-4'>
          <Skeleton className='h-10 w-full max-w-md' />
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-10 w-full max-w-md' />
          <Skeleton className='h-10 w-full max-w-md' />
        </CardContent>
      </Card>
    </div>
  );
}
