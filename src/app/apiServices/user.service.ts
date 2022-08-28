import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'https://apicalls-9376a-default-rtdb.firebaseio.com/users.json';
  userDeleteUrl = 'https://apicalls-9376a-default-rtdb.firebaseio.com/users/';

  constructor(private http: HttpClient) {}

  // Method to Post Users in Database
  addUsers(users: User): Observable<User> {
    return this.http.post<User>(this.url, users);
  }

  // Method to Fetch/Get Users from Database
  fetchUsers(): Observable<User[]> {
    return this.http.get<User>(this.url).pipe(
      map((user: any) => {
        const userArray = [];

        for (const key in user) {
          if (user.hasOwnProperty(key)) {
            userArray.push({ id: key, ...user[key] });
          }
        }

        return userArray;
      })
    );
  }

  // Method to Edit Users in Database
  editUser(userId: any, users: User): Observable<any> {
    return this.http.put<any>(this.userDeleteUrl + userId + '.json', users);
  }

  // Method to Delete Users from Database
  deleteUser(userId: any): Observable<User> {
    return this.http.delete<User>(this.userDeleteUrl + userId + '.json');
  }
}
