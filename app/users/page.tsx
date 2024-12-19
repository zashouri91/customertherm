import { UsersTable } from '@/components/users-table'
import { AddUserDialog } from '@/components/add-user-dialog'

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <AddUserDialog />
      </div>
      <UsersTable />
    </div>
  )
}


