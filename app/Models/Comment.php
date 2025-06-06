<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    // Relacion inverse one to many comment->user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relacion inverse one to many comment->article
    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}
