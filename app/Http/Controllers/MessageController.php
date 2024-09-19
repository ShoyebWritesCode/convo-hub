<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\MessageSent;
use Illuminate\Support\Facades\Log;


class MessageController extends Controller
{
    public function sendMessage()
    {
        // $message = $request->validate([
        //     'message' => 'required|string',
        //     'user' => 'required|string',
        // ]);

        // Broadcast the message
        $message = 'Hello';
        Log::info("message sent");
        // event(new MessageSent($message));
        broadcast(new MessageSent($message))->toOthers();

        return redirect('/dashboard');
    }
}
