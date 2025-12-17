import { z } from 'zod';

export const addContactSchema = z.object({
  name: z.string().nonempty('Name is required'),
  number: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+?[0-9\s\-()]+$/, 'Invalid phone number format'),
});

export type AddContactValues = z.infer<typeof addContactSchema>;
