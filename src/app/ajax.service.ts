import { Injectable } from '@angular/core';;
import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export default class AjaxService {
  private data: object;

  constructor(private httpClient: HttpClient) { }

  ajaxGet(todo) {
    const params = new HttpParams()
      .set('todo', todo)
    return this.httpClient.get("http://localhost/angular/kurs.php", { params })
  }

}
