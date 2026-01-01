import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Match } from '../match';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-rps',
  standalone: false,
  templateUrl: './rps.component.html',
  styleUrl: './rps.component.sass'
})
export class RpsComponent implements OnInit{
  match: Match = new Match();
  player: string = '';
  enemy: string = '';
  choices: string[] = ['rock', 'paper', 'scissors']
  enemyRound: number = 0;
  playerRound: number = 0;
  results: string[] = [];
  gameOver: boolean = false;
  winner: string = '';
  playedGames: Match[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllResults();
  }

  bestOfThree(): void {
    if (this.match.enemyRounds == 2) {
      this.gameOver = true;
      this.winner = 'Enemy wins!';
      this.match.date = new Date().toISOString();
    }
    else if (this.match.playerRounds == 2) {
      this.gameOver = true;
      this.winner = 'Player wins!';
      this.match.date = new Date().toISOString();
    }
  }

  evaluateMatch(): void {
    if (this.player === 'rock' && this.enemy === 'scissors') {
      this.match.playerRounds++;
      this.match.results.push(`Player wins round: ${this.player} vs ${this.enemy} (${this.match.playerRounds} : ${this.match.enemyRounds})`);
    } else if (this.player === 'paper' && this.enemy === 'rock') {
      this.match.playerRounds++;
      this.match.results.push(`Player wins round: ${this.player} vs ${this.enemy} (${this.match.playerRounds} : ${this.match.enemyRounds})`);
    } else if (this.player === 'scissors' && this.enemy === 'paper') {
      this.match.playerRounds++;
      this.match.results.push(`Player wins round: ${this.player} vs ${this.enemy} (${this.match.playerRounds} : ${this.match.enemyRounds})`);
    } else if (this.player === 'scissors' && this.enemy === 'rock') {
      this.match.enemyRounds++;
      this.match.results.push(`Enemy wins round: ${this.player} vs ${this.enemy} (${this.match.playerRounds} : ${this.match.enemyRounds})`);
    } else if (this.player === 'rock' && this.enemy === 'paper') {
      this.match.enemyRounds++;
      this.match.results.push(`Enemy wins round: ${this.player} vs ${this.enemy} (${this.match.playerRounds} : ${this.match.enemyRounds})`);
    } else if (this.player === 'paper' && this.enemy === 'scissors') {
      this.match.enemyRounds++;
      this.match.results.push(`Enemy wins round: ${this.player} vs ${this.enemy} (${this.match.playerRounds} : ${this.match.enemyRounds})`);
    } else {
      this.match.results.push(`Draw: ${this.player} vs ${this.enemy} (${this.match.playerRounds} : ${this.match.enemyRounds})`);
    }

    this.bestOfThree();
    console.log(this.match);
  }

  randomChoice(player: string): void {
    if (this.gameOver) {
      return;
    }
    let i = this.getRandomInt(3);
    this.enemy = this.choices[i]
    this.player = player;
    this.evaluateMatch();
  }

  resetMatch() {
    this.apiService.addResults(this.match).subscribe({
      next: (response) => {
        console.log('Match saved:', response);
        this.gameOver = false;
        this.winner = '';
        this.player = '';
        this.enemy = '';
        this.match = new Match();
      },
      error: (error) => {
        console.error('Error saving match:', error);
      }
    });
    this.getAllResults();
  }

  createObject() {
    this.match = {
      results: this.results,
      enemyRounds: this.enemyRound,
      playerRounds: this.playerRound,
      date: new Date().toISOString()
    }
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  addResults(match: Match): void {
    this.apiService.addResults(match).subscribe({
      error: (err => {
        console.error(`failed to add data`, err);
      })
    })
  }

  getAllResults(){
    this.apiService.getAllMatches().subscribe({
      next: (response) => {
        this.playedGames = response
        console.log('History loaded in successfully')
      },
      error: (err) =>{
        console.error('Failed to load data', err)
      }
    })
  }
}
