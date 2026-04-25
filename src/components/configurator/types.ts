export interface BoxColorOption {
  id: string;
  name: string;
  hexCode: string;
  imageUrl?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  image: string;
  isCustomizable: boolean;
  customOptions?: { name: string, value: string }[];
  swellData?: any;
}

export interface ConfiguratorState {
  boxColor: BoxColorOption | null;
  personalizationMessage: string;
  includeShreddedPaper: boolean;
  includeBowTie: boolean;
  selectedProducts: ProductItem[];
}
