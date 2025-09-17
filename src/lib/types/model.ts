type Model = {
  id: number;
  name: string;
  providerId: number;
  isActive: boolean;
  updatedAt: Date;
}

type Provider = {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type { Model, Provider };