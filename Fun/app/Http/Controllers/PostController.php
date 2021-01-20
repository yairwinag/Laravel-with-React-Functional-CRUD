<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;


class PostController extends Controller
{
    public function index() {
        $post = Post::orderBy('id','desc')->get();
        return  $post;
    }

    public function destroy($id) {
        $post = Post::find($id);
        $post->delete();
        return $post;
    }

    public function edit($id)
    {
        $post = Post::find($id);
        return $post;

    }

    public function update(Request $request,$id) {
        $post = Post::find($id);
        $post->title = $request->title;
        $post->body = $request->body;
        $post->save();
        return $post; 
    }

    public function store(Request $request) {
        $post = new Post();
        $post->title = $request->title;
        $post->body = $request->body;
        $post->save();
        return $post; 
    }

}
