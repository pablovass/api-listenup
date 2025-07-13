import { NextResponse } from 'next/server';
import { getFrases } from '@/lib/data';
import { Frase } from '@/types';

interface VerificationRequest {
    id: number;
    texto: string;
}

export async function POST(request: Request) {
    try {

        const body: VerificationRequest = await request.json();
        const { id, texto: textoUsuario } = body;

        if (!id || typeof textoUsuario !== 'string') {
            return NextResponse.json(
                { error: "Faltan los campos 'id' o 'texto' en la petición." },
                { status: 400 }
            );
        }

        const frases = await getFrases();
        const fraseOriginal = frases.find((f: Frase) => f.id === id);

        if (!fraseOriginal) {
            return NextResponse.json(
                { error: `No se encontró ninguna frase con el id ${id}.` },
                { status: 404 }
            );
        }

        const limpiar = (txt: string) => txt.toLowerCase().replace(/[.,?¡!¿]/g, '');

        const palabrasOriginales = limpiar(fraseOriginal.texto).split(' ').filter(Boolean);
        const palabrasUsuario = limpiar(textoUsuario).split(' ').filter(Boolean);

        const detalles: { palabra: string; correcta: boolean; mensaje?: string }[] = [];
        const maxLength = Math.max(palabrasOriginales.length, palabrasUsuario.length);

        for (let i = 0; i < maxLength; i++) {
            const palabraOriginal = palabrasOriginales[i];
            const palabraUsuario = palabrasUsuario[i];

            if (palabraOriginal && palabraUsuario) {
                detalles.push({
                    palabra: palabraOriginal,
                    correcta: palabraOriginal === palabraUsuario,
                });
            } else if (palabraOriginal) {
                detalles.push({
                    palabra: palabraOriginal,
                    correcta: false,
                    mensaje: 'Palabra no mencionada',
                });
            } else if (palabraUsuario) {
                detalles.push({
                    palabra: palabraUsuario,
                    correcta: false,
                    mensaje: 'Palabra no esperada',
                });
            }
        }


        const esTotalmenteCorrecto = detalles.every(d => d.correcta);


        return NextResponse.json({
            error: !esTotalmenteCorrecto,
            mensaje: esTotalmenteCorrecto
                ? '¡Frase perfecta!'
                : 'La frase tiene errores, revisa los detalles.',
            detalles: detalles,
            texto_original: fraseOriginal.texto,
            texto_usuario: textoUsuario,
        });

    } catch (error) {
        console.error('Error en la verificación:', error);
        if (error instanceof SyntaxError) {
            return NextResponse.json({ error: 'El cuerpo de la petición no es un JSON válido.' }, { status: 400 });
        }
        return NextResponse.json(
            { error: 'Error interno del servidor.' },
            { status: 500 }
        );
    }
}