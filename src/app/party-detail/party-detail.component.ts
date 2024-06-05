import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { partyDetails } from '../modal/interface';

@Component({
  selector: 'app-party-detail',
  templateUrl: './party-detail.component.html',
  styleUrls: ['./party-detail.component.scss'],
})
export class PartyDetailComponent implements OnInit {
  partyId: any;
  partyDetail!: partyDetails;

  constructor(
    private aroute: ActivatedRoute,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit(): void {
    const partyId = this.aroute.queryParamMap.subscribe((res: any) => {
      this.partyId = res?.params;
      console.log(this.partyId);
    });

    this.getPartyDetailById();
  }

  getPartyDetailById() {
    this.http
      .get(environment.baseurl + 'party/?id=' + this.partyId.id)
      .subscribe((res: any) => {
        console.log('details', res);
        this.partyDetail = res;
        // this.addressDetail = res.address;
      });
  }

  onBackClick() {
    this.location.back();
  }
}
