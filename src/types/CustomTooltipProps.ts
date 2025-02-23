
export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      level: number;
      month: string;
      detail?: string;
    };
  }>;
  label?: string;
  onClose?: () => void;
} 