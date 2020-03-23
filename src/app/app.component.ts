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
  searchTerm = "";

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
      this.filterProductsByProductsCategoriesAndSearchTerm();
    }
  }

  private filterProductsByProductsCategoriesAndSearchTerm() {
    let allProducts = this.products;
    let searchTerm = this.searchTerm.toLowerCase();

    if(this.searchTerm.length >= 0) {
      allProducts = allProducts.filter(product => {
          console.log(product.fields.name.toLowerCase().includes(searchTerm));
          return product.fields.name.toLowerCase().includes(searchTerm) ||
            (product.fields.additionalInformation && product.fields.additionalInformation.toLowerCase().includes(searchTerm ))
      });
    }


    if(this.selectedProductCategories.length !== 0) {
      this.productsFilteredByProductCategories = allProducts.filter(product => {
        return product.fields.categories
        .filter(
          category => {
            return this.selectedProductCategories.indexOf(category.fields.name) !== -1;
          }
        ).length > 0;
      });
    } else {
      this.productsFilteredByProductCategories = allProducts;
    }

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

  onSearchTermChanged() {
    this.filterProductsByProductsCategoriesAndSearchTerm();
  }

  clearAllSearchFilter() {
    this.selectedProductCategories = [];
    this.searchTerm = "";
    this.filterProductsByProductsCategoriesAndSearchTerm();
  }
}
