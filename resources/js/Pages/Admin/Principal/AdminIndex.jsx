import AdminLayout from '@/Layouts/AdminLayout';
import React from 'react';

export default function AdminIndex() {
  return (
    <AdminLayout header="Panel de Administración">
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
        <div className="flex items-center space-x-4 mb-4">
          <span className="material-symbols-rounded text-4xl text-rose-600 dark:text-rose-400">
            dataset
          </span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Bienvenido al Panel de Administración
          </h1>
        </div>

        <p className="text-gray-600 dark:text-gray-300">
          Desde aquí puedes gestionar tu blog y actualizar la información de tu perfil personal. 
          Usa el menú lateral para acceder a las secciones disponibles.
        </p>

        {/* Ícono grande centrado */}
        <div className="justify-center m-auto mt-4 grid grid-cols-2 w-60 gap-0">
          <span className="material-symbols-rounded text-9xl text-rose-700 dark:text-rose-500 select-none">
            dashboard
          </span>
          <span className="material-symbols-rounded text-9xl text-rose-700 dark:text-rose-500 select-none">
            dashboard
          </span>
          <span className="material-symbols-rounded text-9xl text-rose-700 dark:text-rose-500 select-none">
            dashboard
          </span>
          <span className="material-symbols-rounded text-9xl text-rose-700 dark:text-rose-500 select-none">
            dashboard
          </span>
        </div>
      </div>
    </AdminLayout>
  );
}
