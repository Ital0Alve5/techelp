type Adress = {
  cep: string;
  neighborhood: string;
  city: string;
  state: string;
  street: string;
  number: number;
  complement: string;
};

export type Client = {
  id: number;
  cpf: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  address: Adress;
};
