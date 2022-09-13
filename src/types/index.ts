export type callbackAny<T> = (data: T) => void;
export interface saleItem {
  title?: string;
  imageURL?: string;
  brand?: string;
  size?: string;
  year?: string;
  color?: string;
  count?: string | number;
  price?: string | number;
}
export interface FilterSets {
  brand?: Array<string>;
  year?: Array<string>;
  color?: Array<string>;
  inchMin: string;
  inchMax: string;
  priceMin: string;
  priceMax: string;
  sorts?: string;
  title?: Array<string>;
  count: number;
}
