import { Category } from "blagues-api/dist/types/types";

export interface Joke {
    id: number;
    type: Category;
    joke: string;
    answer: string;
}

export const CategoriesRefsFull: Record<Category, string> = {
    global: 'Tout public',
    dark: 'Humour noir',
    dev: 'Blague de dev',
    limit: 'Blague 18+',
    beauf: 'Humour beauf',
    blondes: 'Blagues de blondes'
};

export const JokeEmojis: Record<Category, string> = {
    global: '🌐',
    dev: '🖥',
    dark: '😈',
    blondes: '👱‍♀️',
    limit: '🔞',
    beauf: '🍻'
};
