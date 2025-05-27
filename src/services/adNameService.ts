
import { ADNameCheckFormValues, ADNameSuggestion } from '@/types/adNameChecker';

// !! IMPORTANT !!
// Replace 'YOUR_SERVER_IP_OR_HOSTNAME' with the actual IP address or hostname
// of the server running your PowerShell backend service.
// For example, if your server's IP is 192.168.1.100, the URL would be:
// const API_BASE_URL = 'http://192.168.1.100:8080/api/adnames/';
// If you are testing on the same machine where the PowerShell script is running,
// you can often use 'http://localhost:8080/api/adnames/'
const API_BASE_URL = 'http://YOUR_SERVER_IP_OR_HOSTNAME:8080/api/adnames/';

export const findAvailableADNames = async (
  values: ADNameCheckFormValues
): Promise<ADNameSuggestion[]> => {
  console.log('Calling backend API with values:', values);

  if (!values.betriebsnummer || !values.deviceType) {
    console.warn('Betriebsnummer or DeviceType is missing, not calling API.');
    return [];
  }

  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers your backend might require
      },
      body: JSON.stringify({
        betriebsnummer: values.betriebsnummer,
        deviceType: values.deviceType,
      }),
    });

    if (!response.ok) {
      // Log more details for HTTP errors
      const errorText = await response.text();
      console.error(
        `API call failed with status ${response.status}: ${response.statusText}`, 
        `Response body: ${errorText}`
      );
      // Consider throwing an error or returning a specific error structure
      // that your UI can handle to show a message to the user.
      // For now, returning an empty array on error.
      return [];
    }

    // The PowerShell script returns an array of strings (computer names)
    const availableNames: string[] = await response.json();

    // Transform the array of names into ADNameSuggestion[]
    const suggestions: ADNameSuggestion[] = availableNames.map(name => ({
      id: name, // Use the name itself as an ID
      name: name,
    }));

    console.log('Received suggestions from backend:', suggestions);
    return suggestions;

  } catch (error) {
    console.error('Error calling backend API:', error);
    // This catches network errors or issues with the fetch itself,
    // or errors during JSON parsing if the response isn't valid JSON.
    // Again, consider how you want to propagate this error to the UI.
    return [];
  }
};
