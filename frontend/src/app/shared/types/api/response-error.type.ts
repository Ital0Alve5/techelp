export type ResponseError = {
  status: number;
  message: string;
  errors: { [field: string]: string };
};
