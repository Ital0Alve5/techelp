const date = new Date();
const currentDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

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
