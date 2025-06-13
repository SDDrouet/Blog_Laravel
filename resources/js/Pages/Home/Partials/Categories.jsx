import React from 'react'
import CategoryCard from './CategoryCard';

function Categories({categories}) {
  return (
    <div className="bg-gray-200 dark:bg-gray-800 bg-opacity-30 dark:bg-opacity-30 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="p-8 lg:p-12">
            <div className="mb-8">
                <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-2">
                    Categorías
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {categories.data.length} {categories.data.length === 1 ? 'categoría disponible' : 'categorías disponibles'}
                </p>
            </div>

            {categories.data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.data.map(category => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <span className="material-symbols-rounded text-gray-400 text-2xl">
                            category
                        </span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        No hay categorías disponibles
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                        Vuelve pronto para ver nuevo contenido
                    </p>
                </div>
            )}
        </div>
    </div>
  )
}

export default Categories;
