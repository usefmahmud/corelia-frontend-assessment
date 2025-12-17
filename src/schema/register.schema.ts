import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().nonempty('Full name is required'),
  email: z.email('Invalid email address'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(/[\W_]/, 'Password must contain at least one special character'),
});

export type RegisterSchemaValues = z.infer<typeof registerSchema>;
