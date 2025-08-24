/**
 * 227. Basic Calculator II
 * https://leetcode.com/problems/basic-calculator-ii/description/?envType=problem-list-v2&envId=nf4q4fn5
 */

// Given a string s which represents an expression, evaluate this expression and return its value.
// The integer division should truncate toward zero.
// You may assume that the given expression is always valid. All intermediate results will be in the range of [-231, 231 - 1].
// Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().
//
// Example 1:
// Input: s = "3+2*2"
// Output: 7
// Example 2:
// Input: s = " 3/2 "
// Output: 1
// Example 3:
// Input: s = " 3+5 / 2 "
// Output: 5

/**
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
    let resolved = 0;   // sum of fully resolved chunks (between + or -)
    let unresolved = 0; // current chunk with * and / applied eagerly
    let n = 0;          // current number being parsed
    let op = '+';       // the operator that should be applied to 'n' against 'unresolved'
    // Pretend that our expression starts with 0+...

    for (let i = 0; i < s.length; i++) {
        const ch = s[i];

        // Build current number if see a digit
        if (ch >= '0' && ch <= '9') {
            n = n * 10 + (s.charCodeAt(i) - 48); // char code of '0' is 48
        }

        // On operand or end of expression, apply last operand
        if (i === s.length - 1 || ch === '+' || ch === '-' || ch === '*' || ch === '/') {
            // Perform previous operation with numbeer we parsed
            if (op === '+') unresolved += n;
            else if (op === '-') unresolved -= n;
            else if (op === '*') unresolved *= n;
            else if (op === '/') unresolved = Math.trunc(unresolved / n); // Conditions state truncate towards 0

            // Flush unresolved on +- or end of expression
            if (i === s.length - 1 || ch === '+' || ch === '-') {
                resolved += unresolved;
                unresolved = 0;
            }

            op = ch;    // Remember new operator
            n = 0;      // Reset number
        }
    }

    return resolved;

    // Time complexity: O(n)
    // Space complexity: O(1)
};

/**
 * 215. Kth Largest Element in an Array
 * https://leetcode.com/problems/kth-largest-element-in-an-array/
 */

// Given an integer array nums and an integer k, return the kth largest element in the array.
// Note that it is the kth largest element in the sorted order, not the kth distinct element.
// Can you solve it without sorting?
//
// Example 1:
// Input: nums = [3,2,1,5,6,4], k = 2
// Output: 5
// Example 2:
// Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
// Output: 4

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    if (!nums || (k > nums.length)) return null;

    let candidates = new Heap((a, b) => a - b);    // Min Heap
    // Adding first k items to heap
    candidates.heapify(nums.slice(0, k));

    // Checking the rest of the items
    for (let i = k; i < nums.length; i++) {
        // If the next item is larger that the SMALLEST of k items in heap
        if (nums[i] > candidates.peek()) {
            candidates.pop()            // Delete the smallest item
            candidates.push(nums[i]);   // Add the new one to heap (and sort)
        }
    }

    return candidates.peek();

    // Time Complexity: O(n log k) where n is the number of elements in the array and k is the input parameter
    // Space Complexity: O(k)
};


/**
 * 528. Random Pick with Weight
 * https://leetcode.com/problems/random-pick-with-weight/
 */

// You are given a 0-indexed array of positive integers w where w[i] describes the weight of the ith index.
// You need to implement the function pickIndex(), which randomly picks an index in the range [0, w.length - 1] (inclusive) and returns it.
// The probability of picking an index i is w[i] / sum(w).
// For example, if w = [1, 3], the probability of picking index 0 is 1 / (1 + 3) = 0.25 (i.e., 25%),
// and the probability of picking index 1 is 3 / (1 + 3) = 0.75 (i.e., 75%).

/**
 * @param {number[]} w
 */
var Solution = function(w) {
    this._wSum = Array(w.length);
    this._total = 0; // Cached total weights sum

    // Calculating prefix sum of weights
    for (let i = 0; i < w.length; i++) {
        this._total += w[i]
        this._wSum[i] = this._total;
    }

    // Preprocessing
    // Time Complexity: O(n)
    // Space Complexity: O(n)
};

