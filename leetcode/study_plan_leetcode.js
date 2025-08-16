/**
 * 122. Best Time to Buy and Sell Stock II
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/
 */

// You are given an integer array prices where prices[i] is the price of a given stock on the ith day.
// On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time.
// However, you can buy it then immediately sell it on the same day.
// Find and return the maximum profit you can achieve.
//
// Example 1:
// Input: prices = [7,1,5,3,6,4]
// Output: 7
// Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
// Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
// Total profit is 4 + 3 = 7.
// Example 2:
// Input: prices = [1,2,3,4,5]
// Output: 4
// Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
// Total profit is 4.
// Example 3:
// Input: prices = [7,6,4,3,1]
// Output: 0
// Explanation: There is no way to make a positive profit, so we never buy the stock to achieve the maximum profit of 0.

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let profit = 0;

    for (let i = 1; i < prices.length; i++) {
        const delta = prices[i] - prices[i - 1];
        if (delta > 0) {
            profit += delta;
        }
    }

    return profit;
};
// Time complexity: O(n)
// Space complexity: O(1)


/**
 * 45. Jump Game II
 * https://leetcode.com/problems/jump-game-ii/description/?envType=study-plan-v2&envId=top-interview-150
 */

// You are given a 0-indexed array of integers nums of length n. You are initially positioned at index 0.
// Each element nums[i] represents the maximum length of a forward jump from index i.
// In other words, if you are at index i, you can jump to any index (i + j) where:
// 0 <= j <= nums[i] and
// i + j < n
// Return the minimum number of jumps to reach index n - 1. The test cases are generated such that you can reach index n - 1.
//
// Example 1:
// Input: nums = [2,3,1,1,4]
// Output: 2
// Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
// Example 2:
// Input: nums = [2,3,0,1,4]
// Output: 2

/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    const n = nums.length;

    let jumps = 0;      // Number of jumps
    let maxReach = 0;   // Max reacheable place from this point
    let jumpEnd = 0;    // Current max jump end

    for (let i = 0; i < n - 1; i++) {
        // On each position we calculate max reach
        maxReach = Math.max(maxReach, i + nums[i]);

        // When we have exhausted the max distance for the current jump
        if (i === jumpEnd) {
            // Starting next jump
            jumps++;
            // maxReach is the max point we can reach from here or any previous cell
            jumpEnd = maxReach;

            // Termination condition
            if (jumpEnd >= n - 1) {
                return jumps;
            }
        }
    }

    return jumps;
};
// Time complexity: O(n)
// Space complexity: O(1)


/**
 * 274. H-Index
 * https://leetcode.com/problems/h-index
 */

// Given an array of integers citations where citations[i] is the number of citations a researcher received for their ith paper,
// return the researcher's h-index.
// According to the definition of h-index on Wikipedia: The h-index is defined as the maximum value of h such that
// the given researcher has published at least h papers that have each been cited at least h times.
//
// Example 1:
// Input: citations = [3,0,6,1,5]
// Output: 3
// Explanation: [3,0,6,1,5] means the researcher has 5 papers in total and each of them had received 3, 0, 6, 1, 5 citations respectively.
// Since the researcher has 3 papers with at least 3 citations each and the remaining two with no more than 3 citations each, their h-index is 3.
// Example 2:
// Input: citations = [1,3,1]
// Output: 1

/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function(citations) {
    citations.sort((a, b) => a - b);

    const n = citations.length;
    let i = 0;

    // We traverse the sorted citations array and looking for a position
    // Where citations count >= remaining citations, this is the target h-index
    while (i < n && citations[i] < n - i) {
        i++;
    }

    return n - i;

    // Alternatively we can order by desc and iterate while citations[i] > i
    // citations.sort((a, b) => b - a);
    // const n = citations.length;
    // let i = 0;
    // while (i < n && citations[i] > i) {
    //     i++;
    // }
    // return i;
};
// Time complexity: O(n log n) due to sorting step
// Space complexity: O(1)


/**
 * 380. Insert Delete GetRandom O(1)
 * https://leetcode.com/problems/insert-delete-getrandom-o1/
 */

// Implement the RandomizedSet class:
// RandomizedSet() Initializes the RandomizedSet object.
// bool insert(int val) Inserts an item val into the set if not present. Returns true if the item was not present, false otherwise.
// bool remove(int val) Removes an item val from the set if present. Returns true if the item was present, false otherwise.
// int getRandom() Returns a random element from the current set of elements
// (it's guaranteed that at least one element exists when this method is called). Each element must have the same probability of being returned.
// You must implement the functions of the class such that each function works in average O(1) time complexity.
//
// Example 1:
// Input
// ["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
// [[], [1], [2], [2], [], [1], [2], []]
// Output
// [null, true, false, true, 2, true, false, 2]
// Explanation
// RandomizedSet randomizedSet = new RandomizedSet();
// randomizedSet.insert(1); // Inserts 1 to the set. Returns true as 1 was inserted successfully.
// randomizedSet.remove(2); // Returns false as 2 does not exist in the set.
// randomizedSet.insert(2); // Inserts 2 to the set, returns true. Set now contains [1,2].
// randomizedSet.getRandom(); // getRandom() should return either 1 or 2 randomly.
// randomizedSet.remove(1); // Removes 1 from the set, returns true. Set now contains [2].
// randomizedSet.insert(2); // 2 was already in the set, so return false.
// randomizedSet.getRandom(); // Since 2 is the only number in the set, getRandom() will always return 2.

var RandomizedSet = function() {
    // Map value -> id
    this.idMap = new Map();

    // Array of values, necessary for random O(1)
    this.values = [];
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    if (this.idMap.has(val)) {
        return false;
    }

    // Add value to array and map
    this.values.push(val);
    this.idMap.set(val, this.values.length - 1);

    return true;
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if (!this.idMap.has(val)) {
        return false;
    }

    // Swapping value to delete with the last value in array (if more than 1 value)
    if (this.values.length > 1) {
        const id = this.idMap.get(val);
        const lastVal = this.values[this.values.length - 1];
        this.values[id] = lastVal;
        this.idMap.set(lastVal, id);    // Re-mapping to new ID
    }

    // Deleting from both
    this.values.pop();
    this.idMap.delete(val);

    return true;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    // Math.random() -> [0; 1)
    const random = Math.floor(Math.random() * this.values.length);
    return this.values[random];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */


/**
 * 238. Product of Array Except Self
 * https://leetcode.com/problems/product-of-array-except-self/
 */

// Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
// You must write an algorithm that runs in O(n) time and without using the division operation.
// Example 1:
// Input: nums = [1,2,3,4]
// Output: [24,12,8,6]
// Example 2:
// Input: nums = [-1,1,0,-3,3]
// Output: [0,0,9,0,0]

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const result = Array(nums.length).fill(0);
    let currentPrefix = 1; // Product of all items before current
    let currentSuffix = 1; // Product of all items after current

    // Set preliminary result as produt of all items before current
    for (let i = 0; i < nums.length; i++) {
        result[i] = currentPrefix;
        currentPrefix *= nums[i];
    }

    // Multiply the preliminary result by product of all items after current
    for (let i = nums.length - 1; i >= 0; i--) {
        result[i] *= currentSuffix;
        currentSuffix *= nums[i]
    }

    return result;
};
// Time complexity: O(n)
// Space complexity: O(1), not counting the output


/**
 * 13. Roman to Integer
 * https://leetcode.com/problems/roman-to-integer/description/
 */

// Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.
// Symbol       Value
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000
// For example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II.
// The number 27 is written as XXVII, which is XX + V + II.
// Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII.
// Instead, the number four is written as IV. Because the one is before the five we subtract it making four.
// The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:
// I can be placed before V (5) and X (10) to make 4 and 9.
// X can be placed before L (50) and C (100) to make 40 and 90.
// C can be placed before D (500) and M (1000) to make 400 and 900.
// Given a roman numeral, convert it to an integer.
//
// Example 1:
// Input: s = "III"
// Output: 3
// Explanation: III = 3.
// Example 2:
// Input: s = "LVIII"
// Output: 58
// Explanation: L = 50, V= 5, III = 3.
// Example 3:
// Input: s = "MCMXCIV"
// Output: 1994
// Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.

/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const mapping = { 'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000 };

    let result = 0;

    // Iterating with lookahead
    for (let i = 0; i < s.length; i++) {
        const curr = mapping[ s[i] ];
        const next = (i < s.length - 1) ? mapping[ s[i + 1] ] : 0;

        // If current is less than next, substract instead of add
        result += (curr >= next) ? curr : -curr;
    }

    return result;
};
// Time complexity: O(n)
// Space complexity: O(1)


