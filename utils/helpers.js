/**
 * Linked List
 */
class ListNode {
    constructor(val = 0, next = null, id = null) {
        this.val = val;
        this.next = next;
        this.id = id;
    }

    static createList(values) {
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

    static arrayToTree(arr) {
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
 * Heap — array-based binary heap (generic).
 * Priority rule is defined by `cmp(a, b)`:
 *   - return < 0  ⇢  `a` has higher priority than `b` (rises toward the top)
 *   - return = 0  ⇢  equal priority
 *   - return > 0  ⇢  `a` has lower priority than `b`
 *
 * Common comparators for numbers:
 *   Min-heap: (a, b) => a - b         // default
 *   Max-heap: (a, b) => b - a
 */
class Heap {
    constructor(cmp = (a, b) => a - b) {
        this.a = [];        // internal array storage
        this.cmp = cmp;     // comparator: returns negative if a<b
    }

    heapify(array) {
        this.a = [...array];
        for (let i = Math.floor(this.a.length / 2) - 1; i >= 0; i--) {
            this._siftDown(i);
        }
    }

    size() { return this.a.length; }

    peek() { return this.a[0]; }

    push(x) {
        this.a.push(x);
        this._siftUp(this.a.length - 1);
    }

    pop() {
        const arr = this.a;
        const top = arr[0];
        const last = arr.pop();
        if (arr.length > 0) {
            arr[0] = last;
            this._siftDown(0);
        }
        return top;
    }

    _siftUp(i) {
        const arr = this.a, cmp = this.cmp;
        while (i > 0) {
            const p = (i - 1) >> 1;         // parent index (bit shift = floor/2)
            if (cmp(arr[i], arr[p]) >= 0) break;
            [arr[i], arr[p]] = [arr[p], arr[i]];
            i = p;
        }
    }

    _siftDown(i) {
        const arr = this.a, cmp = this.cmp;
        const n = arr.length;
        while (true) {
            let l = i * 2 + 1;
            let r = l + 1;
            let smallest = i;
            if (l < n && cmp(arr[l], arr[smallest]) < 0) smallest = l;
            if (r < n && cmp(arr[r], arr[smallest]) < 0) smallest = r;
            if (smallest === i) break;
            [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
            i = smallest;
        }
    }

    /* --- Example usage ---
    const h = new Heap();  // defaults to number min-heap
    h.push(5); h.push(1);  h.push(7); h.push(3);
    console.log(h.pop());  // 1
    console.log(h.peek()); // 3
    console.log(h.size()); // 5
    */
}

class Queue {
    constructor() {
        this._a = [];
        this._h = 0;
    }
    enqueue(x) { this._a.push(x); }
    dequeue() { return this._a[this._h++]; }
    peak() { return this._a[this._h]; }
    isEmpty() { return this._h >= this._a.length; }
    size() { return this._a.length - this._h; }
}

/**
 * Heap - min (Legacy)
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
 * Heap - max (Legacy)
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
 * Heap - min tuples (Legacy)
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
 * Heap - max tuples (Legacy)
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

/**
 * Proper queue implementation with O(1) ops
 */

module.exports = {
    ListNode,
    BinaryTreeNode,
    TrieNode,
    Trie,
    Heap,
    Queue
}
