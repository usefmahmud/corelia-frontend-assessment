import { Button } from '@/components/ui/button';
import type { useDataTable } from '@/hooks/use-data-table';

interface ContactsTablePaginationProps {
  pagination: ReturnType<typeof useDataTable>['pagination'];
}

const ContactsTablePagination = ({
  pagination,
}: ContactsTablePaginationProps) => {
  return (
    <div className='flex items-center justify-between gap-2'>
      <div className='text-muted-foreground text-sm'>
        Page {pagination.currentPage} of {pagination.totalPages}
      </div>
      <div className='flex gap-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={pagination.prevPage}
          disabled={!pagination.hasPrevPage}
        >
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={pagination.nextPage}
          disabled={!pagination.hasNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ContactsTablePagination;
