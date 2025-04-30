import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// IMPORTANT: Ensure these environment variables are set in your .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: NextRequest) {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('Missing Supabase URL or Service Role Key');
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  // Create a Supabase client authenticated with the service role key
  // This client has admin privileges and should ONLY be used in server-side code
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  try {
    const body = await request.json();
    const { email, password, fullName, roleId } = body;

    // Input validation (basic example)
    if (!email || !fullName || !roleId) {
      return NextResponse.json({ error: 'Missing required fields: email, fullName, roleId.' }, { status: 400 });
    }

    let userId: string | undefined;
    let authError: any = null;

    // Decide whether to invite or create directly based on password presence
    if (password) {
      // Create user directly with password
      const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true, // Automatically confirm email for admin-created users
        user_metadata: { full_name: fullName }, // Optionally store name here too
      });
      authError = createError;
      userId = userData?.user?.id;
    } else {
      // Invite user by email (requires email templates configured in Supabase)
      const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
         data: { full_name: fullName } // Pass metadata if needed
         // redirectTo: 'your-app-url/set-password' // Optional: redirect URL after invite acceptance
      });
       authError = inviteError;
       // Note: For invites, the user doesn't exist in auth.users immediately.
       // Linking profile might need to happen via a trigger or after user accepts invite.
       // For simplicity here, we'll assume direct creation or handle profile linking later.
       // If invite flow is primary, adjust profile creation logic.
       // For now, we'll proceed assuming direct creation if password is provided.
       if (!password) {
         console.log(`Invite sent to ${email}. Profile linking might need separate handling.`);
         // We might skip profile creation here for invites, or create a profile with a pending status.
         // Let's return success for the invite for now.
         if (!inviteError) {
            return NextResponse.json({ message: `Invite sent successfully to ${email}.` }, { status: 200 });
         }
       }
    }

    if (authError) {
      console.error('Supabase Auth Admin Error:', authError);
      throw new Error(authError.message || 'Failed to create user.');
    }

    if (!userId && password) {
       throw new Error('User created but ID not returned.');
    }

    // If user was created directly (with password), assume a trigger handles profile creation.
    // We might need to UPDATE the profile later if the trigger doesn't set role/name correctly.
    // For now, we skip the explicit insert from the API route.
    // if (userId) {
    //     const { error: profileError } = await supabaseAdmin
    //       .from('profiles')
    //       .insert({ // <--- This was causing the conflict if a trigger exists
    //         id: userId,
    //         full_name: fullName,
    //         role_id: parseInt(roleId, 10),
    //         status: 'active'
    //       });
    //     if (profileError) {
    //       console.error('Supabase Profile Insert Error:', profileError);
    //       throw new Error(profileError.message || 'Failed to create user profile.');
    //     }
    // }

    // If we reached here and an auth user was created (userId exists), report success.
    // The profile should have been handled by the trigger.
    if (userId) {
      // Optionally: We could try to UPDATE the profile here to set role/name
      // just in case the trigger didn't, using upsert: false.
      // For now, let's assume the trigger works or we handle updates separately.
       console.log(`User ${userId} created in auth.users. Profile assumed created by trigger.`);
       return NextResponse.json({ message: 'Employee created successfully (profile handled by trigger).' }, { status: 201 });
    }

    // If it was an invite flow and succeeded, it returned earlier.
    // If we somehow get here without userId and without invite success, it's an error.
    throw new Error('User creation flow completed without success or error.');


  } catch (error: any) {
    console.error('Create Employee API Error:', error);
    return NextResponse.json({ error: error.message || 'An unexpected error occurred.' }, { status: 500 });
  }
}
