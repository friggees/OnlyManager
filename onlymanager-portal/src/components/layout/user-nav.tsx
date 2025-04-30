'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button'; // Import the actual button

export function UserNav() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
      // Optionally show an error message to the user
    } else {
      // Redirect to login page after successful logout
      router.push('/login');
      // router.refresh(); // May not be needed, but consider if session state isn't clearing correctly
    }
  };

  // TODO: Fetch and display actual user info (e.g., email or name)
  const userInfoPlaceholder = 'User Info Placeholder';

  return (
    <div className="mt-auto pt-4 border-t flex flex-col items-start space-y-2">
      <p className="text-sm text-gray-600">{userInfoPlaceholder}</p>
      <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">
        Logout
      </Button>
    </div>
  );
}
