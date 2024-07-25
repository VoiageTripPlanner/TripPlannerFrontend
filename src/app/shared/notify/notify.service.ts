import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  debounceTime,
  fromEvent,
  takeUntil,
} from 'rxjs';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})

export class NotifyService {
  
  onDeleteConfirmation=()=>{

    return Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
    
  };

  onSuccess=()=>{
    Swal.fire({
      title: "All good...",
      text: "Work Done !",
      icon: "success"
    });
  };
  
  onError=()=>{
    Swal.fire({
      title: "Oops...",
      text: "Something went wrong!",
      icon: "error"
    });
  }

  onNoData=()=>{
    Swal.fire({
      title: "Oops...",
      text: "There is no info with these params!",
      icon: "info"
    });
  }

  onNoFormData=()=>{
    Swal.fire({
      title: "Oops...",
      text: "Please complete the form",
      icon: "info"
    });
  }


}