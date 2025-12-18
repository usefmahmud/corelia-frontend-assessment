import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { UseDataTableReturn } from '@/hooks/use-data-table';
import type { Contact } from '@/types';

interface ContactsTableHeaderProps {
  headers: UseDataTableReturn<Contact>['headers'];
}

const ContactsTableHeader = ({ headers }: ContactsTableHeaderProps) => {
  return (
    <TableHeader className='bg-accent'>
      <TableRow>
        {headers.map((header, index) => (
          <TableHead
            key={index}
            className={header.className}
            onClick={header.onClick}
            style={{ cursor: header.sortable ? 'pointer' : 'default' }}
          >
            <div
              className={`flex items-center gap-2 ${header.className?.includes('text-center') ? 'justify-center' : ''}`}
            >
              {header.header}
              {header.sortDirection && (
                <span>{header.sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default ContactsTableHeader;
