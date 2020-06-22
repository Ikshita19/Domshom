import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoService } from 'src/app/core/services/video.service';
import { AuthService } from 'src/app/core/auth.service';
import { SnackbarService } from 'src/app/shared/components/snackbar.service';
// import { FormControl } from '@angular/forms';
// import { StarRatingColor } from 'src/app/shared/components/star-rating/star-rating.component';

@Component({
  selector: 'app-view-auth-videos',
  templateUrl: './view-auth-videos.component.html',
  styleUrls: ['./view-auth-videos.component.css']
})
export class ViewAuthVideosComponent implements OnInit {

  rating:number = 3;
  starCount:number = 5;
  onRatingChanged(rating){
    console.log(rating);
    this.rating = rating;
  }

  constructor(private videoService: VideoService, 
    // public dialog: MatDialog, 
     private router: Router, public authService: AuthService, public snackbarService: SnackbarService ) { }

  videos: Array<any> = []
  allvideos: Array<any> = []

  ngOnInit() {
    this.videoService.fetchAllVideosAuth()
    .subscribe((res: any) => {
      console.log(res)
      if(res.success){
        console.log(res.data)
        this.videos =  res.data
      }
    });

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

}
