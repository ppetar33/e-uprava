import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
    providedIn: 'root'
  })

export class OpenDataService {
  
    private readonly path = "";
  
    constructor(private http: HttpClient) { }
  
    getAllMunicipality():Observable<string[]>{
      return this.http.get<string[]>(`http://localhost:8000/api/auth/get-municipality`);
    }

    exportToExcel(data: any[], filename: string) {
        const workbook = XLSX.utils.book_new();
      
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      
        const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, filename);
    }

}