import { MatTableDataSource } from '@angular/material/table';
import { ApplicationServiceService } from '../core/Service/application-service.service';
import { ConfirmDialogComponent } from './../Dialog-Box/confirm-dialog/confirm-dialog.component';
import { DialogDataComponent } from './../Dialog-Box/dialog-data/dialog-data.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from '../core/Service/cart.service';
import { Component, OnInit, ViewChild, ElementRef, TemplateRef, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public products : any = [];
  pageLength:any;
  public totalSum : number = 0;
  isChecked : boolean;
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
  found : any;
  matFlag: boolean = false;
  dataSource : MatTableDataSource<any>;
  showFlagSpinner: boolean = true;
  displayedColumns: any = ['title', 'productImage', 'description', 'price', 'quantity', 'total', 'remove'];

  constructor(private applicationService: ApplicationServiceService, 
    private dialog: MatDialog, private cartService: CartService, private router: Router) { 

      setTimeout(() =>{
        this.showFlagSpinner = false;
      },3000);
  
      this.showFlagSpinner = true;
      this.cartService.getProduct().subscribe(res=>{
      this.products = res;
      this.dataSource = new MatTableDataSource<any>(this.products);
      sessionStorage.setItem('DATA_SOURCE',  JSON.stringify(this.products));
      this.totalSum = this.cartService.getTotalPrice();
      if(this.products.length === 0){
        sessionStorage.clear();
      }  
    })
}
  
  ngAfterViewInit(): void {
    setTimeout(() =>{
      this.matFlag = true;
      this.dataSource.paginator = this.paginator;
      this.pageLength = this.dataSource.filteredData.length;
    },2000);
  }
  
  ngOnInit(): void {
    // this.setPagination();
  }

  sortChange(event: any){
    this.dataSource.sort = this.sort;
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
    console.log(this.sortColumn);
    console.log(this.sortDirection);
  }


  setPagination(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.pageLength = this.dataSource.filteredData.length;
  }


  removeItem(item: any, index: any)
  {
    console.log(item);
    this.cartService.removeCartItem(item, index);
  }

  onMainPage()
  {
   this.router.navigate(['mainPage'])
  }

  onEditDetail()
  {
     this.dialog.open(ConfirmDialogComponent, {
      data :{
        isChecked: 'true',
        isUnChecked: 'false'
      },
      height: '220px',
      width: '480px',
    })

    this.applicationService.checked.subscribe(event =>{
      this.isChecked = event;
      if(this.isChecked)
      {
        // sessionStorage.setItem('CONFIRM', JSON.stringify(confirmDialog));
        this.dialog.open(DialogDataComponent, {
          height: '600px',
          width: '800px',
        });
      }
      else
      {sessionStorage.removeItem('CONFIRM');}
    })

  }
}
