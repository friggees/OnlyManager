'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createClient } from '@/lib/supabase/client'; // Use client for potential role fetching

// Define role type
interface Role {
  id: number;
  role_name: string;
}

export default function AddEmployeePage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Consider if setting initial password or inviting
  const [fullName, setFullName] = useState('');
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roleError, setRoleError] = useState<string | null>(null);

  // Fetch available roles on component mount
  useEffect(() => {
    const fetchRoles = async () => {
      setRoleError(null);
      const { data, error } = await supabase
        .from('roles')
        .select('id, role_name')
        .order('role_name'); // Order roles alphabetically

      if (error) {
        console.error('Error fetching roles:', error);
        setRoleError('Failed to load roles. Please try refreshing.');
      } else {
        setRoles(data || []);
      }
    };
    fetchRoles();
  }, [supabase]);

  const handleAddEmployee = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!selectedRoleId) {
      setError('Please select a role for the employee.');
      setLoading(false);
      return;
    }

    // console.log('Adding employee:', { email, fullName, selectedRoleId }); // Keep for debugging if needed

    // Call the API route to create the employee
    try {
      const response = await fetch('/api/admin/create-employee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Only include password if it's provided
        body: JSON.stringify({
          email,
          ...(password && { password }), // Conditionally add password
          fullName,
          roleId: parseInt(selectedRoleId, 10)
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Failed to create employee (status: ${response.status})`);
      }

      // If invite was sent (no password provided), show invite message, otherwise redirect
      if (!password && result.message?.includes('Invite sent')) {
         alert(result.message); // Simple alert for now, consider a toast notification
         router.push('/dashboard/employees'); // Redirect back to list
      } else {
         router.push('/dashboard/employees'); // Redirect back to list on success
      }

    } catch (err: any) {
      console.error("Add Employee Error:", err);
      setError(err.message || 'An unexpected error occurred while adding the employee.');
    } finally {
      setLoading(false);
    }

    // Placeholder removed
    // await new Promise(resolve => setTimeout(resolve, 1000));
    // setError('Add employee functionality not yet implemented.');
    // setLoading(false); // Moved to finally block
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Employee</CardTitle>
          <CardDescription>
            Enter the details for the new employee. They will be created with the specified role.
            Consider using an invite flow instead of setting an initial password for better security.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddEmployee} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="employee@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Initial Password (Optional)</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to invite user"
              />
               <p className="text-xs text-gray-500 mt-1">If blank, an invite email will be sent (requires email setup in Supabase).</p>
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              {roleError ? (
                 <p className="text-sm text-red-600">{roleError}</p>
              ) : (
                <Select onValueChange={setSelectedRoleId} value={selectedRoleId} required>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id.toString()}>
                        {role.role_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            <div className="flex justify-end space-x-2 pt-4">
               <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
                 Cancel
               </Button>
               <Button type="submit" disabled={loading || !!roleError}>
                 {loading ? 'Adding...' : 'Add Employee'}
               </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
