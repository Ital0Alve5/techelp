import { Mask } from '@/shared/enums/mask.enum';

export const formData = {
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
  cpf: {
    value: '',
    validation: {
      error: false,
      message: '',
    },
    mask: Mask.Cpf,
  },
  phone: {
    value: '',
    type: 'tel',
    validation: {
      error: false,
      message: '',
    },
    mask: Mask.Phone,
  },
  cep: {
    value: '',
    validation: {
      error: false,
      message: '',
    },
    mask: Mask.Cep,
  },
  state: {
    value: '',
    validation: {
      error: false,
      message: '',
    },
  },
  city: {
    value: '',
    validation: {
      error: false,
      message: '',
    },
  },
  neighborhood: {
    value: '',
    validation: {
      error: false,
      message: '',
    },
  },
  street: {
    value: '',
    validation: {
      error: false,
      message: '',
    },
  },
  number: {
    value: '',
    validation: {
      error: false,
      message: '',
    },
  },
  complement: {
    value: '',
    validation: {
      error: false,
      message: '',
    },
  },
  password: {
    value: '',
    validation: {
      error: false,
      message: '',
    },
  },
};
