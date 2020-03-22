import {Injectable} from '@angular/core';
import {environment} from './../environments/environment';
import {createClient, Entry} from 'contentful';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  private contentfulClient = createClient(
    {
      space: environment.contentful.spaceId,
      accessToken: environment.contentful.accessToken
    }
  );



  constructor() {
  }

  private getEntries(contentType: string, query?: object) {
    return this.contentfulClient.getEntries(
      Object.assign(
        {
          content_type: contentType
        },
        query
      )
    )
    .then(res => {console.log(res.items); return res.items;});
  }

  getProducts(query?: object): Promise<Entry<any>[]> {
    let order = {"order": "fields.name"};

    return this.getEntries(environment.contentful.contentTypeId.product, {...query, ...order});
  }

  getProductCategories(query?: object): Promise<Entry<any>[]> {
    let order = {order: "fields.name"};

    return this.getEntries(environment.contentful.contentTypeId.productCategory, {...query, ...order});
  }


}