Solution.prototype._getIndex = function(weight) {
    // Inclusive binary search
    let left = 0;
    let right = this._wSum.length - 1;

    // Finding the weight sum larger or equal to target
    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (this._wSum[mid] < weight) left = mid + 1;
        else right = mid;
    }

    return left;
};

/**
 * @return {number}
 */
Solution.prototype.pickIndex = function() {
    // target: integer in [1 .. _total], avoids zero-probability corner case
    const rnd = Math.floor(Math.random() * this._total) + 1;
    return this._getIndex(rnd);

    // Time Complexity: O(log n)
    // Space Complexity: O(1)
};


/**
 * 199. Binary Tree Right Side View
 * https://leetcode.com/problems/binary-tree-right-side-view/
 */

// Given the root of a binary tree, imagine yourself standing on the right side of it,
// return the values of the nodes you can see ordered from top to bottom.
//
// Example 1:
// Input: root = [1,2,3,null,5,null,4]
// Output: [1,3,4]
//
// Example 2:
// Input: root = [1,2,3,4,null,null,null,5]
// Output: [1,3,4,5]
//
// Example 3:
// Input: root = [1,null,3]
// Output: [1,3]
//
// Example 4:
// Input: root = []
// Output: []

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function(root) {
    if (!root) return [];

    // Classic BFS
    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();

            // Rightmost node on every level is visible
            if (i === levelSize - 1) result.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    return result;

    // Time Complexity: O(n)
    // Space Complexity: O(n)
    // Note: JS Array.shift() is O(n) operation unlike classic queue O(1)
    // To ensure true O(n) complexity of the algorithm use queue header pointer insted of shift()
};

/**
 * 1650. Lowest Common Ancestor of a Binary Tree III
 * https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii/
 */

// Given two nodes of a binary tree p and q, return their lowest common ancestor (LCA).
// Each node will have a reference to its parent node.
// According to the definition of LCA on Wikipedia:
// "The lowest common ancestor of two nodes p and q in a tree T is the lowest node that has both p and q
// as descendants (where we allow a node to be a descendant of itself)."
//
// Example 1:
// Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// Output: 3
// Explanation: The LCA of nodes 5 and 1 is 3.
// Example 2:
// Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
// Output: 5
// Explanation: The LCA of nodes 5 and 4 is 5 since a node can be a descendant of itself according to the LCA definition.
// Example 3:
// Input: root = [1,2], p = 1, q = 2
// Output: 1

/**
 * // Definition for a _Node.
 * function _Node(val) {
 *    this.val = val;
 *    this.left = null;
 *    this.right = null;
 *    this.parent = null;
 * };
 */

// ----- Straight-forward way with O(n) space: remember seen nodes, stop at node seen 2nd time

/**
 * @param {_Node} p
 * @param {_Node} q
 * @return {_Node}
 */
var lowestCommonAncestor = function(p, q) {
    // Remembering the nodes we saw
    const seen = new Set();
    seen.add(p);
    seen.add(q);

    // Iterating each node 1 level up until root and adding to seen
    // When we see q or p 2nd time, it's the LCA
    while (p.parent || q.parent) {
        if (p.parent) {
            p = p.parent;
            if (seen.has(p)) return p;
            else seen.add(p);
        }

        if (q.parent) {
            q = q.parent;
            if (seen.has(q)) return q;
            else seen.add(q);
        }
    }

    return p;
    // Time: O(n) (worst case in a skewed tree)
    // Space: O(n)
};

// ----- Distance trick: Both pointers cover the same total distance: dist(p→LCA) + dist(LCA→root) and dist(q→LCA) + dist(LCA→root).
// After swapping starts, their path lengths equalize, so they meet at the LCA.

/**
 * @param {_Node} p
 * @param {_Node} q
 * @return {_Node}
 */
var lowestCommonAncestorSolution2 = function(p, q) {
    let a = p;
    let b = q;

    // Distance trick: make both pointers cover the same distance
    // dist(p→LCA) + dist(LCA→root) and dist(q→LCA) + dist(LCA→root)
    while (a !== b) {
        // When a reaches root, swap it to q
        a = (a !== null) ? a.parent : q;
        // When b reaches root, swap it to p
        b = (b !== null) ? b.parent : p;
    }

    return a; // LCA (or null if p and q are in different trees)
    // Time: O(n) (worst case in a skewed tree)
    // Space: O(1)
};


