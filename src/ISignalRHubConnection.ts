export interface IHubProxy {
    EstablishConnection: (url : string) => any;

    StartHubConnection: (hubConnection : any) => void;

    SubscribeConnection: (hubConnection : any, methodName : string, eventSubscriptionModel : any) => void;

    UnSubscribeConnection: (hubConnection : any, methodName : string) => void;
    
    OnNewEventHandler : (hubConnection: any,handlerName: string, callBackFunction : Function) => void;

    OffNewEvents : (hubConnection: any,handlerName: string, callBackFunction : Function) => void;

    ReconnectingHubConnection : (hubConnection: any) => void;

    ReconnectedHubConnection : (hubConnection: any, methodName: string) => void;

    DisconnectedHubConnection : (hubConnection: any, methodName: string, callBackFunction : Function) => void;


    //hello
  }