/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    // 15 “milestones”: 1000 (M) … down to 1 (I)
    const values  = [
        1000, 900, 500, 400,
        100,  90,  50,  40,
        10,   9,   5,   4,
        1
    ];
    const symbols = [
        "M", "CM", "D", "CD",
        "C", "XC", "L", "XL",
        "X", "IX", "V", "IV",
        "I"
    ];

    let result = '';

    // From large to small
    for (let i = 0; i < values.length; i++) {
        // If value is contained, add to result
        while (num >= values[i]) {
            num -= values[i];
            result += symbols[i];
        }

        // Early exit
        if (num === 0) {
            break;
        }
    }

    return result;
};
// Time complexity: O(1) the loop runs at most a fixed ~15 – 20 steps for any 1…3999 input
// Space complexity: O(1)


/**
 * 58. Length of Last Word
 */

// https://leetcode.com/problems/length-of-last-word/

// Given a string s consisting of words and spaces, return the length of the last word in the string.
// A word is a maximal substring consisting of non-space characters only.
//
// Example 1:
// Input: s = "Hello World"
// Output: 5
// Explanation: The last word is "World" with length 5.
// Example 2:
// Input: s = "   fly me   to   the moon  "
// Output: 4
// Explanation: The last word is "moon" with length 4.
// Example 3:
// Input: s = "luffy is still joyboy"
// Output: 6
// Explanation: The last word is "joyboy" with length 6.

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    let i = s.length - 1;
    let count = 0;

    // Scan string backwards, skip trailing spaces
    while (i >= 0 && s[i] === ' ') {
        i--;
    }

    // Found last word, cound letters
    while (i >= 0 && s[i] !== ' ') {
        count++;
        i--;
    }

    return count;
};
// Time complexity: O(n)
// Space complexity: O(1)


/**
 * 14. Longest Common Prefix
 * https://leetcode.com/problems/longest-common-prefix/
 */

// Write a function to find the longest common prefix string amongst an array of strings.
// If there is no common prefix, return an empty string "".
//
// Example 1:
// Input: strs = ["flower","flow","flight"]
// Output: "fl"
// Example 2:
// Input: strs = ["dog","racecar","car"]
// Output: ""
// Explanation: There is no common prefix among the input strings.


// Smartest solution: lexicographical sort
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (strs.length === 1) {
        return strs[0];
    }

    // Sort lexicographically (like words in a dictionary)
    strs.sort();

    const first = strs[0];
    const last = strs[strs.length - 1];

    let charIndex = 0;

    // Compare first and last strings
    while (charIndex < first.length && first[charIndex] === last[charIndex]) {
        charIndex++;
    }

    // charIndex points at the first non-matching symbol (or end of string), slice param 2 is non-inclusive
    return first.slice(0, charIndex);
};
// Time complexity: O(n log n), string comparison is O(m) where m is shortest word length
// Space complexity: O(1)

// Straight-forward solution: start at index 0, scan each string's symbol at that index
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (strs.length === 1) {
        return strs[0];
    }

    const firstStr = strs[0];
    let prefix = '';

    // Scan each string's nth symbol and stop on first mismatch
    for (let charIndex = 0; charIndex < firstStr.length; charIndex++) {
        for (let i = 1; i < strs.length; i++) {
            if (strs[i].length <= charIndex || strs[i][charIndex] !== firstStr[charIndex]) {
                return prefix;
            }
        }

        prefix += firstStr[charIndex];
    }

    return prefix;
};
// Time complexity: O(n * m), where m is shortest word length
// Space complexity: O(1)


/**
 * 151. Reverse Words in a String
 * https://leetcode.com/problems/reverse-words-in-a-string/
 */

// Given an input string s, reverse the order of the words.
// A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.
// Return a string of the words in reverse order concatenated by a single space.
// Note that s may contain leading or trailing spaces or multiple spaces between two words.
// The returned string should only have a single space separating the words. Do not include any extra spaces.

// Elegant one-liner

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    return s.trim()     // Trim start and end spaces
        .split(/\s+/)   // Split string into an array of words, no empty strings
        .reverse()      // Reverse order
        .join(' ');     // Assemble back
};
// Time complexity: O(n)
// Space complexity: O(n) for array of words


// Classic solution - backwards scan, O(1) extra space

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    let result = '';

    // Word start/end pointers
    let rightStart = s.length - 1;
    let rightEnd = rightStart;

    // Scanning from the right
    while (rightStart >= 0) {
        // Advance word end pointer for each space scanned
        if (s[rightEnd] === ' ') {
            rightEnd--;
            rightStart = rightEnd; // Move start pointer too
        }

        // Advance start pointer until next space or start of string is found
        if (s[rightStart] !== ' ') {
            rightStart--;
        }

        // Start of string / next space (while end pointer on a word character
        if ((rightStart === -1 || s[rightStart] === ' ') && s[rightEnd] !== ' ') {
            // Merge word
            if (result.length > 0) {
                result += ' ';
            }

            result += s.substring(rightStart + 1, rightEnd + 1);

            // Advance both poiners behind this word
            rightStart--;
            rightEnd = rightStart;
        }
    }

    return result;
};
// Time complexity: O(n)
// Space complexity: O(1) - no extra space except output


/**
 * 6. Zigzag Conversion
 * https://leetcode.com/problems/zigzag-conversion/
 */

// The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this:
// (you may want to display this pattern in a fixed font for better legibility)
// P   A   H   N
// A P L S I I G
// Y   I   R
// And then read line by line: "PAHNAPLSIIGYIR"
// Write the code that will take a string and make this conversion given a number of rows:
// string convert(string s, int numRows);
//
// Example 1:
// Input: s = "PAYPALISHIRING", numRows = 3
// Output: "PAHNAPLSIIGYIR"
// Example 2:
// Input: s = "PAYPALISHIRING", numRows = 4
// Output: "PINALSIGYAHRPI"
// Explanation:
// P     I    N
// A   L S  I G
// Y A   H R
// P     I
// Example 3:
// Input: s = "A", numRows = 1
// Output: "A"

// Elegant solution

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    if (numRows === 1 || s.length <= numRows) {
        return s;
    }

    // Array of strings for each row
    const rows = Array(numRows).fill('');
    let currentRow = 0; // Row to append symbol to
    let direction = 1;  // 1 up, -1 down

    for (const char of s) {
        rows[currentRow] += char;
        currentRow += direction;

        // Direction switch on border
        if (currentRow === 0 || currentRow === numRows - 1) {
            direction = -direction;
        }
    }

    return rows.join('');
};
// Time complexity: O(n)
// Space complexity: O(n)


// Math-heavy solution with O(1) space

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    if (numRows === 1) {
        return s;
    }

    const n = s.length;
    let result = '';
    let row = 0;
    let index = 0;

    // Distance between two symbols on the same zig-zag position
    const zigZagLength = (numRows - 1) * 2;

    while (result.length < n) {
        result += s[index];

        // Checking zig-zag diagonal char
        if (row > 0 && row < numRows - 1) {
            const zigZagIndex = index + (numRows - row) * 2 - 2;
            if (zigZagIndex < n) {
                result += s[index + (numRows - row) * 2 - 2];
            }
        }

        // Shifting for full zig-zag length
        index += zigZagLength;

        // If we fell beyond string space, start with next symbol in the beginning
        if (index >= n) {
            row++;
            index = row;
        }
    }

    return result;
};
// Time complexity: O(n)
// Space complexity: O(1)

/**
 * 28. Find the Index of the First Occurrence in a String
 * https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/
 */

// Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.
//
// Example 1:
// Input: haystack = "sadbutsad", needle = "sad"
// Output: 0
// Explanation: "sad" occurs at index 0 and 6.
// The first occurrence is at index 0, so we return 0.
// Example 2:
// Input: haystack = "leetcode", needle = "leeto"
// Output: -1
// Explanation: "leeto" did not occur in "leetcode", so we return -1.

// Obvious use of JS String.search()

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    return haystack.indexOf(needle);
};
// Time complexity: O(n)
// Space complexity: O(1)


// Implementation without String.search()

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    let startIndex = 0; // First known matching symbol
    let endIndex = 0;   // Last known matching symbol

    // Iterate until we have space to search
    while (startIndex <= haystack.length - needle.length) {
        // If next symbol matches the word, we're on the right track
        if (haystack[endIndex] === needle[endIndex - startIndex]) {
            // If it's the last word symbol, we have a winner
            if (endIndex - startIndex === needle.length - 1) {
                return startIndex;
            }

            // Otherwise keep iterating end pointer
            endIndex++;
        }
        // If no match, move START index to next symbol and reset the end pointer
        else {
            startIndex++;
            endIndex = startIndex;
        }
    }

    return -1;
};
// Time complexity: O(n)
// Space complexity: O(1)


/**
 * 125. Valid Palindrome
 * https://leetcode.com/problems/valid-palindrome/
 */

