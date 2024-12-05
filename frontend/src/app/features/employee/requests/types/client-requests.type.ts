export type ClientRequests = {
  id: number;
  clientId: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  categoryName: string;
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
