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
import { EditGroupDialog } from '@/components/edit-group-dialog'
import { DeleteGroupDialog } from '@/components/delete-group-dialog'

type Group = {
  id: string
  name: string
  description: string
  isCompleted: boolean
  createdAt: string
}

const initialGroups: Group[] = [
  { id: '1', name: 'Marketing Team', description: 'For marketing campaigns', isCompleted: false, createdAt: '2023-06-01' },
  { id: '2', name: 'Sales Department', description: 'For sales tracking', isCompleted: true, createdAt: '2023-05-15' },
  { id: '3', name: 'Customer Support', description: 'For support tickets', isCompleted: false, createdAt: '2023-06-10' },
]

export function GroupsTable() {
  const [groups, setGroups] = useState<Group[]>(initialGroups)

  const handleEditGroup = (editedGroup: Group) => {
    setGroups(groups.map(group => group.id === editedGroup.id ? editedGroup : group))
  }

  const handleDeleteGroup = (groupId: string) => {
    setGroups(groups.filter(group => group.id !== groupId))
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {groups.map((group) => (
          <TableRow key={group.id}>
            <TableCell>{group.name}</TableCell>
            <TableCell>{group.description}</TableCell>
            <TableCell>{group.isCompleted ? 'Completed' : 'Active'}</TableCell>
            <TableCell>{new Date(group.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <EditGroupDialog group={group} onEdit={handleEditGroup} />
                <DeleteGroupDialog group={group} onDelete={handleDeleteGroup} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}


