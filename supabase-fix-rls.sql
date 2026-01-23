-- ============================================
-- FIX RLS POLICIES FOR ADMIN ACCESS
-- ============================================
-- Ce script corrige les politiques RLS pour permettre
-- aux utilisateurs authentifiés de gérer le contenu

-- 1. Créer la table messages si elle n'existe pas
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Activer RLS sur messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion publique (formulaire de contact)
CREATE POLICY "Allow public insert messages" ON messages 
  FOR INSERT 
  WITH CHECK (true);

-- Politique pour permettre la lecture aux utilisateurs authentifiés
CREATE POLICY "Allow authenticated read messages" ON messages 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Politique pour permettre la suppression aux utilisateurs authentifiés
CREATE POLICY "Allow authenticated delete messages" ON messages 
  FOR DELETE 
  USING (auth.role() = 'authenticated');

-- ============================================
-- 2. AJOUTER LES POLITIQUES D'ÉCRITURE POUR LES AUTRES TABLES
-- ============================================

-- PROJECTS - Politiques pour utilisateurs authentifiés
CREATE POLICY "Allow authenticated insert projects" ON projects 
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update projects" ON projects 
  FOR UPDATE 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete projects" ON projects 
  FOR DELETE 
  USING (auth.role() = 'authenticated');

-- TECHNOLOGIES - Politiques pour utilisateurs authentifiés
CREATE POLICY "Allow authenticated insert technologies" ON technologies 
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update technologies" ON technologies 
  FOR UPDATE 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete technologies" ON technologies 
  FOR DELETE 
  USING (auth.role() = 'authenticated');

-- EXPERIENCES - Politiques pour utilisateurs authentifiés
CREATE POLICY "Allow authenticated insert experiences" ON experiences 
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update experiences" ON experiences 
  FOR UPDATE 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete experiences" ON experiences 
  FOR DELETE 
  USING (auth.role() = 'authenticated');

-- ============================================
-- 3. VÉRIFICATION
-- ============================================
-- Pour vérifier que les politiques sont bien créées, exécutez :
-- SELECT schemaname, tablename, policyname FROM pg_policies WHERE tablename IN ('projects', 'technologies', 'experiences', 'messages');
