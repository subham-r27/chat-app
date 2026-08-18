import { inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoChatService {

  private hubUrl = `${environment.baseUrl}/hubs/video-chat`;
  public hubConnection!:HubConnection;
  private hasRegisteredSignalHandlers = false;

  public incomingCall = false;
  public isCallActive = false;
  public remoteUserId = '';

  public peerConnection!:RTCPeerConnection;

  public offerReceived = new BehaviorSubject<{senderId:string,offer:RTCSessionDescriptionInit}|null>(null);
  public answerReceived = new BehaviorSubject<{senderId:string,answer:RTCSessionDescription}|null>(null);
  public iceCandidateReceived = new BehaviorSubject<{senderId:string,candidate:RTCIceCandidate}|null>(null);


  private authService = inject(AuthService);

  private registerSignalHandlers(){
    if(this.hasRegisteredSignalHandlers || !this.hubConnection) return;

    this.hubConnection.on("ReceiveOffer",(senderId,offer)=>{
      this.offerReceived.next({senderId,offer:JSON.parse(offer)});
    })

    this.hubConnection.on("ReceiveAnswer",(senderId,answer)=>{
      this.answerReceived.next({senderId,answer:JSON.parse(answer)});
    })

    this.hubConnection.on("ReceiveIceCandidate",(senderId,candidate)=>{
        this.iceCandidateReceived.next({senderId,candidate:JSON.parse(candidate)});
    })

    this.hasRegisteredSignalHandlers = true;
  }

  async startConnection(): Promise<void>{
    try{
      if(!this.hubConnection){
        this.hubConnection = new HubConnectionBuilder()
        .withUrl(this.hubUrl,{
          accessTokenFactory:()=> this.authService.getAccessToken!
        })
        .withAutomaticReconnect()
        .build();

        this.registerSignalHandlers();
      }

      if(this.hubConnection.state !== 'Connected'){
        await this.hubConnection.start();
      }
    }catch(err){
      console.error("SignalRConnectionError",err);
      throw err;
    }
  }

  private async ensureConnected(){
    if(!this.hubConnection || this.hubConnection.state !== 'Connected'){
      await this.startConnection();
    }
  }

  async sendOffer(receiverId:string,offer:RTCSessionDescriptionInit){
    await this.ensureConnected();
    return this.hubConnection.invoke("SendOffer",receiverId,JSON.stringify(offer));
  }

  async sendAnswer(receiverId:string,answer:RTCSessionDescriptionInit){
    await this.ensureConnected();
    return this.hubConnection.invoke("SendAnswer",receiverId,JSON.stringify(answer));
  }

  async sendIceCandidate(receiverId:string,candidate:RTCIceCandidate){
    await this.ensureConnected();
    return this.hubConnection.invoke("SendIceCandidate",receiverId,JSON.stringify(candidate));
  }

  async sendEndCall(receiverId:string){
    await this.ensureConnected();
    return this.hubConnection.invoke('EndCall',receiverId);
  }


}