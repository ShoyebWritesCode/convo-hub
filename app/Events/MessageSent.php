<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class MessageSent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $user_id;
    public $user_name;
    public $created_at;

    public function __construct($message, $user_id, $user_name, $created_at)
    {
        $this->message = $message;
        $this->user_id = $user_id;
        $this->user_name = $user_name;
        $this->created_at = $created_at;
    }

    public function broadcastOn()
    {
        return new Channel('convo-hub');
    }

    public function broadcastAs()
    {
        return 'MessageSent';
    }
}
