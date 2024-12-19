"use client"

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from 'lucide-react'
import { EditLocationDialog } from '@/components/edit-location-dialog'
import { DeleteLocationDialog } from '@/components/delete-location-dialog'

type Group = {
  id: string
  name: string
}

type Location = {
  id: string
  name: string
  groups: Group[]
}

const initialGroups: Group[] = [
  { id: '1', name: 'Marketing Team' },
  { id: '2', name: 'Sales Department' },
  { id: '3', name: 'Customer Support' },
]

const initialLocations: Location[] = [
  { id: '1', name: 'New York Office', groups: [initialGroups[0], initialGroups[1]] },
  { id: '2', name: 'London Office', groups: [initialGroups[1], initialGroups[2]] },
  { id: '3', name: 'Tokyo Office', groups: [initialGroups[0], initialGroups[2]] },
]

export function LocationsTable() {
  const [locations, setLocations] = useState<Location[]>(initialLocations)

  const handleEditLocation = (editedLocation: Location) => {
    setLocations(locations.map(location => location.id === editedLocation.id ? editedLocation : location))
  }

  const handleDeleteLocation = (locationId: string) => {
    setLocations(locations.filter(location => location.id !== locationId))
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Assigned Groups</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {locations.map((location) => (
          <TableRow key={location.id}>
            <TableCell>{location.name}</TableCell>
            <TableCell>{location.groups.map(group => group.name).join(', ')}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <EditLocationDialog location={location} groups={initialGroups} onEdit={handleEditLocation} />
                <DeleteLocationDialog location={location} onDelete={handleDeleteLocation} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}


