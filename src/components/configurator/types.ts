export interface BoxColorOption {
  id: string;
  name: string;
  hexCode: string;
  imageUrl?: string;
  mostPopular?: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  image: string;
  isCustomizable: boolean;
  customOptions?: { name: string, value: string }[];
  swellData?: any;
  cartItemId?: string;
}

export interface ConfiguratorState {
  boxColor: BoxColorOption | null;
  personalizationMessage: string;
  personNames: string[];
  includeShreddedPaper: boolean;
  includeBowTie: boolean;
  selectedProducts: ProductItem[];
  baseBoxCartItemId?: string;
}
