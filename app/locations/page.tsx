import { LocationsTable } from '@/components/locations-table'
import { AddLocationDialog } from '@/components/add-location-dialog'

export default function LocationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Locations</h1>
        <AddLocationDialog />
      </div>
      <LocationsTable />
    </div>
  )
}


