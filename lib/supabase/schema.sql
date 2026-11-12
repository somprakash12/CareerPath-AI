-- ============================================================================
-- CAREERPATH AI - COMPLETE SUPABASE POSTGRESQL DATABASE SCHEMA
-- INT 257 Next.js Full Stack Project
-- ============================================================================
-- How to apply this script:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard
-- 2. Navigate to SQL Editor -> New Query.
-- 3. Paste this entire file and click "Run".
-- 4. Create a private Storage bucket named 'resumes' under Storage.
-- ============================================================================

-- 0. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  college TEXT,
  degree TEXT,
  year_of_study TEXT,
  target_occupation_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. RESUMES TABLE
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_size INT NOT NULL,
  file_url TEXT,
  storage_path TEXT,
  extracted_text TEXT,
  raw_metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. OCCUPATIONS TABLE (Public Reference)
CREATE TABLE IF NOT EXISTS public.occupations (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  average_salary TEXT,
  demand_level TEXT DEFAULT 'High',
  qp_code TEXT,
  nsqf_level TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  category TEXT DEFAULT 'General',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. RESUME_SKILLS TABLE (Junction: resumes <-> skills)
CREATE TABLE IF NOT EXISTS public.resume_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resume_id UUID NOT NULL REFERENCES public.resumes(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  skill_category TEXT DEFAULT 'General',
  proficiency TEXT DEFAULT 'Extracted',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. OCCUPATION_SKILLS TABLE (Junction: occupations <-> skills)
CREATE TABLE IF NOT EXISTS public.occupation_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  occupation_id TEXT NOT NULL REFERENCES public.occupations(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  is_core BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SKILL_GAP_ANALYSES TABLE
CREATE TABLE IF NOT EXISTS public.skill_gap_analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  resume_id UUID REFERENCES public.resumes(id) ON DELETE SET NULL,
  occupation_id TEXT NOT NULL REFERENCES public.occupations(id) ON DELETE CASCADE,
  match_percentage NUMERIC(5,2) NOT NULL,
  total_required_skills INT NOT NULL,
  matching_skills JSONB DEFAULT '[]'::jsonb,
  missing_skills JSONB DEFAULT '[]'::jsonb,
  additional_skills JSONB DEFAULT '[]'::jsonb,
  readiness_tier TEXT,
  ai_feedback JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TRAINING_PROGRAMS TABLE (PMKVY & Skill India Programs)
CREATE TABLE IF NOT EXISTS public.training_programs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  sector TEXT NOT NULL,
  qp_code TEXT,
  nsqf_level TEXT,
  duration TEXT,
  relevant_occupations JSONB DEFAULT '[]'::jsonb,
  skills_covered JSONB DEFAULT '[]'::jsonb,
  eligibility TEXT,
  certification TEXT,
  mode TEXT,
  subsidy TEXT,
  official_source TEXT,
  official_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. TRAINING_CENTRES TABLE (PMKK & Accredited Centres)
CREATE TABLE IF NOT EXISTS public.training_centres (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT,
  state TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  pincode TEXT,
  phone TEXT,
  email TEXT,
  timing TEXT,
  rating NUMERIC(3,1) DEFAULT 4.5,
  facilities JSONB DEFAULT '[]'::jsonb,
  active_programs JSONB DEFAULT '[]'::jsonb,
  verified_status TEXT DEFAULT 'Official NSDC Partner Centre',
  official_portal_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. RECOMMENDATIONS TABLE (Personalized training suggestions)
CREATE TABLE IF NOT EXISTS public.recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  analysis_id UUID REFERENCES public.skill_gap_analyses(id) ON DELETE CASCADE,
  program_id TEXT NOT NULL REFERENCES public.training_programs(id) ON DELETE CASCADE,
  relevance_score INT DEFAULT 0,
  addressed_skills JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR FAST QUERY PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON public.resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_resume_skills_resume_id ON public.resume_skills(resume_id);
CREATE INDEX IF NOT EXISTS idx_skill_gap_user_id ON public.skill_gap_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_user_id ON public.recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_training_centres_state_city ON public.training_centres(state, city);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.occupations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.occupation_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_gap_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_centres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. Resumes Policies
DROP POLICY IF EXISTS "Users can manage own resumes" ON public.resumes;
CREATE POLICY "Users can manage own resumes" ON public.resumes
  FOR ALL USING (auth.uid() = user_id);

-- 3. Public Read Policies for Reference Tables
DROP POLICY IF EXISTS "Public can view occupations" ON public.occupations;
CREATE POLICY "Public can view occupations" ON public.occupations
  FOR SELECT TO authenticated, anon USING (true);

DROP POLICY IF EXISTS "Public can view skills" ON public.skills;
CREATE POLICY "Public can view skills" ON public.skills
  FOR SELECT TO authenticated, anon USING (true);

DROP POLICY IF EXISTS "Public can view occupation_skills" ON public.occupation_skills;
CREATE POLICY "Public can view occupation_skills" ON public.occupation_skills
  FOR SELECT TO authenticated, anon USING (true);

DROP POLICY IF EXISTS "Public can view training_programs" ON public.training_programs;
CREATE POLICY "Public can view training_programs" ON public.training_programs
  FOR SELECT TO authenticated, anon USING (true);

DROP POLICY IF EXISTS "Public can view training_centres" ON public.training_centres;
CREATE POLICY "Public can view training_centres" ON public.training_centres
  FOR SELECT TO authenticated, anon USING (true);

-- 4. User specific analysis and recommendations
DROP POLICY IF EXISTS "Users can manage own analyses" ON public.skill_gap_analyses;
CREATE POLICY "Users can manage own analyses" ON public.skill_gap_analyses
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own recommendations" ON public.recommendations;
CREATE POLICY "Users can manage own recommendations" ON public.recommendations
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own resume skills" ON public.resume_skills;
CREATE POLICY "Users can manage own resume skills" ON public.resume_skills
  FOR ALL USING (
    resume_id IN (SELECT id FROM public.resumes WHERE user_id = auth.uid())
  );

-- ============================================================================
-- TRIGGER: Automatically create profile on user registration
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, college, target_occupation_id)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', 'Student Candidate'),
    COALESCE(new.raw_user_meta_data->>'college', 'Computer Science Institute'),
    'full-stack-developer'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ============================================================================
-- SEED DATA: 10 Standard Occupations
-- ============================================================================
INSERT INTO public.occupations (id, title, category, description, average_salary, demand_level, qp_code, nsqf_level)
VALUES
  ('full-stack-developer', 'Full Stack Developer', 'Software Engineering', 'Designs, develops, and maintains both client-side and server-side web architectures.', '₹6.5 - ₹16.0 LPA', 'Very High', 'SSC/Q0509', 'Level 6'),
  ('frontend-developer', 'Frontend Developer', 'Software Engineering', 'Constructs responsive, accessible, and high-performance user interfaces.', '₹5.0 - ₹12.5 LPA', 'High', 'SSC/Q0503', 'Level 5'),
  ('backend-developer', 'Backend Developer', 'Software Engineering', 'Engineers core business logic, microservices, databases, and APIs for scalable systems.', '₹6.0 - ₹15.0 LPA', 'Very High', 'SSC/Q0508', 'Level 6'),
  ('software-developer', 'Software Developer', 'Software Engineering', 'Applies computer science foundations and algorithms to build enterprise software solutions.', '₹5.5 - ₹14.0 LPA', 'High', 'SSC/Q0508', 'Level 5'),
  ('data-analyst', 'Data Analyst', 'Data & AI', 'Transforms raw data into actionable insights, dashboards, and statistical metrics.', '₹4.8 - ₹11.5 LPA', 'High', 'SSC/Q0401', 'Level 5'),
  ('data-scientist', 'Data Scientist', 'Data & AI', 'Develops statistical models and machine learning pipelines to solve complex problems.', '₹8.0 - ₹18.0 LPA', 'Very High', 'SSC/Q8115', 'Level 7'),
  ('cybersecurity-analyst', 'Cybersecurity Analyst', 'Infrastructure & Security', 'Protects IT infrastructure, monitors security incidents, and conducts vulnerability assessments.', '₹6.0 - ₹14.5 LPA', 'Very High', 'SSC/Q0901', 'Level 5'),
  ('cloud-engineer', 'Cloud Engineer', 'Infrastructure & Security', 'Architects, deploys, and manages resilient cloud infrastructure and containerized workloads.', '₹7.0 - ₹16.5 LPA', 'Very High', 'SSC/Q8104', 'Level 6'),
  ('database-administrator', 'Database Administrator', 'Data & Infrastructure', 'Manages, optimizes, secures, and backs up mission-critical database systems.', '₹5.5 - ₹13.0 LPA', 'Moderate', 'SSC/Q0110', 'Level 5'),
  ('network-administrator', 'Network Administrator', 'Infrastructure & Security', 'Configures, maintains, and troubleshoots enterprise networks, routers, and switches.', '₹4.5 - ₹10.0 LPA', 'Moderate', 'SSC/Q0903', 'Level 4')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  average_salary = EXCLUDED.average_salary,
  demand_level = EXCLUDED.demand_level;

