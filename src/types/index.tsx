import {ReactNode} from 'react';
export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (e: React.MouseEvent) => void;
  disabled?: boolean;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export interface Column {
  field: string;
  headerName: string;
  width?: string;
  renderCell?: (value: any, row: any) => ReactNode;
}

export interface Row {
  id: string;
  [key: string]: any;
}

export interface DataGridProps {
  columns: Column[];
  rows: Row[];
  pageSize?: number;
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectRow: (id: string) => void;
  selectedRows: string[];
  searchPlaceholder?: string;
  hideToolbar?: boolean;
  showActionColumn?: boolean;
  onEdit?: (row: Row) => void;
  onDelete?: (row: Row) => void;
  onToggle?: (id: string, value: boolean) => void; // Added this line
}

export type FieldType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "select"
  | "textarea"
  | "checkbox"
  | "date"
  | "time"
  | "radio"
  | "file"
  | "image-upload"
  | "custom";

 export interface FieldDefinition {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  helperText?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
  rows?: number; // For textarea
  cols?: number; // For textarea
  customRender?: (props: {
    value: any;
    onChange: (value: any) => void;
    disabled?: boolean;
    error?: string;
  }) => ReactNode;
  fullWidth?: boolean; // Add this to allow fields to take full width
  containerClassName?: string; // Custom class for the field container
  inputClassName?: string; // Custom class for the input element
  layout?: "horizontal" | "vertical"; // Field layout - default is vertical
}

export interface BaseItem {
    id?: string;
    isActive?: boolean;
    [key: string]: any;
  }

  export interface CustomModalProps<T extends BaseItem> {
    isOpen: boolean;
    onClose: () => void;
    mode: "add" | "edit" | "view" | "delete" | "confirm";
    fields?: FieldDefinition[];
    item?: T;
    onSave: (item: T) => void;
    title: string;
    subtitle?: string;
    size?: "sm" | "md" | "lg" | "xl" | "full";
    showFooter?: boolean;
    customFooter?: ReactNode;
    confirmText?: string;
    cancelText?: string;
    children?: ReactNode;
    showToggle?: boolean;
    toggleLabel?: string;
    className?: string;
    isLoading?: boolean;
    formLayout?: "standard" | "grid" | "custom"; // Add form layout option
    gridColumns?: number; // Number of columns for grid layout
  }

  export interface CardProps {
    title: string;
    description?: string;
    placeholder?: string;
    toggleChecked?: boolean;
    onToggleChange?: (e: React.MouseEvent) => void;
    actionButton?: React.ReactNode; // Added the actionButton property
    children?: React.ReactNode;
    variant?: "default" | "compact";
  }
  export interface DeliveryModeProps {
    onSave?: () => void;
  }

  export interface StoreTimingAvailabilityProps {
    selectedDayOption: string;
    setSelectedDayOption: (option: string) => void;
    selectedTimeOption: string;
    setSelectedTimeOption: (option: string) => void;
  }
  
  // Define option type
  export interface Option {
    id: string;
    label: string;
  }