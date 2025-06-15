<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    // Constructor para aplicar el middleware de autorización
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request, Profile $profile): RedirectResponse
    {
        $userAuth = Auth::user();

        // cargar usuario autenticado desde la base de datos con query
        $user = User::with('profile')->find($userAuth->id);

        $user->full_name = $request->full_name;
        $user->email = $request->email;
        $user->save();

        // cargar perfil del usuario autenticado desde la base de datos con query sin relacionar a usuarios        
        $profile = Profile::find($userAuth->profile->id);
        $profile->photo = $request->photo;
        $profile->save();

        return Redirect::route('profile.edit', $request->user()->profile->id)
            ->with('success', 'Perfil actualizado correctamente.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
