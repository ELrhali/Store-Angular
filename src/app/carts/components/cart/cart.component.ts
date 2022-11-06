import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartProducts:any[]=[]
  total:any=0
  success:boolean=false
  producttotal:any=0
  constructor(private service:CartsService) { }

  ngOnInit(): void {
    this.getCartProducts()

  }
  //list all cart products
  getCartProducts(){
    if("cart" in localStorage){
      this.cartProducts=JSON.parse(localStorage.getItem("cart")!)
      }

      this.getCartTotla()
    }
    //add amount
    addAmount(index:number){
      this.cartProducts[index].quantity++
      this.getCartTotla()
      localStorage.setItem("cart",JSON.stringify(this.cartProducts))

    }
     //mins amount
    minsAmount(index:number){
      if(this.cartProducts[index].quantity > 0){
      this.cartProducts[index].quantity--
      this.getCartTotla()
      localStorage.setItem("cart",JSON.stringify(this.cartProducts))}

    }
    //detect amount input chage
    detectChange(){

      this.getCartTotla()
      localStorage.setItem("cart",JSON.stringify(this.cartProducts))


    }
    //delete product
    deleteProduct(index:number){
      this.cartProducts.splice(index,1)
      this.getCartTotla()
      localStorage.setItem("cart",JSON.stringify(this.cartProducts))


    }
    // get items price total
    getCartTotla(){
      this.total=0
      for(let x in this.cartProducts){
        if(this.total>=0){
        this.total +=this.cartProducts[x].item.price * this.cartProducts[x].quantity;}



      }

    }
    //clear all carts
    clearCart(){
      if(confirm("sure !!")){
        this.cartProducts=[]
        this.getCartTotla()
      localStorage.setItem("cart",JSON.stringify(this.cartProducts))

      }

    }
    addCart(){
      let products= this.cartProducts.map(item =>{
        return{
          productId:item.item.id , quantity:item.quantity
        }
      })
      let model ={
        userId:5,
        date: new Date(),
        products:products
      }
      this.service.createNewCart(model).subscribe((res:any)=>{
        this.success= true

      })
      console.log(model)
    }

  }
