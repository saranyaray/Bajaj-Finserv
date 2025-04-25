export interface Doctor {
  id: number;
  name: string;
  specialty: string[];
  experience: number;
  ratings: number;
  reviews: number;
  fees: number;
  clinicAddress: string;
  consultationMode: ConsultationMode[];
  availability: string;
}

export type ConsultationMode = 'Video Consult' | 'In Clinic';

export type SortOption = 'fees' | 'experience';
