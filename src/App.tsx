import React, { useEffect } from "react";
import SignalRConnection from "./SignalRHubConnection" 

const App = () => {
 
  let SignalRObj = new SignalRConnection();
  let hubConnection = SignalRObj.EstablishConnection("https://localhost:44375/events/stream");

  const MessageHandler = (message :string) => {
    console.log('Message in App component  ', message)   ;  
  }

  const DisconnectHandler = (message :string) => {
    console.log('Disconnected from hub with error  ', message) ;  
    setTimeout(() => {
      console.log('Attempting to connect again to hub.')   ;  
      SignalRObj.StartHubConnection(hubConnection).then( a=> {SignalRObj.SubscribeConnection(hubConnection,"Subscribe", null);});
    }, 10000)
  }
  useEffect(() => {
    SignalRObj.OnNewEventHandler(hubConnection,"OnNewEvent", MessageHandler); 
      // Starts the SignalR connection
     SignalRObj.StartHubConnection(hubConnection).then( a=> {
       SignalRObj.SubscribeConnection(hubConnection,"Subscribe", null);     
      });
  });
 
  SignalRObj.ReconnectingHubConnection(hubConnection);

  SignalRObj.ReconnectedHubConnection(hubConnection,"Subscribe");

  SignalRObj.DisconnectedHubConnection(hubConnection,"Subscribe", DisconnectHandler);  

  //test
    return (
      <>
      <p>Test</p>
      <button onClick={()=> SignalRObj.OffNewEvents(hubConnection,"OnNewEvent", MessageHandler)}>Turn Off Events</button>

      <button onClick={()=>  SignalRObj.UnSubscribeConnection(hubConnection,"UnSubscribe") }>Unsubscribe Filter</button>

      </>
    );
    
};
 
export default App;
