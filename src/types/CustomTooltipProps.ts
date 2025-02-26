export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      level: number;
      month: string;
      detail?: string;
      id?: string;
      title?: string;
    };
  }>;
  label?: string;
  onClose?: () => void;
} 