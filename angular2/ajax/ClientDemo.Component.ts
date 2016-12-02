//Angular2 - set headers for every request
//http://stackoverflow.com/questions/34464108/angular2-set-headers-for-every-request
// 组件中使用 HttpClient

import { HttpClient } from './http-client';

export class MyComponent {
  // Notice we inject "our" HttpClient here, naming it Http so it's easier
  constructor(http: HttpClient) {
    this.http = httpClient;
  }

  handleSomething() {
    this.http.post(url, data).subscribe(result => {
        // console.log( result );
    });
  }
}