// A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters,
// it reads the same forward and backward. Alphanumeric characters include letters and numbers.
// Given a string s, return true if it is a palindrome, or false otherwise.
//
// Example 1:
// Input: s = "A man, a plan, a canal: Panama"
// Output: true
// Explanation: "amanaplanacanalpanama" is a palindrome.
// Example 2:
// Input: s = "race a car"
// Output: false
// Explanation: "raceacar" is not a palindrome.
// Example 3:
// Input: s = " "
// Output: true
// Explanation: s is an empty string "" after removing non-alphanumeric characters.
// Since an empty string reads the same forward and backward, it is a palindrome.

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    // A simple way to clean the string is s.replace(/[^a-z0-9]/gi, '').toLowerCase()
    // Adds O(n) space

    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        // More performant condition looks like this
        // (left < right) && !((s[left] >= 'A' && s[left] <= 'Z') || (s[left] >= 'a' && s[left] <= 'z') || (s[left] >= '0' && s[left] <= '9'))
        while ((left < right) && !(/[a-z0-9]/i).test(s[left])) {
            left++;
        }

        while ((left < right) && !(/[a-z0-9]/i).test(s[left])) {
            right--;
        }

        if (left < right && s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }

        left++;
        right--;
    }

    return true;
};
// Time complexity: O(n)
// Space complexity: O(1)


/**
 * 392. Is Subsequence
 * https://leetcode.com/problems/is-subsequence/description/
 */

// Given two strings s and t, return true if s is a subsequence of t, or false otherwise.
// A subsequence of a string is a new string that is formed from the original string by deleting
// some (can be none) of the characters without disturbing the relative positions of the remaining characters.
// (i.e., "ace" is a subsequence of "abcde" while "aec" is not).
// Example 1:
// Input: s = "abc", t = "ahbgdc"
// Output: true
// Example 2:
// Input: s = "axc", t = "ahbgdc"
// Output: false

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
    if (s.length === 0) {
        return true;
    }

    if (s.length > t.length) {
        return false;
    }

    let index = 0;

    for (const char of t) {
        // When found next matching symbol, move index or return true
        if (s[index] === char) {
            if (index === s.length - 1) {
                return true;
            }

            index++;
        }
    }

    return false;
};
// Time complexity: O(n)
// Space complexity: O(1)

// Follow up: Suppose there are lots of incoming s, say s1, s2, ..., sk where k >= 10^9,
// and you want to check one by one to see if t has its subsequence. In this scenario, how would you change your code?

// Solution
// Preprocess t once using character-index mapping { a: [0, 5], b: [3], ...}
// Then for each s, for each character find its index in the map
// Save last found index and only accept indexes greater than the last one
// Use upper band binary search (bisec) for optimal performance

// Preprocessing function
function preprocess(t) {
    const map = {};
    for (let i = 0; i < t.length; i++) {
        const char = t[i];
        if (!map[char]) map[char] = [];
        map[char].push(i);
    }
    return map;
}

// Binary search helper: find the first index in arr > target
function upperBound(arr, target) {
    let left = 0, right = arr.length;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}

// Main function for checking one s using preprocessed t
function isSubsequence(s, map) {
    let prevIndex = -1;

    for (const char of s) {
        if (!map[char]) return false;

        const pos = upperBound(map[char], prevIndex);
        if (pos === map[char].length) return false;

        prevIndex = map[char][pos];
    }

    return true;
}
// Preprocessing: O(t.length)
// Each s check: O(n * log k) where k is the max frequency of any character in t


/**
 * 167. Two Sum II - Input Array Is Sorted
 * https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
 */

// Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order,
// find two numbers such that they add up to a specific target number.
// Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.
// Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.
// The tests are generated such that there is exactly one solution. You may not use the same element twice.
// Your solution must use only constant extra space.
//
// Example 1:
// Input: numbers = [2,7,11,15], target = 9
// Output: [1,2]
// Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].
// Example 2:
// Input: numbers = [2,3,4], target = 6
// Output: [1,3]
// Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].
// Example 3:
// Input: numbers = [-1,0], target = -1
// Output: [1,2]
// Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
        const sum = numbers[left] + numbers[right];

        if (sum === target) {
            return [left + 1, right + 1];
        }
        if (sum < target) {
            left++;
        }
        else {
            right--;
        }
    }

    return [left + 1, right + 1];
};
// Time complexity: O(n)
// Space complexity: O(1)


/**
 * 11. Container With Most Water
 * https://leetcode.com/problems/container-with-most-water/
 */

// You are given an integer array height of length n.
// There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
// Find two lines that together with the x-axis form a container, such that the container contains the most water.
// Return the maximum amount of water a container can store.
// Notice that you may not slant the container.
//
// Example 1:
// Input: height = [1,8,6,2,5,4,8,3,7]
// Output: 49
// Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7].
// In this case, the max area of water (blue section) the container can contain is 49.
// Example 2:
// Input: height = [1,1]
// Output: 1

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;

    while (left < right) {
        // width * min height
        maxWater = Math.max(
            maxWater,
            (right - left) * Math.min(height[left], height[right])
        );

        // Advancing the smallest of 2 walls
        if (height[left] < height[right]) {
            left++;
        }
        else {
            right--;
        }
    }

    return maxWater;
};
// Time complexity: O(n)
// Space complexity: O(1)


/**
 * 15. 3Sum
 * https://leetcode.com/problems/3sum/
 */

// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
// such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
// Notice that the solution set must not contain duplicate triplets.
//
// Example 1:
// Input: nums = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]
// Explanation:
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
// The distinct triplets are [-1,0,1] and [-1,-1,2].
// Notice that the order of the output and the order of the triplets does not matter.

// Example 2:
// Input: nums = [0,1,1]
// Output: []
// Explanation: The only possible triplet does not sum up to 0.

// Example 3:
// Input: nums = [0,0,0]
// Output: [[0,0,0]]
// Explanation: The only possible triplet sums up to 0.

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    nums.sort((a, b) => a - b); // Sort by asc

    const result = [];

    // First number - test each array value except last 2
    for (let i = 0; i < nums.length - 2; i++) {
        // Two pointers to sweep the rest of the array (to the right)
        let left = i + 1;
        let right = nums.length - 1;

        // Skipping duplicates
        if (i > 0 && (nums[i - 1] === nums[i])) {
            continue;
        }

        // Classic two-pointer sweep
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            // Found one
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);

                // Advance both pointers (only duplicates will work with either of them)
                left++;
                right--;

                // Skipping duplicates
                while (left < right && nums[left - 1] === nums[left]) left++;
                while (left < right && nums[right + 1] === nums[right])right--;
            }
            // Otherwise move one of the pointers to balance the sum
            else if (sum < 0) {
                left++;
            }
            else {
                right--;
            }
        }
    }

    return result;
};
// Time complexity: O(n^2)
// Space complexity: O(1)


/**
 * 209. Minimum Size Subarray Sum
 * https://leetcode.com/problems/minimum-size-subarray-sum/
 */

// Given an array of positive integers nums and a positive integer target,
// return the minimal length of a subarray whose sum is greater than or equal to target.
// If there is no such subarray, return 0 instead.
//
// Example 1:
// Input: target = 7, nums = [2,3,1,2,4,3]
// Output: 2
// Explanation: The subarray [4,3] has the minimal length under the problem constraint.
// Example 2:
// Input: target = 4, nums = [1,4,4]
// Output: 1
// Example 3:
// Input: target = 11, nums = [1,1,1,1,1,1,1,1]
// Output: 0

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    // Sliding window
    let left = 0;
    let right = left;

    let sum = 0;
    let minLength = Infinity;

    // Sliding right boundary
    while (right < nums.length) {
        sum += nums[right];

        // If we're above target, slide left boundary until we're not
        while (sum >= target) {
            // Save min length
            minLength = Math.min(
                minLength,
                right - left + 1
            );

            // Shrink window
            sum -= nums[left];
            left++;
        }

        right++;    // Expand window
    }

    return minLength < Infinity ? minLength : 0;
};
// Time complexity: O(n)
// Space complexity: O(1)


// Solution for array with NEGATIVE values: Prefix Sum + Binary Search

var minSubArrayLen = function(target, nums) {
    const n = nums.length;
    const prefixSums = new Array(n + 1).fill(0);

    // Build prefix sums
    for (let i = 1; i <= n; i++) {
        prefixSums[i] = prefixSums[i - 1] + nums[i - 1];
    }

    let minLength = Infinity;

    for (let i = 0; i < n; i++) {
        const requiredSum = target + prefixSums[i];

        // Binary search for the smallest j where prefixSums[j] >= requiredSum
        let left = i + 1;
        let right = n;

        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (prefixSums[mid] >= requiredSum) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        if (left <= n) {
            minLength = Math.min(minLength, left - i);
        }
    }

    return minLength === Infinity ? 0 : minLength;
};
// Time complexity: O(n log n)
// Space complexity: O(n)


