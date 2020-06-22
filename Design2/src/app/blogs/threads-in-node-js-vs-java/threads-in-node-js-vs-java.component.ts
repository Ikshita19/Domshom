import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-threads-in-node-js-vs-java',
  templateUrl: './threads-in-node-js-vs-java.component.html',
  styleUrls: ['./threads-in-node-js-vs-java.component.css']
})
export class ThreadsInNodeJsVsJavaComponent implements OnInit {

  safeSrc: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer){
    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/s9Zy8ISjxIw');
  }

  ngOnInit() {
  }

}
