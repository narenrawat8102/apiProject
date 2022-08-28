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
  @ViewChild('userForm') userForm!: NgForm;

  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // this.onAddUser();
    this.onFetchUsers();
  }

  // Method to Add Users
  onAddUser(userData: User) {
    // console.log(userData);
    this.users.push(userData);
    this.userService.addUsers(userData).subscribe((response) => {
      console.log(response);
    });
  }

  // Method to Fetch Products
  onFetchUsers() {
    this.userService.fetchUsers().subscribe((userResponse) => {
      this.users = userResponse;
    });
  }

  // Method to Delete Products
  onDeleteUser(userId: any) {
    if (confirm('Do you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.onFetchUsers();
      });
    }
  }

  // Method to Edit Products
  onEditProduct(index: number) {}
}
