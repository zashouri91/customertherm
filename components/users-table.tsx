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
import { EditUserDialog } from '@/components/edit-user-dialog'
import { DeleteUserDialog } from '@/components/delete-user-dialog'
import Image from 'next/image'

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  role: 'Admin' | 'Manager' | 'User'
  headshot: string
}

const initialUsers: User[] = [
  { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', phoneNumber: '123-456-7890', role: 'Admin', headshot: '/placeholder.svg?height=40&width=40' },
  { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', phoneNumber: '098-765-4321', role: 'Manager', headshot: '/placeholder.svg?height=40&width=40' },
  { id: '3', firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', phoneNumber: '555-555-5555', role: 'User', headshot: '/placeholder.svg?height=40&width=40' },
]

export function UsersTable() {
  const [users, setUsers] = useState<User[]>(initialUsers)

  const handleEditUser = (editedUser: User) => {
    setUsers(users.map(user => user.id === editedUser.id ? editedUser : user))
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId))
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Headshot</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <Image
                src={user.headshot}
                alt={`${user.firstName} ${user.lastName}`}
                width={40}
                height={40}
                className="rounded-full"
              />
            </TableCell>
            <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phoneNumber}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <EditUserDialog user={user} onEdit={handleEditUser} />
                <DeleteUserDialog user={user} onDelete={handleDeleteUser} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}


