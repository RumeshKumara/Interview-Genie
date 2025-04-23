export class ChatService {
    async sendMessage(message) {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });
            return { response };
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }
}
