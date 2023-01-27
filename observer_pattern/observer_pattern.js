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
    this.NotifyObservers(number);
  }


// Observers
  AddObserver(observer) {
    this.observers.push(observer);
  }

  RemoveObserver(observer) {
    this.observers = this.observers.filter(o => o !== observer);
  }

  NotifyObservers(number) {
    this.observers.forEach(observer => observer.OnDial(number));
  }
}



// 
class PhoneNumberObserver {
  OnDial(number) {
    console.log(number);
  }
}

class DialingObserver {
  OnDial(number) {
    console.log("Now dialling the number: " + number);
  }
}


// 
const phone = new Telephone();

const phoneNumberObserver = new PhoneNumberObserver();
const dialingObserver = new DialingObserver();



phone.AddObserver(phoneNumberObserver);
phone.AddObserver(dialingObserver);


phone.addPhoneNumber("123-456-7890");
phone.dialPhoneNumber("123-456-7890");

phone.addPhoneNumber("123-456-7899");
phone.dialPhoneNumber("123-456-7899");