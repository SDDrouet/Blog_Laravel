<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Roles
        $admin = Role::create(['name' => 'Administrator']);
        $author = Role::create(['name' => 'Author']);

        // Permissions
        Permission::create([
            'name' => 'admin.index',
            'description' => 'Ver el dashboard',
        ])->syncRoles([$admin, $author]);

        // Permisos para categorias
        Permission::create([
            'name' => 'admin.categories.index',
            'description' => 'Ver categorias',
        ])->syncRoles([$admin, $author]);
        Permission::create([
            'name' => 'admin.categories.create',
            'description' => 'Crear categorias',
        ])->syncRoles([$admin]);
        Permission::create([
            'name' => 'admin.categories.edit',
            'description' => 'Editar categorias',
        ])->syncRoles([$admin]);
        Permission::create([
            'name' => 'admin.categories.destroy',
            'description' => 'Eliminar categorias',
        ])->syncRoles([$admin]);


        // Articles permissions
        Permission::create([
            'name' => 'admin.articles.index',
            'description' => 'Ver articulos',
        ])->syncRoles([$admin, $author]);
        Permission::create([
            'name' => 'admin.articles.create',
            'description' => 'Crear articulos',
        ])->syncRoles([$admin, $author]);
        Permission::create([
            'name' => 'admin.articles.edit',
            'description' => 'Editar articulos',
        ])->syncRoles([$admin, $author]);
        Permission::create([
            'name' => 'admin.articles.destroy',
            'description' => 'Eliminar articulos',
        ])->syncRoles([$admin, $author]);

        // Comments permissions
        Permission::create([
            'name' => 'admin.comments.index',
            'description' => 'Ver comentarios',
        ])->syncRoles([$admin, $author]);
        Permission::create([
            'name' => 'admin.comments.destroy',
            'description' => 'Eliminar comentarios',
        ])->syncRoles([$admin, $author]);



        // Users permissions
        Permission::create([
            'name' => 'admin.users.index',
            'description' => 'Ver usuarios',
        ])->syncRoles([$admin]);
        Permission::create([
            'name' => 'admin.users.edit',
            'description' => 'Editar usuarios',
        ])->syncRoles([$admin]);
        Permission::create([
            'name' => 'admin.users.destroy',
            'description' => 'Eliminar usuarios',
        ])->syncRoles([$admin]);

    }
}
