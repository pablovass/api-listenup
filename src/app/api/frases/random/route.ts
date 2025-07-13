import { NextResponse } from 'next/server';
import { getFrases } from '@/lib/data';

export async function GET() {
    try {
        const frases = await getFrases();

        if (!frases || frases.length === 0) {
            return NextResponse.json(
                { error: 'No hay frases disponibles' },
                { status: 404 }
            );
        }

        const randomIndex = Math.floor(Math.random() * frases.length);
        const randomFrase = frases[randomIndex];

        return NextResponse.json(randomFrase);
    } catch (error) {
        console.error('Error al obtener la frase aleatoria:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor.' },
            { status: 500 }
        );
    }
}
    