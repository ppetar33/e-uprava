import { Component, Input, OnInit } from '@angular/core';
import { UserOpenData } from 'src/app/@api/model/user-open-data.model';
import { User } from 'src/app/@api/model/user.model';

@Component({
  selector: 'app-staff-card',
  templateUrl: './staff-card.component.html',
  styleUrls: ['./staff-card.component.scss']
})
export class StaffCardComponent implements OnInit {

  @Input() user!: UserOpenData;

  constructor() { }

  ngOnInit(): void {
    
  }

}
