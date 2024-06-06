import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-party-management',
  templateUrl: './party-management.component.html',
  styleUrls: ['./party-management.component.scss'],
})
export class PartyManagementComponent implements OnInit {
  tableData: any[] = [];
  showLoader = false;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.getPartyDetails();
  }

  onLogoutClick() {
    if (confirm('Are you sure')) {
      this.http.post(environment.baseurl + 'logout/', null).subscribe((res) => {
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      });
    }
  }

  getPartyDetails() {
    this.showLoader = true;
    this.http.get(environment.baseurl + 'party/').subscribe((res: any) => {
      this.showLoader = false;
      this.tableData = res;
    });
  }

  onAddPartyClick() {
    this.router.navigate(['/add-party-detail']);
  }

  onDeleteClick(id: any) {
    if (confirm('Are you sure you want to delete this')) {
      this.http
        .delete(environment.baseurl + 'party/?id=' + id)
        .subscribe((res) => {
          location.reload();
        });
    }
  }

  onViewClick(id: any) {
    this.router.navigate(['/party-detail'], {
      queryParams: {
        id: id,
      },
    });
  }

  onEditClick(id: any) {
    this.router.navigate(['/add-party-detail'], {
      queryParams: {
        id: id,
      },
    });
  }
}
