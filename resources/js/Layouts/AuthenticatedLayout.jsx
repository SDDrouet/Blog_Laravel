import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

export default function AuthenticatedLayout({ header, children }) {
    const { user, permissions } = usePage().props.auth;


    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    // limpiar localStorage
    localStorage.removeItem('redirect_after_login');

    const handleAccionPrivada = () => {
        localStorage.setItem('redirect_after_login', window.location.pathname);
    };


    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
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
            <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href={route('dashboard')} className="flex items-center">
                                    <ApplicationLogo className="block h-9 w-auto fill-current rounded-md" />
                                </Link>
                            </div>   

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard') || route().current('categories.detail') || route().current('dashboard.all')}
                                >
                                    <span className="material-symbols-rounded mb-2">
                                        home
                                    </span>Inicio
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('frase')}
                                    active={route().current('frase')}
                                >
                                    Frase del día
                                </NavLink>
                            </div>
                        </div>


                        {/* Si existe user mostrar info, caso contrario mostrar botones de inicio de sesión o registrarse*/}

                        {user ? (
                            <div className="hidden sm:ms-6 sm:flex sm:items-center">

                                {/* Icono de usuario y dropdown para perfil */}
                                {user.profile.photo ? (
                                    <img
                                    src={user.profile.photo}
                                    alt={user.full_name}
                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                        <span className="material-symbols-rounded text-gray-400 text-xl">
                                            account_circle
                                        </span>
                                    </div>
                                )}

                                <div className="relative ms-3">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                                >
                                                    {user.name}

                                                    <span className="material-symbols-rounded">
                                                        keyboard_arrow_down
                                                    </span>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route('profile.edit')}
                                            >
                                                Perfil
                                            </Dropdown.Link>
                                            {permissions.includes('admin.index') && (
                                            <Dropdown.Link
                                                href={route('admin.index')}
                                            >
                                                Panel de Control
                                            </Dropdown.Link>
                                            )}
                                            <Dropdown.Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                            >
                                                Cerrar Sesión
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        ) : (
                            <div className="hidden sm:ms-6 sm:flex sm:items-center">
                                <Link
                                    href={route('login')}
                                    onClick={handleAccionPrivada}
                                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="ms-3 inline-flex items-center justify-center rounded-md border border-transparent bg-rose-600 px-3 py-2 text-sm font-medium leading-4 text-white transition duration-150 ease-in-out hover:bg-rose-700 focus:outline-none dark:bg-rose-500 dark:hover:bg-rose-600"
                                >
                                    Registrarse
                                </Link>
                            </div>
                        )}
                        

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Inicio
                        </ResponsiveNavLink>
                    </div>

                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('frase')}
                            active={route().current('frase')}
                        >
                            Frase del día
                        </ResponsiveNavLink>
                    </div>


                    {user ? (
                        <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
                            <div className="px-4">
                                <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                    {user.name}
                                </div>
                                <div className="text-sm font-medium text-gray-500">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>
                                    Perfil
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('admin.index')}>
                                    Panel de Control
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route('logout')}
                                    as="button"
                                >
                                    Cerrar Sesión
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    )
                    : (
                        <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
                            <div className="px-4">
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="ms-3 inline-flex items-center justify-center rounded-md border border-transparent bg-rose-600 px-3 py-2 text-sm font-medium leading-4 text-white transition duration-150 ease-in-out hover:bg-rose-700 focus:outline-none dark:bg-rose-500 dark:hover:bg-rose-600"
                                >
                                    Registrarse
                                </Link>
                            </div>
                        </div>
                    )}
                    
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
