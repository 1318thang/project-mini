import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
class SignalRService {
    private connection: HubConnection | null = null;
    public start() {
        this.connection = new HubConnectionBuilder()
            // .withUrl("https://localhost:7140/productHub")
            .withUrl("https://bold-wind-c8e3.1318thang.workers.dev/productHub") // URL backend
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Debug)
            .build();

        this.connection.start()
            .then(() => console.log("[SignalR] Connected"))
            .catch(err => console.error("[SignalR] Error:", err));
    }
    public on(eventName: string, callback: (data: any) => void) {
        this.connection?.on(eventName, callback);
    }
    public send(eventName: string, data: any) {
        this.connection?.invoke(eventName, data).catch(console.error);
    }
    // Hủy listener
    public off(eventName: string, callback: (data: any) => void) {
        this.connection?.off(eventName, callback);
    }
    public stop() {
        this.connection?.stop().then(() => console.log("[SignalR] Disconnected"));
    }
    public joinGroup(groupName: string) {
        this.connection?.invoke("JoinGroup", groupName)
            .then(() => console.log(`[SignalR] joined group: ${groupName}`))
            .catch(err => console.error(`[SignalR] joinGroup error`, err));
    }
    public leaveGroup(groupName: string) {
        this.connection?.invoke("LeaveGroup", groupName)
            .then(() => console.log(`[SignalR] Left group: ${groupName}`))
            .catch(err => console.error(`[SignalR] LeaveGroup error`, err));
    }

}

export const signalRService = new SignalRService();
