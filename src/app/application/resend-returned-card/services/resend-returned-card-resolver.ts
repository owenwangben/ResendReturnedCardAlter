import { Resolve , ActivatedRouteSnapshot , RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { ErrorPageService, MemoryStorage } from 'app/shared/shared.module';
import { ResendReturnedCardService } from "./resend-returned-card.service";

@Injectable()
export class ResendReturnedCardResolver implements Resolve<any> {

    constructor(private ResendReturnedCardService: ResendReturnedCardService,
                private errorPageService: ErrorPageService
    ){}

    async resolve( route:ActivatedRouteSnapshot , state:RouterStateSnapshot){
        const response = await this.ResendReturnedCardService.getData();
        if(this.errorPageService.validateResponse(response)){
            return response.Result;
        }
        return null;
    }
    
}