/**
 * 3. Longest Substring Without Repeating Characters
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/
 */

// Given a string s, find the length of the longest substring without duplicate characters.
//
// Example 1:
// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.
// Example 2:
// Input: s = "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.
// Example 3:
// Input: s = "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
// Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    const lastSeen = new Map(); // Last index of each seen char
    let left = 0;
    let result = 0;

    // Making a sliding window left <-> right
    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        // If seeing a repeating char, make sure that left pointer is beyond it
        if (lastSeen.has(char)) {
            left = Math.max(left, lastSeen.get(char) + 1);
        }

        // Remembering the character
        lastSeen.set(char, right);

        // Updating result
        result = Math.max(result, right - left + 1);
    }

    return result;
};
// Time complexity: O(n)
// Space complexity: O(n)


/**
 * 36. Valid Sudoku
 * https://leetcode.com/problems/valid-sudoku/
 */

// Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
// Each row must contain the digits 1-9 without repetition.
// Each column must contain the digits 1-9 without repetition.
// Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
// Note:
// A Sudoku board (partially filled) could be valid but is not necessarily solvable.
// Only the filled cells need to be validated according to the mentioned rules.
//
// Example 1:
// Input: board =
// [["5","3",".",".","7",".",".",".","."]
// ,["6",".",".","1","9","5",".",".","."]
// ,[".","9","8",".",".",".",".","6","."]
// ,["8",".",".",".","6",".",".",".","3"]
// ,["4",".",".","8",".","3",".",".","1"]
// ,["7",".",".",".","2",".",".",".","6"]
// ,[".","6",".",".",".",".","2","8","."]
// ,[".",".",".","4","1","9",".",".","5"]
// ,[".",".",".",".","8",".",".","7","9"]]
// Output: true

// Example 2:
// Input: board =
// [["8","3",".",".","7",".",".",".","."]
// ,["6",".",".","1","9","5",".",".","."]
// ,[".","9","8",".",".",".",".","6","."]
// ,["8",".",".",".","6",".",".",".","3"]
// ,["4",".",".","8",".","3",".",".","1"]
// ,["7",".",".",".","2",".",".",".","6"]
// ,[".","6",".",".",".",".","2","8","."]
// ,[".",".",".","4","1","9",".",".","5"]
// ,[".",".",".",".","8",".",".","7","9"]]
// Output: false
// Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8.
// Since there are two 8's in the top left 3x3 sub-box, it is invalid.


// 1 scan with pre-allocation of all sets

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    const rows =  Array.from({length: 9}, () => new Set());
    const cols =  Array.from({length: 9}, () => new Set());
    const boxes = Array.from({length: 9}, () => new Set());

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const value = board[r][c];

            if (value !== ".") {
                // Get box number 0-9 based on row + col
                b =
                    Math.floor(r / 3) * 3   // row 0-2 ->   0, 3, 6
                    + Math.floor(c / 3);    // col 0-2 -> + 0, 1, 2

                // Checking if seen
                if (rows[r].has(value) || cols[c].has(value) || boxes[b].has(value)) {
                    return false;
                }

                // Adding to seen
                rows[r].add(value);
                cols[c].add(value);
                boxes[b].add(value);
            }
        }
    }

    return true;
};
// Time complexity: O(1)
// Space complexity: O(1)


// Straight-forward approach: 3 scans, O(1) time + space
// Faster with invalid boards due to not allocating all sets at once

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    const checkCell = function(cell, seenCells) {
        if (cell !== ".") {
            if (seenCells.has(cell)) {
                return false;
            }

            seenCells.add(cell);
        }

        return true;
    }

    // Checking rows
    for (let r = 0; r < 9; r++) {
        const seenCells = new Set();

        for (let c = 0; c < 9; c++) {
            if (!checkCell(board[r][c], seenCells)) {
                return false;
            }
        }
    }

    // Checking columns
    for (let c = 0; c < 9; c++) {
        const seenCells = new Set();

        for (let r = 0; r < 9; r++) {
            if (!checkCell(board[r][c], seenCells)) {
                return false;
            }
        }
    }

    // Checking sub-boxes
    for (let subr = 0; subr < 3; subr++) {
        for (let subc = 0; subc < 3; subc++) {
            const seenCells = new Set();

            for (let r = subr * 3; r < subr * 3 + 3; r++) {
                for (let c = subc * 3; c < subc * 3 + 3; c++) {
                    if (!checkCell(board[r][c], seenCells)) {
                        return false;
                    }
                }
            }
        }
    }

    return true;
};
// Time complexity: O(1)
// Space complexity: O(1)


// Same as first but with bit arithmetic

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    // Bit arrays
    const rows =  new Uint16Array(9);
    const cols =  new Uint16Array(9);
    const boxes = new Uint16Array(9);

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const value = board[r][c];

            if (value !== ".") {
                // bit for digit 1..9
                const bit = 1 << (value.charCodeAt(0) - 49); // '1' = 49

                // Get box number 0-9 based on row + col
                // '>>> 0' is the same as Math.floor
                b =
                    ((r / 3) >>> 0) * 3   // row 0-2 ->   0, 3, 6
                    + ((c / 3) >>> 0);    // col 0-2 -> + 0, 1, 2

                // Checking if seen
                if ((rows[r] & bit) | (cols[c] & bit) | (boxes[b] & bit)) {
                    return false;
                }

                // Adding to seen
                rows[r]  |= bit;
                cols[c]  |= bit;
                boxes[b] |= bit;
            }
        }
    }

    return true;
};
// Time complexity: O(1)
// Space complexity: O(1)


/**
 * 289. Game of Life
 * https://leetcode.com/problems/game-of-life/
 */

// According to Wikipedia's article: "The Game of Life, also known simply as Life,
// is a cellular automaton devised by the British mathematician John Horton Conway in 1970."
// The board is made up of an m x n grid of cells, where each cell has an initial state: live (represented by a 1)
// or dead (represented by a 0). Each cell interacts with its eight neighbors (horizontal, vertical, diagonal)
// using the following four rules (taken from the above Wikipedia article):
// Any live cell with fewer than two live neighbors dies as if caused by under-population.
// Any live cell with two or three live neighbors lives on to the next generation.
// Any live cell with more than three live neighbors dies, as if by over-population.
// Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
// The next state of the board is determined by applying the above rules simultaneously to every cell
// in the current state of the m x n grid board. In this process, births and deaths occur simultaneously.
// Given the current state of the board, update the board to reflect its next state.
// Note that you do not need to return anything.
//
// Example 1:
// Input: board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
// Output: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
// Example 2:
// Input: board = [[1,1],[1,0]]
// Output: [[1,1],[1,1]]

// Super neat solution with true in-place ops: 2 passes, bit operations, O(1) space

/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var gameOfLife = function(board) {
    const rows = board.length;
    const cols = board[0].length;

    // 1st bit stores current state
    // We will use second bit to store new state
    // E.g. 01 -> was alive, will die | 11 -> was alive, will live | 10 -> was dead, will live

    // First pass: calculate state (first bit), write to second bit
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let neighbors = 0;

            // Calculating live neighbors
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0) continue;

                    const r = row + dr;
                    const c = col + dc;

                    if (r >= 0 && r < rows && c >= 0 && c < cols) {
                        neighbors += board[r][c] & 1; // returns 1 when 1st bit === 1 (1, 3, 5, etc.)
                    }
                }
            }

            const alive = board[row][col] & 1; // returns 1 when 1st bit === 1 (1, 3, 5, etc.)

            // Any live cell with fewer than two live neighbors dies as if caused by under-population
            // Any live cell with more than three live neighbors dies, as if by over-population
            // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction
            const nextState = (alive && (neighbors === 2 || neighbors === 3)) ||
            (!alive && neighbors === 3)
                ? 1 : 0;

            board[row][col] |= (nextState << 1); // Set second bit (next state)
        }
    }

    // Second pass: unsigned shift right (rewrite old state with new)
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            board[row][col] = (board[row][col] >>> 1);
        }
    }
};
// Time complexity: O(r * c)
// Space complexity: O(1)

// Also neat solution: 2 pass but uses extra space

/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var gameOfLife = function(board) {
    const rows = board.length;
    const cols = board[0].length;

    // Updates on the board
    const dead = [];
    const born = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let neighbors = 0;

            // Calculating live neighbors
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0) continue;

                    const r = row + dr;
                    const c = col + dc;

                    if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === 1) {
                        neighbors++;
                    }
                }
            }

            // Any live cell with fewer than two live neighbors dies as if caused by under-population
            // Any live cell with more than three live neighbors dies, as if by over-population
            if (board[row][col] === 1 && (neighbors < 2 || neighbors > 3)) {
                dead.push([row, col]);
            }
            // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction
            else if (board[row][col] === 0 && neighbors === 3) {
                born.push([row, col]);
            }
        }
    }

    // Apply deaths
    for (const [row, col] of dead) {
        board[row][col] = 0;
    }

    // Apply new life
    for (const [row, col] of born) {
        board[row][col] = 1;
    }
};
// Time complexity: O(r * c)
// Space complexity: O(r * c)

