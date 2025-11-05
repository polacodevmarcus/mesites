export interface Column {
  key: keyof Mesite;
  label: string;
  render?: (value: Mesite[keyof Mesite], row: Mesite) => React.ReactNode;
}

export interface Mesite {
  id: number;
  name: string;
  address: string;
  evangelizationDate: string;
  contact: string;
  evangelizerName: string;
}