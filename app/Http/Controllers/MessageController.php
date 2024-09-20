<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use App\Events\MessageSent;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Models\MessageHistory;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;

class MessageController extends Controller
{
    public function index(): Response | JsonResponse
    {
        $messages = MessageHistory::with('user')->get();
        return Inertia::render('Dashboard', ['messages' => $messages]);
    }

    public function sendMessage()
    {
        $user_id = Auth::user()->id;
        $message = Request::input('message');
        MessageHistory::create([
            'user_id' => $user_id,
            'message' => $message
        ]);

        broadcast(new MessageSent($message));

        // return redirect('/dashboard');
        // return response()->json(['message' => 'Message sent!']);
    }
}