// Follow-up: how to implement infinite board?

// 1. Dynamically padded 2D array (simple to retrofit)
// Maintain a 1-cell “guard ring” of zeros.
// For each render: add extra rows/cols when live cells step on outer ring
// Trim extra empty rows / cols

// 2. Sparse representation (best in practice)
// Store only live cells in a set; count neighbors with a hash map.

// 3. (Advanced) Quadtrees / Hashlife
// For very large, sparse worlds or many generations, use a quadtree with memoization (Hashlife)

// Sparse representation - draft
function step(live) {
    const dirs = [
        [-1,-1], [-1,0], [-1,1],
        [ 0,-1],         [ 0,1],
        [ 1,-1], [ 1,0], [ 1,1],
    ];

    const counts = new Map(); // key -> number of live neighbors

    // 1) count live neighbors for all candidates (live cells and their neighbors)
    for (const key of live) {
        const [rStr, cStr] = key.split(',');
        const r = +rStr, c = +cStr;

        for (const [dr, dc] of dirs) {
            const k = `${r + dr},${c + dc}`;
            counts.set(k, (counts.get(k) || 0) + 1);
        }
    }

    // 2) decide next generation
    const next = new Set();

    // A cell survives if it has 2 or 3 neighbors and is currently alive
    // A cell is born if it has exactly 3 neighbors
    for (const [key, cnt] of counts.entries()) {
        if (cnt === 3 || (cnt === 2 && live.has(key))) {
            next.add(key);
        }
    }

    return next;
}

/**
 * 383. Ransom Note
 * https://leetcode.com/problems/ransom-note/
 */

// Given two strings ransomNote and magazine, return true if ransomNote can be constructed
// by using the letters from magazine and false otherwise.
// Each letter in magazine can only be used once in ransomNote.
//
// Example 1:
// Input: ransomNote = "a", magazine = "b"
// Output: false
// Example 2:
// Input: ransomNote = "aa", magazine = "ab"
// Output: false
// Example 3:
// Input: ransomNote = "aa", magazine = "aab"
// Output: true

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function(ransomNote, magazine) {
    const charMap = {};

    // Creating a map of ransom note charachters and their counts
    for (const char of ransomNote) {
        charMap[char] = (charMap[char] || 0) + 1;
    }

    // Now going through the magazin chars
    for (const char of magazine) {
        if (charMap[char]) {
            charMap[char]--;    // Decrease count for found character

            if (charMap[char] === 0) {
                delete charMap[char];   // Found required number of a charachter

                // If it was the last one, job's done
                if (Object.keys(charMap).length === 0) {
                    return true;
                }
            }
        }
    }

    return false;
};
// Time complexity: O(m + n)
// Space complexity: O(1)


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
    const closeOpenMap = {")": "(", "}": "{", "]": "["};
    const stack = [];

    for (const char of s) {
        // Closing bracket: pop the last one and check correspondence
        if (closeOpenMap[char]) {
            const openBracket = stack.pop();

            if (closeOpenMap[char] !== openBracket) {
                return false;
            }
        }
        else {
            // Opening bracket - push
            stack.push(char);
        }
    }

    return (stack.length === 0);
};
// Time complexity: O(n)
// Space complexity: O(n)


/**
 * 1249. Minimum Remove to Make Valid Parentheses
 * https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/
 */

// Given a string s of '(' , ')' and lowercase English characters.
// Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions )
// so that the resulting parentheses string is valid and return any valid string.
// Formally, a parentheses string is valid if and only if:
// It is the empty string, contains only lowercase characters, or
// It can be written as AB (A concatenated with B), where A and B are valid strings, or
// It can be written as (A), where A is a valid string.
//
// Example 1:
// Input: s = "lee(t(c)o)de)"
// Output: "lee(t(c)o)de"
// Explanation: "lee(t(co)de)" , "lee(t(c)ode)" would also be accepted.
// Example 2:
// Input: s = "a)b(c)d"
// Output: "ab(c)d"
// Example 3:
// Input: s = "))(("
// Output: ""
// Explanation: An empty string is also valid.

/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function(s) {
    const stack = [];               // Brackets validation
    const skipIndexes = new Set();  // Indexes of invalid brackets

    // Scan string, validate brackets
    for (let i = 0; i < s.length; i++) {
        if (s[i] === "(") {
            stack.push(i);
        }
        else if (s[i] === ")") {
            if (stack.length) {
                stack.pop();
            }
            else {
                // Invalid closing bracket - add to skip
                skipIndexes.add(i);
            }
        }
    }

    // Any open brackets left in stack are invalid
    for (let i = 0; i < stack.length; i++) {
        skipIndexes.add(stack[i]);
    }

    // Early return if all valid
    if (skipIndexes.size === 0) {
        return s;
    }

    let validSymbols = [];

    // Adding all valid symbols to the output array
    for (let i = 0; i < s.length; i++) {
        if (!skipIndexes.has(i)) {
            validSymbols.push(s[i]);
        }
    }

    // This is better than naive in-loop concatenation
    return validSymbols.join("");
};
// Time complexity: O(n)
// Space complexity: O(n)


// Alt solution: Two-pass balance sweep

/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function(s) {
    // 1) keep only valid ')' in a forward pass
    const tmp = [];
    let open = 0;
    for (const ch of s) {
        if (ch === '(') {
            open++;
            tmp.push(ch);
        } else if (ch === ')') {
            if (open > 0) { // has a matching '('
                open--;
                tmp.push(ch);
            }
            // else: skip this ')'
        } else {
            tmp.push(ch);
        }
    }
    if (open === 0) return tmp.join(''); // nothing to trim

    // 2) trim extra '(' in a backward pass
    const out = [];
    for (let i = tmp.length - 1; i >= 0; i--) {
        const ch = tmp[i];
        if (ch === '(' && open > 0) {
            open--; // skip this unmatched '('
        } else {
            out.push(ch);
        }
    }
    out.reverse();
    return out.join('');
};
// Time complexity: O(n)
// Space complexity: O(n)


/**
 * 71. Simplify Path
 * https://leetcode.com/problems/simplify-path/
 */

// You are given an absolute path for a Unix-style file system, which always begins with a slash '/'.
// Your task is to transform this absolute path into its simplified canonical path.
// The rules of a Unix-style file system are as follows:
// A single period '.' represents the current directory.
// A double period '..' represents the previous/parent directory.
// Multiple consecutive slashes such as '//' and '///' are treated as a single slash '/'.
// Any sequence of periods that does not match the rules above should be treated as a valid directory or file name.
// For example, '...' and '....' are valid directory or file names.
// The simplified canonical path should follow these rules:
//
// The path must start with a single slash '/'.
// Directories within the path must be separated by exactly one slash '/'.
// The path must not end with a slash '/', unless it is the root directory.
// The path must not have any single or double periods ('.' and '..') used to denote current or parent directories.
// Return the simplified canonical path.
//
// Example 1:
// Input: path = "/home/"
// Output: "/home"
// Explanation:
// The trailing slash should be removed.
//
// Example 2:
// Input: path = "/home//foo/"
// Output: "/home/foo"
// Explanation:
// Multiple consecutive slashes are replaced by a single one.
//
// Example 3:
// Input: path = "/home/user/Documents/../Pictures"
// Output: "/home/user/Pictures"
// Explanation:
// A double period ".." refers to the directory up a level (the parent directory).
//
// Example 4:
// Input: path = "/../"
// Output: "/"
// Explanation:
// Going one level up from the root directory is not possible.
//
// Example 5:
// Input: path = "/.../a/../b/c/../d/./"
// Output: "/.../b/d"
// Explanation:
// "..." is a valid name for a directory in this problem.


/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
    const dirs = path.split("/");
    const stack = [];

    for (const dir of dirs) {
        // Skip empty dirs and "./"
        if (dir === "" || dir === ".") continue;

        // Go one level up
        if (dir === "..") {
            if (stack.length) stack.pop();
        }
        // Valid dir
        else {
            stack.push(dir);
        }
    }

    // We MUST ensure that path starts with "/", no way around it
    return "/" + stack.join("/");
};
// Time complexity: O(n)
// Space complexity: O(n)


// Same approach, no additional array

