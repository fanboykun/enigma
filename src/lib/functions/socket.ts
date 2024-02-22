import { secondKey } from "$lib/functions/store";

export class Socket 
{
    private address = 'ws://localhost:8001'
    private connection: WebSocket

    constructor() {
        this.connection = new WebSocket(this.address);
    }

    listen() {
        try {
            if(this.connection != null){
                this.connection.onopen = () => {
                    console.log('Connected to server');
                };
            
                this.connection.onmessage = (event: MessageEvent) => {
                    const message = event.data
                    console.log(`Received message from server: ${message}`);
                    secondKey.set(message)
                };
            
                this.connection.onclose = () => {
                    console.log('Disconnected from server');
                };

            }


        }catch(err){
            console.log(err)
        }
    }

    send(message: string) {
        try {
            if(this.connection === null) return
            if (this.connection.readyState <= 1) {
                this.connection.send(message)
            }
        } catch (err) {
            console.log(err)
        }
    }
}
