export type ResponseSuccess = {
  status: number;
  message: string;
  data: { [field: string]: string } | null;
};
