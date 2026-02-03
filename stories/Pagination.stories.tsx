import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Pagination, PaginationButton, PaginationEllipsis, FullPagination 
} from '../src/components/ui/pagination';

const meta: Meta<typeof FullPagination> = {
  title: 'Components/Pagination',
  component: FullPagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Pagination

Page navigation component.

## Features
- **Page Numbers**: Navigate to specific pages
- **Prev/Next**: Sequential navigation
- **First/Last**: Jump to ends
- **Ellipsis**: Truncated page ranges
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FullPagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = React.useState(1);
    
    return (
      <FullPagination 
        page={page} 
        totalPages={10} 
        onPageChange={setPage} 
      />
    );
  },
};

export const WithFirstLast: Story = {
  render: () => {
    const [page, setPage] = React.useState(5);
    
    return (
      <FullPagination 
        page={page} 
        totalPages={20} 
        onPageChange={setPage}
        showFirstLast
      />
    );
  },
};

export const FewPages: Story = {
  render: () => {
    const [page, setPage] = React.useState(1);
    
    return (
      <FullPagination 
        page={page} 
        totalPages={3} 
        onPageChange={setPage} 
      />
    );
  },
};

export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = React.useState(50);
    
    return (
      <FullPagination 
        page={page} 
        totalPages={100} 
        onPageChange={setPage}
        showFirstLast
        siblingCount={2}
      />
    );
  },
};

export const Manual: Story = {
  name: 'Manual Composition',
  render: () => {
    const [page, setPage] = React.useState(3);
    
    return (
      <Pagination>
        <PaginationButton iconOnly disabled={page === 1} onClick={() => setPage(p => p - 1)}>
          ←
        </PaginationButton>
        <PaginationButton active={page === 1} onClick={() => setPage(1)}>1</PaginationButton>
        <PaginationButton active={page === 2} onClick={() => setPage(2)}>2</PaginationButton>
        <PaginationButton active={page === 3} onClick={() => setPage(3)}>3</PaginationButton>
        <PaginationButton active={page === 4} onClick={() => setPage(4)}>4</PaginationButton>
        <PaginationButton active={page === 5} onClick={() => setPage(5)}>5</PaginationButton>
        <PaginationButton iconOnly disabled={page === 5} onClick={() => setPage(p => p + 1)}>
          →
        </PaginationButton>
      </Pagination>
    );
  },
};

export const InTableFooter: Story = {
  name: 'Table Footer Example',
  render: () => {
    const [page, setPage] = React.useState(1);
    const totalItems = 147;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    const start = (page - 1) * itemsPerPage + 1;
    const end = Math.min(page * itemsPerPage, totalItems);
    
    return (
      <div style={{ 
        padding: 16, 
        backgroundColor: '#fafafa', 
        borderRadius: 8,
        width: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 13, color: '#71717a' }}>
          Showing {start}-{end} of {totalItems} results
        </span>
        <FullPagination 
          page={page} 
          totalPages={totalPages} 
          onPageChange={setPage}
        />
      </div>
    );
  },
};

export const Compact: Story = {
  render: () => {
    const [page, setPage] = React.useState(5);
    const totalPages = 20;
    
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <PaginationButton 
          iconOnly 
          disabled={page === 1} 
          onClick={() => setPage(p => p - 1)}
        >
          ←
        </PaginationButton>
        <span style={{ fontSize: 14, color: '#3f3f46' }}>
          Page {page} of {totalPages}
        </span>
        <PaginationButton 
          iconOnly 
          disabled={page === totalPages} 
          onClick={() => setPage(p => p + 1)}
        >
          →
        </PaginationButton>
      </div>
    );
  },
};
