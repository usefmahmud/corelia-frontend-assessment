import { Table } from '@/components/ui/table';
import type { Contact } from '@/types';
import { useDataTable } from '@/hooks/use-data-table';
import { createContactsTableColumns } from './contacts-table-columns';
import ContactsTablePagination from './contacts-table-pagination';
import ContactsTableHeader from './contacts-table-header';
import ContactsTableBody from './contacts-table-body';

interface ContactsTableProps {
  contacts: Contact[];
  onDelete: (id: number) => void;
  onEdit: (contact: Contact) => void;
}

export const ContactsTable = ({
  contacts,
  onDelete,
  onEdit,
}: ContactsTableProps) => {
  const columns = createContactsTableColumns({ onEdit, onDelete });

  const { data, headers, pagination } = useDataTable({
    data: contacts,
    columns,
    pageSize: 5,
  });

  return (
    <div className='flex flex-col gap-4'>
      <div className='overflow-hidden rounded-sm border'>
        <Table>
          <ContactsTableHeader headers={headers} />

          <ContactsTableBody data={data} headers={headers} />
        </Table>
      </div>

      <ContactsTablePagination pagination={pagination} />
    </div>
  );
};
