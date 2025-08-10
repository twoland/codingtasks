/**
 * Linked List
 */
class ListNode {
    constructor(val = 0, next = null, id = null) {
        this.val = val;
        this.next = next;
        this.id = id;
    }
}

function createList(values) {
    let list = [];
    let current = null;

    for (let i = 0; i < values.length; i++) {
        let val = values[i];
        let next = new ListNode(val, current, values.length - i);

        current = next;

        list.unshift(next);
    }

    return list;
}

/**
 * BinaryTree
 */

class BinaryTreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val   = val;
        this.left  = left;
        this.right = right;
    }
}

function arrayToTree(arr) {
    if (!arr.length) return null;

    // 1) Create the root
    const root = new BinaryTreeNode(arr[0]);
    const queue = [root];
    let i = 1;

    // 2) For each real node, pull two slots from the array
    while (i < arr.length && queue.length) {
        const node = queue.shift();

        // Left child
        if (i < arr.length) {
            const v = arr[i++];
            if (v !== null) {
                node.left = new BinaryTreeNode(v);
                queue.push(node.left);
            }
        }

        // Right child
        if (i < arr.length) {
            const v = arr[i++];
            if (v !== null) {
                node.right = new BinaryTreeNode(v);
                queue.push(node.right);
            }
        }
    }

    return root;
}

/**
 * Trie (Prefix Tree)
 */

class Trie {
    constructor(words) {
        this.root = new TrieNode();
        for (const word of words) {
            this.insert(word);
        }
    }

    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!(char in node.children)) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    search(word) {
        let node = this.root;

        for (const char of word) {
            node = node.children[char];

            if (!node) {
                return false;
            }
        }

        return node.isEndOfWord;;
    }

    delete(word) {
        // Recursive delete helper
        const traverseAndDelete = (parent, index) => {
            const char = word[index];
            const node = parent.children[char];

            // Word not found
            if (!node) {
                return false;
            }

            // Base case: reached the end, unmark node as end of word
            if (index === word.length - 1) {
                node.isEndOfWord = false;
            }
            else {
                // Recursive traversal
                const canDelete = traverseAndDelete(node, index + 1);

                // Delete the node if allowed
                if (canDelete) {
                    delete node.children[char];
                }
            }

            // Return whether the parent can delete this node
            // True if it has no children and is not end of word
            return (Object.keys(node.children).length === 0) && !node.isEndOfWord;
        }

        traverseAndDelete(this.root, 0);
    }

    prefix(word) {
        // DFS helper
        const prefixHelper = (node, prefix) => {
            const result = [];

            // EOW - add to search result
            if (node.isEndOfWord) {
                result.push(prefix);
            }

            const chars = Object.keys(node.children);

            for (const char of chars) {
                // For each child recursive depth search
                result.push(...prefixHelper(
                    node.children[char],
                    prefix + char
                ));
            }

            return result;
        }

        let node = this.root;

        // Get to the end of the prefix
        for (const char of word) {
            node = node.children[char];

            if (!node) {
                return [];
            }
        }

        // DFS for all words
        return prefixHelper(node, word);
    }

    trie(initialWords, commands) {
        // === DO NOT MODIFY ===
        this.create_trie(initialWords);

        const output = [];
        for (const [command, word] of commands) {
            if (command === "search") {
                output.push(this.search(word));
            } else if (command === "delete") {
                this.delete(word);
            }
        }
        return output;
    }
}

/**
 * Trie (Prefix Tree) Node
 */
class TrieNode {
    constructor(children = {}, eow = false) {
        this.children = children;
        this.isEndOfWord = eow;
    }
}

/**
 * Heap - min
 */
class MinHeap {
    constructor() {
        this.heap = [];
    }

    heapify(arr) {
        this.heap = [...arr];
        for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
            this.heapifyDown(i);
        }
    }

    push(val) {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return min;
    }

    peek() {
        return this.heap[0];
    }

    length() {
        return this.heap.length;
    }

    heapifyUp(index) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (parentIndex >= 0 && this.heap[parentIndex] > this.heap[index]) {
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            this.heapifyUp(parentIndex);
        }
    }

    heapifyDown(index) {
        const leftChild = 2 * index + 1;
        const rightChild = 2 * index + 2;
        let smallest = index;

        if (leftChild < this.heap.length && this.heap[leftChild] < this.heap[smallest]) {
            smallest = leftChild;
        }

        if (rightChild < this.heap.length && this.heap[rightChild] < this.heap[smallest]) {
            smallest = rightChild;
        }

        if (smallest !== index) {
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            this.heapifyDown(smallest);
        }
    }

    // const arr = [3, 1, 4, 1, 5, 9, 2];
    // const heap = new MinHeap();
    // heap.heapify(arr);
}

