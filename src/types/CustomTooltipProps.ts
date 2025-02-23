import { MentalData } from './MentalData';

export interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    value: number;
    payload: MentalData;
  }[];
  label?: string;
} 