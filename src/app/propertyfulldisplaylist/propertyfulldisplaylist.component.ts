import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { assetUrl } from 'src/single-spa/asset-url';
import { getPropertyUnitCategoryEnum, getstatusType, listingPurposeTypeEnum } from '../models/enums';
import { OwnerRentDetail } from '../models/ownerRentDetailmodel';
import { PropertyFeature } from '../models/propertyfeature';
import { Clipboard } from '@angular/cdk/clipboard';
import { ProfileImage } from '../models/profileImage.model';
import Splide from '@splidejs/splide';
import { State } from '../models/state.model';
@Component({
  selector: 'app-propertyfulldisplaylist',
  templateUrl: './propertyfulldisplaylist.component.html',
  styleUrls: ['./propertyfulldisplaylist.component.scss']
})
export class PropertyfulldisplaylistComponent implements OnInit {
  @Input() propertyDetail: OwnerRentDetail;
  @Input() propertyFeature: PropertyFeature[] = []
  location = assetUrl("icons/location.svg");
  areaimg = assetUrl("icons/Area.svg");
  phoneicon = assetUrl("icons/phoneicon.png");
  copyIcon = assetUrl("icons/copyicon.png");
  bedroomimg = assetUrl("icons/Bedroom.svg");
  washroomimg = assetUrl("icons/Washroom.svg");
  kitchen = assetUrl("icons/kitchen.png");
  hall = assetUrl("icons/hall.png");
  favoriteicon = assetUrl("icons/favoriteicon.png");
  bydefault = assetUrl('img/bydefault.png');
  defaultperfile = assetUrl('img/landlord-bydefault.png');
  loading: boolean = true
  @Input() unitcatID!: number;
  @Input() statuss!: number;
  @Input() PropertySubTypeID: any;
  @Input() propertyUnitid!: number;
  @Input() pmid!: number
  @Input() landlordid!: number;
  @Input() imageUser!: ProfileImage;
  @Input() unitcategorydesc!: string;
  @Input() propertysubdesc!: string;
  @Input() propertyMasterSubType!: number;
  @Input() unitsid!: number
  @Input() sharedmodel = new State
  closeResult = '';
  constructor(private modalService: NgbModal, private clipboard: Clipboard) { }
  mainSlider: Splide;
  thumbnailSlider: Splide;
  ngOnInit() {
  
  }
  ngAfterViewInit(){
    if (this.propertyDetail && this.propertyDetail.imageString.length > 0) {
      this.mainSlider = new Splide('#main-slider', {
        type: 'loop',
        heightRatio: 0.5,
        pagination: true,
        arrows: false,
        cover: true,
        autoplay: true,
        width: '100%',
       
      });
      this.mainSlider.mount();
      this.thumbnailSlider = new Splide('#thumbnail-slider', {
        rewind: true,
        fixedWidth: 100,
        fixedHeight: 58,
        isNavigation: true,
        gap: 10,
        focus: 'center',
        pagination: false,
        cover: true,
        dragMinThreshold: {
          mouse: 4,
          touch: 10,
        },
        breakpoints: {
          640: {
            fixedWidth: 100,
            fixedHeight: 55,
          },
        },
      });
      this.thumbnailSlider.mount();
      this.mainSlider.sync(this.thumbnailSlider);
    } 
  }

  getlist(listid: any) {
    return listingPurposeTypeEnum(listid)
  }
  getpropertyunitCategoryid(unitcatID: number) {
    return getPropertyUnitCategoryEnum(unitcatID)
  }
  getstatus(statuss: number) {
    return getstatusType(statuss)
  }
  toggleReadMore(property: any) {
    property.isExpanded = !property.isExpanded;
  }
  oncallclick(call: any, phone: number) {
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    let phoneNumber = phone;
    console.log(phone)
    if (isMobile) {
      window.open(`tel:${phone}`);
    } else {
      this.modalService.open(call, { centered: true }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
    }
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  closepop() {
    this.modalService.dismissAll();
  }
  copyHeroName(el: HTMLDivElement) {
    this.clipboard.copy(el.innerText);
  }
  redirectToWhatsApp(contact: number) {
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    let phoneNumber = contact;
    let message = `https://www.mumtalikati.com/propertyfulldisplay?unitCategory=${this.unitcategorydesc}&PropertySubTyp=${this.propertysubdesc}&propertyMaster=${this.pmid}&propertyUnit=${this.propertyUnitid}&landlord=${this.landlordid}`;
    if (isMobile) {
      window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    } 
     else {
      window.open(`https://wa.me/?phone=${phoneNumber}&text=${encodeURIComponent(message)}`);
    }
  }
 

}
