export type ResponseSuccess = {
  status: number;
  message: string;
  data: { [field: string]: string | Array<{ [field: string]: string }> } | null;
};
