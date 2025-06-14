import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            full_name: user.full_name,
            email: user.email,
            photo: user.profile.photo,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Información del perfil actualizada correctamente.');
            },
            onError: (error) => {
                toast.error('Error al actualizar la información del perfil.');
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Información del Perfil
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Actualiza la información de perfil y la dirección de correo electrónico de tu cuenta.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nombre" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.full_name}
                        onChange={(e) => setData('full_name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.full_name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Correo Electrónico" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="photo" value="Foto de Perfil" />
                    <TextInput
                        id="photo"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.photo || ''}
                        onChange={(e) => setData('photo', e.target.value)}
                        autoComplete="photo"
                    />
                    <InputError className="mt-2" message={errors.photo} />
                </div>

                {/* Foto de Perfil */}
                <div>
                    {user.profile.photo ? (
                        <div className="mt-2">
                            <img
                                src={user.profile.photo}
                                alt="Foto de Perfil"
                                className="h-20 w-20 rounded-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="mt-2">
                            <div className="h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                <span className="material-symbols-rounded text-gray-400 text-7xl">
                                    account_circle
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                No se ha cargado ninguna foto de perfil.
                            </p>
                        </div>
                    )}
                </div>

                    

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            Tu dirección de correo electrónico no está verificada.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                Haz clic aquí para reenviar el correo electrónico de verificación.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                Se ha enviado un nuevo enlace de verificación a tu
                                dirección de correo electrónico.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Guardar</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Guardado.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
