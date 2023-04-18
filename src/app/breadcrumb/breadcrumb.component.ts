import { Component, Input, OnInit } from '@angular/core';
import { propertyMasterTypeEnum } from '../models/enums';
import { OwnerPropertyMasterIndiviualUnits } from '../models/ownerPropertyMasterIndiviualUnits.model';
import { Router } from '@angular/router';
import { SetupService } from '../services/setup.service';
import { Governorate } from '../models/governorate.model';
import { AnyFunction } from '@splidejs/splide';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() indiviualsUni: OwnerPropertyMasterIndiviualUnits[] = [];
  @Input() propertyMasterTypeID!: number;
  @Input() unitcategoryid!: number;
  @Input() listingPurposeID!: any;
  @Input() propertyMasterID!: number;
  @Input() governorateid!: number;
  @Input() subTypeId!: number;
  // @Input() maxValue!: number;
  // @Input() minValue!: number;
  // governorate: Governorate[] = [];
  governorateName!: any
  constructor(private router: Router, private setservice: SetupService) { }
  ngOnInit(): void {
    // this.setservice.getGovernorate().then((data) => {
    //   this.governorate = data.find(x => x.countryID == this.governorateid)
    // })
  }
  getenum(propertyMasterTypeID: number) {
    return propertyMasterTypeEnum(propertyMasterTypeID)
  }
  backtosearch() {
    debugger
    this.router.navigate(['propertydetails'],
      { queryParams: { 'purpose': this.listingPurposeID, 'unitCategory': this.unitcategoryid} });
    // state: { 'listingPurposeID': this.listingPurposeID, 'propertyMasterTypeID': this.propertyMasterTypeID, 'governorateid': this.governorateid, 'unitcategoryid': this.unitcategoryid, 'subTypeId': this.subTypeId ,'maxValue':this.maxValue, 'minValue':this.minValue}
  }
}
