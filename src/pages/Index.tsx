
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [email, setEmail] = useState("");
  const [typewriterText, setTypewriterText] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const fullText = "COMING IN 2026";

  useEffect(() => {
    let currentIndex = 0;
    let isPaused = false;
    
    const typewriterInterval = setInterval(() => {
      if (!isPaused && currentIndex <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else if (!isPaused && currentIndex > fullText.length) {
        // Pause at the end before starting fade out
        isPaused = true;
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            setTypewriterText("");
            currentIndex = 0;
            setIsVisible(true);
            isPaused = false;
          }, 500); // Wait for fade out to complete
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typewriterInterval);
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Thanks for signing up!",
        description: "We'll notify you when Timeback launches in 2026.",
      });
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: '#1abeff' }}>
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Logo */}
        <div className="animate-fade-in">
          <img 
            src="/lovable-uploads/5914131b-3128-49af-af97-d359cb8d0d5f.png" 
            alt="Timeback - Learning just got schooled"
            className="mx-auto w-48 h-auto"
            style={{ opacity: 0.95 }}
          />
        </div>

        {/* Main Headline */}
        <div className="space-y-4 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight" style={{ color: '#0f33bb' }}>
            <div style={{ color: '#0f33bb' }}>
              Your kid can crush academics
            </div>
            <div className="mt-2" style={{ color: '#0f33bb' }}>
              in only 2 hours per day
            </div>
          </h1>
        </div>

        {/* Email Signup */}
        <div className="max-w-md mx-auto animate-fade-in-up delay-200">
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 text-lg border-2 rounded-xl"
                style={{ 
                  borderColor: '#0f33bb', 
                  backgroundColor: '#0f33bb', 
                  color: '#1abeff'
                }}
                required
              />
              <Button 
                type="submit"
                className="h-12 px-8 font-semibold rounded-xl transition-all duration-200 hover:scale-105"
                style={{ 
                  backgroundColor: '#0f33bb', 
                  color: '#1abeff'
                }}
              >
                Get Started
              </Button>
            </div>
          </form>
        </div>

        {/* Coming Soon Message with Typewriter Effect */}
        <div className="animate-fade-in-up delay-300">
          <div className="h-7 flex items-center justify-center">
            <p className={`text-lg font-medium transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ color: '#0f33bb' }}>
              {typewriterText}
            </p>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default Index;
