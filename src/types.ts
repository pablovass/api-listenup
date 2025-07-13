export interface Frase {
    id: number;
    texto: string;
    audio: string;
    nivel: 'básico' | 'intermedio' | 'avanzado';
    tags: string[];
}
