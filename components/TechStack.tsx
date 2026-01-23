import { createClient } from '@supabase/supabase-js';
import TechStackClient from './TechStackClient';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface Technology {
    id: string;
    name: string;
    category: string;
    icon_url: string | null;
    order_index: number;
}

async function getTechnologies() {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data: technologies, error } = await supabase
        .from('technologies')
        .select('*')
        .order('order_index', { ascending: true });

    if (error) {
        console.error('Error fetching technologies:', error);
        return [];
    }

    return technologies as Technology[];
}

export default async function TechStack() {
    const technologies = await getTechnologies();
    return <TechStackClient technologies={technologies} />;
}

// Revalidation automatique toutes les 60 secondes
export const revalidate = 60;

