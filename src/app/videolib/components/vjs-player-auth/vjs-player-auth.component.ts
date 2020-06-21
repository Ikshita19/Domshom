import { Component, OnInit } from '@angular/core';
import { IMedia, VideoLibrary } from 'src/app/shared/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { VgAPI } from 'ngx-videogular';
import { VideoService } from 'src/app/core/services/video.service';
import {map} from 'rxjs/operators'

@Component({
  selector: 'app-vjs-player-auth',
  templateUrl: './vjs-player-auth.component.html',
  styleUrls: ['./vjs-player-auth.component.css']
})
export class VjsPlayerAuthComponent implements OnInit {

  videoLibrary: VideoLibrary

  currentIndex = 0;
  currentSection = 0;
  currentItem: IMedia;
  api: VgAPI;
  step= 1;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(public route: ActivatedRoute,  public router: Router, public videoService: VideoService) {}

  // @HostListener('contextmenu', ['$event'])
  // onRightClick(event) {
  //   event.preventDefault();
  // }


  ngOnInit(): void {


    this.route.params
      .subscribe(params => {
        console.log(params);
        this.videoService.fetchVideoByTitleAuth(params.title)
        // .pipe(map((res: any)=> {
        //   console.log(res.data);
        //   let vlibs : VideoLibrary = res.data;

        //   vlibs.sections.forEach((section,sectionIndex) => {
        //     section.videos.forEach((video, videoIndex) =>{
        //         if(video.completed){
        //           this.currentIndex = videoIndex
        //           this.currentSection = sectionIndex
        //         }
        //     })
        //   });
        //   console.log('Index & section values ')
        //   console.log(this.currentIndex)  
        //   console.log(this.currentSection)  
        //   return res;

        // }))
          .subscribe((res: any) => {
            console.log(res)
            if(res.success){
              console.log(res.data);
              this.videoLibrary = res.data

              this.videoLibrary.sections.forEach((section,sectionIndex) => {
                section.videos.forEach((video, videoIndex) =>{
                    if(video.completed){
                      this.currentIndex = videoIndex
                      this.currentSection = sectionIndex
                    }
                })
              });
              console.log('Index & section values ')
              console.log(this.currentIndex)  
              console.log(this.currentSection)  
              this.currentItem = this.videoLibrary.sections[this.currentSection].videos[this.currentIndex];

            }
            
          });
      });



  }

  onPlayerReady(api: VgAPI) {
    this.api = api;

    console.log('Player redady');

    this.api
      .getDefaultMedia()
      .subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
    this.api
      .getDefaultMedia()
      .subscriptions.ended.subscribe(this.nextVideo.bind(this));


      // console.log(this.api.getDefaultMedia().isCompleted)
      // console.log(this.api.getDefaultMedia().currentTime)
  }

  nextVideo() {
    console.log('loading next video...')
    // send event for video completion
    this.videoService.updateCompletionStatus(this.videoLibrary._id, this.videoLibrary.sections[this.currentSection]._id, this.videoLibrary.sections[this.currentSection].videos[this.currentIndex]._id, {completed: true})
    .subscribe((res: any) => {
      console.log(res)
    })


    console.log(`Section ${this.currentSection} - Video ${this.currentIndex} - Section Length ${this.videoLibrary.sections[this.currentSection].videos.length}`)
    this.videoLibrary.sections[this.currentSection].videos[this.currentIndex].completed = true 
    this.currentIndex++;

    if (this.currentIndex === this.videoLibrary.sections[this.currentSection].videos.length) {
      this.currentIndex = 0;
      this.currentSection++;
      if(this.currentSection === this.videoLibrary.sections.length){
        console.log('course finished..')
        return;
      }
      
    }

    this.currentItem = this.videoLibrary.sections[this.currentSection].videos[this.currentIndex];
  }

  playVideo() {

    console.log('play event')
    this.api.play();
  }

  onClickPlaylistItem(item: IMedia, index: number, sectionIndex: number) {
    console.log('play from here')
    this.currentSection = sectionIndex;
    this.currentIndex = index;
    this.currentItem = item;
  }

}
