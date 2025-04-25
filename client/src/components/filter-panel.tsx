import { useState, useEffect } from "react";
import { ConsultationMode, Doctor, SortOption } from "@/types/doctor";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterPanelProps {
  consultationMode: ConsultationMode | "";
  setConsultationMode: (mode: ConsultationMode | "") => void;
  selectedSpecialties: string[];
  setSelectedSpecialties: (specialties: string[]) => void;
  sortOption: SortOption | "";
  setSortOption: (option: SortOption | "") => void;
  clearAllFilters: () => void;
  doctors: Doctor[];
}

const FilterPanel = ({
  consultationMode,
  setConsultationMode,
  selectedSpecialties,
  setSelectedSpecialties,
  sortOption,
  setSortOption,
  clearAllFilters,
  doctors
}: FilterPanelProps) => {
  const [uniqueSpecialties, setUniqueSpecialties] = useState<string[]>([]);

  // Extract unique specialties from doctor data
  useEffect(() => {
    if (doctors.length > 0) {
      const allSpecialties = doctors.flatMap(doctor => doctor.specialty);
      const unique = Array.from(new Set(allSpecialties)).sort();
      setUniqueSpecialties(unique);
    }
  }, [doctors]);

  // Handle specialty checkbox change
  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    if (checked) {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    } else {
      setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
    }
  };

  return (
    <aside className="w-full md:w-64 lg:w-72 shrink-0">
      <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-500">Filters</h2>
          <button
            className="text-primary text-sm font-medium"
            onClick={clearAllFilters}
          >
            Clear All
          </button>
        </div>
        
        <Accordion type="multiple" defaultValue={["consultation", "specialty", "sort"]} className="space-y-2">
          {/* Consultation Mode Filter */}
          <AccordionItem value="consultation" className="border-b border-neutral-200 pb-2">
            <AccordionTrigger className="py-2 font-medium" data-testid="filter-header-moc">
              Consultation Mode
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <RadioGroup 
                value={consultationMode} 
                onValueChange={(value) => setConsultationMode(value as ConsultationMode)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value="Video Consult" 
                    id="video-consult" 
                    data-testid="filter-video-consult" 
                  />
                  <Label htmlFor="video-consult" className="text-sm cursor-pointer">Video Consult</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value="In Clinic" 
                    id="in-clinic" 
                    data-testid="filter-in-clinic" 
                  />
                  <Label htmlFor="in-clinic" className="text-sm cursor-pointer">In Clinic</Label>
                </div>
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
          
          {/* Specialty Filter */}
          <AccordionItem value="specialty" className="border-b border-neutral-200 pb-2">
            <AccordionTrigger className="py-2 font-medium" data-testid="filter-header-speciality">
              Speciality
            </AccordionTrigger>
            <AccordionContent className="pt-2 max-h-64 overflow-y-auto">
              <div className="space-y-2">
                {uniqueSpecialties.map(specialty => {
                  // Create data-testid compliant id
                  const specialtyId = specialty.replace(/\s+/g, '-').replace(/\//g, '-');
                  
                  return (
                    <div className="flex items-center space-x-2" key={specialty}>
                      <Checkbox 
                        id={`specialty-${specialty}`}
                        checked={selectedSpecialties.includes(specialty)}
                        onCheckedChange={(checked) => 
                          handleSpecialtyChange(specialty, checked as boolean)
                        }
                        data-testid={`filter-specialty-${specialtyId}`}
                      />
                      <Label 
                        htmlFor={`specialty-${specialty}`}
                        className="text-sm cursor-pointer"
                      >
                        {specialty}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Sort Filter */}
          <AccordionItem value="sort" className="pb-2">
            <AccordionTrigger className="py-2 font-medium" data-testid="filter-header-sort">
              Sort By
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <RadioGroup 
                value={sortOption} 
                onValueChange={(value) => setSortOption(value as SortOption)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value="fees" 
                    id="sort-fees" 
                    data-testid="sort-fees" 
                  />
                  <Label htmlFor="sort-fees" className="text-sm cursor-pointer">Fees (Low to High)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value="experience" 
                    id="sort-experience" 
                    data-testid="sort-experience" 
                  />
                  <Label htmlFor="sort-experience" className="text-sm cursor-pointer">Experience (High to Low)</Label>
                </div>
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
};

export default FilterPanel;
