import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption,
} from '../src/components/ui/table';
import { Badge } from '../src/components/ui/badge';
import { Avatar } from '../src/components/ui/avatar';
import { Checkbox } from '../src/components/ui/checkbox';
import { Button } from '../src/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Table

Data table component.

## Features
- **Header**: Column headers with sorting
- **Body**: Data rows
- **Selection**: Row selection
- **Actions**: Row actions
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const users = [
  { id: 1, name: 'Alice Chen', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 4, name: 'David Lee', email: 'david@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Emma Wilson', email: 'emma@example.com', role: 'Viewer', status: 'Pending' },
];

export const Default: Story = {
  render: () => (
    <div style={{ width: 600 }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

export const WithBadges: Story = {
  render: () => {
    const getStatusVariant = (status: string) => {
      switch (status) {
        case 'Active': return 'success';
        case 'Inactive': return 'secondary';
        case 'Pending': return 'warning';
        default: return 'secondary';
      }
    };

    return (
      <div style={{ width: 650 }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell style={{ fontWeight: 500 }}>{user.name}</TableCell>
                <TableCell style={{ color: '#71717a' }}>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(user.status) as any}>{user.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};

export const WithAvatars: Story = {
  render: () => (
    <div style={{ width: 700 }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead style={{ width: 60 }}></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} clickable>
              <TableCell>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar name={user.name} size="sm" />
                  <span style={{ fontWeight: 500 }}>{user.name}</span>
                </div>
              </TableCell>
              <TableCell style={{ color: '#71717a' }}>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Badge variant={user.status === 'Active' ? 'success' : 'secondary'}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" iconOnly size="sm">
                  <MoreHorizontal size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

export const WithSelection: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<number[]>([]);
    
    const toggleAll = () => {
      if (selected.length === users.length) {
        setSelected([]);
      } else {
        setSelected(users.map(u => u.id));
      }
    };
    
    const toggleOne = (id: number) => {
      if (selected.includes(id)) {
        setSelected(selected.filter(s => s !== id));
      } else {
        setSelected([...selected, id]);
      }
    };

    return (
      <div style={{ width: 700 }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: 40 }}>
                <Checkbox 
                  checked={selected.length === users.length}
                  indeterminate={selected.length > 0 && selected.length < users.length}
                  onChange={toggleAll}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} selected={selected.includes(user.id)}>
                <TableCell>
                  <Checkbox 
                    checked={selected.includes(user.id)}
                    onChange={() => toggleOne(user.id)}
                  />
                </TableCell>
                <TableCell style={{ fontWeight: 500 }}>{user.name}</TableCell>
                <TableCell style={{ color: '#71717a' }}>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge variant={user.status === 'Active' ? 'success' : 'secondary'}>
                    {user.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {selected.length > 0 && (
          <div style={{ marginTop: 12, fontSize: 13, color: '#71717a' }}>
            {selected.length} row(s) selected
          </div>
        )}
      </div>
    );
  },
};

export const Sortable: Story = {
  render: () => {
    const [sortCol, setSortCol] = React.useState<string | null>('name');
    const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('asc');
    
    const handleSort = (col: string) => {
      if (sortCol === col) {
        setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
      } else {
        setSortCol(col);
        setSortDir('asc');
      }
    };
    
    const sortedUsers = [...users].sort((a, b) => {
      if (!sortCol) return 0;
      const aVal = a[sortCol as keyof typeof a];
      const bVal = b[sortCol as keyof typeof b];
      const cmp = String(aVal).localeCompare(String(bVal));
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return (
      <div style={{ width: 650 }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                sortable 
                sortDirection={sortCol === 'name' ? sortDir : null}
                onClick={() => handleSort('name')}
              >
                Name
              </TableHead>
              <TableHead 
                sortable 
                sortDirection={sortCol === 'email' ? sortDir : null}
                onClick={() => handleSort('email')}
              >
                Email
              </TableHead>
              <TableHead 
                sortable 
                sortDirection={sortCol === 'role' ? sortDir : null}
                onClick={() => handleSort('role')}
              >
                Role
              </TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell style={{ fontWeight: 500 }}>{user.name}</TableCell>
                <TableCell style={{ color: '#71717a' }}>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge variant={user.status === 'Active' ? 'success' : 'secondary'}>
                    {user.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>A list of {users.length} team members</TableCaption>
        </Table>
      </div>
    );
  },
};