/**
 * 314. Binary Tree Vertical Order Traversal
 * https://leetcode.com/problems/binary-tree-vertical-order-traversal/
 */

// Given the root of a binary tree, return the vertical order traversal of its nodes' values. (i.e., from top to bottom, column by column).
// If two nodes are in the same row and column, the order should be from left to right.
//
// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: [[9],[3,15],[20],[7]]
// Example 2:
// Input: root = [3,9,8,4,0,1,7]
// Output: [[4],[9],[3,0,1],[8],[7]]
// Example 3:
// Input: root = [1,2,3,4,10,9,11,null,5,null,null,null,null,null,null,null,6]
// Output: [[4],[2,5],[1,10,9,6],[3],[11]]

// ----- By the book solution (uses more space due to Map)

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalOrder = function(root) {
    if (!root) return [];

    // Idea: track each node's column in BFS queue
    // Root is 0, left is -1, right is +1

    // Map will perform better than Array because we will have to use Array.unshift()
    const columns = new Map();
    // We store column number next to the node
    const queue = [[0, root]];
    // These are leftmost and rightmost column numbers
    let left = 0;
    let right = 0;

    while (queue.length > 0) {
        let levelSize = queue.length;

        for (let i = 0; i < levelSize; i++) {
            const [col, node] = queue.shift();

            // Add new column if needed
            if (!columns.has(col)) columns.set(col, []);
            // Keep track of the indexes
            if (col < left) left--;
            else if (col > right) right++;

            // Pushing to columns map
            columns.get(col).push(node.val);
            // Continue BFS
            if (node.left) queue.push([col - 1, node.left]);
            if (node.right) queue.push([col + 1, node.right]);
        }
    }

    // Transform Map to result array
    const result = [];
    for (let i = left; i <= right; i++) result.push(columns.get(i));
    return result;
    // Time Complexity: O(n)
    // Space Complexity: O(n)
    // Note: JS Array.shift() is O(n) operation unlike classic queue O(1)
    // To ensure true O(n) complexity of the algorithm use queue header pointer instead of shift()
};

// ----- Also very fast in practice and uses less real space, but Array.unshift() makes it O(n^2) worst case

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalOrder = function(root) {
    if (!root) return [];

    // Idea: track each node's column in BFS queue
    // Root is 0, left is -1, right is +1

    // By default we have 1 nested array for root val
    const result = [ [] ];
    // We store column number next to the node
    const queue = [[0, root]];
    // These are leftmost and rightmost column numbers
    let left = 0;
    let right = 0;

    while (queue.length > 0) {
        let levelSize = queue.length;

        for (let i = 0; i < levelSize; i++) {
            const [col, node] = queue.shift();

            // Add new columns if needed
            if (col < left) {
                result.unshift([]);
                left--;
            }
            else if (col > right) {
                result.push([]);
                right++;
            }

            // Pushing to result's normalized index
            result[col - left].push(node.val);
            // Continue BFS
            if (node.left) queue.push([col - 1, node.left]);
            if (node.right) queue.push([col + 1, node.right]);
        }
    }

    return result;
    // Time Complexity: O(n^2) due to Array.unshift()
    // Space Complexity: O(n)
    // Note: JS Array.shift() and Array.unshift() are O(n) operations unlike classic queue O(1)
    // To ensure true O(n) complexity of the algorithm use queue header pointer instead of shift() and map for columns
    // In practice this is the fastest solution though
};


/**
 * 1762. Buildings With an Ocean View
 * https://leetcode.com/problems/buildings-with-an-ocean-view/
 */

// There are n buildings in a line. You are given an integer array heights of size n that represents the heights of the buildings in the line.
// The ocean is to the right of the buildings. A building has an ocean view if the building can see the ocean without obstructions.
// Formally, a building has an ocean view if all the buildings to its right have a smaller height.
// Return a list of indices (0-indexed) of buildings that have an ocean view, sorted in increasing order.
//
// Example 1:
// Input: heights = [4,2,3,1]
// Output: [0,2,3]
// Explanation: Building 1 (0-indexed) does not have an ocean view because building 2 is taller.
// Example 2:
// Input: heights = [4,3,2,1]
// Output: [0,1,2,3]
// Explanation: All the buildings have an ocean view.
// Example 3:
// Input: heights = [1,3,2,4]
// Output: [3]
// Explanation: Only building 3 has an ocean view.

