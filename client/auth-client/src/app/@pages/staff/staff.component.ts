import { Component, OnInit } from '@angular/core';
import { UserOpenData } from 'src/app/@api/model/user-open-data.model';
import { User } from 'src/app/@api/model/user.model';
import { UserService } from 'src/app/@api/services/user.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  isJudgesSelected: boolean = false;

  copsList: Array<UserOpenData> = [];
  judgesList: Array<UserOpenData> = [];

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.getAllCops();
    this.getAllJudges();
  }

  clickJudges():void{
    console.log("Judges")
    this.isJudgesSelected = true
  }

  clickCops():void{
    console.log("Cops")
    this.isJudgesSelected = false
  }


  private getAllCops(): void {
    this.userService.getAllCops().subscribe(res => {
      this.copsList = res;
    })
  }

  private getAllJudges(): void {
    this.userService.getAllJudges().subscribe(res => {
      this.judgesList = res;
    })
  }



}
