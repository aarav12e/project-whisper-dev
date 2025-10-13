-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('asha_worker', 'phc_staff', 'admin');

-- Create enum for patient gender
CREATE TYPE public.gender AS ENUM ('male', 'female', 'other');

-- Create enum for visit status
CREATE TYPE public.visit_status AS ENUM ('scheduled', 'completed', 'cancelled');

-- Create enum for vaccination status
CREATE TYPE public.vaccination_status AS ENUM ('due', 'completed', 'overdue');

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  role app_role DEFAULT 'asha_worker',
  area_assigned TEXT,
  avatar_url TEXT,
  language_preference TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_roles table for role-based access
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Create patients table
CREATE TABLE public.patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID REFERENCES auth.users(id) NOT NULL,
  full_name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender gender NOT NULL,
  contact_number TEXT,
  address TEXT,
  village TEXT,
  gps_latitude DECIMAL(10, 8),
  gps_longitude DECIMAL(11, 8),
  photo_url TEXT,
  medical_history JSONB DEFAULT '{}',
  family_details JSONB DEFAULT '{}',
  is_pregnant BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  synced_at TIMESTAMPTZ
);

-- Create visits table
CREATE TABLE public.visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  created_by UUID REFERENCES auth.users(id) NOT NULL,
  visit_date TIMESTAMPTZ DEFAULT NOW(),
  chief_complaint TEXT,
  symptoms JSONB DEFAULT '[]',
  treatment_given TEXT,
  referral_required BOOLEAN DEFAULT FALSE,
  referral_details TEXT,
  follow_up_date DATE,
  status visit_status DEFAULT 'completed',
  voice_notes_url TEXT,
  photos JSONB DEFAULT '[]',
  gps_latitude DECIMAL(10, 8),
  gps_longitude DECIMAL(11, 8),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  synced_at TIMESTAMPTZ
);

-- Create vaccinations table
CREATE TABLE public.vaccinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  administered_by UUID REFERENCES auth.users(id) NOT NULL,
  vaccine_name TEXT NOT NULL,
  batch_number TEXT,
  due_date DATE NOT NULL,
  administered_date DATE,
  status vaccination_status DEFAULT 'due',
  next_due_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  synced_at TIMESTAMPTZ
);

-- Create anc_records table
CREATE TABLE public.anc_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  created_by UUID REFERENCES auth.users(id) NOT NULL,
  visit_number INTEGER NOT NULL,
  visit_date DATE NOT NULL,
  weeks_pregnant INTEGER,
  weight_kg DECIMAL(5, 2),
  blood_pressure TEXT,
  hemoglobin DECIMAL(4, 2),
  risk_factors JSONB DEFAULT '[]',
  complications TEXT,
  next_visit_date DATE,
  delivery_date_estimate DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  synced_at TIMESTAMPTZ
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vaccinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anc_records ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for patients
CREATE POLICY "Authenticated users can view all patients"
  ON public.patients FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create patients"
  ON public.patients FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update patients they created"
  ON public.patients FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- RLS Policies for visits
CREATE POLICY "Authenticated users can view all visits"
  ON public.visits FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create visits"
  ON public.visits FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update visits they created"
  ON public.visits FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- RLS Policies for vaccinations
CREATE POLICY "Authenticated users can view all vaccinations"
  ON public.vaccinations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create vaccinations"
  ON public.vaccinations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = administered_by);

CREATE POLICY "Users can update vaccinations they administered"
  ON public.vaccinations FOR UPDATE
  TO authenticated
  USING (auth.uid() = administered_by);

-- RLS Policies for anc_records
CREATE POLICY "Authenticated users can view all ANC records"
  ON public.anc_records FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create ANC records"
  ON public.anc_records FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update ANC records they created"
  ON public.anc_records FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_patients_updated_at
  BEFORE UPDATE ON public.patients
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_visits_updated_at
  BEFORE UPDATE ON public.visits
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vaccinations_updated_at
  BEFORE UPDATE ON public.vaccinations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_anc_records_updated_at
  BEFORE UPDATE ON public.anc_records
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'asha_worker')
  );
  
  -- Insert into user_roles
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'asha_worker')
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create storage buckets for images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('patient-photos', 'patient-photos', false, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('visit-photos', 'visit-photos', false, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('voice-notes', 'voice-notes', false, 10485760, ARRAY['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/webm']);

-- Storage policies for patient-photos bucket
CREATE POLICY "Authenticated users can view patient photos"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'patient-photos');

CREATE POLICY "Authenticated users can upload patient photos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'patient-photos');

CREATE POLICY "Users can update their uploaded patient photos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'patient-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for visit-photos bucket
CREATE POLICY "Authenticated users can view visit photos"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'visit-photos');

CREATE POLICY "Authenticated users can upload visit photos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'visit-photos');

CREATE POLICY "Users can update their uploaded visit photos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'visit-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for voice-notes bucket
CREATE POLICY "Authenticated users can view voice notes"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'voice-notes');

CREATE POLICY "Authenticated users can upload voice notes"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'voice-notes');

CREATE POLICY "Users can update their uploaded voice notes"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'voice-notes' AND auth.uid()::text = (storage.foldername(name))[1]);