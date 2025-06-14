import AdminLayout from '@/Layouts/AdminLayout'
import React from 'react'

export default function CategoryIndex() {
  return (
    <AdminLayout header="Categorías">
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Categorías
        </h1>
      </div>
    </AdminLayout>
  )
}
