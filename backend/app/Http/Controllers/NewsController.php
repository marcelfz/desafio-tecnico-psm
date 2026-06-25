<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNewsRequest;
use App\Http\Requests\UpdateNewsRequest;
use App\Models\News;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class NewsController extends Controller
{
    private News $news;

    public function __construct(News $news)
    {
        $this->news = $news;
    }

    public function index(Request $request): JsonResponse
    {
        $news = $this->news->newQuery()
            ->when($request->has('title'), function ($query) use ($request) {
                $query->where('title', 'like', '%' . $request->title . '%');
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($news, Response::HTTP_OK);
    }

    public function store(StoreNewsRequest $request): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('news', 'public');
            $data['image'] = url('storage/' . $path);
        }

        $news = News::create($data);

        return response()->json($news, Response::HTTP_CREATED);
    }

    public function show(string $id): JsonResponse
    {
        $news = $this->news->findOrFail($id);

        return response()->json($news, Response::HTTP_OK);
    }

    public function update(UpdateNewsRequest $request, string $id): JsonResponse
    {
        $news = $this->news->findOrFail($id);
        $data = $request->validated();

        if ($request->hasFile('image')) {
            try {
                if ($news['image']) {
                    $image_name = explode('news/', $news['image']);
                    Storage::disk('public')->delete('news/' . $image_name[1]);
                }
            } catch (Throwable) {
            } finally {
                $path = $request->file('image')->store('news', 'public');
                $data['image'] = url('storage/' . $path);
            }
        }

        $news->update($data);

        return response()->json($news, Response::HTTP_OK);
    }

    public function destroy(string $id): JsonResponse
    {
        $news = $this->news->findOrFail($id);
        $news->delete();

        return response()->json(
            ['message' => 'Notícia removida com sucesso.'],
            Response::HTTP_OK
        );
    }
}