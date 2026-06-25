<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids; 
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory, HasUuids; 

    protected $primaryKey = 'uuid'; 
    
    protected $fillable = [
        'title',
        'slug',
        'description',
        'image',
        'content',
    ];
    protected static function booted(): void
    {
        static::creating(function (News $news) {
            if (empty($news->slug)) {
                $news->slug = \Illuminate\Support\Str::slug($news->title);
            }
        });

        static::updating(function (News $news) {
        if ($news->isDirty('title')) {
            $news->slug = \Illuminate\Support\Str::slug($news->title);
        }

        static::deleted(function (News $news) {
            if ($news->image && Storage::disk('public')->exists($news->image)) {
                Storage::disk('public')->delete($news->image);
            }
        });
    });
    }
}