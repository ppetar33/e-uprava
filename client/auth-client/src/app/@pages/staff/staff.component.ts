import { Component, OnInit } from '@angular/core';
import { UserOpenData } from 'src/app/@api/model/user-open-data.model';
import { OpenDataService } from 'src/app/@api/services/open-data.service';
import { UserService } from 'src/app/@api/services/user.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  copsList: Array<UserOpenData> = [];
  judgesList: Array<UserOpenData> = [];
  municipalityList: Array<string> = [];

  constructor(private userService : UserService, private openDataService: OpenDataService) { }

  ngOnInit(): void {
    this.getAllJudges();
    this.getAllMunicipality();
  }

  private getAllJudges(): void {
    this.userService.getAllJudges().subscribe(res => {
      this.judgesList = res;
    })
  }

  private getAllMunicipality(): void {
    this.openDataService.getAllMunicipality().subscribe(res => {
      this.municipalityList = res;
    })
  }

  clickMunicipality(municipality: string):void{
    this.userService.getJudgesByMunicipality(municipality).subscribe(res => {
      this.judgesList = res;
    })
  }

  clickAllMunicipality():void{
    this.getAllJudges();
  }

  exportexcel(): void
  {
    this.openDataService.exportToExcel(this.judgesList, 'Judges-list.xlsx');
  }
}
