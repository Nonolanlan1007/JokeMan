export interface Joke {
    id: number;
    type: Category;
    joke: string;
    answer: string;
}

export type Category =
  | 'global'
  | 'dev'
  | 'dark'
  | 'limit'
  | 'beauf'
  | 'blondes'
  | 'random'
  
export const CategoriesRefsFull: Record<Category, string> = {
    random: "Blagues alΓ©atoire",
    global: 'Tout public',
    dark: 'Humour noir',
    dev: 'Blague de dev',
    limit: 'Blague 18+',
    beauf: 'Humour beauf',
    blondes: 'Blagues de blondes'
};

export const JokeEmojis: Record<Category, string> = {
    random: "π",
    global: 'π',
    dev: 'π₯',
    dark: 'π',
    blondes: 'π±ββοΈ',
    limit: 'π',
    beauf: 'π»'
};