/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
    const stack = [];
    let left = 0;

    path += "/"; // This drastically simplifies handling of last dir without "/"

    // Traversing the path
    for (let right = 0; right < path.length; right++) {
        // Found dir splitter
        if (path[right] === "/") {
            // Ignore empty paths ("////")
            if (left < right) {
                // Extract the dir
                const dir = path.substring(left, right);

                // Go one level up
                if (dir === "..") {
                    stack.pop();
                }
                // Ignore "./", anything else is a valid dir
                else if (dir !== ".") {
                    stack.push(dir);
                }
            }

            // Push left pointer to next dir
            left = right + 1;
        }
    }

    // We MUST ensure that path starts with "/", no way around it
    return "/" + stack.join("/");
};
// Time complexity: O(n)
// Space complexity: O(n)


/**
 * 100. Same Tree
 * https://leetcode.com/problems/same-tree/
 */

// Given the roots of two binary trees p and q, write a function to check if they are the same or not.
// Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.
// Example 1:
// Input: p = [1,2,3], q = [1,2,3]
// Output: true
// Example 2:
// Input: p = [1,2], q = [1,null,2]
// Output: false
// Example 3:
// Input: p = [1,2,1], q = [1,1,2]
// Output: false

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    // Base case: two empty nodes
    if (!p && !q) {
        return true;
    }

    // Base case: nodes mismatch
    if (!p || !q || p.val !== q.val) {
        return false;
    }

    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
// Time complexity: O(n)
// Space complexity: O(n) worst case, O(log n) for balanced tree


/**
 * 226. Invert Binary Tree
 * https://leetcode.com/problems/invert-binary-tree/
 */

// Given the root of a binary tree, invert the tree, and return its root.
//
// Example 1:
// Input: root = [4,2,7,1,3,6,9]
// Output: [4,7,2,9,6,3,1]
// Example 2:
// Input: root = [2,1,3]
// Output: [2,3,1]
// Example 3:
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
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if (root) {
        // Swap children
        [root.left, root.right] = [root.right, root.left];

        // Recursively continue in-depth
        invertTree(root.left);
        invertTree(root.right);
    }

    return root;
};
// Time complexity: O(n)
// Space complexity: O(n) worst case, O(log n) for balanced tree


/**
 * 101. Symmetric Tree
 * https://leetcode.com/problems/symmetric-tree/
 */

// Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).
//
// Example 1:
// Input: root = [1,2,2,3,4,4,3]
// Output: true
// Example 2:
// Input: root = [1,2,2,null,3,null,3]
// Output: false


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
 * @return {boolean}
 */
var isSymmetric = function(root) {
    // Mirror DFS
    const checkMirror = function(left, right) {
        // Both nodes are null
        if (!left && !right) return true;

        // Both nodes have the same value
        if (left && right && left.val === right.val) {
            return checkMirror(left.left, right.right) && checkMirror(left.right, right.left)
        }

        // Asymmetric nodes (values don't match or one is null)
        return false;
    }

    return checkMirror(root.left, root.right);
};
// Time complexity: O(n)
// Space complexity: O(log n) as we stop if the tree is not balanced


// BFS option, less elegant
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
 * @return {boolean}
 */
var isSymmetric = function(root) {
    // Pefrorm BFS and check for symmetry
    let queue = [root.left, root.right];

    while (queue.length > 0) {
        const levelLength = queue.length;

        // Checking level for symmetry
        for (let i = 0; i < levelLength; i++) {
            const left = queue.shift();

            // While iterating through the left half
            if (i < levelLength / 2) {
                // Get the right counterpart (mind that we're taking items out of the queue)
                const right = queue[levelLength - (i + 1) * 2];

                // If asymmetrical, stop
                if (left && right && left.val !== right.val || (left && !right) || (!left && right)) {
                    return false;
                }
            }

            // Enqueue for BFS
            if (left) {
                queue.push(left.left);
                queue.push(left.right);
            }
        }
    }

    return true;
};
// Time complexity: O(n)
// Space complexity: O(log n)

/**
 * 105. Construct Binary Tree from Preorder and Inorder Traversal
 * https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
 */

// Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree
// and inorder is the inorder traversal of the same tree, construct and return the binary tree.
//
// Example 1:
// Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
// Output: [3,9,20,null,null,15,7]
// Example 2:
// Input: preorder = [-1], inorder = [-1]
// Output: [-1]

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    // General idea: construct the tree using pre-order traversal.
    // Take first element of the pre-order array and create root node.
    // Find index of this node in the in-order array.
    // Create left subtree using left side in-order sub-array. Same idea for right
    // Use reverse in-order index for O(1) lookups

    // Building reverse index for inorder
    const inorderRevIdx = new Map();
    for (let i = 0; i < inorder.length; i++) {
        inorderRevIdx.set(inorder[i], i);
    }

    // Global index for preorder traversal
    let preIdx = 0;

    // Recursive builder for in-order subtrees building
    const buildSubtree = (inLeft, inRight) => {
        if (inLeft > inRight) return null;

        // Creating subtree root
        const rootVal = preorder[preIdx];
        const root = new TreeNode(rootVal);
        preIdx++; // Advancing index as preorder traversal goes left-to-right

        // O(1) lookup of inorder value index
        const inMid = inorderRevIdx.get(rootVal);

        // Recursively building left and right subtrees
        root.left = buildSubtree(inLeft, inMid - 1);
        root.right = buildSubtree(inMid + 1, inRight);

        return root;
    }

    return buildSubtree(0, inorder.length - 1);
};
// Time complexity: O(n)
// Space complexity: O(n)


/**
 * 106. Construct Binary Tree from Inorder and Postorder Traversal
 * https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
 */

// Given two integer arrays inorder and postorder where inorder is the inorder traversal of a binary tree and postorder is the postorder traversal of the same tree, construct and return the binary tree.
//
// Example 1:
// Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
// Output: [3,9,20,null,null,15,7]
// Example 2:
// Input: inorder = [-1], postorder = [-1]
// Output: [-1]

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
    // General idea: construct the tree using post-order traversal.
    // Take last element of the post-order array and create root node.
    // Find index of this node in the in-order array.
    // Create right subtree using right side in-order sub-array. Same idea for left
    // Use reverse in-order index for O(1) lookups

    // Building reverse index for inorder
    const inorderRevIdx = new Map();
    for (let i = 0; i < inorder.length; i++) {
        inorderRevIdx.set(inorder[i], i);
    }

    // Global index for postorder traversal
    let postIdx = postorder.length - 1;

    // Recursive builder for in-order subtrees building
    const buildSubtree = (inLeft, inRight) => {
        if (inLeft > inRight) return null;

        // Creating subtree root
        const rootVal = postorder[postIdx];
        const root = new TreeNode(rootVal);
        postIdx--; // Advancing index as postorder traversal goes right-to-left

        // O(1) lookup of inorder value index
        const inMid = inorderRevIdx.get(rootVal);

        // Recursively building right and left subtrees
        // In contrast to preorder traversal, we build right subtree first (postorder traversal goes right-to-left)
        root.right = buildSubtree(inMid + 1, inRight);
        root.left = buildSubtree(inLeft, inMid - 1);

        return root;
    }

    return buildSubtree(0, inorder.length - 1);
};
// Time complexity: O(n)
// Space complexity: O(n)


/**
 * 117. Populating Next Right Pointers in Each Node II
 * https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/
 */

// Given a binary tree
// struct Node {
//   int val;
//   Node *left;
//   Node *right;
//   Node *next;
// }
// Populate each next pointer to point to its next right node.
// If there is no next right node, the next pointer should be set to NULL.
// Initially, all next pointers are set to NULL.
//
// Example 1:
// Input: root = [1,2,3,4,5,null,7]
// Output: [1,#,2,3,#,4,5,7,#]
// Explanation: Given the above binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.
// Example 2:
// Input: root = []
// Output: []

/**
 * // Definition for a _Node.
 * function _Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {_Node} root
 * @return {_Node}
 */
var connect = function(root) {
    if (!root) {
        return null;
    }

    // Classic BFS
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;

        // For each level of the tree set next pointer to the neighbor (except right-most node), then enqueue children
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            if (i < levelSize - 1) node.next = queue[0];    // Leave null for right-most node

            // Enqueue children
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    return root;
};
// Time complexity: O(n)
// Space complexity: O(n)


// O(1) space approach
// Walk the current level using next.
// While walking, build the next level using a temporary dummy head + tail.
// After finishing a level, jump to dummy.next (the first node of the next level).

var connect = function(root) {
    if (!root) return null;

    // cur walks the current level using already-set .next pointers
    let cur = root;

    while (cur) {
        // Build the next level using a dummy head and a moving tail
        const dummy = new Node(0);
        let tail = dummy;

        // Traverse current level
        for (let node = cur; node !== null; node = node.next) {
            if (node.left) {
                tail.next = node.left;
                tail = tail.next;
            }
            if (node.right) {
                tail.next = node.right;
                tail = tail.next;
            }
        }

        // Move to the first node of the next level
        cur = dummy.next;
    }

    return root;
};
// Time complexity: O(n)
// Space complexity: O(1)


