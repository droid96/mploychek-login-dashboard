import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';
import id from '@angular/common/locales/id';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  apiUrl =
    'http://localhost:5001/api/users';

  constructor(
    private http: HttpClient
  ) {}

  getUsers() {

    return this.http.get(
      this.apiUrl
    );
  }

  addUser(userData: any) {

    return this.http.post(
      this.apiUrl,
      userData
    );
  }

  deleteUser(id: number) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }

  updateUser(
  id: number,
  userData: any
) {

  return this.http.put(
    `${this.apiUrl}/${id}`,
    userData
  );
}
}
