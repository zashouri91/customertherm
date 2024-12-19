import { GroupsTable } from '@/components/groups-table'
import { AddGroupDialog } from '@/components/add-group-dialog'

export default function GroupsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Groups</h1>
        <AddGroupDialog />
      </div>
      <GroupsTable />
    </div>
  )
}


