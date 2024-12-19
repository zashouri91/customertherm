"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

type Group = {
  id: string
  name: string
}

const initialGroups: Group[] = [
  { id: '1', name: 'Marketing Team' },
  { id: '2', name: 'Sales Department' },
  { id: '3', name: 'Customer Support' },
]

export function AddLocationDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send this data to your backend
    console.log('New location:', { name, groups: selectedGroups })
    setOpen(false)
    setName('')
    setSelectedGroups([])
  }

  const handleGroupToggle = (groupId: string) => {
    setSelectedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Location</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Location</DialogTitle>
            <DialogDescription>
              Create a new location and assign groups. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right">Groups</Label>
              <div className="col-span-3 space-y-2">
                {initialGroups.map((group) => (
                  <div key={group.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`group-${group.id}`}
                      checked={selectedGroups.includes(group.id)}
                      onCheckedChange={() => handleGroupToggle(group.id)}
                    />
                    <Label
                      htmlFor={`group-${group.id}`}
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {group.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Location</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
