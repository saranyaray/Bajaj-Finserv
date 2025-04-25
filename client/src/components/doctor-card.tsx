import { Doctor } from "@/types/doctor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <Card
      className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow p-4 flex flex-col md:flex-row gap-4"
      data-testid="doctor-card"
    >
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-neutral-100 overflow-hidden mb-2 flex items-center justify-center">
          {/* Using initials as avatar instead of image */}
          <span className="text-3xl font-bold text-primary">
            {doctor.name.charAt(0)}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center text-yellow-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm font-medium">{doctor.ratings.toFixed(1)}</span>
          </div>
          <span className="text-xs text-neutral-400">{doctor.reviews} reviews</span>
        </div>
      </div>
      
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
          <div>
            <h3 data-testid="doctor-name" className="text-lg font-semibold">{doctor.name}</h3>
            <p data-testid="doctor-specialty" className="text-sm text-neutral-400">{doctor.specialty.join(", ")}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {doctor.consultationMode.includes("Video Consult") && (
              <span className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Video Consult
              </span>
            )}
            {doctor.consultationMode.includes("In Clinic") && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                In Clinic
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-3 flex flex-col sm:flex-row gap-4">
          <div>
            <p className="text-sm text-neutral-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span data-testid="doctor-experience">{doctor.experience}+ years experience</span>
            </p>
            <p className="text-sm text-neutral-500 flex items-center mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{doctor.clinicAddress}</span>
            </p>
          </div>
          <div>
            <p className="text-sm text-neutral-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{doctor.availability}</span>
            </p>
            <p className="text-sm text-neutral-500 flex items-center mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span data-testid="doctor-fee">₹{doctor.fees} per consultation</span>
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex gap-3">
          <Button variant="default" className="flex-1 sm:flex-none">
            Book Appointment
          </Button>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
            View Profile
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DoctorCard;
