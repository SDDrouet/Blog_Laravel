<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::paginate(10);

        return inertia('Admin/Users/UserIndex', compact('users'));
    }   

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $roles = Role::all();

        $user->load('roles');

        return inertia('Admin/Users/UserCreate', compact('user', 'roles'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //Llenamos la tabla intermedia de roles
        $user->syncRoles($request->input('role', []));

        return redirect()->route('admin.users.edit', $user)
            ->with('success', 'Rol asignado correctamente.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'Usuario eliminado correctamente.');
    }
}
