import React, { useState } from 'react';
import { ADNameCheckerForm } from '@/components/ADNameChecker/ADNameCheckerForm';
import { ResultsDisplay } from '@/components/ADNameChecker/ResultsDisplay';
import { findAvailableADNames } from '@/services/adNameService';
import { ADNameCheckFormValues, ADNameSuggestion } from '@/types/adNameChecker';
import { Separator } from '@/components/ui/separator';
const Index = () => {
  const [suggestions, setSuggestions] = useState<ADNameSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // To control initial display of results

  const handleFormSubmit = async (values: ADNameCheckFormValues) => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const results = await findAvailableADNames(values);
      setSuggestions(results);
    } catch (error) {
      console.error("Error fetching AD name suggestions:", error);
      setSuggestions([]);
      // In a real app, show an error toast to the user
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Active Directory Name Checker
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">Finde den nächsten verfügbaren PC Namen</p>
      </header>
      
      <ADNameCheckerForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      
      {hasSearched && <div className="w-full max-w-md mt-8">
           <Separator className="my-6" />
        </div>}
      
      <ResultsDisplay suggestions={suggestions} isLoading={isLoading} hasSearched={hasSearched} />

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        
        
      </footer>
    </div>;
};
export default Index;