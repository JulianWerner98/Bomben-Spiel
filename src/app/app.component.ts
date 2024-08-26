import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  players: string [] = [];
  startPlayer: string [] = [];
  newPlayer: string = '';
  startPossible: boolean = false;
  kategorien: string[] = [
    "Tiere",
    "Farben",
    "Fahrzeuge",
    "Früchte",
    "Gemüse",
    "Berufe",
    "Märchenfiguren",
    "Sportarten",
    "Musikinstrumente",
    "Wetter",
    "Körperteile",
    "Kleidungsstücke",
    "Spielzeuge",
    "Möbelstücke",
    "Süßigkeiten",
    "Getränke",
    "Hobbys",
    "Schulsachen",
    "Werkzeuge",
    "Blumen",
    "Superhelden",
    "Länder",
    "Städte",
    "Märchen",
    "Meeresbewohner",
    "Vögel",
    "Insekten",
    "Bäume",
    "Berühmte Personen",
    "Zirkus",
    "Bauernhoftiere",
    "Haustiere",
    "Wilde Tiere",
    "Dschungeltiere",
    "Eiscreme-Sorten",
    "Supermarkt",
    "Camping",
    "Reisen",
    "Zauberei",
    "Detektive",
    "Schatzsuche",
    "Ritter",
    "Burgen",
    "Spielplätze",
    "Weltraum",
    "Zauberer",
    "Roboter",
    "Bastelmaterialien",
    "Farben und Formen",
    "Tiergeräusche",
    "Filme",
    "Zeichentrickfiguren",
    "Comic-Helden",
    "Zirkusartisten",
    "Bücher",
    "Helden aus Büchern",
    "Magische Orte",
    "Feste",
    "Märchenbücher",
    "Kinderlieder",
  ];
  bombActive: boolean = false;


  constructor() {
    const players = localStorage.getItem('players');
    if (players) {
      this.players = JSON.parse(players);
      this.startPlayer = [...this.players];
      if(this.players.length > 1) {
        this.startPossible = true;
      }
    }
  }

  addPlayer() {
    if (this.newPlayer === '') {
      return;
    }

    if (this.players.includes(this.newPlayer)) {
      alert('Name doppelt');
      return;
    }

    this.players.push(this.newPlayer);
    this.startPlayer.push(this.newPlayer);
    this.newPlayer = '';

    if(this.players.length > 1) {
      this.startPossible = true;
    }

    // Save to local storage
    localStorage.setItem('players', JSON.stringify(this.players));
  }

  removePlayer(i: number) {
    this.players.splice(i, 1);
    this.startPlayer.find((player, index) => {
      if (index === i) {
        this.startPlayer.splice(index, 1);
      }
    });
    // Save to local storage
    localStorage.setItem('players', JSON.stringify(this.players));
  }

  startRound() {
    if (!this.startPlayer.length) {
      this.startPlayer = [...this.players];
    }
    const randomIndex = Math.floor(Math.random() * this.startPlayer.length);
    const randomIndexKategorie = Math.floor(Math.random() * this.kategorien.length);
    const catOk = confirm('Kategorie Vorschlag: \n' + this.kategorien[randomIndexKategorie]);
    if(!catOk) {
      this.startRound();
      return;
    }
    let ready = confirm(this.startPlayer[randomIndex] + ' beginnt. \nKlicke auf OK, um zu starten');
    if (!ready) {
      return;
    }
    //Start Bomb Timer
    this.bombActive = true;
    const minTimer = 25000;
    const maxTimer = 120000;
    const timer = Math.floor(Math.random() * (maxTimer - minTimer + 1) + minTimer);
    this.startPossible = false;
    console.log('Timer: ', timer);
    //Start Sound ticken.mp3
    const audio = new Audio();
    audio.src = 'assets/ticken.mp3';
    audio.load();
    audio.play();
    audio.loop = true;

    // Start timer
    setTimeout(() => {
      this.bombActive = false;
      audio.pause();
      audio.src = 'assets/explosion.mp3';
      audio.load();
      audio.play();
      audio.loop = false;
      this.startPlayer.splice(randomIndex, 1);
      this.startPossible = true;
    }, timer);
  }
}
