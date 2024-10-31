export type ResponseError = {
  message: string;
  status: number;
  errors: { [field: string]: string };
};