/**
 * Heap - max
 */
class MaxHeap {
    constructor() {
        this.heap = [];
    }

    heapify(arr) {
        this.heap = [...arr];
        for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
            this.heapifyDown(i);
        }
    }

    push(val) {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return max;
    }

    peek() {
        return this.heap[0];
    }

    length() {
        return this.heap.length;
    }

    heapifyUp(index) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (parentIndex >= 0 && this.heap[parentIndex] < this.heap[index]) {
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            this.heapifyUp(parentIndex);
        }
    }

    heapifyDown(index) {
        const leftChild = 2 * index + 1;
        const rightChild = 2 * index + 2;
        let largest = index;

        if (leftChild < this.heap.length && this.heap[leftChild] > this.heap[largest]) {
            largest = leftChild;
        }

        if (rightChild < this.heap.length && this.heap[rightChild] > this.heap[largest]) {
            largest = rightChild;
        }

        if (largest !== index) {
            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            this.heapifyDown(largest);
        }
    }

    // const arr = [3, 1, 4, 1, 5, 9, 2];
    // const heap = new MaxHeap();
    // heap.heapify(arr);
}

/**
 * Heap - min tuples
 */
class TupleMinHeap {
    constructor() {
        this.heap = [];
    }

    heapify(arr) {
        this.heap = [...arr];
        for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
            this.heapifyDown(i);
        }
    }

    push(val) {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return min;
    }

    peek() {
        return this.heap[0];
    }

    length() {
        return this.heap.length;
    }

    compare(a, b) {
        for (let i = 0; i < Math.min(a.length, b.length); i++) {
            if (a[i] < b[i]) return -1;
            if (a[i] > b[i]) return 1;
        }
        return a.length - b.length;
    }

    heapifyUp(index) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (parentIndex >= 0 && this.compare(this.heap[index], this.heap[parentIndex]) < 0) {
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            this.heapifyUp(parentIndex);
        }
    }

    heapifyDown(index) {
        const leftChild = 2 * index + 1;
        const rightChild = 2 * index + 2;
        let smallest = index;

        if (leftChild < this.heap.length && this.compare(this.heap[leftChild], this.heap[smallest]) < 0) {
            smallest = leftChild;
        }

        if (rightChild < this.heap.length && this.compare(this.heap[rightChild], this.heap[smallest]) < 0) {
            smallest = rightChild;
        }

        if (smallest !== index) {
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            this.heapifyDown(smallest);
        }
    }

    // const arr = [[3, 1], [1, 5], [4, 2], [1, 9], [5, 3], [9, 4], [2, 6]];
    // const heap = new TupleMinHeap();
    // heap.heapify(arr);
}

/**
 * Heap - max tuples
 */
class TupleMaxHeap {
    constructor() {
        this.heap = [];
    }

    heapify(arr) {
        this.heap = [...arr];
        for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
            this.heapifyDown(i);
        }
    }

    push(val) {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return min;
    }

    peek() {
        return this.heap[0];
    }

    length() {
        return this.heap.length;
    }

    compare(a, b) {
        for (let i = 0; i < Math.min(a.length, b.length); i++) {
            if (a[i] < b[i]) return -1;
            if (a[i] > b[i]) return 1;
        }
        return a.length - b.length;
    }

    heapifyUp(index) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (parentIndex >= 0 && this.compare(this.heap[index], this.heap[parentIndex]) > 0) {
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            this.heapifyUp(parentIndex);
        }
    }

    heapifyDown(index) {
        const leftChild = 2 * index + 1;
        const rightChild = 2 * index + 2;
        let smallest = index;

        if (leftChild < this.heap.length && this.compare(this.heap[leftChild], this.heap[smallest]) > 0) {
            smallest = leftChild;
        }

        if (rightChild < this.heap.length && this.compare(this.heap[rightChild], this.heap[smallest]) > 0) {
            smallest = rightChild;
        }

        if (smallest !== index) {
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            this.heapifyDown(smallest);
        }
    }

    // const arr = [[3, 1], [1, 5], [4, 2], [1, 9], [5, 3], [9, 4], [2, 6]];
    // const heap = new TupleMaxHeap();
    // heap.heapify(arr);
}



