import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Doctor, SortOption, ConsultationMode } from "@/types/doctor";
import SearchBar from "@/components/search-bar";
import FilterPanel from "@/components/filter-panel";
import DoctorList from "@/components/doctor-list";
import Footer from "@/components/footer";
import { filterDoctors } from "@/lib/utils/filter-utils";

const Home = () => {
  const [_, setLocation] = useLocation();
  const search = useSearch();
  const searchParams = new URLSearchParams(search);

  // Initialize state from URL params
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get("search") || "");
  const [consultationMode, setConsultationMode] = useState<ConsultationMode | "">(
    (searchParams.get("consultationMode") as ConsultationMode) || ""
  );
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    searchParams.getAll("specialty") || []
  );
  const [sortOption, setSortOption] = useState<SortOption | "">(
    (searchParams.get("sort") as SortOption) || ""
  );

  // Fetch doctor data
  const { data: doctors = [], isLoading, error } = useQuery({
    queryKey: ["https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json"],
  });

  // Filter doctors based on current filters
  const filteredDoctors = filterDoctors(
    doctors as Doctor[],
    searchTerm,
    consultationMode,
    selectedSpecialties,
    sortOption
  );

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchTerm) params.set("search", searchTerm);
    if (consultationMode) params.set("consultationMode", consultationMode);
    if (sortOption) params.set("sort", sortOption);
    
    selectedSpecialties.forEach(specialty => {
      params.append("specialty", specialty);
    });
    
    const newSearch = params.toString() ? `?${params.toString()}` : "";
    setLocation(newSearch, { replace: true });
  }, [searchTerm, consultationMode, selectedSpecialties, sortOption, setLocation]);

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm("");
    setConsultationMode("");
    setSelectedSpecialties([]);
    setSortOption("");
  };

  // Reset a single filter
  const resetFilter = (filterType: string, value?: string) => {
    switch (filterType) {
      case "search":
        setSearchTerm("");
        break;
      case "consultationMode":
        setConsultationMode("");
        break;
      case "specialty":
        if (value) {
          setSelectedSpecialties(prev => prev.filter(s => s !== value));
        }
        break;
      case "sort":
        setSortOption("");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h1 className="text-xl font-semibold">DocFinder</h1>
            </div>
            
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              doctors={doctors as Doctor[]} 
            />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-6">
            <FilterPanel
              consultationMode={consultationMode}
              setConsultationMode={setConsultationMode}
              selectedSpecialties={selectedSpecialties}
              setSelectedSpecialties={setSelectedSpecialties}
              sortOption={sortOption}
              setSortOption={setSortOption}
              clearAllFilters={clearAllFilters}
              doctors={doctors as Doctor[]}
            />
            
            <DoctorList
              doctors={filteredDoctors}
              isLoading={isLoading}
              error={error}
              searchTerm={searchTerm}
              consultationMode={consultationMode}
              selectedSpecialties={selectedSpecialties}
              resetFilter={resetFilter}
              clearAllFilters={clearAllFilters}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
