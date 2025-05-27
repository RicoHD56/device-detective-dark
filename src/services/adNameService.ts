
import { ADNameCheckFormValues, ADNameSuggestion } from '@/types/adNameChecker';

// Simulates calling a backend API to check for available AD names
export const findAvailableADNames = async (
  values: ADNameCheckFormValues
): Promise<ADNameSuggestion[]> => {
  console.log('Simulating API call with values:', values);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (!values.betriebsnummer || !values.deviceType) {
    return [];
  }

  const suggestions: ADNameSuggestion[] = [];
  const prefix = `DE${values.betriebsnummer}${values.deviceType}`;

  // Simulate finding a few available names
  // In a real scenario, the backend would query AD to find non-existent names
  for (let i = 1; i <= 5; i++) {
    const sequentialNumber = String(i).padStart(5, '0');
    const name = `${prefix}${sequentialNumber}`;
    suggestions.push({ id: name, name });
  }

  // Simulate a case where some names might be "taken" if we wanted more complex mock
  // For now, just return generated names
  console.log('Simulated suggestions:', suggestions);
  return suggestions;
};
