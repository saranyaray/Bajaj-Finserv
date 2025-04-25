import { useState, useEffect, useRef } from "react";
import { Doctor } from "@/types/doctor";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  doctors: Doctor[];
}

const SearchBar = ({ searchTerm, setSearchTerm, doctors }: SearchBarProps) => {
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate suggestions based on current search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = doctors
      .filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 3); // Get top 3 matches
    
    setSuggestions(filtered);
  }, [searchTerm, doctors]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (name: string) => {
    setSearchTerm(name);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <Input
          type="text"
          data-testid="autocomplete-input"
          className="w-full py-2.5 pl-10 pr-4 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          placeholder="Search doctors by name..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg border border-neutral-200 z-10">
          {suggestions.map((doctor) => (
            <div
              key={doctor.id}
              data-testid="suggestion-item"
              className="px-4 py-2 hover:bg-neutral-100 cursor-pointer"
              onMouseDown={() => handleSuggestionClick(doctor.name)}
            >
              <span className="font-medium">{doctor.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
