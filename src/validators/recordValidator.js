const { z } = require('zod');

const recordSchema = z.object({
  amount: z.number({ invalid_type_error: 'Amount must be a number' }),
  type: z.enum(['income', 'expense']),
  category: z.string().min(1, 'Category is required'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date',
  }),
  notes: z.string().optional(),
});

module.exports = { recordSchema };