/**
 * @param {number[]} heights
 * @return {number[]}
 */
var findBuildings = function(heights) {
    const result = [];
    let maxH = 0; // Height of the tallest known building to the right

    // Right-to-left traversal
    for (let i = heights.length - 1; i >= 0; i--) {
        // If current building it taller, it has an ocean view
        if (heights[i] > maxH) {
            result.push(i);
            maxH = heights[i];
        }
    }

    return result.reverse(); // Result must be ordered by asc
    // Time Complexity: O(n)
    // Space Complexity: O(1)
};

// ----- Monotonic stack option

/**
 * @param {number[]} heights
 * @return {number[]}
 */
var findBuildings = function(heights) {
    const result = [];

    // Left-to-right traversal with monotonic stack
    for (let i = 0; i < heights.length; i++) {
        while (result.length > 0 && heights[result[result.length - 1]] <= heights[i]) result.pop();
        result.push(i);
    }

    return result;
    // Time Complexity: O(n) because Each building's index can be pushed and popped at most once
    // Space Complexity: O(1)
};


/**
 * 56. Merge Intervals
 * https://leetcode.com/problems/merge-intervals/
 */

// Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals,
// and return an array of the non-overlapping intervals that cover all the intervals in the input.
// Example 1:
// Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
// Example 2:
// Input: intervals = [[1,4],[4,5]]
// Output: [[1,5]]
// Explanation: Intervals [1,4] and [4,5] are considered overlapping.

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    if (!intervals || !intervals.length) return intervals;
    // Sorting intervals by start time
    intervals.sort((a, b) => a[0] - b[0]);

    let result = [];
    let prev = null;

    // Iterate over the rest
    for (const curr of intervals) {
        // Non-overlapping intervals, push as is
        if (!prev || prev[1] < curr[0]) {
            result.push(curr);
            prev = curr;
        }
        // Overlapping => merge
        else prev[1] = Math.max(prev[1], curr[1]);
    }

    return result;
    // Time Complexity: O(n log n) due to sorting
    // Space Complexity: O(1)
};

/**
 * 827. Making A Large Island
 * https://leetcode.com/problems/making-a-large-island/
 */

// You are given an n x n binary matrix grid. You are allowed to change at most one 0 to be 1.
// Return the size of the largest island in grid after applying this operation.
// An island is a 4-directionally connected group of 1s.
//
// Example 1:
// Input: grid = [[1,0],[0,1]]
// Output: 3
// Explanation: Change one 0 to 1 and connect two 1s, then we get an island with area = 3.
// Example 2:
// Input: grid = [[1,1],[1,0]]
// Output: 4
// Explanation: Change the 0 to 1 and make the island bigger, only one island with area = 4.
// Example 3:
// Input: grid = [[1,1],[1,1]]
// Output: 4
// Explanation: Can't change any 0 to 1, only one island with area = 4.

/**
 * @param {number[][]} grid
 * @return {number}
 */
var largestIsland = function(grid) {
    const n = grid.length;

    const islands = new Map(); // Mapped islands (id => size)

    // up down left right
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    // DFS to map and measure the island
    const measureIsland = (row, col, islandId) => {
        if (grid[row][col] !== 1) return 0;

        let size = 1;
        grid[row][col] = islandId;

        for (const [dr, dc] of directions) {
            const r = row + dr;
            const c = col + dc;

            if (r >= 0 && r < n && c >= 0 && c < n) size += measureIsland(r, c, islandId);
        }

        return size;
    }

    let islandId = 10; // We will be replacing 1s with island ID

    // Traversing the grid and measuring all islands
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            const size = measureIsland(row, col, islandId);
            if (size > 0) {
                islands.set(islandId, size);        // Remembering island size
                islandId++;                         // Next island id
            }
        }
    }

    let result = 0; // Max island size

    // Traversing the grid again and for each '0' cell
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            if (grid[row][col] === 0) {
                const counted = new Set(); // No duplicate islands
                // Changing it to 1 will give us an island of size 1
                let size = 1;

                for (const [dr, dc] of directions) {
                    const r = row + dr;
                    const c = col + dc;

                    // Next we're looking if it's next to any islands
                    if (r >= 0 && r < n && c >= 0 && c < n && grid[r][c] > 0) {
                        const islandId = grid[r][c]; // We've replaced 1's with island ID

                        // If it is, add the island size to the total size (i.e. enlarge that island by 1)
                        // If the cell is a bridge between 2-3-4 islands, we'll count all
                        if (!counted.has(islandId)) {
                            size += islands.get(islandId);
                            counted.add(islandId);
                        }
                    }
                }

                result = Math.max(result, size);
            }
        }
    }

    // Edge case: island takes all grid, we skip the loops and result stays 0, change to n * n
    return result ? result : n * n;

    // Time Complexity: O(n^2)
    // Space Complexity: O(n^2)
};


