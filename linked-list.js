'use strict';

class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.inserFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }
  // [1, 2, 3, 4 ,5 ,6 ,7, 8]
  insertBefore(beforeItem, newItem) {
    if (!this.head) {
      return null;
    }
    let currNode = this.head;
    let prevNode = this.head;

    while (currNode !== null && currNode.value !== beforeItem) {
      if (currNode === null) {
        return null;
      }
      else {
        prevNode = currNode;
        currNode = currNode.next;
      }
    }
    prevNode.next = new _Node(newItem, currNode);
  }

  insertAfter(afterItem, newItem) {
    if (!this.head) {
      return null;
    }
    let currNode = this.head;
    let prevNode = this.head;

    while (prevNode.value !== afterItem && currNode !== null) {
      if (currNode === null) {
        return null;
      }
      else {
        prevNode = currNode;
        currNode = currNode.next;
      }
    }
    prevNode.next = new _Node(newItem, currNode);
  }

  insertAt(index, newItem) {
    if (!this.head) {
      return null;
    }

    let currNode = this.head;
    let prevNode = this.head;
    let count = 0;
    while (count !== index) {
      count++;
      prevNode = currNode;
      currNode = currNode.next;
    }
    prevNode.next = new _Node(newItem, currNode);

  }

  peek() {
    return this.head.value;
  }

  find(item) {
    let currNode = this.head;
    if (!this.head) {
      return null;
    }
    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null;
      }
      else {
        currNode = currNode.next;
      }
    }
    return currNode;
  }

  deleteItem(item) {
    if (!this.head) {
      return null;
    }

    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }

    let currNode = this.head;
    let prevNode = this.head;

    while (currNode !== null && currNode.value !== item) {
      prevNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    prevNode.next = currNode.next;
  }
}

module.exports = LinkedList;