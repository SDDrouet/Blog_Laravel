import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [open, setOpen] = useState(false);

    // Menú de administración
    const adminMenuItems = [
        {
            name: 'Dashboard',
            href: route('admin.index'),
            icon: 'dashboard',
            current: route().current('admin.index')
        },
        {
            name: 'Artículos',
            href: route('admin.articles.index'),
            icon: 'article',
            current: route().current('admin.articles.*')
        },
        {
            name: 'Categorías',
            href: route('admin.categories.index'),
            icon: 'category',
            current: route().current('admin.categories.*')
        },
        {
            name: 'Comentarios',
            href: route('admin.comments.index'),
            icon: 'comment',
            current: route().current('admin.comments.*')
        },
        {
            name: 'Usuarios',
            href: route('admin.users.index'),
            icon: 'people',
            current: route().current('admin.users.*')
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
            <div>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: '#111917',
                            tranparent: 'true',
                            opacity: '0.9',
                            border: '1px solid #555',
                            borderRadius: '8px',
                            color: '#fff',
                        },
                    }}
                />
            </div>

            {/* Overlay para mobile */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
                    onClick={() => {
                        setSidebarCollapsed(false);
                        setSidebarOpen(false);
                    }}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed lg:sticky inset-y-0 left-0 z-50 transform transition-all duration-300
                ${sidebarCollapsed ? 'w-20' : 'w-64'}
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0
                bg-white dark:bg-gray-800
                h-screen overflow-y-auto border-r border-gray-200 dark:border-gray-700`}
            >
                
                {/* Logo */}
                <div className="flex items-center justify-end h-16 px-3 border-b border-gray-200 dark:border-gray-700">
                    {!sidebarCollapsed && (
                    <Link href="/" className="flex items-center">
                        <ApplicationLogo className="block h-8 w-auto fill-current rounded-md" />
                    </Link>)}                    

                    {/* Botón cerrar en mobile */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden ml-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center p-1"
                    >
                        <span className="material-symbols-rounded">close</span>
                    </button>

                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="hidden ml-2 lg:flex items-center justify-center p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                        <span className="material-symbols-rounded">
                            {sidebarCollapsed ? 'chevron_right' : 'chevron_left'}
                        </span>
                    </button>

                </div>

                {/* Navegación */}
                <nav className="mt-6 px-3">
                    <div className="space-y-1">
                        {adminMenuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                title={item.name}
                                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                    item.current
                                    ? 'bg-rose-100 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                }`}
                                >
                                <span className={`material-symbols-rounded ${sidebarCollapsed ? 'mx-auto' : 'mr-3'} text-lg transition-all`}>
                                    {item.icon}
                                </span>
                                {!sidebarCollapsed && <span className="truncate">{item.name}</span>}
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* Información del usuario en sidebar */}
                <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700">
                    <div
                        className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ${
                        sidebarCollapsed ? 'justify-center' : ''
                        }`}
                        onClick={() => {
                            setOpen(!open);
                            setSidebarCollapsed(false);
                        }}
                    >
                        {user.profile?.photo ? (
                        <img
                            src={user.profile.photo}
                            alt={user.full_name}
                            className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700 select-none"
                        />
                        ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                            <span className="material-symbols-rounded text-gray-400 text-sm select-none">
                            account_circle
                            </span>
                        </div>
                        )}

                        {/* Solo mostrar info cuando no está colapsado */}
                        {!sidebarCollapsed && (
                        <>
                            <div className="ml-3 flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {user.full_name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                Panel de Administración
                            </p>
                            </div>
                            <span
                            className="material-symbols-rounded text-gray-400 ml-2 transition-transform duration-200"
                            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                            >
                            expand_more
                            </span>
                        </>
                        )}
                    </div>

                    {/* Submenú solo si sidebar está expandido y desplegado */}
                    {!sidebarCollapsed && open && (
                        <div className="px-2 pb-4 space-y-1">
                        <Link
                            href={route('profile.edit')}
                            className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                            text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                        >
                            <span className="material-symbols-rounded mr-3 text-lg text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300">
                            person
                            </span>
                            <span className="truncate">Perfil</span>
                        </Link>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="group flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                            text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/20 hover:text-rose-700 dark:hover:text-rose-300"
                        >
                            <span className="material-symbols-rounded mr-3 text-lg text-rose-400 group-hover:text-rose-500 dark:group-hover:text-rose-300">
                            logout
                            </span>
                            <span className="truncate">Cerrar sesión</span>
                        </Link>
                        </div>
                    )}
                </div>

            </div>

            {/* Contenido principal */}
            <div className="w-full m-0 p-0">
                {/* Header superior */}
                <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6">
                        {/* Botón menú mobile */}
                        <button
                            onClick={() => {
                                setSidebarOpen(true);
                                setSidebarCollapsed(false);
                            }}
                            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <span className="material-symbols-rounded">menu</span>
                        </button>

                        {/* Título de la página */}
                        <div className="flex-1 lg:flex-none">
                            {header && (
                                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {header}
                                </h1>
                            )}
                        </div>

                        {/* Acciones del header */}
                        <div className="flex items-center space-x-4">
                            {/* Botón ver sitio */}
                            <Link
                                href={route('dashboard')}
                                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                            >
                                <span className="material-symbols-rounded mr-2 text-lg">
                                    launch
                                </span>
                                Ver Sitio
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Contenido de la página */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}