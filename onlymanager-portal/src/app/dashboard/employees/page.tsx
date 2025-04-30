import React from 'react';
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'; // Import shadcn Table components
import { Button } from '@/components/ui/button'; // Import Button
import Link from 'next/link'; // Import Link for navigation

// Define the expected shape of our employee data
// Define the shape of employee data returned by the RPC function
interface Employee {
  id: string;
  full_name: string | null;
  email: string | null; // Email from RPC
  role_name: string | null;
  status: string | null;
}

// No longer need ProfileData interface for direct query

// Helper function to create Supabase server client within the component
// NOTE: The TypeScript errors related to `cookies().get/set` below seem to be a persistent
// type inference issue with next/headers in this context. The code often works at runtime.
// We create the client here for use within this Server Component.
function createSupabaseServerClient() {
  const cookieStore = cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // In a real app, you might want more robust error handling or logging
    console.error('Missing Supabase environment variables');
    return null; // Indicate failure
  }

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        // Set and remove might not be strictly needed for read-only server components,
        // but including them follows the standard pattern for potential future use.
        set(name: string, value: string, options: CookieOptions) {
          try { cookieStore.set({ name, value, ...options }); } catch (error) {}
        },
        remove(name: string, options: CookieOptions) {
          try { cookieStore.set({ name, value: '', ...options }); } catch (error) {}
        },
      },
    }
  );
}

export default async function EmployeesPage() {
  const supabase = createSupabaseServerClient();
  let employees: Employee[] = [];
  let fetchError: string | null = null;

  if (supabase) {
    // Call the RPC function to get the employee list
    const { data, error } = await supabase.rpc('get_employee_list');

    if (error) {
      console.error('Error calling get_employee_list RPC:', error);
      fetchError = 'Failed to load employee data. Please try again later.';
    } else if (data) {
      // Data from RPC should already be in the correct Employee shape
      employees = data as Employee[];
    }
  } else {
    fetchError = 'Failed to initialize Supabase client.';
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employee Management</h1>
        <Button asChild>
          <Link href="/dashboard/employees/add">Add New Employee</Link>
        </Button>
      </div>

      {fetchError && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          {fetchError}
        </div>
      )}

      {!fetchError && (
         <Table>
          <TableCaption>A list of employees.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead> {/* Add Email header back */}
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.full_name || 'N/A'}</TableCell>
                  <TableCell>{employee.email || 'N/A'}</TableCell> {/* Add Email cell back */}
                  <TableCell>{employee.role_name || 'N/A'}</TableCell>
                  <TableCell>{employee.status || 'N/A'}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/employees/edit/${employee.id}`}>Edit</Link>
                    </Button>
                    {/* TODO: Add Delete button/logic later */}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center"> {/* Adjust colspan */}
                  No employees found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      {/* "Add Employee" Button added above the table */}
    </div>
  );
}

// Note: We need to ensure the 'users' table reference in the select query
// correctly points to 'auth.users'. Supabase client might handle this,
// but if errors occur, we might need to adjust the query or use an RPC function.