/**
 * 114. Flatten Binary Tree to Linked List
 * https://leetcode.com/problems/flatten-binary-tree-to-linked-list/
 */

// Given the root of a binary tree, flatten the tree into a "linked list":
// The "linked list" should use the same TreeNode class where the right child pointer points to
// the next node in the list and the left child pointer is always null.
// The "linked list" should be in the same order as a pre-order traversal of the binary tree.
//
// Example 1:
// Input: root = [1,2,5,3,4,null,6]
// Output: [1,null,2,null,3,null,4,null,5,null,6]
// Example 2:
// Input: root = []
// Output: []
// Example 3:
// Input: root = [0]
// Output: [0]


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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {
    // Recursive approach with right-to left traversal

    let prevNode = null; // Left-most node of the parsed list

    const flattenHelper = (node) => {
        if (!node) return;

        // Recursively traverse right-to-left
        flattenHelper(node.right);
        flattenHelper(node.left);

        // Pluck the list to right node, reset left
        node.right = prevNode;
        node.left = null;
        prevNode = node;    // Set left-most pointer to current
    }

    flattenHelper(root);

    return root;
};
// Time complexity: O(n)
// Space complexity: O(n)


// Alternative approach with left-to-right traversal
// Similar idea, two local pointers

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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {
    const flattenHelper = (node) => {
        // Base condition - leaf or null
        if (!node || !node.left && !node.right) return node;

        let head = null; // Left-most node of the list (in current scope)
        let tail = null; // Right-most node of the list (in current scope)

        // Visit left subtree first if exists
        if (node.left) {
            head = node.left;
            tail = flattenHelper(node.left);
        }

        // Visit right subtree next if exists
        if (node.right) {
            // If left subtree exists, pluck this node to the list made of left subtree
            if (tail)   tail.right = node.right;
            // Otherwise we don't have a list and will start it from this node
            else        head = node.right;

            // New head will be the last node in this list
            tail = flattenHelper(node.right);
        }

        // Reassign nodes
        node.left = null;
        node.right = head;

        return tail; // Return right-most node of the new list
    }

    flattenHelper(root);

    return root;
};
// Time complexity: O(n)
// Space complexity: O(n)


// Follow-up: O(1) extra space (Morris-style rewiring)
// For every node with a left child, find the rightmost node of its left subtree and
// splice the original right subtree there; then move left to right.
var flatten = function(root) {
    let cur = root;

    while (cur) {
        if (cur.left) {
            // Find rightmost of left subtree
            let pred = cur.left;
            while (pred.right) pred = pred.right;

            // Splice: right subtree goes after left's rightmost
            pred.right = cur.right;
            cur.right = cur.left;
            cur.left = null;
        }
        cur = cur.right;
    }
};
// Time complexity: O(n)
// Space complexity: O(1)


/**
 * 129. Sum Root to Leaf Numbers
 * https://leetcode.com/problems/sum-root-to-leaf-numbers/
 */

// You are given the root of a binary tree containing digits from 0 to 9 only.
// Each root-to-leaf path in the tree represents a number.
// For example, the root-to-leaf path 1 -> 2 -> 3 represents the number 123.
// Return the total sum of all root-to-leaf numbers. Test cases are generated so that the answer will fit in a 32-bit integer.
// A leaf node is a node with no children.
//
// Example 1:
// Input: root = [1,2,3]
// Output: 25
// Explanation:
// The root-to-leaf path 1->2 represents the number 12.
// The root-to-leaf path 1->3 represents the number 13.
// Therefore, sum = 12 + 13 = 25.
// Example 2:
// Input: root = [4,9,0,5,1]
// Output: 1026
// Explanation:
// The root-to-leaf path 4->9->5 represents the number 495.
// The root-to-leaf path 4->9->1 represents the number 491.
// The root-to-leaf path 4->0 represents the number 40.
// Therefore, sum = 495 + 491 + 40 = 1026.

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
 * @return {number}
 */
var sumNumbers = function(root) {
    // Classic DFS
    const calculateRTL = (node, pathNumber) => {
        if (!node) return 0;

        // Shift top-level number digits and add current value
        pathNumber = (pathNumber * 10) + node.val;

        // Base condition: leaf
        if (!node.left && !node.right) return pathNumber;

        // Calculate recursively for children
        return calculateRTL(node.left, pathNumber) + calculateRTL(node.right, pathNumber);
    }

    return calculateRTL(root, 0);
};
// Time complexity: O(n)
// Space complexity: O(n)


/**
 * 173. Binary Search Tree Iterator
 * https://leetcode.com/problems/binary-search-tree-iterator/
 */

// Implement the BSTIterator class that represents an iterator over the in-order traversal of a binary search tree (BST):
// BSTIterator(TreeNode root) Initializes an object of the BSTIterator class. The root of the BST is given as part of the constructor.
// The pointer should be initialized to a non-existent number smaller than any element in the BST.
// boolean hasNext() Returns true if there exists a number in the traversal to the right of the pointer, otherwise returns false.
// int next() Moves the pointer to the right, then returns the number at the pointer.
// Notice that by initializing the pointer to a non-existent smallest number, the first call to next() will return the smallest element in the BST.
// You may assume that next() calls will always be valid. That is, there will be at least a next number in the in-order traversal when next() is called.
//
// Example 1:
// Input
// ["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
// [[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]
// Output
// [null, 3, 7, true, 9, true, 15, true, 20, false]
//
// Explanation
// BSTIterator bSTIterator = new BSTIterator([7, 3, 15, null, null, 9, 20]);
// bSTIterator.next();    // return 3
// bSTIterator.next();    // return 7
// bSTIterator.hasNext(); // return True
// bSTIterator.next();    // return 9
// bSTIterator.hasNext(); // return True
// bSTIterator.next();    // return 15
// bSTIterator.hasNext(); // return True
// bSTIterator.next();    // return 20
// bSTIterator.hasNext(); // return False


// ------------ Optimal interview solution (lazy traversal, O(h) space)

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
 */
var BSTIterator = function(root) {
    this.traversalStack = [];   // Lazy traversal stack
    this._pushLeft(root);       // Traverse left nodes until get to first in-order node
};

BSTIterator.prototype._pushLeft = function(node) {
    // Lazy traversal of left nodes
    while (node) {
        this.traversalStack.push(node);
        node = node.left;
    }
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function() {
    // Current node for in-order traversal
    const currNode = this.traversalStack.pop();

    // Continue lazy traversal for the right subtree
    if (currNode.right) this._pushLeft(currNode.right);

    return currNode.val;
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
    return this.traversalStack.length > 0;
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

// Time complexity: O(n) build, amortized O(1) for ops next(), hasNext()
// Space complexity: O(h) - stack up to the height of the tree



// ------------ Semi-naive approach: build full inorder traversal array, iterate through the array

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
 */
var BSTIterator = function(root) {
    const buildInOrder = (node, inorder = []) => {
        if (!node) return;

        buildInOrder(node.left, inorder);
        inorder.push(node);
        buildInOrder(node.right, inorder);

        return inorder;
    }

    this.current = -1;
    this.inorder = buildInOrder(root);
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function() {
    return this.inorder[++this.current].val;
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
    return this.current < this.inorder.length - 1;
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

// Time complexity: O(n)
// Space complexity: O(n)


/**
 * 222. Count Complete Tree Nodes
 * https://leetcode.com/problems/count-complete-tree-nodes/
 */

// Given the root of a complete binary tree, return the number of the nodes in the tree.
// According to Wikipedia, every level, except possibly the last, is completely filled in a complete binary tree,
// and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.
// Design an algorithm that runs in less than O(n) time complexity.
//
// Example 1:
// Input: root = [1,2,3,4,5,6]
// Output: 6
// Example 2:
// Input: root = []
// Output: 0
// Example 3:
// Input: root = [1]
// Output: 1

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
 * @return {number}
 */
var countNodes = function(root) {
    // Gets depth by going only left/right
    const calculateDepth = (node, direction = "left") => {
        let depth = 0;
        for (let n = node; n !== null; n = n[direction]) depth++;
        return depth;
    }

    const calculateNodes = (node) => {
        if (!node) return 0;

        // Get left and right depths
        const depthLeft = calculateDepth(node, "left");
        const depthRight = calculateDepth(node, "right");

        // Perfect subtree, return full nodes count n = 2^(h + 1), h starts from 0, our depth = h + 1
        if (depthLeft === depthRight) return Math.pow(2, depthLeft) - 1; // show off: (1 << depthLeft) - 1;

        // Right subtree is smaller,
        return 1 + calculateNodes(node.left) + calculateNodes(node.right);
    }

    return calculateNodes(root);
};
// Time complexity: O((log n)^2): each level you compute heights in O(log n), and you do it down O(log n) levels
// Space complexity: O(log n) for recursion stack


/**
 * 236. Lowest Common Ancestor of a Binary Tree
 * https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
 */

// Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.
// According to the definition of LCA on Wikipedia:
// “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has
// both p and q as descendants (where we allow a node to be a descendant of itself).”
//
// Example 1:
// Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// Output: 3
// Explanation: The LCA of nodes 5 and 1 is 3.
// Example 2:
// Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
// Output: 5
// Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.
// Example 3:
// Input: root = [1,2], p = 1, q = 2
// Output: 1

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    // Return either:
    // null — neither target found in this subtree,
    // p or q — the target found,
    // or the LCA node if both sides returned non-null
    if (!root || root === p || root === q) return root;

    // Recursively search subtrees
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);

    if (left && right) return root; // Return LCA when both sides are found
    return left || right;           // Return whatever was found (or null if neither)
};
// Time complexity: O(n)
// Space complexity: O(h) tree height, worst case - O(n)


/**
 * 637. Average of Levels in Binary Tree
 * https://leetcode.com/problems/average-of-levels-in-binary-tree/
 */

// Given the root of a binary tree, return the average value of the nodes on each level in the form of an array.
// Answers within 10-5 of the actual answer will be accepted.
//
// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: [3.00000,14.50000,11.00000]
// Explanation: The average value of nodes on level 0 is 3, on level 1 is 14.5, and on level 2 is 11.
// Hence return [3, 14.5, 11].
// Example 2:
// Input: root = [3,9,20,15,7]
// Output: [3.00000,14.50000,11.00000]

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
var averageOfLevels = function(root) {
    // Classic BFS
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        let levelSum = 0; // Sum up all values per level

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            levelSum += node.val;

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        // Average = sum / count
        result.push(levelSum / levelSize);
    }

    return result;
};
// Time complexity: O(n)
// Space complexity: O(n)


/**
 * 102. Binary Tree Level Order Traversal
 * https://leetcode.com/problems/binary-tree-level-order-traversal/
 */

// Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).
//
// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: [[3],[9,20],[15,7]]
// Example 2:
// Input: root = [1]
// Output: [[1]]
// Example 3:
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
 * @return {number[][]}
 */
var levelOrder = function(root) {
    // Classic BFS
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length) {
        const levelSize = queue.length;
        const levelValues = [];

        // Level by level loops
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            levelValues.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        // All values for the current level
        result.push(levelValues);
    }

    return result;
};
// Time complexity: O(n)
// Space complexity: O(n)


