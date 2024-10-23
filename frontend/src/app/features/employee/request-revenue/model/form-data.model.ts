const date = new Date();
const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export const formData = {
  startDate: {
    value: '2024-01-01',
    type: 'date',
    validation: {
      error: false,
      message: '',
    },
  },
  endDate: {
    value: currentDate,
    type: 'date',
    validation: {
      error: false,
      message: '',
    },
  },
};
