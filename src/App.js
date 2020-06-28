'use strict';

export class App {
  constructor() {
    console.log('App.js');
  }
  

  mount() {
    // TODO ../data/words.jsonから読み込む
    const allWords = [
      {
        "word": "accept",
        "meaning": "受諾する、受け入れる"
      },
      {
        "word": "access",
        "meaning": "受諾する、受け入れる"
      },
      {
        "word": "account",
        "meaning": "アカウント、口座"
      },
      {
        "word": "algorithm",
        "meaning": "アルゴリズム"
      },
      {
        "word": "allow",
        "meaning": "可能にする、許可する"
      },
      {
        "word": "alternative",
        "meaning": "代替の"
      }
    ];

    const typingFormElement = document.querySelector('#typing');
    const meaningElement = document.querySelector('#meaning');

    let words = [];
    let word = '';
    let meaning = '';

    [words, word, meaning] = this.popWords(allWords.slice());
    let wordIndex = 1;
    meaningElement.innerText = `${word} ${meaning}`;
    
    typingFormElement.addEventListener(('input'), () => {
      console.log(typingFormElement.value);
      if (typingFormElement.value === word.slice(0, wordIndex)) {
        if (wordIndex === word.length) {
          if (words.length === 0) {
            words = allWords.slice();
          }
          [words, word, meaning] = this.popWords(words);
          meaningElement.innerText = `${word} ${meaning}`;
          typingFormElement.value = '';
          wordIndex = 1;
        } else { 
          wordIndex += 1;
        }
      } else {
        typingFormElement.value = word.slice(0, wordIndex - 1);
      }
    });

  }

  popWords(words) {
    const i = Math.floor(Math.random()*words.length);
    let word = words[i].word;
    let meaning = words[i].meaning;
    words.splice(i, 1);
    return [words, word, meaning];
  }
}