import { Button } from '@/components/ui/button';
import type { Column } from '@/hooks/use-data-table';
import type { Contact } from '@/types';
import { Pencil, Trash2 } from 'lucide-react';

interface CreateContactsTableColumnsProps {
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
}

export const createContactsTableColumns = ({
  onEdit,
  onDelete,
}: CreateContactsTableColumnsProps): Column<Contact>[] => [
  {
    key: 'id',
    header: '#',
    className: 'w-24 text-center font-medium',
  },
  {
    key: 'name',
    header: 'Name',
    className: 'text-center',
    sortable: true,
  },
  {
    key: 'number',
    header: 'Number',
    className: 'text-center',
  },
  {
    key: 'id',
    header: 'Actions',
    className: 'text-center',
    render: (contact) => (
      <div className='flex items-center justify-center gap-2'>
        <Button
          variant='ghost'
          size='icon'
          className='text-primary hover:bg-primary/5 hover:text-primary size-8'
          onClick={() => onEdit(contact)}
        >
          <Pencil className='size-4' />
        </Button>
        <Button
          variant='ghost'
          size='icon'
          className='size-8 text-red-400 hover:bg-red-50 hover:text-red-600'
          onClick={() => onDelete(contact.id)}
        >
          <Trash2 className='size-4' />
        </Button>
      </div>
    ),
  },
];
