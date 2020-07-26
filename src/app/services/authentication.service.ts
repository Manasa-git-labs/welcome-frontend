import { Registration } from "./../models/registration";
import { HttpService } from "./http.service";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private _subject = new Subject<any>();
  constructor(private _httpService: HttpService) {}

  private registrationUrl: string = `${
    environment.USER_API_URL + environment.REGISTRATION_URL
  }`;

  private verificationUrl: string = `${
    environment.USER_API_URL + environment.ACTIVATE_ACCOUNT_URL
  }`;

  private loginUrl: string = `${
    environment.USER_API_URL + environment.LOGIN_URL
  }`;

  private signOutUserUrl: string = `${
    environment.USER_API_URL + environment.LOG_OUT_USER
  }`;

  private getAllActiveUsersUrl: string = `${
    environment.USER_API_URL + environment.ACTIVE_USERS_URL
  }`;

  public get autoRefesh() {
    return this._subject;
  }

  public registration(registrationDto: Registration): Observable<any> {
    console.log("registration service reached : ", this.registrationUrl);
    return this._httpService.postMethod(
      this.registrationUrl,
      registrationDto,
      ""
    );
  }

  public activateUser(token: string): Observable<any> {
    return this._httpService.putMethod(
      `${this.verificationUrl}/${token}`,
      "",
      ""
    );
  }

  public login(loginDto: any): Observable<any> {
    console.log("fetching loginUrl : ", this.loginUrl);
    return this._httpService.postMethod(this.loginUrl, loginDto, "");
  }

  public logOutUser(token: string): Observable<any> {
    console.log("Inside service of logout.");
    return this._httpService.patchMethod(
      `${this.signOutUserUrl}/${token}`,
      "",
      ""
    );
  }

  public getAllActiveUsers(): Observable<any> {
    console.log("fetching active users service : ");
    return this._httpService.getMethod(this.getAllActiveUsersUrl, "");
  }

  isLoggedIn() {
    if (localStorage.getItem("token")) return true;
  }
}
