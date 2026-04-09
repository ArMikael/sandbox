const car = {
  wheels: 4,
  owner: undefined,

  init() {
    console.log(`I have ${this.wheels} wheels. My owner is ${this.owner}.`);
  }
}

const carWithOwner = Object.create(car, {
  owner: {
    value: 'Michael',
  },
});

carWithOwner.init();
