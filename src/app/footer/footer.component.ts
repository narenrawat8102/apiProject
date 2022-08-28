import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../apiServices/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  dataTitle = 'UX Users';
  isEditable: boolean = false;
  editUserId: any;
  @ViewChild('userForm') userForm!: NgForm;

  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // this.onAddUser();
    this.onFetchUsers();
  }

  // Method to Add Users
  onAddUser(userData: User) {
    if (this.userForm.valid) {
      if (this.isEditable) {
        this.userService
          .editUser(this.editUserId, userData)
          .subscribe((res) => console.log(res));

        this.onFetchUsers();

        // this.userForm.setValue({
        //   name: '',
        //   technology: '',
        // });
      } else {
        // console.log(userData);
        this.users.push(userData);
        this.userService.addUsers(userData).subscribe((response) => {
          console.log(response);
        });
      }
    } else {
      // ...
    }
  }

  // Method to Fetch Users
  onFetchUsers() {
    this.userService.fetchUsers().subscribe((userResponse) => {
      this.users = userResponse;
    });
  }

  // Method to Edit Users
  onEditUser(userId: any, index: any) {
    // console.log(this.users[index]);
    this.isEditable = true;
    this.editUserId = userId;

    this.userForm.setValue({
      name: this.users[index].name,
      technology: this.users[index].technology,
    });
  }

  // Method to Delete Users
  onDeleteUser(userId: any) {
    if (confirm('Do you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.onFetchUsers();
      });
    }
  }
}
