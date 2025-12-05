// Example: Protected User Page Template
// Location: src/app/example/page.tsx

'use client';

import { useAuth } from '@/contexts/AuthContext';

function ExamplePage() {
  const { userProfile, loading } = useAuth();

  // ✅ Show loading while auth check is in progress
  // ✅ NO redirect logic - AuthGuardProvider handles this
  if (loading || !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // ✅ Render page content once auth is confirmed
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {userProfile.displayName}!
      </h1>
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <p className="text-gray-600">
          This is a protected page. You can only see this because:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
          <li>AuthGuardProvider verified you're logged in</li>
          <li>You were automatically redirected if not authenticated</li>
          <li>No redirect logic needed in this component</li>
        </ul>
      </div>

      {/* Your page content here */}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Example: Public Page Template (like landing page)
// Location: src/app/about/page.tsx

'use client';

function AboutPage() {
  // ✅ NO auth checks needed for public pages
  // ✅ Just render content directly
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-gray-600">
        This is a public page accessible to everyone.
      </p>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Example: Page that needs auth but uses nested layout
// Location: src/app/(user)/workouts/page.tsx

'use client';

import { useAuth as useAuthWorkouts } from '@/contexts/AuthContext';

function WorkoutsPage() {
  const { userProfile, loading } = useAuth();

  if (loading || !userProfile) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Workouts</h1>
      {/* Page content */}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Example: Form page with action after success
// Location: src/app/create-program/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth as useAuthCreate } from '@/contexts/AuthContext';

function CreateProgramPage() {
  const { userProfile, loading } = useAuth();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  if (loading || !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Save data to Firestore
      // await createProgram(data);
      
      // ✅ Navigate to new page after success
      router.push('/programs');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create Program</h1>
      {/* Form fields */}
      <button 
        type="submit" 
        disabled={saving}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        {saving ? 'Saving...' : 'Create Program'}
      </button>
    </form>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// KEY PRINCIPLES FOR ALL PAGES:
// 
// ✅ DO:
// - Check loading state before rendering
// - Show loading spinner while loading || !userProfile
// - Use router.push() for normal navigation after actions
// - Let AuthGuardProvider handle auth redirects
//
// ❌ DON'T:
// - Add useEffect redirects based on auth state
// - Use router.replace() for normal navigation
// - Try to handle auth logic in individual pages
// - Render content while loading === true
