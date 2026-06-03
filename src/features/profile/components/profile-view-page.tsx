export default function ProfileViewPage() {
  return (
    <div className='flex w-full flex-col p-4'>
      <p className='text-muted-foreground text-sm'>
        Profile management is available in the full version.
      </p>
      <div className='mt-4 space-y-4'>
        <div className='rounded-lg border p-4'>
          <h3 className='font-medium'>User Profile</h3>
          <p className='text-muted-foreground text-sm mt-1'>
            Profile settings, preferences, and account management will be available here.
          </p>
        </div>
      </div>
    </div>
  );
}
