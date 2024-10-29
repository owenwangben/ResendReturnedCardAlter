import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable()
export class LocalAuthGuard implements CanActivate {
	public constructor(
		private router: Router
	) {
	}

	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (!sessionStorage.getItem("BONUS2018Q1.ID")) {
			this.router.navigate(["/Reward/Bonus2018Q1/Verification"], { queryParams: { return: state.url, t: Date.now().toString() }});
			return false;
		}
		return true;
	}
}
