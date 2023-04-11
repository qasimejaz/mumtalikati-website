import { Component, Input, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { getstatusType } from '../models/enums';
import { OwnerPropertyMasterIndiviualUnits } from '../models/ownerPropertyMasterIndiviualUnits.model';

@Component({
  selector: 'app-unitcategorylist',
  templateUrl: './unitcategorylist.component.html',
  styleUrls: ['./unitcategorylist.component.scss']
})
export class UnitcategorylistComponent implements OnInit {
 @Input() property: OwnerPropertyMasterIndiviualUnits[] = []
 @Input()  listingPurposeID!: number;
 @Input()  landLordID!: number;
  constructor( private router: Router) { }
  ngOnInit(): void {
  }
  onclick(propertyMasterID: number, propertyUnitID: number, unitCategoryID: number, landLordID: number, statuss: number, propertySubTypeId: number, caption:string) {
    if (propertySubTypeId == 15) {
      this.router.navigate(['plotdetails'],
        {
          queryParams: { 'propertyMasterID': propertyMasterID, 'propertyUnitID': propertyUnitID, 'unitCategoryID': unitCategoryID, 'landlordid': landLordID, 'status': statuss, 'listingPurposeID': this.listingPurposeID,'PropertySubTypeID': propertySubTypeId,'caption':caption  },
          state: {  'PropertySubTypeID': propertySubTypeId, 'caption':caption }
        });
    } else {
      this.router.navigate(['propertyfulldisplay'],
        {
          queryParams: { 'propertyMasterID': propertyMasterID, 'propertyUnitID': propertyUnitID, 'unitCategoryID': unitCategoryID, 'landlordid': landLordID, 'status': statuss,'listingPurposeID': this.listingPurposeID,'PropertySubTypeID': propertySubTypeId, 'caption':caption },
          state: { 'listingPurposeID': this.listingPurposeID, 'PropertySubTypeID': propertySubTypeId, 'caption':caption}
        });
    }

  }
  getstutus(stutuss: number) {
    return getstatusType(stutuss);
  }
}
