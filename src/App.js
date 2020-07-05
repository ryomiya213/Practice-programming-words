'use strict';

export class App {
  mount() {
    const loadJson = async() => {
      const data = await fetch('./data/words.json');
      const jsonData = await data.json();

      const allWords = jsonData;
      const typingFormElement = document.querySelector('#typing');
      const doneWordElement = document.querySelector('#doneWord');
      const restWordElement = document.querySelector('#restWord');
      const meaningElement = document.querySelector('#meaning');
      const countElement = document.querySelector('#count');
      const resetElement = document.querySelector('#reset');
      const historyListElement = document.querySelector('#history-list');

      let words = [];
      let word = '';
      let meaning = '';

      [words, word, meaning] = this.popWords(allWords.slice());
      let wordIndex = 1;
      restWordElement.innerText = word;
      meaningElement.innerText = meaning;
      countElement.innerText = `残り${allWords.length}/${allWords.length}`;
      
      typingFormElement.addEventListener(('input'), () => {
        // console.log(typingFormElement.value);
        if (typingFormElement.value === word.slice(0, wordIndex)) {

          if (wordIndex === word.length) {
            if (words.length === 0) {
              reset();
            }
            countElement.innerText = `残り${words.length}/${allWords.length}`;
            const liElement = document.createElement('li');
            liElement.innerText = `${word}: ${meaning}`;
            historyListElement.insertBefore(liElement,historyListElement.firstElementChild);

            [words, word, meaning] = this.popWords(words);
            doneWordElement.innerText = '';
            restWordElement.innerText = word
            meaningElement.innerText = meaning;
            typingFormElement.value = '';
            wordIndex = 1;
          } else {
            doneWordElement.innerText = word.slice(0, wordIndex);
            restWordElement.innerText = word.slice(wordIndex, word.length);
            wordIndex += 1;
          }

        } else {
          typingFormElement.value = word.slice(0, wordIndex - 1);
        }
      });

      resetElement.addEventListener(('click'), () => {
        reset();
      });

      const reset = () => {
        [words, word, meaning] = this.popWords(allWords.slice());
        wordIndex = 1;
        doneWordElement.innerText = '';
        restWordElement.innerText = word;
        meaningElement.innerText = meaning;
        countElement.innerText = `残り${allWords.length}/${allWords.length}`;
        historyListElement.innerHTML = '';
      };
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