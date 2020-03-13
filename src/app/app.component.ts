import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import AjaxService from './ajax.service';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ilosc;
  test;
  activeEng: string;
  tab;
  number = 0;
  pl: boolean = false;
  click: boolean = true;

  constructor(
    private httpClient: HttpClient,
    private service: AjaxService
  ) {
    this.test = service;
  }

  ngOnInit() {
    this.test.ajaxGet('download')
      .subscribe(x => {
        this.tab = x;
        this.ilosc = this.tab.length / 2;
        for (var i = 0; i < this.tab.length; i++) {
          if (this.tab[i][0] == undefined) {
            this.tab[i][0] = "do zobaczenia następnym razem"
          }
        }

        //SHUFFLE
        var angTab = [];
        var polTab = [];
        //rozdzielenie na 2  tablce
        for (var j = 0; j < this.tab.length; j++) {
          if (j % 2 == 0) {
            polTab.push(this.tab[j][0])
          }
          else {
            angTab.push(this.tab[j][0])
          }
        }

        //mieszanie
        var j: number;
        var x;
        var y;
        var i: number;
        for (i = polTab.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          x = polTab[i];
          y = angTab[i];

          polTab[i] = polTab[j];
          angTab[i] = angTab[j];

          polTab[j] = x;
          angTab[j] = y;
        }

        //łączenie
        this.tab = []
        for (var i = 0; i < polTab.length; i++) {
          this.tab.push(polTab[i])
          this.tab.push(angTab[i])
        }

        console.log(this.tab)
        //end
        this.activeEng = this.tab[this.number];
      })
  }


  show() {

    if (this.ilosc > 0 && this.click) {
      this.number++;
      speechSynthesis.speak(new SpeechSynthesisUtterance(this.tab[this.number]));
      this.activeEng = this.tab[this.number];
      this.click = false;
      this.ilosc--;
      this.pl = true;


      const numbers = interval(3000);
      const takeFourNumbers = numbers.pipe(take(1));
      takeFourNumbers.subscribe(x => {
        this.click = true;
        this.number++;
        this.pl = false;
        this.activeEng = this.tab[this.number];
        console.log("-")
      }
      );
    }


  }
}
