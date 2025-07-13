import { NextResponse, NextRequest } from 'next/server';
import { getFrases } from '@/lib/data';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const nivel = searchParams.get('nivel');
        const tag = searchParams.get('tag');

        let frases = await getFrases();

        if (nivel) {
            frases = frases.filter(frase => frase.nivel === nivel);
        }

        if (tag) {
            frases = frases.filter(frase => frase.tags.includes(tag));
        }

        return NextResponse.json(frases);

    } catch (error) {
        console.error('Error al obtener el listado de frases:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor.' },
            { status: 500 }
        );
    }
}
    