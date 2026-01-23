import { createClient } from '@supabase/supabase-js';
import CVSectionClient from './CVSectionClient';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface Experience {
    id: string;
    year: string;
    title: string;
    company: string;
    description: string;
    icon_type: string;
    order_index: number;
}

async function getExperiences() {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data: experiences, error } = await supabase
        .from('experiences')
        .select('*')
        .order('order_index', { ascending: true });

    if (error) {
        console.error('Error fetching experiences:', error);
        return [];
    }

    return experiences as Experience[];
}

export default async function CVSection() {
    const experiences = await getExperiences();
    return <CVSectionClient experiences={experiences} />;
}

// Revalidation automatique toutes les 60 secondes
export const revalidate = 60;

