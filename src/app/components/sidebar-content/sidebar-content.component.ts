import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoomData } from '../../services/common.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.scss']
})
export class SidebarContentComponent implements OnInit {
  @Input() roomData!: RoomData;
  @Input() randomSeed!: string;

  @Output() seedValue: EventEmitter<string> = new EventEmitter<string>();

  lastMessage!: string;
  subs!: Subscription;

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    
    console.log("Sidebar.Content OK!");
    this.subs = this.afs.collection('rooms').doc(this.roomData.id)
      .collection('message', ref => ref.orderBy('time', 'desc'))
      .valueChanges()
      .subscribe(data => {
        if (data.length > 0) {
          this.lastMessage = data[0]['message'];
        }
      })
  }

  onClick() {
    this.seedValue.emit(this.randomSeed);
  }
}
