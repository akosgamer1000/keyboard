import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Address } from 'cluster';
import { Response } from 'express';
import { AddressDTO } from './addres.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }
  @Get("selection")
  @Render("Termék")
  Termék(){

  }
  @Get("Urlap")
  @Render("urlap.ejs")
  Urlap(){
    return {
      data:{},
      errors:[]
    }
  }
  @Post("Urlap")
  Urlap2(@Body() data:AddressDTO,@Res() res:Response){
      let errors:string[]=[]
      if(!data.cardNumber || !data.couponCode || !data.expirationDate || !data.name || !data.securityCode || !data.szal_city || !data.szal_country||!data.szal_postalCode||!data.szal_streetAndNumber||!data.szam_city||!data.szam_country||!data.szam_postalCode||!data.szam_streetAndNumber){
        errors.push("minden adatnak meg kell lenie")
      }
      if(!/^[A-Z]{2}-\d{4}$/.test(data.couponCode)){
        errors.push("nem jó a kuponkod formátum a formátum lenne B-SSSS")
      }
      if(!/\d{4}-\d{4}-\d{4}-\d{4}$/.test(data.cardNumber)){
        errors.push("nem jó a bankártya formátum (XXXX-XXXX-XXXX)")
      }
      if(!/^\d{3}$/.test(data.expirationDate)){
        errors.push("nem jó lejárati formátum ami jó lenne ")
      }
      if(errors.length>0){
          res.render("urlap.ejs",{data,errors})
      }
      res.redirect(303,"/sikeres")
  }
  @Get("sikeres")
  @Render("sikeres")
  sik(){

  }
}
