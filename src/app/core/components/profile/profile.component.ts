import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from './mime-type.validator';
import { AuthService } from '../../auth.service';
import { SnackbarService } from 'src/app/shared/components/snackbar.service';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  enteredTitle = '';
  enteredContent = '';
  // post: Post;
  isLoading = false;
  form: FormGroup;
  formPassword: FormGroup;
  userDetailForm: FormGroup;
  imagePreview: string;
  profileImagePath: string = ''
  private mode = 'create';
  private postId: string;
  step = 0;

  constructor(
    public authService: AuthService,
    public route: ActivatedRoute,
    private snackbarService: SnackbarService
  ) { }

  

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnInit() {

    this.authService.getProfile()
      .subscribe((response: any) => {
        console.log(response);

        this.profileImagePath = response.data.photo

        this.userDetailForm.patchValue({
          name: response.data.name,
          email: response.data.email
        })

      });


    this.userDetailForm = new FormGroup({
      name: new FormControl({ value: null, disabled: true }, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      email: new FormControl({ value: null, disabled: true }, {
        validators: [Validators.required, Validators.minLength(3)]
      }),

    });

    this.formPassword = new FormGroup({
      currentPassword: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      newPassword: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      })
    });

    this.form = new FormGroup({
      // title: new FormControl(null, {
      //   validators: [Validators.required, Validators.minLength(3)]
      // }),
      // content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(this.authService.profileImagePath, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    // this.form.patchValue({ image: file });
    this.profileImagePath = this.authService.profileImagePath;
    // reader.readAsDataURL(file);
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        // this.postsService.getPost(this.postId).subscribe(postData => {
        //   this.isLoading = false;
        //   // this.post = {
        //   //   id: postData._id,
        //   //   title: postData.title,
        //   //   content: postData.content,
        //   //   imagePath: postData.imagePath
        //   // };
        //   // this.form.setValue({
        //   //   title: this.post.title,
        //   //   content: this.post.content,
        //   //   image: this.post.imagePath
        //   // });
        // });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  editUserDetails() {
    this.userDetailForm.controls['name'].enable();
    this.userDetailForm.controls['email'].enable();

    
    // this.snackbarService.show('Show this message on top', 5000, 'right', 'top');
  }

  changeUserDetail() {
    if (this.userDetailForm.invalid) {
      return;
    }
    this.isLoading = true;
    console.log(this.userDetailForm.value)
    this.authService.updateProfileDetails(this.userDetailForm.value)
    .pipe(
      finalize(() =>this.isLoading = false),
    )
      .subscribe((res: any) => {
        console.log(res);
        if (res.success) {
          console.log(res)
          this.userDetailForm.controls['name'].disable()
          this.userDetailForm.controls['email'].disable()
          this.snackbarService.show('Details Updated!!');
        }

      })
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    console.log(this.form.value)
    // if (this.mode === 'create') {
    this.authService.uploadPhoto(
      // this.form.value.title,
      // this.form.value.content,
      this.form.value.image
    )
    .pipe(
      finalize(() =>this.isLoading = false),
    )
    
    .subscribe((res: any) => {
      console.log(res)
      if(res.success){
        this.snackbarService.show('Profile pic successfully uploaded. ')
        console.log(res.data)
        this.profileImagePath = res.data
        this.imagePreview = undefined;
        // this.authService.authStatusListener.next(true);
        

      }
      // const post: Object = {
      //   id: responseData.post.id,
      //   title: title,
      //   content: content,
      //   imagePath: responseData.post.imagePath
      // };
      // this.posts.push(post);
      // this.postsUpdated.next([...this.posts]);
      // this.router.navigate(['/']);
    });
    // } else {
    //   this.postsService.updatePost(
    //     this.postId,
    //     this.form.value.title,
    //     this.form.value.content,
    //     this.form.value.image
    //   );
    // }
    this.form.reset();
  }
  onChangePassword() {
    if (this.formPassword.invalid) {
      return;
    }
    this.isLoading = true;
    console.log(this.formPassword.value)
    this.authService.changePassword(this.formPassword.value)
    .pipe(
        finalize(() => {
          this.isLoading = false;
          this.formPassword.reset();
        })
      )
      .subscribe((res: any) => {
        console.log(res);
        
        if (res.success) {
          console.log(res)
          this.snackbarService.show('Password Changed Successfully!!');
        }
        else{
          this.snackbarService.show('Password change failed!!');
        }

        // this.formPassword.reset();
      },
      err => {
        console.error('Observer got an error: ' + err);
        this.snackbarService.show('Password change failed!!');
      }
      )
      
  }
}
