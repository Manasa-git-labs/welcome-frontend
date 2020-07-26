import { ActiveUser } from "./../../models/ActiveUser";
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
  activeUsers: ActiveUser[];
  size: number;
  constructor(
    private _authenticationService: AuthenticationService,
    private _matSnackBar: MatSnackBar,
    private _router: Router
  ) {
    this.firstName = localStorage.firstName;
  }

  ngOnInit() {
    this._authenticationService.autoRefesh.subscribe(() => {
      this.getAllActiveUsers();
    });
    this.getAllActiveUsers();
  }

  logOut() {
    this._authenticationService.logOutUser(localStorage.token).subscribe(
      (response: any) => {
        console.log("response: ", response);
        this.size = this.activeUsers.length;
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

  getAllActiveUsers() {
    this._authenticationService.getAllActiveUsers().subscribe(
      (response: any) => {
        console.log("responses : ", response);
        this.activeUsers = response.list;
        // console.log("active users: ", this.activeUsers);
      },
      (errors: any) => {
        console.log("errors: ", errors);
      }
    );
  }
}
