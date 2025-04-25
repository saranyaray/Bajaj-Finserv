interface Specialty {
  name: string;
}

interface Clinic {
  name: string;
  address: string;
}

export interface Doctor {
  id: string;
  name: string;
  name_initials: string;
  photo: string;
  doctor_introduction: string;
  specialities: Specialty[];
  fees: string;
  experience: string;
  languages: string[];
  clinic: Clinic;
  // Transformed fields for compatibility
  specialty?: string[];
  ratings?: number;
  reviews?: number;
  clinicAddress?: string;
  consultationMode?: ConsultationMode[];
  availability?: string;
}

export type ConsultationMode = 'Video Consult' | 'In Clinic';

export type SortOption = 'fees' | 'experience';
