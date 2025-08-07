import {
  Control,
  FieldValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

export type SharingState = {
  shared: boolean;
  readOnly: boolean;
  sharedLocations: string[];
  sharedTenants: string[];
};

export type SharingAction =
  | { type: 'SET_SHARED'; payload: boolean }
  | { type: 'SET_READ_ONLY'; payload: boolean }
  | { type: 'SET_LOCATIONS'; payload: string[] }
  | { type: 'SET_TENANTS'; payload: string[] }
  | { type: 'RESET' };

export type SharingSectionProps<T extends FieldValues> = {
  label: string;
  error?: string;
  control: Control<T>;
  onValuesChange?: (values: SharingState) => void;
  mode?: 'create' | 'update';
  setValue?: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  authorUuid?: string;
};
