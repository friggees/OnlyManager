'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; // Need Textarea for multi-line fields
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
import { createClient } from '@/lib/supabase/client';

// Define role type
interface Role {
  id: number;
  role_name: string;
}

// Define specific salary info types
type CommissionSalary = { type: 'commission'; rate: number }; // Rate as a decimal, e.g., 0.10 for 10%
type FixedSalary = { type: 'fixed'; amount: number; currency: 'USD' };
type SalaryInfo = CommissionSalary | FixedSalary | null;

// Define profile type for editing
interface ProfileEditData {
  id: string;
  full_name: string | null;
  email: string | undefined; // Display only, usually not editable here
  role_id: number | null;
  telegram_username: string | null;
  other_info: string | null;
  salary_info: SalaryInfo; // Use the specific SalaryInfo type
  deduction_rules: string | null;
  contract_storage_path: string | null;
  status: string | null;
}

// Define type for the update payload sent to the API
interface ProfileUpdatePayload {
  full_name: string;
  role_id: number;
  telegram_username: string | null;
  other_info: string | null;
  salary_info: SalaryInfo; // Use the specific SalaryInfo type
  deduction_rules: string | null;
  status: string;
  contract_storage_path?: string; // Make optional
}

export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();
  const employeeId = params.id as string; // Get ID from dynamic route segment
  const supabase = createClient();

  const [profile, setProfile] = useState<ProfileEditData | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true); // Start loading true
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roleError, setRoleError] = useState<string | null>(null);

  // State for editable fields
  const [fullName, setFullName] = useState('');
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');
  const [telegramUsername, setTelegramUsername] = useState('');
  const [otherInfo, setOtherInfo] = useState('');
  // const [salaryInfo, setSalaryInfo] = useState(''); // Remove old JSON string state
  const [deductionRules, setDeductionRules] = useState('');
  const [status, setStatus] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Add state for file

  // New state for structured salary input
  const [salaryType, setSalaryType] = useState<'commission' | 'fixed' | ''>('');
  const [commissionRate, setCommissionRate] = useState<string>(''); // Store as string for input control
  const [fixedAmount, setFixedAmount] = useState<string>(''); // Store as string for input control
  // selectedFile state was already declared above, removed duplicate
  const [isMounted, setIsMounted] = useState(false); // State to track client mount

  // Fetch roles
  const fetchRoles = useCallback(async () => {
    setRoleError(null);
    const { data, error } = await supabase
      .from('roles')
      .select('id, role_name')
      .order('role_name');

    if (error) {
      console.error('Error fetching roles:', error);
      setRoleError('Failed to load roles.');
    } else {
      setRoles(data || []);
    }
  }, [supabase]);

  // Fetch employee profile data
  const fetchProfile = useCallback(async (id: string) => {
    setError(null);
    setLoading(true);
    // Fetch profile data using the RPC function to bypass potential RLS issues with joins
    // Remove explicit generic type hint for now, let TS try to infer
    const { data, error } = await supabase
      .rpc('get_employee_details', { employee_id: id })
      .single(); // Expect the RPC to return a single object

    if (error || !data) {
      console.error('Error fetching profile via RPC:', error);
      setError(`Failed to load employee data for ID: ${id}. RPC call failed.`); // Updated error message
       setProfile(null);
    } else {
       // Explicitly cast the returned data to ProfileEditData
       // This tells TypeScript to trust the structure matches the interface
       const profileData = data as ProfileEditData;

       // Now use profileData which TypeScript knows matches the interface
       setProfile(profileData);
       // Initialize form state using the typed profileData
       setFullName(profileData.full_name || '');
       setSelectedRoleId(profileData.role_id?.toString() || '');
       setTelegramUsername(profileData.telegram_username || '');
       setOtherInfo(profileData.other_info || '');

       // Parse existing salary_info and set the new structured state
       const currentSalaryInfo = profileData.salary_info;
       if (currentSalaryInfo) {
         setSalaryType(currentSalaryInfo.type);
         if (currentSalaryInfo.type === 'commission') {
           setCommissionRate(currentSalaryInfo.rate.toString());
           setFixedAmount(''); // Clear other field
         } else if (currentSalaryInfo.type === 'fixed') {
           setFixedAmount(currentSalaryInfo.amount.toString());
           setCommissionRate(''); // Clear other field
         }
       } else {
         // If salary_info is null/empty, reset fields
         setSalaryType('');
         setCommissionRate('');
         setFixedAmount('');
       }

       setDeductionRules(profileData.deduction_rules || '');
       setStatus(profileData.status || 'active');
    }
    setLoading(false);
  }, [supabase]);

  // Fetch data on mount
  useEffect(() => {
    fetchRoles();
    if (employeeId) {
      fetchProfile(employeeId);
    } else {
      setError("Employee ID not found in URL.");
      setLoading(false);
    }
  }, [employeeId, fetchRoles, fetchProfile]);


  const handleUpdateEmployee = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    if (!selectedRoleId) {
      setError('Please select a role.');
      setSaving(false);
      return;
    }

    // Construct the new salary_info object based on the structured input state
    let newSalaryInfo: SalaryInfo = null;
    if (salaryType === 'commission') {
      const rate = parseFloat(commissionRate);
      if (isNaN(rate) || rate < 0 || rate > 1) { // Basic validation: 0-1 for rate (e.g., 0.1 for 10%)
        setError('Invalid commission rate. Please enter a number between 0 and 1 (e.g., 0.1 for 10%).');
        setSaving(false);
        return;
      }
      newSalaryInfo = { type: 'commission', rate: rate };
    } else if (salaryType === 'fixed') {
      const amount = parseFloat(fixedAmount);
      if (isNaN(amount) || amount < 0) { // Basic validation: non-negative amount
        setError('Invalid fixed amount. Please enter a non-negative number.');
        setSaving(false);
        return;
      }
      newSalaryInfo = { type: 'fixed', amount: amount, currency: 'USD' };
    }
    // If salaryType is '', newSalaryInfo remains null

    const updatedProfileData = {
        full_name: fullName,
        role_id: parseInt(selectedRoleId, 10),
        telegram_username: telegramUsername || null,
        other_info: otherInfo || null,
        salary_info: newSalaryInfo, // Use the newly constructed object
        deduction_rules: deductionRules || null,
         status: status,
    };

    // Explicitly type finalUpdateData to allow optional contract_storage_path
    let finalUpdateData: ProfileUpdatePayload = { ...updatedProfileData };
    let contractPath: string | undefined = undefined;

    // --- Handle File Upload ---
    if (selectedFile) {
      try {
        // Ensure employeeId is available for path construction
        if (!employeeId) throw new Error("Employee ID is missing for file path.");

        // Construct a unique path, e.g., contracts/userId/filename
        // Consider adding timestamp or UUID for more uniqueness if needed
        const filePath = `contracts/${employeeId}/${selectedFile.name}`;

        // Upload the file to Supabase Storage
        // The 'contracts' bucket must exist and have appropriate policies
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('contracts')
          .upload(filePath, selectedFile, {
            cacheControl: '3600',
            upsert: true, // Overwrite if file with same name exists for this user
          });

        if (uploadError) {
          throw new Error(`Contract upload failed: ${uploadError.message}`);
        }

        contractPath = uploadData?.path; // Get the path of the uploaded file
        if (contractPath) {
           finalUpdateData = { ...finalUpdateData, contract_storage_path: contractPath };
        } else {
           throw new Error("Contract uploaded but path not returned.");
        }

      } catch (uploadErr: any) {
         console.error("Contract Upload Error:", uploadErr);
         setError(uploadErr.message || 'Failed to upload contract.');
         setSaving(false);
         return; // Stop the update process if upload fails
      }
    }
    // --- End File Upload ---


    // console.log('Updating employee:', employeeId, finalUpdateData); // Keep for debugging if needed

    // Call the API route to update the employee profile data
    try {
      const response = await fetch(`/api/admin/update-employee/${employeeId}`, {
        method: 'PUT', // Using PUT for full update based on form state
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalUpdateData), // Send data including contract path if uploaded
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Failed to update employee (status: ${response.status})`);
      }

      // Optionally show a success message (e.g., using a toast library)
      alert('Employee updated successfully!'); // Simple alert for now

      router.push('/dashboard/employees'); // Redirect back to list
      router.refresh(); // Refresh the list page data

    } catch (err: any) {
      console.error("Update Employee Error:", err);
      setError(err.message || 'An unexpected error occurred during update.');
    } finally {
      setSaving(false);
    }

     // Placeholder removed
    // await new Promise(resolve => setTimeout(resolve, 1000));
    // setError('Update employee functionality not yet implemented.');
    // setSaving(false); // Moved to finally block
  };

  // Ensure component is mounted on the client before rendering the form
  // This helps prevent hydration errors with conditional rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (loading || !isMounted) { // Also wait for mount
    return <div className="container mx-auto py-10 text-center">Loading employee data...</div>;
  }

  if (error && !profile) {
     return <div className="container mx-auto py-10 text-center text-red-600">{error}</div>;
  }

  if (!profile) {
     return <div className="container mx-auto py-10 text-center">Employee not found.</div>;
  }

  // Only render the full form once mounted and profile is loaded
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Employee: {profile.full_name || profile.email}</CardTitle>
          <CardDescription>
            Update the details for this employee. Email cannot be changed here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateEmployee} className="space-y-4">
            {/* Display Email (Read-only) */}
            <div className="mb-4">
                <Label>Email (Read-only)</Label>
                <Input value={profile.email || 'N/A'} readOnly disabled className="bg-gray-100" />
            </div>

            {/* Full Name */}
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            {/* Role */}
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

             {/* Status */}
             <div>
              <Label htmlFor="status">Status</Label>
                <Select onValueChange={setStatus} value={status} required>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      {/* Add other statuses if needed */}
                  </SelectContent>
                </Select>
            </div>

            {/* Telegram */}
            <div>
              <Label htmlFor="telegram">Telegram Username</Label>
              <Input
                id="telegram"
                value={telegramUsername}
                onChange={(e) => setTelegramUsername(e.target.value)}
                placeholder="@username"
              />
            </div>

             {/* Other Info */}
             <div>
              <Label htmlFor="otherInfo">Other Info</Label>
               <Textarea
                id="otherInfo"
                value={otherInfo}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setOtherInfo(e.target.value)}
                placeholder="Any other relevant notes..."
                rows={3}
               />
             </div>

             {/* --- New Structured Salary Info Inputs --- */}
             <div>
               <Label htmlFor="salaryType">Salary Type</Label>
               <Select onValueChange={(value) => setSalaryType(value as 'commission' | 'fixed' | '')} value={salaryType}>
                 <SelectTrigger id="salaryType">
                    <SelectValue placeholder="Select salary type" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Removed SelectItem with empty value - placeholder handles this */}
                    <SelectItem value="commission">Commission</SelectItem>
                    <SelectItem value="fixed">Fixed Salary</SelectItem>
                  </SelectContent>
               </Select>
             </div>

             {/* Conditional Input for Commission Rate */}
             {salaryType === 'commission' && (
               <div>
                 <Label htmlFor="commissionRate">Commission Rate (0.0 to 1.0)</Label>
                 <Input
                   id="commissionRate"
                   type="number"
                   step="0.01"
                   min="0"
                   max="1"
                   value={commissionRate}
                   onChange={(e) => setCommissionRate(e.target.value)}
                   placeholder="e.g., 0.15 for 15%"
                   required // Required if type is commission
                 />
                 <p className="text-xs text-gray-500 mt-1">Enter the commission rate as a decimal (e.g., 0.1 for 10%).</p>
               </div>
             )}

             {/* Conditional Input for Fixed Amount */}
             {salaryType === 'fixed' && (
               <div>
                 <Label htmlFor="fixedAmount">Fixed Amount (USD)</Label>
                 <Input
                   id="fixedAmount"
                   type="number"
                   step="0.01"
                   min="0"
                   value={fixedAmount}
                   onChange={(e) => setFixedAmount(e.target.value)}
                   placeholder="e.g., 3000"
                   required // Required if type is fixed
                 />
                  <p className="text-xs text-gray-500 mt-1">Enter the fixed monthly salary amount in USD.</p>
               </div>
             )}
             {/* --- End Structured Salary Info Inputs --- */}


             {/* Deduction Rules */}
             <div>
              <Label htmlFor="deductionRules">Deduction Rules</Label>
                <Textarea
                id="deductionRules"
                value={deductionRules}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDeductionRules(e.target.value)}
                placeholder="Describe rules for salary deductions..."
                rows={3}
              />
            </div>

            {/* Contract Upload */}
            <div>
              <Label htmlFor="contract">Contract (Upload New)</Label>
              <Input
                id="contract"
                type="file"
                onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                className="pt-2" // Add some padding for file input
              />
              {/* Display current contract path if available */}
              {profile?.contract_storage_path && (
                 <p className="text-xs text-gray-500 mt-1">
                   Current: {profile.contract_storage_path.split('/').pop()} {/* Show only filename */}
                   {/* TODO: Add download link */}
                 </p>
              )}
               <p className="text-xs text-gray-500 mt-1">Upload a new PDF/Word file to replace the existing contract.</p>
            </div>

            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            <div className="flex justify-end space-x-2 pt-4">
               <Button type="button" variant="outline" onClick={() => router.back()} disabled={saving}>
                 Cancel
               </Button>
               <Button type="submit" disabled={saving || loading || !!roleError}>
                 {saving ? 'Saving...' : 'Save Changes'}
               </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
