import { createClient } from '@supabase/supabase-js';
import BentoGridClient from './BentoGridClient';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface Project {
    id: string;
    title: string;
    description: string;
    image_url: string | null;
    tags: string[];
    github_url: string | null;
    live_url: string | null;
    order_index: number;
}

async function getProjects() {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });

    if (error) {
        console.error('Error fetching projects:', error);
        return [];
    }

    return projects as Project[];
}

export default async function BentoGrid() {
    const projects = await getProjects();

    // Définir le span pour chaque projet (alternance pour un effet Bento Grid)
    const projectsWithSpan = projects.map((project, index) => {
        // Pattern: 2-1-1-2-1-1 (répété)
        const pattern = [2, 1, 1, 2, 1, 1];
        const span = pattern[index % pattern.length];
        return {
            ...project,
            span: `md:col-span-${span}`,
        };
    });

    return <BentoGridClient projects={projectsWithSpan} />;
}

// Revalidation automatique toutes les 60 secondes
export const revalidate = 60;
