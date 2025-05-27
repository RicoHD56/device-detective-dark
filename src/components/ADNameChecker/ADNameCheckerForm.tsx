import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
// No longer need Input for betriebsnummer
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ADNameCheckFormValues } from '@/types/adNameChecker';
interface ADNameCheckerFormProps {
  onSubmit: (values: ADNameCheckFormValues) => void;
  isLoading: boolean;
}
const deviceTypes = [{
  value: 'M',
  label: 'M (Mobile/Misc)'
}, {
  value: 'C',
  label: 'C (Client PC)'
}, {
  value: 'O',
  label: 'O (Other)'
}] as const;

// Define mock Betriebsnummern
const mockBetriebsnummern = [{
  value: '111111',
  label: '111111 - Standort A'
}, {
  value: '222222',
  label: '222222 - Standort B'
}, {
  value: '333333',
  label: '333333 - Standort C'
}, {
  value: '444444',
  label: '444444 - Zentral IT'
}, {
  value: '555555',
  label: '555555 - Werkstatt 1'
}, {
  value: '666666',
  label: '666666 - Werkstatt 2'
}, {
  value: '777777',
  label: '777777 - Verwaltung'
}] as const;
export const ADNameCheckerForm: React.FC<ADNameCheckerFormProps> = ({
  onSubmit,
  isLoading
}) => {
  const [betriebsnummer, setBetriebsnummer] = useState(''); // Keep as string, or specific literal type if preferred
  const [deviceType, setDeviceType] = useState<'M' | 'C' | 'O' | ''>('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation for betriebsnummer being 6 digits is implicitly handled by selection
    if (betriebsnummer && deviceType) {
      onSubmit({
        betriebsnummer,
        deviceType
      });
    } else {
      alert("Please select a Betriebsnummer and a device type.");
    }
  };
  return <Card className="w-full max-w-md">
      <CardHeader className="py-0">
        
        
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="betriebsnummer">Betriebsnummer</Label>
            <Select value={betriebsnummer} onValueChange={(value: string) => setBetriebsnummer(value)} // Value will be one of the mockBetriebsnummern values
          required disabled={isLoading}>
              <SelectTrigger id="betriebsnummer">
                <SelectValue placeholder="Select Betriebsnummer" />
              </SelectTrigger>
              <SelectContent>
                {mockBetriebsnummern.map(bn => <SelectItem key={bn.value} value={bn.value}>{bn.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="deviceType">Device Type</Label>
            <Select value={deviceType} onValueChange={(value: 'M' | 'C' | 'O') => setDeviceType(value)} required disabled={isLoading}>
              <SelectTrigger id="deviceType">
                <SelectValue placeholder="Select device type" />
              </SelectTrigger>
              <SelectContent>
                {deviceTypes.map(dt => <SelectItem key={dt.value} value={dt.value}>{dt.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Checking...' : 'Find Available Names'}
          </Button>
        </form>
      </CardContent>
    </Card>;
};