import { Loader2 } from "lucide-react";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  if (!isLoading) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500"
      style={{ backgroundColor: '#1abeff' }}
    >
      {/* Logo placeholder or simple branding */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-cal" style={{ color: '#0f33bb' }}>
          TimeBack
        </h1>
      </div>
      
      {/* Loading spinner */}
      <div className="flex items-center space-x-3">
        <Loader2 
          className="h-6 w-6 animate-spin" 
          style={{ color: '#0f33bb' }} 
        />
        <span 
          className="text-lg font-medium font-cal"
          style={{ color: '#0f33bb' }}
        >
          Loading...
        </span>
      </div>
      
      {/* Background decoration matching main page */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;