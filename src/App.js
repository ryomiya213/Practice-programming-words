'use strict';

export class App {
  constructor() {
    console.log('App.js');
  }

  mount() {
    // Promise
/*     fetch('../data/words.json')
      .then((data) => data.json())
      .then((dataJson) => {
        const allWords = dataJson;
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
      }); */

    // Async Function
    const loadJson = async() => {
      const data = await fetch('../data/words.json');
      const jsonData = await data.json();

      const allWords = jsonData;
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
    };
    
    loadJson();

  }

  popWords(words) {
    const i = Math.floor(Math.random()*words.length);
    let word = words[i].word;
    let meaning = words[i].meaning;
    words.splice(i, 1);
    return [words, word, meaning];
  }
}