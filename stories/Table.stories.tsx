import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption, TablePagination,
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

Data table component matching Figma design.

Based on Figma: [Table](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=793-5651)

## Features
- **Header**: Column headers with sorting
- **Body**: Data rows with selection
- **Pagination**: Rows per page + navigation
- **Actions**: Row actions
- **Responsive**: Adapts to different column counts
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

const allUsers = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['Admin', 'Editor', 'Viewer'][i % 3],
  status: ['Active', 'Inactive', 'Pending'][i % 3],
}));

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
        case 'Inactive': return 'default';
        case 'Pending': return 'warning';
        default: return 'default';
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
                  <Badge variant="default">{user.role}</Badge>
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
                <Badge variant={user.status === 'Active' ? 'success' : 'default'}>
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
                  <Badge variant={user.status === 'Active' ? 'success' : 'default'}>
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
                  <Badge variant={user.status === 'Active' ? 'success' : 'default'}>
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

export const WithPagination: Story = {
  name: 'With Pagination',
  render: () => {
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedUsers = allUsers.slice(startIndex, endIndex);

    return (
      <div style={{ width: 700 }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell style={{ fontWeight: 500 }}>{user.name}</TableCell>
                <TableCell style={{ color: '#71717a' }}>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge variant={user.status === 'Active' ? 'success' : 'default'}>
                    {user.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          page={page}
          total={allUsers.length}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </div>
    );
  },
};

export const ColumnVariations: Story = {
  name: 'Column Variations (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24, backgroundColor: '#f8fafc' }}>
      {/* 2 Columns */}
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>2 Columns</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 3 Columns */}
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>3 Columns</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 4 Columns */}
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>4 Columns</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 5 Columns */}
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>5 Columns</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 6 Columns */}
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>6 Columns</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 7 Columns */}
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>7 Columns</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 8 Columns */}
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>8 Columns</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
                <TableCell>Data {i}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ),
};

export const FullExample: Story = {
  name: 'Full Example with Pagination',
  render: () => {
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [selected, setSelected] = React.useState<number[]>([]);
    
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedUsers = allUsers.slice(startIndex, endIndex);

    const toggleAll = () => {
      if (selected.length === paginatedUsers.length) {
        setSelected([]);
      } else {
        setSelected(paginatedUsers.map(u => u.id));
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
      <div style={{ width: 800 }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: 40 }}>
                <Checkbox 
                  checked={selected.length === paginatedUsers.length && paginatedUsers.length > 0}
                  indeterminate={selected.length > 0 && selected.length < paginatedUsers.length}
                  onChange={toggleAll}
                />
              </TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead style={{ width: 60 }}></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id} selected={selected.includes(user.id)}>
                <TableCell>
                  <Checkbox 
                    checked={selected.includes(user.id)}
                    onChange={() => toggleOne(user.id)}
                  />
                </TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell style={{ fontWeight: 500 }}>{user.name}</TableCell>
                <TableCell style={{ color: '#71717a' }}>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge variant={user.status === 'Active' ? 'success' : 'default'}>
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
        <TablePagination
          page={page}
          total={allUsers.length}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </div>
    );
  },
};
