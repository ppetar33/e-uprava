import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-create-communal-problem',
  templateUrl: './create-communal-problem.component.html',
  styleUrls: ['./create-communal-problem.component.css']
})
export class CreateCommunalProblemComponent implements OnInit {

  imageEvent: any;

  constructor(
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
  }

  showForm = false;
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
    this.showForm = false;
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
