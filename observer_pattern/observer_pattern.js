class Telephone {
  constructor() {
    this.phoneNumbers = [];
    this.observers = [];
  }

  // The 3 methods of the telephone class
  addPhoneNumber(number) {
    this.phoneNumbers.push(number);
  }

  removePhoneNumber(number) {
    this.phoneNumbers = this.phoneNumbers.filter(n => n !== number);
  }

  dialPhoneNumber(number) {
    if (!this.phoneNumbers.includes(number)) {
      console.log("Invalid phone number");
      return;
    }
    console.log("Dialling " + number + "...");
    this.notifyObservers(number);
  }


// Observers
  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(o => o !== observer);
  }

  notifyObservers(number) {
    this.observers.forEach(observer => observer.notify(number));
  }
}



// 
class PhoneNumberObserver {
  notify(number) {
    console.log(number);
  }
}

class DialingObserver {
 notify(number) {
    console.log("Now dialling the number: " + number);
  }
}


// 
const phone = new Telephone();

const phoneNumberObserver = new PhoneNumberObserver();
const dialingObserver = new DialingObserver();



phone.addObserver(phoneNumberObserver);
phone.addObserver(dialingObserver);


phone.addPhoneNumber("09061147343");
phone.dialPhoneNumber("09061147343");
