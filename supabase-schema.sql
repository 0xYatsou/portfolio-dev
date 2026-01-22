-- Table pour les projets
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  github_url TEXT,
  live_url TEXT,
  span TEXT DEFAULT 'md:col-span-1',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Table pour les technologies
CREATE TABLE technologies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Table pour les expériences (CV)
CREATE TABLE experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_type TEXT DEFAULT 'Briefcase',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Table pour les statistiques de visite
CREATE TABLE page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  user_agent TEXT,
  referrer TEXT,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Table pour les statistiques agrégées (pour performance)
CREATE TABLE analytics_summary (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  total_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insertion des données initiales pour les projets
INSERT INTO projects (title, description, tags, github_url, live_url, span, order_index) VALUES
('E-Commerce Platform', 'Plateforme e-commerce moderne avec paiement intégré', ARRAY['Next.js', 'Stripe', 'PostgreSQL'], 'https://github.com', 'https://example.com', 'md:col-span-2', 1),
('Dashboard Analytics', 'Tableau de bord temps réel avec visualisations', ARRAY['React', 'D3.js', 'Node.js'], 'https://github.com', 'https://example.com', 'md:col-span-1', 2),
('App Mobile Fitness', 'Application de suivi fitness et nutrition', ARRAY['React Native', 'Firebase'], 'https://github.com', 'https://example.com', 'md:col-span-1', 3),
('SaaS Marketing', 'Outil d''automatisation marketing multi-canal', ARRAY['Vue.js', 'Python', 'Redis'], 'https://github.com', 'https://example.com', 'md:col-span-2', 4),
('Portfolio 3D', 'Portfolio interactif avec Three.js', ARRAY['Three.js', 'WebGL', 'GSAP'], 'https://github.com', 'https://example.com', 'md:col-span-1', 5),
('Chat AI Assistant', 'Assistant conversationnel avec IA générative', ARRAY['OpenAI', 'TypeScript', 'Tailwind'], 'https://github.com', 'https://example.com', 'md:col-span-1', 6);

-- Insertion des données initiales pour les technologies
INSERT INTO technologies (name, category, order_index) VALUES
('React', 'Frontend', 1),
('Next.js', 'Framework', 2),
('TypeScript', 'Language', 3),
('Tailwind CSS', 'Styling', 4),
('Node.js', 'Backend', 5),
('PostgreSQL', 'Database', 6),
('MongoDB', 'Database', 7),
('Docker', 'DevOps', 8),
('AWS', 'Cloud', 9),
('GraphQL', 'API', 10),
('Prisma', 'ORM', 11),
('Framer Motion', 'Animation', 12);

-- Insertion des données initiales pour les expériences
INSERT INTO experiences (year, title, company, description, icon_type, order_index) VALUES
('2023 - Présent', 'Lead Developer', 'Tech Startup', 'Direction technique et développement d''applications web modernes', 'Briefcase', 1),
('2021 - 2023', 'Full-Stack Developer', 'Digital Agency', 'Développement de solutions e-commerce et SaaS', 'Briefcase', 2),
('2019 - 2021', 'Frontend Developer', 'Creative Studio', 'Création d''interfaces utilisateur innovantes', 'Briefcase', 3),
('2016 - 2019', 'Master Informatique', 'Université', 'Spécialisation en développement web et mobile', 'GraduationCap', 4);

-- Activer Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_summary ENABLE ROW LEVEL SECURITY;

-- Politiques pour lecture publique
CREATE POLICY "Public read access for projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access for technologies" ON technologies FOR SELECT USING (true);
CREATE POLICY "Public read access for experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public read access for analytics_summary" ON analytics_summary FOR SELECT USING (true);

-- Politique pour permettre l'insertion de page_views (pour tracking)
CREATE POLICY "Allow insert page_views" ON page_views FOR INSERT WITH CHECK (true);

-- Index pour améliorer les performances
CREATE INDEX idx_projects_order ON projects(order_index);
CREATE INDEX idx_technologies_order ON technologies(order_index);
CREATE INDEX idx_experiences_order ON experiences(order_index);
CREATE INDEX idx_page_views_created_at ON page_views(created_at);
CREATE INDEX idx_analytics_summary_date ON analytics_summary(date);
