import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function SettingsPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const user = await currentUser()

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <p className="mt-1 text-sm text-gray-500">Manage your account details.</p>

      {/* Profile card */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-base font-semibold text-gray-900">Profile</h2>
        <div className="mt-4 flex items-center gap-4">
          {user?.imageUrl && (
            <img
              src={user.imageUrl}
              alt={user.fullName ?? ''}
              className="h-14 w-14 rounded-full object-cover"
            />
          )}
          <div>
            <p className="font-semibold text-gray-900">{user?.fullName ?? '—'}</p>
            <p className="text-sm text-gray-500">{user?.primaryEmailAddress?.emailAddress ?? '—'}</p>
          </div>
        </div>
      </div>

      {/* Account info */}
      <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 space-y-4">
        <h2 className="text-base font-semibold text-gray-900">Account</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">User ID</p>
            <p className="mt-1 font-mono text-gray-700 text-xs truncate">{userId}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">Member since</p>
            <p className="mt-1 text-gray-700">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
            </p>
          </div>
        </div>
      </div>

      {/* Password / security */}
      <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-base font-semibold text-gray-900">Security</h2>
        <p className="mt-2 text-sm text-gray-500">
          Manage your password, connected accounts, and active sessions through Clerk's secure portal.
        </p>
        <a
          href="https://accounts.clerk.com/user"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Open account portal ↗
        </a>
      </div>
    </div>
  )
}
