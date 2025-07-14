
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: '#1abeff' }}>
      {/* Navigation */}
      <nav className="fixed top-4 right-4 z-10">
        <div className="flex">
          <Link 
            to="/" 
            className="text-lg font-medium hover:underline font-cal mr-4"
            style={{ color: '#0f33bb' }}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-lg font-medium hover:underline font-cal"
            style={{ color: '#0f33bb' }}
          >
            About
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto text-center relative">
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold font-cal leading-tight inline-block" style={{ color: '#0f33bb' }}>
            About
          </h1>
          <img 
            src="/lovable-uploads/5faf787d-d6d8-4378-8afd-217044d5ccca.png" 
            alt="TimeBack" 
            className="h-[37.8px] inline-block ml-4 align-top"
          />
        </div>
        
        <div className="absolute top-16 left-0 right-0 text-lg animate-fade-in-up delay-200 font-cal" style={{ color: '#0f33bb' }}>
          <p>
            TimeBack is the AI-powered EducationOS behind <a 
              href="https://alpha.school" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-bold underline hover:underline font-cal"
              style={{ color: '#0f33bb' }}
            >
              Alpha
            </a> schools, empowering kids to master their academics in just 2 hours a day—freeing up the rest of the day for what they love. Built on learning science, it generates personalized lessons, optimal lesson plans, and AI coaching to create self-driven learners. Independent standardized tests confirm learning gains up to 10× faster.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
