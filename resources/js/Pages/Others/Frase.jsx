import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Frase() {
    // frase aleatorio del dia de una lista en en el front
    const frases = [
        "La vida es como una bicicleta. Para mantener el equilibrio, debes seguir adelante. - Albert Einstein",
        "El único modo de hacer un gran trabajo es amar lo que haces. - Steve Jobs",
        "No cuentes los días, haz que los días cuenten. - Muhammad Ali",
        "La mejor manera de predecir el futuro es inventarlo. - Alan Kay",
        "La vida es 10% lo que me ocurre y 90% cómo reacciono a ello. - Charles R. Swindoll"
    ];

    const randomIndex = Math.floor(Math.random() * frases.length);
    const fraseDelDia = frases[randomIndex];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Frase del día
                </h2>
                
            }
        >
            <Head title="Frase del día" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {fraseDelDia}
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
