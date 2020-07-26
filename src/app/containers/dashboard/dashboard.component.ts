import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  firstName: string;
  constructor(
    private _authenticationService: AuthenticationService,
    private _matSnackBar: MatSnackBar,
    private _router: Router,
    private _spinner: NgxSpinnerService
  ) {
    this.firstName = localStorage.firstName;
  }

  ngOnInit() {}

  logOut() {
    this._authenticationService.logOutUser(localStorage.token).subscribe(
      (response: any) => {
        console.log("response: ", response);
        this._matSnackBar.open(
          "Hallo Mr/s. " + this.firstName + ", " + response.message,
          "ok",
          { duration: 3000 }
        );
        localStorage.clear();
        this._router.navigateByUrl("/login");
      },
      (errors: any) => {
        console.log("errors : ", errors);
      }
    );
  }
}
