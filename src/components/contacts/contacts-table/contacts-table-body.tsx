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
      {data.map((contact) => (
        <TableRow key={contact.id}>
          {headers.map((column, index) => (
            <TableCell key={index} className={column.className}>
              {column.render ? column.render(contact) : contact[column.key]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default ContactsTableBody;
