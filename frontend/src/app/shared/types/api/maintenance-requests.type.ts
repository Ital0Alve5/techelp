type requestHistoryMock = {
  date: string;
  hour: string;
  fromStatus: string;
  toStatus: string;
  employee: string;
};

export type Requests = {
  id: number;
  userId: number,
  deviceDescription: string;
  deviceCategory: string;
  issueDescription: string;
  price: string;
  date: string;
  hour: string;
  currentStatus: string;
  rejectReason: string;
  history: requestHistoryMock[];
};
