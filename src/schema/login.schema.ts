import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().nonempty('Password is required'),
  rememberMe: z.boolean().default(false).optional(),
});

export type LoginSchemaValues = z.infer<typeof loginSchema>;
