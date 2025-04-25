import { Doctor, ConsultationMode } from "@/types/doctor";
import DoctorCard from "@/components/doctor-card";
import { X } from "lucide-react";

interface DoctorListProps {
  doctors: Doctor[];
  isLoading: boolean;
  error: unknown;
  searchTerm: string;
  consultationMode: ConsultationMode | "";
  selectedSpecialties: string[];
  resetFilter: (filterType: string, value?: string) => void;
  clearAllFilters: () => void;
}

const DoctorList = ({
  doctors,
  isLoading,
  error,
  searchTerm,
  consultationMode,
  selectedSpecialties,
  resetFilter,
  clearAllFilters
}: DoctorListProps) => {
  // Show loading state
  if (isLoading) {
    return (
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center mt-4">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
            <h3 className="text-xl font-medium text-neutral-500">Loading doctors...</h3>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center mt-4">
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-xl font-medium text-neutral-500 mb-2">Error loading doctors</h3>
            <p className="text-neutral-400">There was a problem fetching doctor data. Please try again.</p>
          </div>
        </div>
      </div>
    );
  }

  const hasActiveFilters = searchTerm || consultationMode || selectedSpecialties.length > 0;

  // Show empty state if no doctors match the filters
  if (doctors.length === 0 && hasActiveFilters) {
    return (
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-neutral-500">Available Doctors</h2>
            <span className="text-sm text-neutral-400">0 doctors found</span>
          </div>
          
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-3">
              {searchTerm && (
                <div className="bg-primary/10 text-primary text-sm py-1 px-3 rounded-full flex items-center gap-1">
                  <span>Search: {searchTerm}</span>
                  <button 
                    className="hover:text-primary-dark"
                    onClick={() => resetFilter("search")}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              
              {consultationMode && (
                <div className="bg-primary/10 text-primary text-sm py-1 px-3 rounded-full flex items-center gap-1">
                  <span>{consultationMode}</span>
                  <button 
                    className="hover:text-primary-dark"
                    onClick={() => resetFilter("consultationMode")}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              
              {selectedSpecialties.map(specialty => (
                <div key={specialty} className="bg-primary/10 text-primary text-sm py-1 px-3 rounded-full flex items-center gap-1">
                  <span>{specialty}</span>
                  <button 
                    className="hover:text-primary-dark"
                    onClick={() => resetFilter("specialty", specialty)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-8 text-center mt-4">
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-neutral-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-medium text-neutral-500 mb-2">No doctors found</h3>
            <p className="text-neutral-400 max-w-md mx-auto">
              We couldn't find any doctors matching your criteria. Try adjusting your filters or try a different search term.
            </p>
            <button 
              className="mt-6 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
              onClick={clearAllFilters}
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-neutral-500">Available Doctors</h2>
          <span className="text-sm text-neutral-400">{doctors.length} doctors found</span>
        </div>
        
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-3">
            {searchTerm && (
              <div className="bg-primary/10 text-primary text-sm py-1 px-3 rounded-full flex items-center gap-1">
                <span>Search: {searchTerm}</span>
                <button 
                  className="hover:text-primary-dark"
                  onClick={() => resetFilter("search")}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            
            {consultationMode && (
              <div className="bg-primary/10 text-primary text-sm py-1 px-3 rounded-full flex items-center gap-1">
                <span>{consultationMode}</span>
                <button 
                  className="hover:text-primary-dark"
                  onClick={() => resetFilter("consultationMode")}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            
            {selectedSpecialties.map(specialty => (
              <div key={specialty} className="bg-primary/10 text-primary text-sm py-1 px-3 rounded-full flex items-center gap-1">
                <span>{specialty}</span>
                <button 
                  className="hover:text-primary-dark"
                  onClick={() => resetFilter("specialty", specialty)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-4 mt-4">
        {doctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
