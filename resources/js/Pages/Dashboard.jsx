import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Dashboard({ articles, navbar, categories}) {

    // crear useEffect para imprimir por consola los artículos
    useEffect(() => {
        console.log('Articles in useEffect:', articles);
    }, [articles]);

    // crear useEffect para imprimir por consola el navbar
    useEffect(() => {
        console.log('Navbar in useEffect:', navbar);
    }, [navbar]);

    // crear useEffect para imprimir por consola el navbar
    useEffect(() => {
        console.log('Categories in useEffect:', categories);
    }, [categories]);


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Inicio
                </h2>
            }
        >
            <Head title="Inicio" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            <h3 className="font-bold text-3xl">{articles == null ? 'Categorías' : 'Artículos:'}</h3>

                            {articles == null ? (
                                <ul className="list-disc pl-5 mt-2">
                                    {categories.data.map(categories => (                                        
                                        <li key={categories.id}>{categories.name}</li>
                                    ))}
                                </ul>
                            ) : (
                                <ul className="list-disc pl-5 mt-2">
                                    {articles.data.map(article => (
                                        // Assuming each article has an 'id' and 'title' property
                                        <li key={article.id}>{article.title}</li>
                                    ))}
                                </ul>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
