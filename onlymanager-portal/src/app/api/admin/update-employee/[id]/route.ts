import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// IMPORTANT: Ensure these environment variables are set in your .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Define the expected shape of the update data
interface UpdateProfilePayload {
  full_name?: string | null;
  role_id?: number | null;
  telegram_username?: string | null;
  other_info?: string | null;
  salary_info?: any | null;
  deduction_rules?: string | null;
  status?: string | null;
  contract_storage_path?: string | null; // Add contract path field
  // Add other updatable fields as needed
}


export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } } // Get ID from dynamic route segment
) {
  const employeeId = params.id;

  if (!employeeId) {
    return NextResponse.json({ error: 'Employee ID is required.' }, { status: 400 });
  }

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('Missing Supabase URL or Service Role Key');
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  // Create Supabase Admin client
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  try {
    const body: UpdateProfilePayload = await request.json();

    // Basic validation: Check if body is empty
    if (Object.keys(body).length === 0) {
       return NextResponse.json({ error: 'No update data provided.' }, { status: 400 });
    }

    // Remove any fields that shouldn't be updated directly (like email, id)
    // Although Supabase update should ignore primary key, it's good practice
    const { id, email, ...updateData } = body as any; // Exclude potential id/email in body

    // Perform the update operation on the profiles table
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update(updateData) // Pass only the fields to update
      .eq('id', employeeId) // Specify which profile to update
      .select() // Optionally select the updated record to return
      .single(); // Expect only one record to be updated

    if (error) {
      console.error('Supabase Profile Update Error:', error);
      // Provide more specific error messages if possible
      if (error.code === 'PGRST204') { // PostgREST code for no rows found
         return NextResponse.json({ error: `Employee with ID ${employeeId} not found.` }, { status: 404 });
      }
      throw new Error(error.message || 'Failed to update employee profile.');
    }

    return NextResponse.json({ message: 'Employee updated successfully.', data }, { status: 200 });

  } catch (error: any) {
    console.error('Update Employee API Error:', error);
    // Handle JSON parsing errors specifically
    if (error instanceof SyntaxError) {
        return NextResponse.json({ error: 'Invalid JSON format in request body.' }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'An unexpected error occurred.' }, { status: 500 });
  }
}

// You might also want a PATCH handler if you prefer partial updates
// export async function PATCH(...) { ... }
