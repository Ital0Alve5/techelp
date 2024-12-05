import { Mask } from '@/shared/enums/mask.enum';

export const formData = {
  id: -1,
  email: {
    value: '',
    validation: {
      error: false,
      message: '',
    },
  },
  name: {
    value: '',
    validation: {
      error: false,
      message: '',
    },
  },
  birthdate: {
    value: '',
    validation: {
      error: false,
      message: '',
    },
    mask: Mask.Date,
  },
  password: {
    value: '',
    validation: {
      error: false,
      message: '',
    },
  },
  confirmPassword: {
    value: '',
    validation: {
      error: false,
      message: '',
    },
  },
};
