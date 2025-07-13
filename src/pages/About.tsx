
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
          About TimeBack
        </h1>
        
        <div className="space-y-6 text-lg" style={{ color: '#0f33bb' }}>
          <p>
            TimeBack is the AI-powered EducationOS behind Alpha schools, empowering kids to master their academics in just 2 hours a day—freeing up the rest of the day for what they love. Built on learning science, it generates personalized lessons, optimal lesson plans, and AI coaching to create self-driven learners. Independent standardized tests confirm learning gains up to 10× faster.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
