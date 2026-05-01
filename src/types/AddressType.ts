export interface Address {
  id: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  identify: string;
  identifyType: 'home' | 'work' | 'other';
  is_default: boolean;
}
