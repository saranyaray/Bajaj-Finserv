import { Doctor, ConsultationMode } from "@/types/doctor";

// This function transforms the raw API data to format compatible with our components
export const transformDoctorData = (rawData: any[]): Doctor[] => {
  if (!rawData || !Array.isArray(rawData)) return [];
  
  return rawData.map((doc) => {
    // Extract fees value (remove currency symbol and convert to number)
    const feesValue = parseInt(doc.fees.replace(/[^\d]/g, '')) || 0;
    
    // Extract experience years (parse the number from string like "13 Years of experience")
    const experienceMatch = doc.experience.match(/(\d+)/);
    const experienceYears = experienceMatch ? parseInt(experienceMatch[1]) : 0;
    
    // Map specialties from the specialities array
    const specialties = doc.specialities.map((s: { name: string }) => s.name);
    
    // Format clinic address
    let clinicAddress = "Address not available";
    if (doc.clinic) {
      // Check if clinic is an object with address properties
      if (doc.clinic.address_line1) {
        clinicAddress = `${doc.clinic.address_line1}, ${doc.clinic.locality}, ${doc.clinic.city}`;
      } else if (typeof doc.clinic.address === 'string') {
        clinicAddress = doc.clinic.address;
      } else if (doc.clinic.name) {
        clinicAddress = doc.clinic.name;
      }
    }
    
    // For demo purposes, we're generating random consultation modes, ratings, and reviews
    // In a real app, this would come from the API
    const consultationModes: ConsultationMode[] = ["Video Consult", "In Clinic"];
    const ratings = 4 + Math.random(); // Random rating between 4 and 5
    const reviews = Math.floor(Math.random() * 500) + 50; // Random number of reviews
    
    return {
      ...doc,
      // Add transformed fields
      specialty: specialties,
      fees: feesValue,
      experience: experienceYears,
      clinicAddress: clinicAddress,
      consultationMode: consultationModes,
      ratings: parseFloat(ratings.toFixed(1)),
      reviews: reviews,
      availability: "Available Today"
    };
  });
};