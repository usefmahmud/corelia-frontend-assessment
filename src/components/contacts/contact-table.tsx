import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Contact } from '@/types';

interface ContactTableProps {
  contacts: Contact[];
  onDelete: (id: number) => void;
}

export const ContactTable = ({ contacts, onDelete }: ContactTableProps) => {
  return (
    <div className='overflow-hidden rounded-sm border'>
      <Table>
        <TableHeader className='bg-accent'>
          <TableRow>
            <TableHead className='w-25'>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell className='text-center font-medium'>
                {contact.id}
              </TableCell>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.number}</TableCell>
              <TableCell>
                <div className='flex items-center justify-center gap-2'>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='text-primary hover:bg-primary/5 hover:text-primary size-8'
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
