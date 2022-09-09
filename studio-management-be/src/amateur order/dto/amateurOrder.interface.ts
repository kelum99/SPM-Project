export interface AmateurItems {
  item: string;
  amount: number;
  itemPrice: number;
  itemPrintPrice: number;
}
export interface AmateurPhotos {
  orderType: string;
  photoSize: string;
  copies: number;
  printPrice: number;
  frame: boolean;
  laminate: boolean;
}
export type PaymentType = 'Completed' | 'None' | 'Advance';
export type OrderType = 'Completed' | 'None' | 'In-progress';
