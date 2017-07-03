// Define as constant
const privateData = new WeakMap();

// Class
export class <% modelclassname %> {
  // --------------------------
  // PROPERTIES:
  constructor() {
    privateData(this, {
      name: 'Name'
    });
  }
  // --------------------------
  // METHODS:

  manipulateData() {
    // do stuff...
  }
  // --------------------------
  // GETTER/SETTERS:

  set name(value) {
    privateData.get(this).name = value;
  }

  get name() {
    return privateData.get(this).name;
  }
}