/**
 * 20. Valid Parentheses
 * https://leetcode.com/problems/valid-parentheses/
 */

// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
// An input string is valid if:
// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.
// Example 1:
// Input: s = "()"
// Output: true
// Example 2:
// Input: s = "()[]{}"
// Output: true
// Example 3:
// Input: s = "(]"
// Output: false

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const closeOpenMap = {')': '(', '}': '{', ']': '['};
    const stack = [];

    for (const char of s) {
        // Closing bracket: pop the last one and check correspondence
        if (closeOpenMap[char]) {
            const openBracket = stack.pop();
            if (closeOpenMap[char] !== openBracket) return false; // If not correct bracket, terminate
        }
        // Opening bracket - push
        else stack.push(char);
    }

    return (stack.length === 0);

    // Time Complexity: O(n)
    // Space Complexity: O(n)
};


/**
 * 408. Valid Word Abbreviation
 * https://leetcode.com/problems/valid-word-abbreviation/
 */

// A string can be abbreviated by replacing any number of non-adjacent, non-empty substrings with their lengths. The lengths should not have leading zeros.
// For example, a string such as "substitution" could be abbreviated as (but not limited to):
// "s10n" ("s ubstitutio n")
// "sub4u4" ("sub stit u tion")
// "12" ("substitution")
// "su3i1u2on" ("su bst i t u ti on")
// "substitution" (no substrings replaced)
// The following are not valid abbreviations:
// "s55n" ("s ubsti tutio n", the replaced substrings are adjacent)
// "s010n" (has leading zeros)
// "s0ubstitution" (replaces an empty substring)
// Given a string word and an abbreviation abbr, return whether the string matches the given abbreviation.
// A substring is a contiguous non-empty sequence of characters within a string.
//
// Example 1:
// Input: word = "internationalization", abbr = "i12iz4n"
// Output: true
// Explanation: The word "internationalization" can be abbreviated as "i12iz4n" ("i nternational iz atio n").
// Example 2:
// Input: word = "apple", abbr = "a2e"
// Output: false
// Explanation: The word "apple" cannot be abbreviated as "a2e".

/**
 * @param {string} word
 * @param {string} abbr
 * @return {boolean}
 */
var validWordAbbreviation = function(word, abbr) {
    let i = 0;  // Word char index
    let j = 0;  // Abbr char index

    // Checker for 0..9
    const isDigit = (char) => {return (char >= '0' && char <= '9')};

    while (j < abbr.length) {
        // If see a digit, build jump number
        if (isDigit(abbr[j])) {
            if (abbr[j] === '0') return false; // Leading zero

            let jump = 0;
            // Keep scanning until full number is read
            while (j < abbr.length && isDigit(abbr[j])) {
                jump = jump * 10 + (abbr.charCodeAt(j) - 48);
                j++;
            }

            i += jump; // Move word pointer
            if (i > word.length) return false; // Out of bound detection
        }
        else {
            // Comparing symbols
            // Trick: increasing both indexes after comparison
            if (word[i++] !== abbr[j++]) return false;
        }
    }

    // Abbr is valid only if we scanned full word (no less, no more)
    return (i === word.length);

    // Time Complexity: O(w + a) where w is word length and a is abbr length
    // Space Complexity: O(w + a)
};


