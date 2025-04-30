'use client'; // Required for useState and event handlers

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Uncommented
import { createClient } from '@/lib/supabase/client'; // Uncommented

// Placeholder components - replace with actual shadcn/ui imports later
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`border rounded-lg p-6 bg-white shadow ${className}`}>{children}</div>;
const CardHeader = ({ children }: { children: React.ReactNode }) => <div className="mb-4">{children}</div>;
const CardTitle = ({ children }: { children: React.ReactNode }) => <h2 className="text-2xl font-bold">{children}</h2>;
const CardContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
const Label = ({ children, htmlFor }: { children: React.ReactNode, htmlFor: string }) => <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">{children}</label>;
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />;
const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props} className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50" />;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Uncommented
  const supabase = createClient(); // Uncommented

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // console.log('Attempting login with:', email); // Placeholder logic removed
    // Implement actual Supabase login logic
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push('/dashboard'); // Redirect to dashboard on success
      // router.refresh(); // Refresh might not be needed immediately after push with App Router, but keep in mind if state issues arise
    } catch (err: any) {
      console.error("Login error:", err); // Log the full error
      setError(err.error_description || err.message || 'Invalid login credentials.'); // Provide a user-friendly error
    } finally {
      setLoading(false);
    }

    // Placeholder delay removed
    // await new Promise(resolve => setTimeout(resolve, 1000));
    // setError('Login functionality not yet implemented.'); // Placeholder error removed
    // setLoading(false); // Moved to finally block
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login to OnlyManager</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            {error && (
              <p className="mb-4 text-red-600 text-sm">{error}</p>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          {/* TODO: Add links for Sign Up / Forgot Password */}
        </CardContent>
      </Card>
    </div>
  );
}
