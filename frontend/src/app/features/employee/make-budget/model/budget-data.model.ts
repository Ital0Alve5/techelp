import { Mask } from '@/shared/enums/mask.enum';

export const budgetData = {
  value: '',
  validation: {
    error: false,
    message: '',
  },
  mask: Mask.Currency,
};
