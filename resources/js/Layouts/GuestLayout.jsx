import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children, title }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 dark:bg-gray-900">
            <div>
                <Link href={route('dashboard')}>
                    <ApplicationLogo className="h-20 fill-current text-gray-500 rounded-md" />
                </Link>
            </div>

            <h1 className="mt-8 text-3xl font-bold text-gray-900 dark:text-gray-100">
                {title}
            </h1>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800">
                {children}
            </div>
        </div>
    );
}
