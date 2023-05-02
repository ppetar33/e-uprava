import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { CommunalProblem } from 'src/app/model/communal-problem';
import { CommunalPoliceServiceService } from 'src/app/services/communal-police-service.service';

@Component({
  selector: 'app-create-communal-problem',
  templateUrl: './create-communal-problem.component.html',
  styleUrls: ['./create-communal-problem.component.css']
})
export class CreateCommunalProblemComponent implements OnInit {

  imageEvent: any;
  communalProblema: CommunalProblem;

  constructor(
    private router: Router,
    private storage: AngularFireStorage,
    private service: CommunalPoliceServiceService
  ) { 
    this.imageEvent = null

    this.communalProblema = {
      id: "",
      title: "",
      description: "",
      imageUrl: "",
      address: "",
      reportedById: "",
      policemanId: "",
      reportId: "",
      judgeId: "",
      anonymus: false,
      municipality: "",
      date: ""
    }
  }

  ngOnInit(): void {

  }

  formData = {
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    checkbox1: false,
    dropdown1: ''
  };

  onSubmit(event: any) {
    console.log('Form submitted:', this.formData);
    console.log('Form submitted:', this.communalProblema);
    // this.router.navigate(['create-communal-problem']);
    this.service.createNew(this.communalProblema).subscribe(res => {
      console.log("Succesfull save")
      this.router.navigate(['home']);
    },
      err => {
        console.log("Error")
      })

  }

  uploadFile(files: FileList) {
    const file = files.item(0);
    const path = 'my-file-name';
    const fileRef = this.storage.ref(path);
    const task = fileRef.put(file);

    // observe percentage changes
    task.percentageChanges().subscribe(percent => {
      console.log(percent);
    });

    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(downloadURL => {
          console.log('File available at: ', downloadURL);
        });
      })
    ).subscribe();
  }

}
