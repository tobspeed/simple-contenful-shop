import {Component} from '@angular/core';
import {ContentfulService} from "./contentful.service";
import {Entry} from "contentful";
import {environment} from './../environments/environment';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mika Am Markt';

  products: Entry<any>[] = [];
  productsFilteredByProductCategories = [];
  productCategories: Entry<any>[] = [];
  selectedProductCategories: string[] = [];
  email = environment.contact.email;

  constructor(private contentfulService: ContentfulService) {
  }

  ngOnInit() {
    this.loadProductCategories();
    this.loadProducts();
  }

  /**
   * Add category if not seleCted or remove it if selected,
   *
   * @param productCategoryName
   */
  onProductCategoryClicked(productCategoryName: any) {
    let isSelected = this.selectedProductCategories.indexOf(productCategoryName);

    if (isSelected !== -1) {
      this.selectedProductCategories.splice(isSelected, 1);
    } else {
      this.selectedProductCategories.push(productCategoryName);
    }
    this.onSelectedProductCategoryChanged();
  }

  onSelectedProductCategoryChanged() {
    if(this.selectedProductCategories.length === 0) {
      this.productsFilteredByProductCategories = this.products;
    } else {
      this.filterProductsByProductsCategories();
    }
  }

  private filterProductsByProductsCategories() {
    this.productsFilteredByProductCategories = this.products.filter(product => {
      return product.fields.categories
      .filter(
        category => {
          return this.selectedProductCategories.indexOf(category.fields.name) !== -1;
        }
      ).length > 0;
    });
    console.log(this.products.length);
  }

  private loadProductCategories() {
    this.contentfulService
    .getProductCategories({})
    .then(productCategories => this.productCategories = productCategories);
  }

  private loadProducts() {
    this.contentfulService
    .getProducts({})
    .then(products => {
        this.products = products;
        this.productsFilteredByProductCategories = products;
      }
    )
  }

}
