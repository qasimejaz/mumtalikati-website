import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { assetUrl } from 'src/single-spa/asset-url';
import { getPropertyUnitCategoryEnum, getstatusType, listingPurposeTypeEnum } from '../models/enums';
import { OwnerRentDetail } from '../models/ownerRentDetailmodel';
import { PropertyFeature } from '../models/propertyfeature';
import { Clipboard } from '@angular/cdk/clipboard';
import { ProfileImage } from '../models/profileImage.model';
import { file } from '@rxweb/reactive-form-validators';
import Splide from '@splidejs/splide';
@Component({
  selector: 'app-propertyfulldisplaylist',
  templateUrl: './propertyfulldisplaylist.component.html',
  styleUrls: ['./propertyfulldisplaylist.component.scss']
})
export class PropertyfulldisplaylistComponent implements OnInit {
  @Input() propertyDetail: OwnerRentDetail[] = [];
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
  @Input() unitcatID!: number;
  @Input() caption!: number;
  @Input() statuss!: number;
  @Input() imgindex: number = 0;
  @Input() listpurID!: any;
  @Input() PropertySubTypeID: any;
  @Input() propertyUnitid!: number;
  @Input() pmid!: number
  @Input() landlordid!: number;
  @Input() imageUser!: ProfileImage;
  closeResult = '';
  numVisible = 4;
  startIndex = 0;
  greaterbutton: boolean = false;
  lessthenbutton: boolean = false;
  constructor(private modalService: NgbModal, private el: ElementRef, private cdr: ChangeDetectorRef, private clipboard: Clipboard,) { }
  mainSlider!: Splide;
  thumbnailSlider!: Splide;
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.mainSlider = new Splide('#main-slider', {
      type: 'loop',
      heightRatio: 0.5,
      pagination: true,
      arrows: false,
      cover: true,
   
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
  
  getlist(listid: any) {
    return listingPurposeTypeEnum(listid)
  }
  getpropertyunitCategoryid(unitcatID: number) {
    return getPropertyUnitCategoryEnum(unitcatID)
  }
  getstatus(statuss: number) {
    return getstatusType(statuss)
  }
  imagechange(i: any) {
    this.imgindex = i;
  }
  lessthen(imglist: any, index: any) {
    // this.startIndex = (this.startIndex + 1) % imglist.length;
    var lengthList = imglist.length
    lengthList = lengthList - 1
    if (index == -1) {
    
      index = 0;
      // this.lessthenbutton = true;
    }
    if (index < lengthList) {

      this.imgindex = index
      // this.lessthenbutton = false

    }

    else if (index = lengthList) {
      this.imgindex = index;
      // this.greaterbutton = true
    }

  }
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    if (window.innerWidth < 768) {
      this.numVisible = 3;
    } else if (window.innerWidth < 992) {
      this.numVisible = 4;
    } else {
      this.numVisible = 10;
    }
  }
  onClickNext() {
    // this.startIndex = (this.startIndex + 1) % this.images.length;
  }
  oncallclick(call: any) {

    this.modalService.open(call, { centered: true }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
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
    let message = `https://www.mumtalikati.com/propertyfulldisplay?propertyMasterID=${this.pmid}&unitCategoryID=${this.unitcatID}&propertyUnitID=${this.propertyUnitid}&landlordid=${this.landlordid}&listingPurposeID=${this.listpurID}&PropertySubTypeID=${this.PropertySubTypeID}&caption=${this.caption} `;

    if (isMobile) {
      window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    } else {
      window.open(`https://wa.me/?phone=${phoneNumber}&text=${encodeURIComponent(message)}`);
    }
  }
}