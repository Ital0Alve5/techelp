export type ClientRequests = {
  id: number;
  categoryId: number;
  deviceDescription: string;
  issueDescription: string;
  budget: number | null;
  orientation: string | null;
  rejectReason: string | null;
  status: string;
  lastEmployee: string | null;
  date: string;
  hour: string;
};
