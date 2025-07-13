
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: '#1abeff' }}>
      {/* Navigation */}
      <nav className="fixed top-4 right-4 z-10">
        <div className="flex gap-4">
          <Link 
            to="/" 
            className="text-lg font-medium hover:underline"
            style={{ color: '#0f33bb' }}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-lg font-medium hover:underline"
            style={{ color: '#0f33bb' }}
          >
            About
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold font-satoshi leading-tight" style={{ color: '#0f33bb' }}>
          About Timeback
        </h1>
        
        <div className="space-y-6 text-lg" style={{ color: '#0f33bb' }}>
          <p>
            Timeback is revolutionizing education by helping kids achieve academic excellence 
            in just 2 hours per day.
          </p>
          
          <p>
            Our innovative approach combines proven learning methodologies with modern technology 
            to maximize learning efficiency and student engagement.
          </p>
          
          <p>
            Coming in 2026, Timeback will transform how children learn and succeed academically.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
