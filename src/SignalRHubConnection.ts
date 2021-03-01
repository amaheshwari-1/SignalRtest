import * as signalR from "@microsoft/signalr";
import {IHubProxy} from "./ISignalRHubConnection";

class HubProxy implements IHubProxy {

 EstablishConnection = (url : string) => {
  const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl(url)
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Information)  
  .build();

  return hubConnection;
};  

 StartHubConnection = async (hubConnection : any) => {
    await hubConnection.start();
};  

 SubscribeConnection =  (hubConnection : any,methodName: string, eventSubscriptionModel : any) => {
  hubConnection.invoke(methodName, eventSubscriptionModel);
};  

UnSubscribeConnection =  (hubConnection : any,methodName: string) => {
  hubConnection.invoke(methodName);
};  

 OnNewEventHandler = (hubConnection: any,handlerName: string, callBackFunction : Function) => {
  hubConnection.on(handlerName, (message: any) => {
    callBackFunction(message);
  });
};  

 ReconnectingHubConnection =  (hubConnection: any) => {
  
  hubConnection.onreconnecting( (error : any) => {
    console.assert(hubConnection.state === signalR.HubConnectionState.Reconnecting);              
    console.log('Connection dropped because of error : ', error);
});
}; 

 ReconnectedHubConnection =  (hubConnection: any, methodName: string) => {
  
  hubConnection.onreconnected((connectionId: any) => {
    console.assert(hubConnection.state === signalR.HubConnectionState.Connected); 
    console.log('Connection reestablished. Connected with connectionId :: ', connectionId);
    hubConnection.invoke(methodName, null);
});
};

OffNewEvents = (hubConnection: any,handlerName: string, callBackFunction : Function) => {
  hubConnection.off(handlerName, callBackFunction);
  };

 DisconnectedHubConnection =  (hubConnection: any, methodName: string, callBackFunction : Function) => {
  
  hubConnection.onclose ((error: any) => 
    {        
      console.log('Error  on close::  ', error);
      callBackFunction(error);
    });
};

}
export default HubProxy