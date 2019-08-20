import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {

  url = `http://siloe.org.br/wp-json/wp/v2/`;
  totalPosts = null;
  pages: any;
  private readonly API = `${environment.API}santo/v1/dia`;
  santo: any;
  nomePost: string;

  constructor(private http: HttpClient) { }
 
  getPosts(categoria, page): Observable<any[]> {
    let options = {
      observe: "response" as 'body',
      params: {
        per_page: '5',
        page: ''+page
      }
    };
 
    return this.http.get<any[]>(`${this.url}posts?categories=${categoria}`, options).pipe(
      map(resp => {
        this.pages = resp['headers'].get('x-wp-totalpages');
        this.totalPosts = resp['headers'].get('x-wp-total');
        
        let data = resp['body'];
 
        for (let post of data) {
          post.media_url = post['better_featured_image']['media_details'].sizes['medium'].source_url;
        }    
        return data;
      })
    )
  }
 
  getPostContent(id) {
    return this.http.get(`${this.url}posts/${id}`).pipe(
      map(post => {
        post['media_url'] = post['better_featured_image']['media_details'].sizes['medium'].source_url;
        //post['media_url'] = post.better_featured_image.media_details.sizes.medium.source_url
        this.nomePost = post[ 'title' ][ 'rendered' ];
        return post;
      })
    )
  }

  getSanto(){
    return this.http.get(this.API);
  }
}