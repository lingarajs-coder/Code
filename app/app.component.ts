import { Component } from '@angular/core';
import { AppService } from './app.service';
import {FormBuilder, FormControl, FormArray, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coding';
  dataLoading: boolean = true;
  products;
  productForm: FormGroup;
  showForm: boolean = false;

  constructor( public appService: AppService, public fb: FormBuilder ) {
    this.appService.getProducts().subscribe((data) => {
      this.products = data;
      this.dataLoading = false;
      console.log(this.products);
    });
    
  }

  addProduct(url) {
    this.appService.getMoreDetails(url).subscribe((data:any[]) => {
      console.log(data);
      
      this.productForm = this.fb.group({
        options: this.fb.array([])
      });      

      data.forEach((item) => {      
        
        let opt = this.fb.group({
          caption: item.caption,
          defaultValue: [item.defaultValue],
          type: item.type,
          validationMessage: item.validationMessage
        });

        if (item.mandatory) {
          opt.controls.defaultValue.setValidators(Validators.required);
        }

        (this.productForm.controls.options as FormArray).push(opt);
        this.showForm = true;
      });      
      
    })
  }

  processForm() {
    console.log(this.productForm);
  }

  getType(type) {
    if (type == 'text') {
      return 'text'
    } else if (type == 'int') {
      return 'number'
    } else if (type == 'bool') {
      return 'checkbox'
    }
  }
}
