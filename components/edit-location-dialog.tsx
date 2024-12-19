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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Pencil } from 'lucide-react'

type Group = {
  id: string
  name: string
}

type Location = {
  id: string
  name: string
  groups: Group[]
}

interface EditLocationDialogProps {
  location: Location
  groups: Group[]
  onEdit: (editedLocation: Location) => void
}

export function EditLocationDialog({ location, groups, onEdit }: EditLocationDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(location.name)
  const [selectedGroups, setSelectedGroups] = useState<string[]>(location.groups.map(g => g.id))

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onEdit({
      ...location,
      name,
      groups: groups.filter(group => selectedGroups.includes(group.id))
    })
    setOpen(false)
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
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Location</DialogTitle>
            <DialogDescription>
              Make changes to the location. Click save when you're done.
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Groups</Label>
              <div className="col-span-3">
                <Select
                  onValueChange={(value) => handleGroupToggle(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select groups" />
                  </SelectTrigger>
                  <SelectContent>
                    {groups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={selectedGroups.includes(group.id)}
                            onCheckedChange={() => handleGroupToggle(group.id)}
                          />
                          <span>{group.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


