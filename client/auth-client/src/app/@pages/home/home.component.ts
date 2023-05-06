import { Component, OnInit } from '@angular/core';
import { CommunalProblem } from 'src/app/@api/model/communal-problem.model';
import { CommunalStatisticData } from 'src/app/@api/model/communal-statistic-data.model';
import { CommunalProblemService } from 'src/app/@api/services/communal-problem.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  municipalityList: Array<string> = [];
  listCommunalProblems: Array<CommunalProblem> = [];
  statisticData: CommunalStatisticData = {
    totalProblems: '',
    anonymous: '',
    public: ''
  }

  constructor(private communalProblemService : CommunalProblemService) { }

  ngOnInit(): void {
    this.getAllMunicipality();
    this.getAllCommunalProblems();
    this.getStatisticData();
  }

  private getAllCommunalProblems(): void {
    this.communalProblemService.getAll().subscribe(res => {
      console.log(res)
      this.listCommunalProblems = res;
    })
  }

  private getAllMunicipality(): void {
    this.communalProblemService.getAllMunicipality().subscribe(res => {
      this.municipalityList = res;
    })
  }

  private getStatisticData(): void {
    this.communalProblemService.getStatisticData().subscribe(res => {
      this.statisticData = res
    })
  }

  clickMunicipality(municipality: string):void{
    this.communalProblemService.getCommunalProblemByMunicipality(municipality).subscribe(res => {
      this.listCommunalProblems = res;
    })
  }

  clickAllMunicipality():void{
    this.getAllCommunalProblems();
  }
}
