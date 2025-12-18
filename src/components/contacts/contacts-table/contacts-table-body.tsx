import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import type { UseDataTableReturn } from '@/hooks/use-data-table';
import type { Contact } from '@/types';

interface ContactsTableBodyProps {
  data: UseDataTableReturn<Contact>['data'];
  headers: UseDataTableReturn<Contact>['headers'];
}

const ContactsTableBody = ({ data, headers }: ContactsTableBodyProps) => {
  if (data.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={headers.length} className='h-24 text-center'>
            No results.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {data.map((contact, index) => (
        <TableRow key={contact.id}>
          {headers.map((column, colIndex) => (
            <TableCell key={colIndex} className={column.className}>
              {column.render
                ? column.render(contact, index)
                : (contact[column.key] as React.ReactNode)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default ContactsTableBody;
