import { BoxColorOption, ProductItem } from '@/components/configurator/types';

export type { BoxColorOption, ProductItem };

export interface DesignOption {
  id: number;         // 1–12
  name: string;       // e.g. "Classic Monogram", "Floral Frame", etc.
  imageUrl: string;   // URL from Swell product images or /images/gift-box/ folder
  isCustomUpload: boolean; // true only for Design 12
}

export interface WelcomeBoxState {
  boxColor: BoxColorOption | null;
  selectedDesign: DesignOption | null;
  namesOrInitials: string;         // Applies to designs 1–11
  eventDate: string;                // Applies to designs 1–11
  customUploadUrl: string;          // URL of uploaded image for design 12
  customUploadFilename: string;     // Original filename for display
  welcomeMessage: string;           // Single message for all boxes
  selectedProducts: ProductItem[];
  baseBoxCartItemId?: string;
}
