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
        $UID = Auth::user()->id;
        return Inertia::render('Dashboard', [
            'messages' => $messages,
            'UID' => $UID
        ]);
    }

    public function sendMessage()
    {
        $user_id = Auth::user()->id;
        $user_name = Auth::user()->name;
        $created_at = now();
        $message = Request::input('message');
        MessageHistory::create([
            'user_id' => $user_id,
            'message' => $message,
        ]);

        broadcast(new MessageSent($message, $user_id, $user_name, $created_at))->toOthers();

        // return redirect('/dashboard');
        // return response()->json(['message' => 'Message sent!']);
    }
}
