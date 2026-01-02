import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

const countries: Country[] = [
  { code: "PT", name: "Portugal", dialCode: "+351", flag: "🇵🇹" },
  { code: "BR", name: "Brasil", dialCode: "+55", flag: "🇧🇷" },
  { code: "ES", name: "Espanha", dialCode: "+34", flag: "🇪🇸" },
  { code: "FR", name: "França", dialCode: "+33", flag: "🇫🇷" },
  { code: "DE", name: "Alemanha", dialCode: "+49", flag: "🇩🇪" },
  { code: "IT", name: "Itália", dialCode: "+39", flag: "🇮🇹" },
  { code: "UK", name: "Reino Unido", dialCode: "+44", flag: "🇬🇧" },
  { code: "US", name: "Estados Unidos", dialCode: "+1", flag: "🇺🇸" },
  { code: "CH", name: "Suíça", dialCode: "+41", flag: "🇨🇭" },
  { code: "NL", name: "Países Baixos", dialCode: "+31", flag: "🇳🇱" },
  { code: "BE", name: "Bélgica", dialCode: "+32", flag: "🇧🇪" },
  { code: "LU", name: "Luxemburgo", dialCode: "+352", flag: "🇱🇺" },
  { code: "AT", name: "Áustria", dialCode: "+43", flag: "🇦🇹" },
  { code: "IE", name: "Irlanda", dialCode: "+353", flag: "🇮🇪" },
  { code: "PL", name: "Polónia", dialCode: "+48", flag: "🇵🇱" },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function PhoneInput({ value, onChange, placeholder, className }: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]); // Portugal default
  
  // Extract phone number without dial code
  const phoneNumber = value.startsWith(selectedCountry.dialCode)
    ? value.slice(selectedCountry.dialCode.length).trim()
    : value.replace(/^\+\d+\s*/, "");

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find((c) => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
      // Update value with new dial code
      onChange(`${country.dialCode} ${phoneNumber}`);
    }
  };

  const handlePhoneChange = (phone: string) => {
    // Remove any non-digit characters except spaces
    const cleanPhone = phone.replace(/[^\d\s]/g, "");
    onChange(`${selectedCountry.dialCode} ${cleanPhone}`);
  };

  return (
    <div className={cn("flex gap-2", className)}>
      <Select value={selectedCountry.code} onValueChange={handleCountryChange}>
        <SelectTrigger className="w-[100px] h-12 flex-shrink-0">
          <SelectValue>
            <span className="flex items-center gap-1">
              <span>{selectedCountry.flag}</span>
              <span className="text-xs text-muted-foreground">{selectedCountry.dialCode}</span>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-[300px] bg-card border border-border z-50">
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              <span className="flex items-center gap-2">
                <span>{country.flag}</span>
                <span>{country.name}</span>
                <span className="text-xs text-muted-foreground ml-auto">{country.dialCode}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="tel"
        placeholder={placeholder || "912 345 678"}
        value={phoneNumber}
        onChange={(e) => handlePhoneChange(e.target.value)}
        className="h-12 flex-1"
      />
    </div>
  );
}
