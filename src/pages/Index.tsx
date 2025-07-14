import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { z } from "zod";

// Email validation schema
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address").min(1, "Email is required"),
});

const Index = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
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

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting: prevent submissions within 2 seconds
    const now = Date.now();
    if (now - lastSubmissionTime < 2000) {
      toast({
        title: "Please wait",
        description: "Please wait a moment before submitting again.",
        variant: "destructive",
      });
      return;
    }

    // Validate email
    const validation = emailSchema.safeParse({ email });
    if (!validation.success) {
      toast({
        title: "Invalid email",
        description: validation.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setLastSubmissionTime(now);

    try {
      // Check if email already exists
      const { data: existingEmail, error: checkError } = await supabase
        .from('email_signups')
        .select('email')
        .eq('email', email.toLowerCase())
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing email:', checkError);
        throw new Error('Failed to verify email');
      }

      if (existingEmail) {
        toast({
          title: "Already registered!",
          description: "This email is already on our waitlist. We'll notify you when Timeback launches!",
        });
        setEmail("");
        return;
      }

      // Insert new email signup
      const { error: insertError } = await supabase
        .from('email_signups')
        .insert([{ email: email.toLowerCase() }]);

      if (insertError) {
        console.error('Error inserting email:', insertError);
        throw new Error('Failed to save email');
      }

      toast({
        title: "Thanks for signing up!",
        description: "We'll notify you when Timeback launches in 2026.",
      });
      setEmail("");
    } catch (error) {
      console.error('Email submission error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later or contact support if the problem persists.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: '#1abeff' }}>
      {/* Navigation */}
      <nav className="fixed top-4 right-4 z-10">
        <div className="flex gap-4">
          <Link 
            to="/" 
            className="text-lg font-medium hover:underline font-cal"
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

      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Logo */}
        <div className="animate-fade-in">
          <img 
            src="/lovable-uploads/5914131b-3128-49af-af97-d359cb8d0d5f.png" 
            alt="Timeback - Learning just got schooled"
            className="mx-auto w-72 h-auto"
            style={{ opacity: 0.95 }}
          />
        </div>

        {/* Main Headline */}
        <div className="space-y-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold font-cal leading-tight" style={{ color: '#0f33bb' }}>
            {/* Mobile version - two lines */}
            <div className="block md:hidden text-2xl" style={{ color: '#0f33bb' }}>
              <div>Your kid can crush academics</div>
              <div>in only 2 hours per day</div>
            </div>
            {/* Desktop/Tablet version - keep original structure */}
            <div className="hidden md:block" style={{ color: '#0f33bb' }}>
              <div style={{ color: '#0f33bb' }}>
                Your kid can crush academics
              </div>
              <div className="mt-2" style={{ color: '#0f33bb' }}>
                in only 2 hours per day
              </div>
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
                className="flex-1 h-12 text-lg border-2 rounded-xl placeholder:text-[#1abeff] font-cal"
                style={{ 
                  borderColor: '#0f33bb', 
                  backgroundColor: '#0f33bb', 
                  color: '#1abeff'
                }}
                disabled={isSubmitting}
                required
              />
              <Button 
                type="submit"
                className="h-12 px-8 font-semibold rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-cal"
                style={{ 
                  backgroundColor: '#ffffff', 
                  color: '#0f33bb'
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "..." : "Get Started"}
              </Button>
            </div>
          </form>
        </div>

        {/* Coming Soon Message with Typewriter Effect */}
        <div className="animate-fade-in-up delay-300">
          <div className="h-7 flex items-center justify-center">
            <p className={`text-lg font-medium transition-opacity duration-500 font-cal ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ color: '#0f33bb' }}>
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
