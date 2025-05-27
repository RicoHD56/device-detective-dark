
export interface ADNameCheckFormValues {
  betriebsnummer: string;
  deviceType: 'M' | 'C' | 'O' | '';
}

export interface ADNameSuggestion {
  id: string;
  name: string;
}
