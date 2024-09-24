<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use App\Events\MessageSent;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Models\MessageHistory;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Crypt;

class MessageController extends Controller
{
    public function index(): Response | JsonResponse | RedirectResponse
    {
        $messages = MessageHistory::with('user')->get();
        $UID = Auth::user()->id;

        foreach ($messages as $message) {
            $message->message = Crypt::decryptString($message->message);
        }

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
        $encrypted_message = Crypt::encryptString($message);
        MessageHistory::create([
            'user_id' => $user_id,
            'message' => $encrypted_message,
        ]);

        broadcast(new MessageSent($message, $user_id, $user_name, $created_at));

        // return Redirect::back();
        // return response()->json(['message' => 'Message sent!']);
    }

    public function seenBy(): RedirectResponse
    {
        $user_id = Request::input('user_id');
        // $user_name = User::find($user_id)->name;
        $user_picture = User::find($user_id)->picture;
        $message = MessageHistory::latest()->first();
        $seen_by = json_decode($message->seen_by, true) ?? []; // Decode to array; use true for associative array

        // Remove user_name from seen_by in all other messages
        MessageHistory::where('id', '!=', $message->id)->each(function ($otherMessage) use ($user_picture) {
            $otherSeenBy = json_decode($otherMessage->seen_by, true) ?? []; // Decode to array
            // Remove the user_name if it exists
            $otherSeenBy = array_filter($otherSeenBy, function ($picture) use ($user_picture) {
                return $picture !== $user_picture;
            });
            $otherMessage->seen_by = json_encode(array_values($otherSeenBy)); // Re-encode back to JSON string
            $otherMessage->save();
        });

        // Add user_name to the current message's seen_by
        if (!in_array($user_picture, $seen_by)) {
            array_push($seen_by, $user_picture);
        }
        $message->seen_by = json_encode($seen_by); // Encode to JSON string before saving
        $message->save();

        return Redirect::back();
    }

    public function reactToMessage()
    {
        $message_id = Request::input('message_id');
        $reaction = Request::input('reaction');
        $message = MessageHistory::find($message_id);
        $reactions = json_decode($message->reactions, true) ?? [];
        array_push($reactions, $reaction);
        $message->reactions = json_encode($reactions);
        $message->save();
    }
}
