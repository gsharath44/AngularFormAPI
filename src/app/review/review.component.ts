import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  constructor(public appSvc: AppService,
    private router: Router) { }

  ngOnInit() {

  }

  buttonClick(val: string) {
    if (val === 'back') {
      this.router.navigate(["api-config"]);
    }
    else if (val === 'generate') {
      const blob = new Blob([JSON.stringify(this.appSvc.apiConfigObj)], 
        { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(blob, "apiConfig.json");
    }
  }

}
