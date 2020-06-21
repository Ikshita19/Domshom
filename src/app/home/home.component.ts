import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoService } from 'src/app/core/services/video.service';
import { AuthService } from 'src/app/core/auth.service';
import { SnackbarService } from 'src/app/shared/components/snackbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allvideos: Array<any> = []

  slides: Array<Object> = [
    {title: 'Angular', subtitle: 'UI Framework from Google!!', description: 'loresdklkg jslkdjg kjskldgj lksdjlgk jslkdj gkljdsl gjsdl jgklsdj lkgjlkdsklsdgjkm', imageUrl:'../../assets/images/angular.png', link:'slides/angular.html'},
    {title: 'Java 11', subtitle: 'Latest features of Java language', description: 'loresdklkg jslkdjg kjskldgj lksdjlgk jslkdj gkljdsl gjsdl jgklsdj lkgjlkdsklsdgjkm' ,  imageUrl:'../../assets/images/java.jpg', link:'slides/java8.html'},
    {title: 'React', subtitle: 'UI Library from Facebook!!', description: 'loresdklkg jslkdjg kjskldgj lksdjlgk jslkdj gkljdsl gjsdl jgklsdj lkgjlkdsklsdgjkm', imageUrl:'../../assets/images/react.png', link:'slides/reactjs.html'},
    {title: 'HTML 5', subtitle: 'New ways to structure', description: 'loresdklkg jslkdjg kjskldgj lksdjlgk jslkdj gkljdsl gjsdl jgklsdj lkgjlkdsklsdgjkm',  imageUrl:'../../assets/images/html5.png', link:'slides/html5.html'},
    {title: 'CSS 3', subtitle: 'A whole lot more', description: 'loresdklkg jslkdjg kjskldgj lksdjlgk jslkdj gkljdsl gjsdl jgklsdj lkgjlkdsklsdgjkm',  imageUrl:'../../assets/images/css3.jpg', link:'slides/css3.html'},
    {title: 'HTML', subtitle: 'Basic HTML', description: 'loresdklkg jslkdjg kjskldgj lksdjlgk jslkdj gkljdsl gjsdl jgklsdj lkgjlkdsklsdgjkm',  imageUrl:'../../assets/images/html5.png', link:'slides/html.html'}
  ]

  constructor(private videoService: VideoService, 
    // public dialog: MatDialog, 
     private router: Router, public authService: AuthService, public snackbarService: SnackbarService) { }

  ngOnInit() {

    this.videoService.fetchAllVideos()
    .subscribe((res: any) => {
      console.log(res)
      if(res.success){
        console.log(res.data)
        this.allvideos =  res.data
      }
    });
  }

  startVideo(path: string, title: string, comingsoon: boolean){
    if(comingsoon){
      this.snackbarService.show('Coming soon..');
      return;
    }
    console.log('navigating to path', path, title);
    // this.showDialog(path, title);
    this.router.navigate([path, title]);
  }

  redirect(type:string)
  {
    console.log("in method!");
    if(type=='quiz')
    {
      this.router.navigate(['/quiz']);
    }
    else if(type=='blog')
    {
      this.router.navigate(['/blogs']);
    }
    else if(type=='course')
    {
      this.router.navigate(['/videos']);
    }
  }

}
