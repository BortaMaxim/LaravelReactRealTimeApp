<?php

namespace App\Notifications;

use App\Models\Invite\Invite;
use App\Models\User\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NotificationRequest extends Notification implements ShouldBroadcast
{
    use Queueable;

    private Invite $invite;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Invite $invite)
    {
        $this->invite = $invite;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function via(mixed $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param mixed $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail(mixed $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function toArray(mixed $notifiable): array
    {
        $desc = "";
        switch ($this->invite->type) {
            case "FRND":
                $desc = "want,s to be friend";
                break;
            case "JOIN":
                $desc = "want,s to join your channel {$this->invite->recv_name}!";
                break;
            case "INVT":
                $desc = "has invited you to join channel {$this->invite->recv_name}!";
                break;
            default:
                break;
        }

        return [
            'sender_name' => $this->invite->name,
            'invite_id' => $this->invite->id,
            'request_type' => $this->invite->type,
            'recv_channel' => $this->invite->recv_name,
            'desc' => $desc,
//            'read_at' => $this->read_at,
            'id' => $this->id,
        ];
    }

    public function toBroadcast(mixed $notifiable): BroadcastMessage
    {
        $desc = '';
        switch ($this->invite->type) {
            case "FRND":
                $desc = "wants to be friends!";
                break;
            case "JOIN":
                $desc = "wants to join your channel {$this->invite->recv_name}!";
                break;
            case "INVT":
                $desc = "has invited you to join channel {$this->invite->recv_name}!";
                break;
            default:
                break;
        }
        return new BroadcastMessage([
            'sender_name' => $this->invite->name,
            'invite_id' => $this->invite->id,
            'request_type' => $this->invite->type,
            'recv_channel' => $this->invite->recv_name,
            'desc' => $desc,
//            'read_at' => $this->read_at,
            'id' => $this->id,
        ]);
    }
}
