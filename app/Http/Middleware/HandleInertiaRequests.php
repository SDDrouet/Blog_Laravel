<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = null;
        $permissions = [];
        $roles = [];

        if ($request->user()) {
            $user = $request->user()->load(['profile:id,user_id,photo']);
            $permissions = $request->user()->getAllPermissions()->pluck('name');
            $roles = $request->user()->getRoleNames();
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'permissions' => $permissions,
                'roles' => $roles,
            ],
        ];
    }
}
