
import React from 'react';
import { ADNameSuggestion } from '@/types/adNameChecker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // For loading state

interface ResultsDisplayProps {
  suggestions: ADNameSuggestion[];
  isLoading: boolean;
  hasSearched: boolean;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ suggestions, isLoading, hasSearched }) => {
  if (isLoading) {
    return (
      <Card className="w-full max-w-md mt-8">
        <CardHeader>
          <CardTitle>Suggested Names</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-full rounded-md" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!hasSearched) {
    return null; // Don't show anything if no search has been performed yet
  }
  
  if (suggestions.length === 0) {
    return (
      <Card className="w-full max-w-md mt-8">
        <CardHeader>
          <CardTitle>Suggested Names</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No suggestions available based on the criteria, or the (mock) service found none. In a real scenario, this might mean the first few sequential names are taken or an error occurred.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mt-8">
      <CardHeader>
        <CardTitle>Suggested Available Names</CardTitle>
        <CardDescription>These names are likely available based on the (mock) check.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} className="p-3 bg-secondary rounded-md text-secondary-foreground">
              {suggestion.name}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
