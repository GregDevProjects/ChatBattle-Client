import { Component } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HubConnection } from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  connectedStatus = 'unconnected';
  connection: HubConnection = new signalR.HubConnectionBuilder()
    .withUrl(environment.signalRUrl)
    .build();

  ngOnInit(): void {
    this.connection.on('ReceiveMessage', (message) => {
      console.log(`Received: ${message}`);
    });
  }

  countDown(): void {
    this.connection.invoke('CountDown');
  }

  connect(): void {
    this.connectedStatus = 'connecting';
    this.connection
      .start()
      .then(() => {
        console.log('connected');
        this.connectedStatus = 'connected';
      })
      .catch((err: any) => {
        console.log('ERoor', err);
        this.connectedStatus = 'failed';
      });
  }

  disconnect(): void {
    this.connection
      .stop()
      .then(() => {
        console.log('connected');
        this.connectedStatus = 'unconnected';
      })
      .catch((err: any) => {
        console.log('ERoor', err);
        this.connectedStatus = 'failed';
      });
  }
}
