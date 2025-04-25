import { Doctor, ConsultationMode, SortOption } from "@/types/doctor";

export const filterDoctors = (
  doctors: Doctor[],
  searchTerm: string,
  consultationMode: ConsultationMode | "",
  specialties: string[],
  sortOption: SortOption | ""
): Doctor[] => {
  if (!doctors || doctors.length === 0) return [];

  let filteredDoctors = [...doctors];

  // Filter by search term (name)
  if (searchTerm) {
    filteredDoctors = filteredDoctors.filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filter by consultation mode
  if (consultationMode) {
    filteredDoctors = filteredDoctors.filter(doctor =>
      doctor.consultationMode.includes(consultationMode)
    );
  }

  // Filter by specialties (multiple can be selected)
  if (specialties.length > 0) {
    filteredDoctors = filteredDoctors.filter(doctor =>
      specialties.some(specialty => doctor.specialty.includes(specialty))
    );
  }

  // Sort based on selected option
  if (sortOption) {
    filteredDoctors.sort((a, b) => {
      if (sortOption === 'fees') {
        // Sort by fees (ascending)
        return a.fees - b.fees;
      } else if (sortOption === 'experience') {
        // Sort by experience (descending)
        return b.experience - a.experience;
      }
      return 0;
    });
  }

  return filteredDoctors;
};