/**
 * 103. Binary Tree Zigzag Level Order Traversal
 * https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
 */

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
var zigzagLevelOrder = function(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    // Current tree level, root = 0
    let level = 0;

    while (queue.length > 0) {
        const levelSize = queue.length;
        const levelNodes = [];

        // Processing node on the current level
        for (let i = 0; i < levelSize; i++) {
            let node = queue.shift();

            // Even levels left to right
            if (level % 2 === 0) levelNodes.push(node.val);
            // Odd levels right to left
            else                 levelNodes.unshift(node.val);

            if (node.left)  queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        // Adding the traversed values to the result
        result.push(levelNodes);
        level++;
    }

    return result;
};
// Time complexity: O(n)
// Space complexity: O(n)


/**
 * 530. Minimum Absolute Difference in BST
 * https://leetcode.com/problems/minimum-absolute-difference-in-bst/
 */

// Given the root of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.
//
// Example 1:
// Input: root = [4,2,6,1,3]
// Output: 1
// Example 2:
// Input: root = [1,0,48,null,null,12,49]
// Output: 1

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
 * @return {number}
 */
var getMinimumDifference = function(root) {
    let prevVal = null;
    let minDiff = Infinity;

    // DFS with global Previous Value and result
    // For BST we're using in-order traversal: left - root - right
    const getMinDiff = (node) => {
        if (!node) return;

        getMinDiff(node.left);  // Left subtree

        // prevVal is always less or equal, calculate min diff on this step
        if (prevVal !== null) minDiff = Math.min(minDiff, node.val - prevVal);
        prevVal = node.val;

        getMinDiff(node.right); // Right subtree
    }

    getMinDiff(root);
    return minDiff;
};
// Time complexity: O(n)
// Space complexity: O(n) worst case, O(log n) if balanced


/**
 * 230. Kth Smallest Element in a BST
 * https://leetcode.com/problems/kth-smallest-element-in-a-bst/
 */

// Given the root of a binary search tree, and an integer k,
// return the kth smallest value (1-indexed) of all the values of the nodes in the tree.
// Example 1:
// Input: root = [3,1,4,null,2], k = 1
// Output: 1
// Example 2:
// Input: root = [5,3,6,2,4,null,null,1], k = 3
// Output: 3

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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    let result = 0;

    // DFS for in-order traversal
    const dfs = (node) => {
        if (!node) return false;

        if (dfs(node.left)) return true;  // Found in left

        // When k == 0, we found the item (counting backwards)
        // Compare and decrease in one line
        if (--k === 0) {
            result = node.val;
            return true;
        }

        return dfs(node.right); // Found in right
    }

    dfs(root);
    return result;
};
// Time complexity: O(n)
// Space complexity: O(n)


/**
 * 399. Evaluate Division
 * https://leetcode.com/problems/evaluate-division/
 */

// You are given an array of variable pairs equations and an array of real numbers values, where equations[i] = [Ai, Bi]
// and values[i] represent the equation Ai / Bi = values[i]. Each Ai or Bi is a string that represents a single variable.
// You are also given some queries, where queries[j] = [Cj, Dj] represents the jth query where you must find the answer for Cj / Dj = ?.
// Return the answers to all queries. If a single answer cannot be determined, return -1.0.
// Note: The input is always valid. You may assume that evaluating the queries will not result in division by zero and that there is no contradiction.
// Note: The variables that do not occur in the list of equations are undefined, so the answer cannot be determined for them.
//
// Example 1:
// Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
// Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
// Explanation:
// Given: a / b = 2.0, b / c = 3.0
// queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
// return: [6.0, 0.5, -1.0, 1.0, -1.0 ]
// note: x is undefined => -1.0
// Example 2:
// Input: equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
// Output: [3.75000,0.40000,5.00000,0.20000]
// Example 3:
// Input: equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
// Output: [0.50000,2.00000,-1.00000,-1.00000]

/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function(equations, values, queries) {
    // Buidling Adjacency Map with edge weights
    // Query can be calculated as multiplication of all edges on the path
    const adjMap = {};

    for (let i = 0; i < equations.length; i++) {
        const [v1, v2] = equations[i];
        adjMap[v1] ||= [];
        adjMap[v1].push([v2, values[i]]);
        // Reverse edge will have 1 / val weight
        adjMap[v2] ||= [];
        adjMap[v2].push([v1, 1 / values[i]]);
    }

    // Classic DFS on a graph
    const dfs = (start, end, visited, mult = 1) => {
        if (!adjMap[start]) return -1;
        if (visited.has(start)) return -1;
        if (start === end) return mult;

        visited.add(start);

        for (const [v, val] of adjMap[start]) {
            const result = dfs(v, end, visited, mult * val);
            if (result !== -1) return result;
        }

        return -1;
    }

    const output = [];

    for (let [start, end] of queries) {
        // We reset the visited items set for each query
        output.push(dfs(start, end, new Set()));
    }

    return output;
};
// Time complexity: O(e * q) where e - equations and q - queries
// Space complexity: O(e * q)


/**
 * @param {number[][]} board
 * @return {number}
 */
var snakesAndLadders = function(board) {
    if (!board || !board.length || !board[0].length) return -1;

    const rows = board.length;
    const cols = board[0].length;

    // Convert cenn number to row and col
    const getRC = (cell) => {
        let row = rows - Math.ceil(cell / cols); // Row from bottom
        let col = (cell - 1) % cols; // Column from left
        // Reversing cell column for right-to-left rows
        if ((rows - 1 - row) % 2 !== 0) {
            col = cols - 1 - col;
        }

        return [row, col];
    }

    // BFS start setup
    const startCell = 1;
    const queue = [startCell];

    const visited = new Set();
    visited.add(startCell);

    let moves = -1;

    while (queue.length > 0) {
        moves++;
        const bfsLength = queue.length;

        for (let i = 0; i < bfsLength; i++) {
            let cell = queue.shift();

            if (cell === rows * cols) return moves; // Found target

            // Enqueing next 6 cells (or where they are portalling to)
            for (let step = cell + 1; step <= Math.min(cell + 6, rows * cols); step++) {
                let next = step;
                const [r, c] = getRC(next);
                // If it's a ladder or snake, enqueue destination
                if (board[r][c] !== -1) next = board[r][c];
                // Enqueue if not visited yet
                if (!visited.has(next)) {
                    queue.push(next);
                    visited.add(next);
                }
            }
        }
    }

    return -1;
};
// Time complexity: O(n^2) - board is n x n
// Space complexity: O(n^2)
