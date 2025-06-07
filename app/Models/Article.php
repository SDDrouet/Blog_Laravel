<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;
    
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    // Relacion inverse one to many article->user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relacion one to many article->comments
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    // Relacion many to many article->categories
    public function categories()
    {
        return $this->belongsTo(Category::class);
    }

    // Utilizar el slug en lugar del id en las rutas
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
