Splain.addEntry({
   });
let characters = "ABCDEFJHIJKLMNOPQRSTUVWXYZ!£$%&*";
let conspiracy = null;
String.prototype.replaceAt = function (index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
};

class Redacted {
  constructor(targetElement, finalString, typed, initializeTime, tickTime) {
    this.target = targetElement;
    if (typed === undefined) typed = true;
    this.typed = typed;
    this.typedLength = 0;
    this.typeTime = 30;
    this.initializeTime = initializeTime || 0;
    this.initialized = initializeTime == undefined ? true : false;
    this.tickTime = tickTime || 100;
    this.finalString = finalString || targetElement.innerHTML;
    this.unresolved = [];
    this.currentString = "";
    for (var i = 0; i < this.finalString.length; i++) {
      if (this.finalString[i] !== ' ') {
        this.unresolved.push(i);
        this.currentString += this.getRandomChar();
      } else
      this.currentString += " ";
    }

    if (this.initializeTime) setTimeout(() => {
      this.initialized = true;
    }, this.initializeTime);
    setTimeout(() => {this.randomize();}, this.tickTime);
    if (this.typed) setTimeout(() => {this.type();}, this.typeTime);
  }

  getRandomChar() {
    return characters.charAt(Math.floor(Math.random() * characters.length));
  }

  adjustResolveSpeed() {
    let adjustedTime = this.tickTime * (1 - this.unresolved.length / this.finalString.length);
    if (adjustedTime < 10) adjustedTime = 10;
    return adjustedTime;
  }

  type() {
    this.typedLength++;
    if (this.typed && this.typedLength < this.finalString.length) {
      setTimeout(() => {this.type();}, this.typeTime);
    }
  }

  randomize() {
    this.unresolved.forEach(n => {
      this.currentString = this.currentString.replaceAt(n, this.getRandomChar());
    });

    if (this.initialized && (!this.typed || this.typed && this.typedLength >= this.finalString.length)) {
      this.resolveChar();
    }

    if (this.unresolved.length > 0) {
      setTimeout(() => {this.randomize();}, this.adjustResolveSpeed());
    }
    this.target.innerHTML = this.typed ? this.currentString.substring(0, this.typedLength) : this.currentString;
  }

  resolveChar() {
    let index = Math.floor(this.unresolved.length * Math.random());
    let charPos = this.unresolved[index];
    this.unresolved.splice(index, 1);
    this.currentString = this.currentString.replaceAt(charPos, this.finalString.charAt(charPos));
  }}




let generateNewConspiracy = function () {
  let content = Splain.process("{{Loading...}}");
  if (Math.random() > 0.6) content = content.toUpperCase();
  conspiracy = new Redacted(document.getElementById("test"), content);
};
window.onload = function () {
  generateNewConspiracy();
};

window.onclick = function () {
  generateNewConspiracy();
};