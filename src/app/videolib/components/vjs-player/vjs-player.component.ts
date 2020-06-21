import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { IMedia, VideoLibrary } from 'src/app/shared/interfaces';
import { VgAPI } from "ngx-videogular";
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from 'src/app/core/services/video.service';
import { SnackbarService } from 'src/app/shared/components/snackbar.service';
import { AuthService } from 'src/app/core/auth.service';
import { WindowRefService } from '../../window-ref.service';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-vjs-player',
  templateUrl: './vjs-player.component.html',
  styleUrls: ['./vjs-player.component.css']
})
export class VjsPlayerComponent implements OnInit {


  videoLibrary: VideoLibrary

  currentIndex = 0;
  currentItem: IMedia;
  api: VgAPI;
  step= 1;


  constructor(private winRef: WindowRefService, public route: ActivatedRoute,  public router: Router, public videoService: VideoService, private snackbarService: SnackbarService, public authService: AuthService) {}

  // @HostListener('contextmenu', ['$event'])
  // onRightClick(event) {
  //   event.preventDefault();
  // }

  ngOnInit(): void {


    this.route.params
      .subscribe(params => {
        console.log(params);
        this.videoService.fetchVideoByTitle(params.title)
          .subscribe((res: any) => {
            console.log(res)
            if(res.success){
              console.log(res.data);
              this.videoLibrary = res.data
              this.currentItem = this.videoLibrary.sections[0].videos[this.currentIndex];
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
    // this.api
    //   .getDefaultMedia()
    //   .subscriptions.ended.subscribe(this.nextVideo.bind(this));


      // console.log(this.api.getDefaultMedia().isCompleted)
      // console.log(this.api.getDefaultMedia().currentTime)
  }

  // nextVideo() {
  //   console.log('loading next video...')
  //   // this.

  //   this.videoLibrary.sections[0].videos[this.currentIndex].completed = true 
  //   this.currentIndex++;

  //   if (this.currentIndex === this.videoLibrary.sections[0].videos.length) {
  //     this.currentIndex = 0;
  //   }

  //   this.currentItem = this.videoLibrary.sections[0].videos[this.currentIndex];
  // }

  playVideo() {

    console.log('play event')
    this.api.play();
  }

  onClickPlaylistItem(item: IMedia, index: number) {

    console.log('play from here')

    this.currentIndex = index;
    this.currentItem = item;
  }


  enroll(){
    this.api.pause();
    let price = this.videoLibrary.price - (this.videoLibrary.price * (this.videoLibrary.discount/100))
    this.createRzpayOrder(price); 
  }


  createRzpayOrder(price: number) {
    // console.log();
    // call api to create order_id
    this.authService.createOrder({amount: price, currency: 'INR', receipt: 'dsfjdk'})
    .subscribe((res:any)=>{
      console.log(res)
      if(res.success){
        this.payWithRazor(res.data.id, res.data.amount,res.data.currency );
      }
      else{
        this.snackbarService.show('Some issue with initiating payment. Please try after some time')
      }
      
    })
    
  }

  payWithRazor(order_id: string, amount: number, currency: string ) {

    

    const options: any = {
      key: 'rzp_test_Drq9fdXRaBrYdv',
      amount: amount, // amount should be in paise format to display Rs 1255 without decimal point
      currency: currency,
      name: '', // company name or product name
      description: '',  // product description
      image: './assets/logo.png', // company logo or product image
      order_id: order_id, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#0c238a'
      }
    };
    options.handler = ((response, error) => {
      options.response = response;
      console.log(response);
      console.log(options);
      // call your backend api to verify payment signature & capture transaction
      this.authService.verifyOrder({razorpay_order_id: order_id, razorpay_payment_id: response.razorpay_payment_id, razorpay_signature: response.razorpay_signature, amount: options.amount, currency: options.currency})
      .subscribe((res: any)=>{
        console.log(res);
        if(res.success){
          this.videoService.enrollUser(this.videoLibrary._id)
          .subscribe((res: any)=>{
            if(res.success){
              this.snackbarService.show('Succesfully enrolled to course');
            }
          });
        }
      })
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }

}
