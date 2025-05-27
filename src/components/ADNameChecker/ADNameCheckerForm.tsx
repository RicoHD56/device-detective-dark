
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ADNameCheckFormValues } from '@/types/adNameChecker';

interface ADNameCheckerFormProps {
  onSubmit: (values: ADNameCheckFormValues) => void;
  isLoading: boolean;
}

const deviceTypes = [
  { value: 'M', label: 'M (Mobile/Misc)' },
  { value: 'C', label: 'C (Client PC)' },
  { value: 'O', label: 'O (Other)' },
] as const; // Using const assertion for stricter type

export const ADNameCheckerForm: React.FC<ADNameCheckerFormProps> = ({ onSubmit, isLoading }) => {
  const [betriebsnummer, setBetriebsnummer] = useState('');
  const [deviceType, setDeviceType] = useState<'M' | 'C' | 'O' | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (betriebsnummer.length === 6 && deviceType) {
      onSubmit({ betriebsnummer, deviceType });
    } else {
      // Basic validation feedback, could be improved with toasts or error messages
      alert("Please enter a 6-digit Betriebsnummer and select a device type.");
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>AD Computer Name Checker</CardTitle>
        <CardDescription>
          Enter details to find available computer names in Active Directory.
          The format is DE + 6-digit Betriebsnummer + Device Type + 5-digit number (e.g., DE123456M00001).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="betriebsnummer">Betriebsnummer (6 digits)</Label>
            <Input
              id="betriebsnummer"
              type="text"
              value={betriebsnummer}
              onChange={(e) => setBetriebsnummer(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="e.g., 123456"
              maxLength={6}
              pattern="\d{6}"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deviceType">Device Type</Label>
            <Select
              value={deviceType}
              onValueChange={(value: 'M' | 'C' | 'O') => setDeviceType(value)}
              required
              disabled={isLoading}
            >
              <SelectTrigger id="deviceType">
                <SelectValue placeholder="Select device type" />
              </SelectTrigger>
              <SelectContent>
                {deviceTypes.map(dt => (
                  <SelectItem key={dt.value} value={dt.value}>{dt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Checking...' : 'Find Available Names'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
