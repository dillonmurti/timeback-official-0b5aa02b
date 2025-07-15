-- Remove the overly permissive view policy
DROP POLICY IF EXISTS "Anyone can view email signups" ON public.email_signups;

-- Create a more restrictive policy that only allows authenticated users to view emails
-- This assumes you'll implement authentication later with admin roles
CREATE POLICY "Only authenticated users can view email signups" 
ON public.email_signups 
FOR SELECT 
TO authenticated
USING (true);

-- Keep the insert policy as-is since visitors need to submit emails
-- The existing "Anyone can insert email signups" policy remains unchanged