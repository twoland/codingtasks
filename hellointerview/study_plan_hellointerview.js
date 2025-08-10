// Two Pointers - Container with most water
// Given an integer input array heights representing the heights of vertical lines,
// write a function that returns the maximum area of water that can be contained
// by two of the lines (and the x-axis). The function should take in an array of integers and return an integer.
// Example 1:
// Inputs:
// heights = [3,4,1,2,2,4,1,3,2]
// Output:
// 21

class Solution {
    max_area(heights) {
        // Initialize two pointers at the beginning and end of the array
        let left = 0, right = heights.length - 1;
        let max_area = 0;

        // Use two-pointer technique to find maximum area
        while (left < right) {
            // Calculate the area formed by the current two lines
            const width = right - left;
            const height = Math.min(heights[left], heights[right]); // Height is limited by shorter line
            const current_area = width * height;

            // Update maximum area if current area is larger
            max_area = Math.max(max_area, current_area);

            // Move the pointer with smaller height inward to potentially find larger area
            if (heights[left] < heights[right]) {
                left++;
            } else {
                right--;
            }
        }

        return max_area;
    }
}

// Two Pointers - 3 Sum
// Given an input integer array nums, write a function to find all unique triplets [nums[i], nums[j], nums[k]]
// such that i, j, and k are distinct indices, and the sum of nums[i], nums[j], and nums[k] equals zero.
// Ensure that the resulting list does not contain any duplicate triplets.
// Input:
// nums = [-1,0,1,2,-1,-1]
// Output:
// [[-1,-1,2],[-1,0,1]]
// Explanation: Both nums[0], nums[1], nums[2] and nums[1], nums[2], nums[4] both include [-1, 0, 1] and sum to 0.
// nums[0], nums[3], nums[4] ([-1,-1,2]) also sum to 0.
// Since we are looking for unique triplets, we can ignore the duplicate [-1, 0, 1] triplet and return [[-1, -1, 2], [-1, 0, 1]].
// The order of the triplets and the order of the elements within the triplets do not matter.

class Solution {
    threeSum(nums) {
        // Sort array to enable two-pointer technique and handle duplicates
        nums.sort((a, b) => a - b);
        const result = [];

        // Fix the first element and use two pointers for the remaining two
        for (let i = 0; i < nums.length - 2; i++) {
            // Skip duplicate values for the first element to avoid duplicate triplets
            if (i > 0 && nums[i] === nums[i - 1]) {
                continue;
            }

            // Initialize two pointers for the remaining subarray
            let left = i + 1;
            let right = nums.length - 1;

            // Use two-pointer technique to find pairs that sum to -nums[i]
            while (left < right) {
                const total = nums[i] + nums[left] + nums[right];

                if (total < 0) {
                    // Sum too small, move left pointer right to increase sum
                    left++;
                } else if (total > 0) {
                    // Sum too large, move right pointer left to decrease sum
                    right--;
                } else {
                    // Found a valid triplet
                    result.push([nums[i], nums[left], nums[right]]);

                    // Skip all duplicate values to avoid duplicate triplets
                    while (left < right && nums[left] === nums[left + 1]) {
                        left++;
                    }
                    while (left < right && nums[right] === nums[right - 1]) {
                        right--;
                    }
                    // Move both pointers to continue searching
                    left++;
                    right--;
                }
            }
        }
        return result;
    }
}

// Two Pointers - Triangle numbers
// Write a function to count the number of triplets in an integer array nums that could form the sides of a triangle.
// The triplets do not need to be unique.
// Hint: biggest side < sum of other two sides

// Sort by asc, iterate from end
// Rigth pointer - second largest side
// Left pointer - smallest side
// As soon as left pointer finds appropriate number, all numbers between left and rigth are good
// Sum them and move rigth pointer to next position
class Solution {
    triangleNumber(nums) {
        nums.sort((a, b) => a - b);

        let count = 0;
        for (let i = nums.length - 1; i >= 2; i--) {
            let left = 0;
            let right = i - 1;
            while (left < right) {
                if (nums[left] + nums[right] > nums[i]) {
                    count += right - left;
                    right--;
                } else {
                    left++;
                }
            }
        }

        return count;
    }
}

// Can do the same but sort the array MAX to MIN and go left to rigth
class Solution {
    triangleNumber(heights) {
        let result = 0;

        heights.sort((a,b) => b - a);

        for (let i = 0; i < heights.length - 2; i++) {
            let valueFixed = heights[i];
            let left = i + 1;
            let rigth = heights.length - 1;

            while (left < rigth) {
                let valueLeft = heights[left];
                let valueRigth = heights[rigth];

                if (valueFixed < (valueRigth + valueLeft)) {
                    result += (rigth - left);
                    left++;
                }
                else {
                    rigth--;
                }
            }
        }

        return result;
    }
}

// Two Pointers - Array - Move Zeroes to the rigth
// Given an integer array nums, write a function to rearrange the array by moving all zeros
// to the end while keeping the order of non-zero elements unchanged.
// Perform this operation in-place without creating a copy of the array.
// Input nums = [2,0,4,0,9]
// Output [2,4,9,0,0]

class Solution {
    moveZeroes(nums) {
        // Left-most zero element
        let left = 0;

        // Traverse the array left to rigth
        for (let i = 0; i < nums.length; i++) {
            // Looking for next non-zero element
            if (nums[i] !== 0) {
                // If i == left, we don't yet have any zeros to the left, keep searching
                // Otherwise, swap the non-zero element with left-most zero
                if (i !== left) {
                    nums[left] = nums[i];
                    nums[i] = 0;
                }

                left++;
            }
        }

        return nums;
    }
}

// Two Pointers - Sort Colors in Array
// Write a function to sort a given integer array nums in-place (and without the built-in sort function),
// where the array contains n integers that are either 0, 1, and 2 and represent the colors red, white, and blue.
// Arrange the objects so that same-colored ones are adjacent, in the order of red, white, and blue (0, 1, 2).
// Input:
// nums = [2,1,2,0,1,0,1,0,1]
// Output:
// [0,0,0,1,1,1,1,2,2]

class Solution {
    sortColors(nums) {
        let left = 0;
        let i = 0;
        let right = nums.length - 1;

        // All elements to the left of the left are 0s.
        // All elements between left and i - 1 are 1s.
        // All elements between i and right are unsorted.
        // All elements to the right of right are 2s.

        while (i <= right) {
            if (nums[i] === 0) {
                [nums[left], nums[i]] = [nums[i], nums[left]];
                left++;
                i++;
            } else if (nums[i] === 2) {
                [nums[right], nums[i]] = [nums[i], nums[right]];
                right--;
            } else {
                i++;
            }
        }

        return nums;
    }
}


// Two Pointers - Trapping Rain Water
// Write a function to calculate the total amount of water trapped between bars on an elevation map,
// where each bar's width is 1. The input is given as an array of n
// non-negative integers height representing the height of each bar.
// Input:
// height = [3, 4, 1, 2, 2, 5, 1, 0, 2]
// Output:
// 10

class Solution {
    trappingWater(height) {
        if (!height || height.length === 0) {
            return 0;
        }

        // Anything between the two highest left and right bars is considered trapped
        // If we find a higher bar, we update left or right max bar
        // Follow the water

        let left = 0, right = height.length - 1;
        let leftMax = height[left], rightMax = height[right];
        let count = 0;

        while (left + 1 < right) {
            if (rightMax > leftMax) {
                left++;
                if (height[left] > leftMax) {
                    leftMax = height[left];
                } else {
                    count += leftMax - height[left];
                }
            } else {
                right--;
                if (height[right] > rightMax) {
                    rightMax = height[right];
                } else {
                    count += rightMax - height[right];
                }
            }
        }

        return count;
    }
}

/**
 * Sliding Window (Variable) - Longest Substring Without Repeating Characters
 */

// Write a function to return the length of the longest substring in a provided string s where all characters
// in the substring are distinct.

// Example 1: Input:
// s = "eghghhgg"
// Output:
// 3
// The longest substring without repeating characters is "egh" with length of 3.
// Example 2: Input:
// s = "substring"
// Output:
// 8
// The answer is "ubstring" with length of 8.

class Solution {
    longestSubstringWithoutRepeat(s) {
        let result = 0;

        let characters = {};
        let start = 0;

        for (let end = 0; end < s.length; end++) {
            // Current symbol
            let symbol = s[end];

            // Check if already present in the current substring
            // If yes, move the window start after this symbol's last position
            if (symbol in characters) {
                start = Math.max(start, characters[symbol] + 1);
            }

            // Move the window end to current position
            characters[symbol] = end;

            // Calculate max substring length
            result = Math.max(result, end - start + 1);
        }

        return result;
    }
}

/**
 * Sliding Window (Variable) - Longest Repeating Character Replacement
 */

//Write a function to find the length of the longest substring containing the same letter in a given string s,
// after performing at most k operations in which you can choose any character of the string and change it
// to any other uppercase English letter.

// Input:
// s = "BBABCCDD"
// k = 2
// Output:
// 5

// Explanation: Replace the first 'A' and 'C' with 'B' to form "BBBBBCCDD".
// The longest substring with identical letters is "BBBBB", which has a length of 5.

class Solution {
    characterReplacement(s, k) {
        // Sliding window approach: track character frequencies and find longest valid window
        if (s.length === 0) return 0;

        const charCount = {};    // Track character frequencies in current window
        let maxFreq = 0;         // Most frequent character count in current window
        let maxLength = 0;       // Maximum valid window length found
        let start = 0;           // Left boundary of sliding window

        // Expand window by moving right boundary
        for (let end = 0; end < s.length; end++) {
            const char = s[end];

            // Add current character to window
            charCount[char] = (charCount[char] || 0) + 1;
            maxFreq = Math.max(maxFreq, charCount[char]);

            // Shrink window if it becomes invalid (need > k replacements)
            // Window size - most frequent count = replacements needed
            while ((end - start + 1) - maxFreq > k) {
                const leftChar = s[start];
                charCount[leftChar]--;
                start++; // Move left boundary right
            }

            // Update maximum valid window length
            maxLength = Math.max(maxLength, end - start + 1);
        }

        return maxLength;
    }
}

/**
 * Sliding Window (Fixed) - Maximum Sum of Subarrays of Size K
 */

// Given an array of integers nums and an integer k, find the maximum sum of any contiguous subarray of size k.

// Example 1: Input:
// nums = [2, 1, 5, 1, 3, 2]
// k = 3
// Output:
// 9
// Explanation: The subarray with the maximum sum is [5, 1, 3] with a sum of 9.

class Solution {
    maxSum(nums, k) {
        let maxSum = 0;
        let windowSum = 0;
        let start = 0;

        for (let end = 0; end < nums.length; end++) {
            windowSum += nums[end];

            if (end - start + 1 === k) {
                maxSum = Math.max(maxSum, windowSum);
                windowSum -= nums[start];
                start++;
            }
        }

        return maxSum;
    }
}


/**
 * Sliding Window (Fixed) - Max Points You Can Obtain From Cards
 */

// DESCRIPTION (credit Leetcode.com)
// Given an array of integers representing the value of cards, write a function to calculate the maximum score
// you can achieve by selecting exactly k cards from either the beginning or the end of the array.

// For example, if k = 3, then you have the option to select:
// the first three cards,
// the last three cards,
// the first card and the last two cards
// the first two cards and the last card

// Example 1: Input:
// cards = [2,11,4,5,3,9,2]
// k = 3
// Output:
// 17
// Explanation:
// Selecting the first three cards from the beginning (2 + 11 + 4) gives a total of 17.
// Selecting the last three cards (3 + 9 + 2) gives a total of 14.
// Selecting the first card and the last two cards (2 + 9 + 2) gives a total of 13.
// Selecting the first two cards and the last card (2 + 11 + 2) gives a total of 15.
// So the maximum score is 17.

class Solution {
    maxScore(cards, k) {
        // In this solution we will use a fixed sliding window but it will be split into two segments
        // We could use a virtual array (rotate indexes) but we can omit it in this problem
        // We need max k elements from the start and k from the end, so the math is simple

        let result = 0;

        let cardsSum = 0;
        let start = cards.length - k;

        // Let's sum up the cards from the initial window (end segment of the deck)
        for (let end = cards.length - k; end < cards.length; end++) {
            cardsSum += cards[end];
        }

        // This is our first potential result
        result = cardsSum;

        // Now simply iterate through the starting segment of the deck
        // Not forgetting to substract the values from the end
        for (let end = 0; end < k; end++) {
            cardsSum -= cards[start];
            start++;

            cardsSum += cards[end];
            result = Math.max(result, cardsSum);
        }

        return result;
    }
}

// Alternative solution, more operations, O(n * 2)
// The key to this problem is recognizing that each valid arrangement of cards we can choose is equivalent to
// removing n - k cards from the middle of the array, where n is the length of the array.
// The sum of any valid arrangement is equivalent to total sum of the array minus the sum of the n - k cards we remove.
// So we can move the fixed-length sliding window of length n - k across the array.
// For each window, we subtract its sum from the total sum of the array to get the sum of the corresponding cards,
// and return the maximum of those values at the end.

class Solution {
    maxScore(cards, k) {
        // Calculate total sum of all cards
        const total = cards.reduce((sum, card) => sum + card, 0);
        if (k >= cards.length) {
            return total;
        }

        // Use sliding window to find minimum subarray of size (n-k)
        let state = 0;
        let maxPoints = 0;
        let start = 0;

        for (let end = 0; end < cards.length; end++) {
            state += cards[end];

            // Window size equals cards.length - k
            if (end - start + 1 === cards.length - k) {
                maxPoints = Math.max(total - state, maxPoints);
                state -= cards[start];
                start++;
            }
        }

        return maxPoints;
    }
}

/**
 * Sliding Window (Fixed) - Max Sum of Distinct Subarrays Length k
 */

// Given an integer array nums and an integer k, write a function to identify the
// highest possible sum of a subarray within nums, where the subarray meets the following criteria:
// its length is k, and all of its elements are unique.

// Example 1: Input:
// nums = [3, 2, 2, 3, 4, 6, 7, 7, -1]
// k = 4
// Output:
// 20
// Explanation: The subarrays of nums with length 4 are:
// [3, 2, 2, 3] # elements 3 and 2 are repeated.
// [2, 2, 3, 4] # element 2 is repeated.
// [2, 3, 4, 6] # meets the requirements and has a sum of 15.
// [3, 4, 6, 7] # meets the requirements and has a sum of 20.
// [4, 6, 7, 7] # element 7 is repeated.
// [6, 7, 7, -1] # element 7 is repeated.
// We return 20 because it is the maximum subarray sum of all the subarrays that meet the conditions.

class Solution {
    maxSum(nums, k) {
        let result = 0;

        let elements = {};
        let sum = 0;
        let start = 0;

        for (let end = 0; end < nums.length; end++) {
            sum += nums[end];
            elements[nums[end]] = (elements[nums[end]] ? elements[nums[end]] : 0) + 1;

            if (end - start + 1 === k) {
                // Only if we have unique elements
                if (Object.keys(elements).length === k) {
                    result = Math.max(result, sum);
                }

                sum -= nums[start];
                elements[nums[start]] -= 1;

                // Delete the element from the tracker if it's not present anymore
                if (elements[nums[start]] === 0) {
                    delete elements[nums[start]];
                }

                start++;
            }
        }

        return result;
    }
}

// ----------------------------------- Intervals ----------------------------------- //

/**
 * Intervals - Can Attend Meetings
 */

// Write a function to check if a person can attend all the meetings scheduled without any time conflicts.
// Given an array intervals, where each element [s1, e1] represents a meeting starting at time s1 and ending at time e1,
// determine if there are any overlapping meetings.
// If there is no overlap between any meetings, return true; otherwise, return false.
// Note that meetings ending and starting at the same time, such as (0,5) and (5,10), do not conflict.

// Input:
// intervals = [(1,5),(3,9),(6,8)]
// Output:
// false
// Explanation: The meetings (1,5) and (3,9) overlap.
// Input:
// intervals = [(10,12),(6,9),(13,15)]
// Output:
// true
// Explanation: There are no overlapping meetings, so the person can attend all.

class Solution {
    canAttendMeetings(intervals) {
        // Sort and check for overlaps: meeting scheduling conflict detection
        if (intervals.length <= 1) return true;

        // Sort intervals by start time
        intervals.sort((a, b) => a[0] - b[0]);

        // Check for any overlapping meetings
        for (let i = 1; i < intervals.length; i++) {
            // If current meeting starts before previous meeting ends, conflict!
            if (intervals[i][0] < intervals[i - 1][1]) {
                return false;  // Cannot attend all meetings
            }
        }

        return true;  // Can attend all meetings (no conflicts)
    }
}


/**
 * Intervals - Insert Interval
 */

// Given a list of intervals intervals and an interval newInterval, write a function
// to insert newInterval into a list of existing, non-overlapping, and sorted intervals
// based on their starting points.
// The function should ensure that after the new interval is added, the list remains sorted
// without any overlapping intervals, merging them if needed.

// Input:
// intervals = [[1,3],[6,9]]
// newInterval = [2,5]
// Output:
// [[1,5],[6,9]]
// Explanation: The new interval [2,5] overlaps with [1,3], so they are merged into [1,5].

class Solution {
    insertIntervals(intervals, newInterval) {
        // Interval insertion with merging: three-phase approach
        const merged = [];           // Result array for merged intervals
        let i = 0;                  // Index for traversing intervals
        const n = intervals.length;

        // Phase 1: Add all intervals that end before newInterval starts (no overlap)
        while (i < n && intervals[i][1] < newInterval[0]) {
            merged.push(intervals[i]);
            i++;
        }

        // Phase 2: Merge all overlapping intervals with newInterval
        while (i < n && intervals[i][0] <= newInterval[1]) {
            // Expand newInterval to encompass current overlapping interval
            newInterval[0] = Math.min(intervals[i][0], newInterval[0]);
            newInterval[1] = Math.max(intervals[i][1], newInterval[1]);
            i++;
        }

        // Add the merged newInterval
        merged.push(newInterval);

        // Phase 3: Add all remaining intervals (after newInterval)
        for (let j = i; j < n; j++) {
            merged.push(intervals[j]);
        }

        return merged;
    }
}

/**
 * Intervals - Non-Overlapping Intervals
 */

// Write a function to return the minimum number of intervals that must be removed from a given array intervals,
// where intervals[i] consists of a starting point starti and an ending point endi,
// to ensure that the remaining intervals do not overlap.

// Input:
// intervals = [[1,3],[5,8],[4,10],[11,13]]
// Output:
// 1
// Explanation: Removing the interval [4,10] leaves all other intervals non-overlapping.

class Solution {
    nonOverlappingIntervals(intervals) {
        // Greedy algorithm: sort by end time, keep non-overlapping intervals
        if (!intervals || intervals.length === 0) {
            return 0;
        }

        // Sort intervals by their end time (greedy choice)
        intervals.sort((a, b) => a[1] - b[1]);

        let end = intervals[0][1];     // End time of last kept interval
        let count = 1;                 // Count of non-overlapping intervals kept

        // Process remaining intervals
        for (let i = 1; i < intervals.length; i++) {
            // Non-overlapping interval found: start >= previous end
            if (intervals[i][0] >= end) {
                end = intervals[i][1];    // Update end time
                count++;                  // Keep this interval
            }
            // Overlapping interval: skip it (greedy removal)
        }

        return intervals.length - count;  // Number of intervals removed
    }
}

/**
 * Intervals - Merge Intervals
 */

// Write a function to consolidate overlapping intervals within a given array intervals,
// where each interval intervals[i] consists of a start time starti and an end time endi.
// Two intervals are considered overlapping if they share any common time,
// including if one ends exactly when another begins (e.g., [1,4] and [4,5] overlap and should be merged into [1,5]).
// The function should return an array of the merged intervals so that no two intervals overlap and
// all the intervals collectively cover all the time ranges in the original input.

// Input:
// intervals = [[3,5],[1,4],[7,9],[6,8]]
// Output:
// [[1,5],[6,9]]
// Explanation: The intervals [3,5] and [1,4] overlap and are merged into [1,5]. Similarly, [7,9] and [6,8] overlap and are merged into [6,9].

class Solution {
    mergeIntervals(intervals) {
        if (intervals.length < 1) {
            return [];
        }

        intervals.sort((a, b) => a[0] - b[0]);

        let result = [intervals[0]];

        for (let i = 1; i < intervals.length; i++) {
            const previous = result[result.length - 1];
            const current = intervals[i];

            // Current start <= previous end
            if (current[0] <= previous[1]) {
                previous[1] = Math.max(previous[1], current[1]);
            }
            else {
                result.push(current);
            }
        }

        return result;
    }
}

/**
 * Intervals - Employee Free Time
 */

// Write a function to find the common free time for all employees from a list called schedule.
// Each employee's schedule is represented by a list of non-overlapping intervals sorted by start times.
// The function should return a list of finite, non-zero length intervals where all employees are free, also sorted in order.

// Input:
// schedule = [[[2,4],[7,10]],[[1,5]],[[6,9]]]
// Output:
// [(5,6)]
// Explanation: The three employees collectively have only one common free time interval, which is from 5 to 6.

class Solution {
    employeeFreeTime(schedule) {
        // Flatten and sort the schedule
        const flatSchedule = schedule.flat().sort((a, b) => a[0] - b[0]);

        const mergedSchedule = [];
        const result = [];

        if (flatSchedule.length < 1) {
            return result;
        }

        // Merge intervals
        mergedSchedule.push(flatSchedule[0]);

        for (let i = 1; i < flatSchedule.length; i++) {
            const lastMerged = mergedSchedule[mergedSchedule.length - 1];
            const current = flatSchedule[i];

            // Merge
            if (lastMerged[1] >= current[0]) {
                lastMerged[1] = Math.max(lastMerged[1], current[1]);
            }
            else {
                mergedSchedule.push(current);
            }
        }

        if (mergedSchedule.length <= 1) {
            return result;
        }

        // Calculate gaps
        for (let i = 1; i < mergedSchedule.length; i++) {
            const previous = mergedSchedule[i - 1];
            const current = mergedSchedule[i];

            result.push([previous[1], current[0]]);
        }

        return result;
    }
}


// ----------------------------------- Stack ----------------------------------- //



/**
 * Stack - Valid Parentheses
 */

// Given an input string s consisting solely of the characters '(', ')', '{', '}', '[' and ']',
// determine whether s is a valid string. A string is considered valid if every opening bracket
// is closed by a matching type of bracket and in the correct order,
// and every closing bracket has a corresponding opening bracket of the same type.

// Example 1:
// Inputs:
// s = "(){({})}"
// Output:
// True
// Example 2:
// Inputs:
// s = "(){({}})"
// Output:
// False

class Solution {
    isValid(s) {
        const stack = [];
        const mapping = {")": "(", "}": "{", "]": "["};

        for (const char of s) {
            if (char in mapping) {
                if (stack.length === 0 || stack[stack.length - 1] !== mapping[char]) {
                    return false;
                }
                stack.pop();
            } else {
                stack.push(char);
            }
        }

        return stack.length === 0;
    }
}

/**
 * Stack - Decode String
 */

// Given an encoded string, write a function to return its decoded string that follows a specific encoding rule:
// k[encoded_string], where the encoded_string within the brackets is repeated exactly k times.
// Note that k is always a positive integer. The input string is well-formed without any extra spaces,
// and square brackets are properly matched. Also, assume that the original data doesn't contain digits
// other than the ones that specify the number of times to repeat the following encoded_string.

// Inputs:
// s = "3[a2[c]]"
// Output:
// "accaccacc"

class Solution {
    decodeString(s) {
        // Stack-based approach: handle nested brackets for string decoding
        const stack = [];
        let curr_string = "";        // Current string being built
        let current_number = 0;      // Current multiplier number

        for (const char of s) {
            if (char === "[") {
                // Start of new encoded section: save current state
                stack.push(curr_string);      // Save current string
                stack.push(current_number);   // Save current multiplier
                curr_string = "";             // Reset for new section
                current_number = 0;
            } else if (char === "]") {
                // End of encoded section: decode and merge
                const num = stack.pop();            // Get multiplier
                const prev_string = stack.pop();    // Get previous string
                curr_string = prev_string + curr_string.repeat(num);
            } else if (/d/.test(char)) {
                // Digit: build the multiplier number
                current_number = current_number * 10 + parseInt(char);
            } else {
                // Letter: add to current string
                curr_string += char;
            }
        }

        return curr_string;
    }
}

/**
 * Stack - Longest Valid Parentheses
 */

// Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed)
// parentheses substring. A well-formed parentheses string is one that follows these rules:
// Open brackets must be closed by a matching pair in the correct order.
// For example, given the string "(()", the longest valid parentheses substring is "()",
// which has a length of 2. Another example is the string ")()())",
// where the longest valid parentheses substring is "()()", which has a length of 4.

// Example 1:
// Inputs:
// s = "())))"
// Output:
// 2
// (Explanation: The longest valid parentheses substring is "()")
// Example 2:
// Inputs:
// s = "((()()())"
// Output:
// 8
// (Explanation: The longest valid parentheses substring is "(()()())" with a length of 8)
// Example 3:
// Inputs:
// s = ""
// Output:
// 0

class Solution {
    longest_valid_parentheses(s) {
        let result = 0;

        // Last "sequence breaker" charachter position
        let stack = [-1];

        for (let i = 0; i < s.length; i++) {
            const char = s[i];

            if (char === "(") {
                stack.push(i);
            }
            else if (char === ")") {
                stack.pop();
                // Valid bracket, calculate length
                if (stack.length > 0) {
                    result = Math.max(result, i - stack[stack.length - 1]);
                }
                // Invalid bracket, set new last "sequence breaker" charachter position
                else {
                    stack.push(i);
                }
            }
        }

        return result;
    }
}

/**
 * Monotonic Stack - Daily Temperatures
 */

// Given an integer array temps representing daily temperatures, write a function to calculate the number of days
// one has to wait for a warmer temperature after each given day.
// The function should return an array answer where answer[i] represents the wait time for a warmer day after the ith day.
// If no warmer day is expected in the future, set answer[i] to 0.

// Inputs:
// temps = [65, 70, 68, 60, 55, 75, 80, 74]
// Output:
// [1,4,3,2,1,1,0,0]

class Solution {
    dailyTemperatures(temps) {
        const result = Array(temps.length).fill(0);
        const stack = [];

        // We will maintain a monotonic stack of indexes of decreasing temps
        for (let i = 0; i < temps.length; i++) {
            // If current temp is larger than top stack temp, it's a hit
            while ((stack.length > 0) && (temps[i] > temps[stack[stack.length - 1]])) {
                const lastIndex = stack.pop();
                // Index diff is the # of days between temps
                result[lastIndex] = i - lastIndex;
            }

            // Push this temp index onto the stack, it's now the lowest known temp in the stack
            stack.push(i);
        }

        return result;
    }
}

/**
 * Stack - Largest Rectangle in Histogram
 */

// Given an integer array heights representing the heights of histogram bars,
// write a function to find the largest rectangular area possible in a histogram, where each bar's width is 1.
// Inputs:
// heights = [2,8,5,6,2,3]
// Output:
// 15

class Solution {
    largestRectangleArea(heights) {
        heights.push(0);
        let result = 0;
        const stack = [];

        for (let i = 0; i < heights.length; i++) {
            while ((stack.length > 0) && (heights[i] < heights[stack[stack.length - 1]])) {
                // If the current bar is lower than previous
                // We will take saved previous bars that are lower than the current
                // And will calculate the areas

                // Highest known bar index
                const topIndex = stack.pop();
                const height = heights[topIndex];

                // Right is always the previous bar index
                // Because it's higher than all other bars in the stack
                // Left is (index of previous bar in the stack + 1) or 0; +1 because we don't include that bar in the calculation

                const leftIndex = stack[stack.length - 1];

                // It's easiet to calculate the width directly, otherwise it's a mess with +1 -1
                const width = stack.length ? (i - leftIndex - 1) : i;

                // Area is height * width
                const area = height * width;
                result = Math.max(result, area);
            }

            stack.push(i);
        }

        return result;
    }
}


// ----------------------------------- Linked List ----------------------------------- //


/**
 * Linked List - Detect Cycle
 */

// Write a function that takes in a parameter head of type ListNode that is a reference to the head of a linked list.
// The function should return True if the linked list contains a cycle, and False otherwise, without modifying the linked list in any way.

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;

        if (slow === fast) {
            return true;
        }
    }

    return false;
};

// ----------------------------------- Depth-first Search, Graphs ----------------------------------- //


/**
 * Graph Valid Tree
 */

// You are given an integer n and a list of undirected edges where each entry in the list is a pair of integers representing an edge between nodes 1 and n.
// You have to write a function to check whether these edges make up a valid tree.
// There will be no duplicate edges in the edges list. (i.e. [0, 1] and [1, 0] will not appear together in the list).

// Input:
// n = 4
// edges = [[0, 1], [2, 3]]
// 3
// 2
// 1
// 0
// Output:
// false # the graph is not connected.

class Solution {
    graph_valid_tree(n, edges) {
        // Tree has n - 1 edges
        if ((n < 1) || (edges.length !== n - 1)) {
            return false;
        }

        // Initializing the adjacence map
        let adjMap = {};

        for (let i = 0; i < n; i++) {
            adjMap[i] = [];
        }

        for (const [a, b] of edges) {
            adjMap[a].push(b);
            adjMap[b].push(a);
        }

        // Tracking visited nodes
        let visitedNodes = {};

        let checkForCycles = function(adjMap, node, parent) {
            visitedNodes[node] = true;

            for (const neighbor of adjMap[node]) {
                // If we found a node that we already visited from another side, it's a cycle
                if (visitedNodes[neighbor] && (parent !== neighbor)) {
                    return true;
                }
                // Checking recursively and breaking at the first found cycle
                else if (!visitedNodes[neighbor] && checkForCycles(adjMap, neighbor, node)) {
                    return true;
                }
            }

            // No cycles found
            return false;
        }

        let cycleFound = checkForCycles(adjMap, 0, -1);

        // Also making sure that we visited all nodes
        return !cycleFound && (Object.keys(visitedNodes).length === n);
    }
}


// ----------------------------------- Breadth-First Search, Tree ----------------------------------- //


/**
 * Level Order Sum
 */

// Given the root of a binary tree, return the sum of the nodes at each level.
// The output should be a list containing the sum of the nodes at each level.
// Example 1:
// Input:
// [1, 3, 4, null, 2, 7, null, 8]
// Output: [1, 7, 9, 8]
// Example 2:
// Input:
// [1, 2, 5, 3, null, null, 4]
// Output: [1, 7, 3, 4]

class Solution {
    levelSum(root) {
        if (!root) {
            return [];
        }

        const nodes = [];
        const queue = [root];

        while (queue.length > 0) {
            // start of a new level here
            const levelSize = queue.length;
            let sum = 0;

            // process all nodes in the current level
            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift();
                sum += node.val;
                if (node.left) {
                    queue.push(node.left);
                }
                if (node.right) {
                    queue.push(node.right);
                }
            }

            // we are at the end of the level,
            // add the sum of the nodes to the output list
            nodes.push(sum);
        }

        return nodes;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(n)


/**
 * Minimum Knight Moves
 * https://www.hellointerview.com/learn/code/breadth-first-search/minimum-knight-moves
 * https://leetcode.com/problems/minimum-knight-moves/
 */

// You are given a chessboard of infinite size where the coordinates of each cell are defined by integer pairs (x, y).
// The knight piece moves in an L-shape, either two squares horizontally and one square vertically, or two squares vertically and one square horizontally.
// Write a function to determine the minimum number of moves required for the knight to move from the starting position (0, 0) to the target position (x, y).
// Assume that it is always possible to reach the target position, and that x and y are both integers in the range [-200, 200]
// Example 1:
// Input:
// x = 1
// y = 2
// Output: 1
// Explanation: The knight can move from (0, 0) to (1, 2) in one move.
// Example 2:
// x = 4
// y = 4
// Output: 4
// Explanation: The knight can move from (0, 0) to (4, 4) in four moves ( [0, 0] -> [2, 1] -> [4, 2] -> [6, 3] -> [4, 4] )

class Solution {
    minimum_knight_moves(x, y) {
        // Visited key helper
        const getKey = (row, col) => {return `${row},${col}`}

        // Start at the center
        const queue = [[0, 0]];
        const visited = {};
        // 8 possible L-shaped directions for chess knight to go
        const directions = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];

        visited[getKey(0, 0)] = true;
        let moves = 0;

        while (queue.length > 0) {
            let levelSize = queue.length;

            // Each level means +1 additional move, so we can traverse in levels
            for (let i = 0; i < levelSize; i++) {
                const [row, col] = queue.shift();

                // Found it!
                if ((row === x) && (col === y)) {
                    return moves;
                }

                // Adding 8 potential neighbours
                for (const [dr, dc] of directions) {
                    const r = row + dr;
                    const c = col + dc;

                    if (!visited[getKey(r, c)]) {
                        queue.push([r, c]);
                        visited[getKey(row, col)] = true;
                    }
                }
            }

            moves++;
        }

        return Infinity;
    }
}
// Time Complexity: O(m * n) where m and n are the absolute values of the target cell coordinates. The time complexity is dominated by the BFS traversal, which visits all cells.
// Space Complexity: O(m * n) (same)

/**
 * Letter Combinations of a Phone Number
 * https://www.hellointerview.com/learn/code/backtracking/solution-space-trees
 */

class Solution {
    digitsToLetterCombinations(input) {
        if (!input || !input.length) {
            return [];
        }

        const mapping = { "2": "abc", "3": "def", "4": "ghi", "5": "jkl", "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz" };

        let result = [];

        const combinationSearch = function(combination, inputIndex) {
            let digit = input[inputIndex];

            // Parsing letters for the current digit
            for (const letter of mapping[digit] || []) {
                // New possible combination
                const newCombination = combination + letter;

                // If this is the last digit, push combination to result
                if (inputIndex === input.length - 1) {
                    result.push(newCombination);
                }
                // Otherwise keep recursion + backtracking
                else {
                    combinationSearch(newCombination, inputIndex + 1);
                }
            }
        }

        combinationSearch('', 0);

        return result;
    }
}
// Time Complexity: O(4^n), 4 letters per digit (max) ^ n digits
// Space Complexity: O(4^n) (same)


// ----------------------------------- Prefix Sum ----------------------------------- //


/**
 * Count Vowels in Substrings
 * https://www.hellointerview.com/learn/code/prefix-sum/count-vowels
 */

// Write a function to efficiently count vowels within specified substrings of a given string.
// The substrings will be given to you a list queries of [left, right] pairs, which correspond to the substring word[left:right + 1] in Python.
// The function should return a list of integers, where each integer represents the vowel count for the corresponding query.
// You can assume the input string will only contain lowercase letters.
// Your function should be optimized to run efficiently for a large number of queries.
// Input:
// word = "prefixsum"
// queries = [[0, 2], [1, 4], [3, 5]]
// Output: [1, 2, 1]
// Explanation:
// word[0:3] -> "pre" contains 1 vowels
// word[1:5]-> "refi" contains 2 vowels
// word[3:6]-> "fix" contains 1 vowels

class Solution {
    vowelStrings(word, queries) {
        const vowels = new Set(["a", "e", "i", "o", "u"]);
        const prefixSum = Array(word.length + 1).fill(0);

        // Build prefix sum array, consider vowels 1, anything else 0
        for (let i = 0; i < word.length; i++) {
            prefixSum[i + 1] = prefixSum[i] + (vowels.has(word[i]) ? 1 : 0);
        }

        const result = [];

        for (const [left, right] of queries) {
            // This is the formula for any subarray sum
            let sum = prefixSum[right + 1] - prefixSum[left];
            result.push(sum);
        }

        return result;
    }
}
// Time Complexity: O(N + Q) where N is the length of the word string and Q is the number of queries
// Space Complexity: O(N + Q)





// ----------------------------------- LeetCode Problems ----------------------------------- //


// 80. Remove Duplicates from Sorted Array II

/**
 * @param {number[]} nums
 * @return {number}
 */

const MAX_DUPLICATES = 2;

var removeDuplicates = function (nums) {
    if (nums.length <= MAX_DUPLICATES) {
        return nums.length;
    }

    let wp = MAX_DUPLICATES;

    for (let i = MAX_DUPLICATES; i < nums.length; i++) {
        // only write if we haven't written 2 yet, or this element ≠ the one 2 back
        if (nums[i] !== nums[wp - MAX_DUPLICATES]) {
            nums[wp++] = nums[i];
        }
    }

    return wp;
};

let input = [1,1,1,2,2,3];
removeDuplicates(input);


// 169. Majority Element
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let counts = {};
    let threshold = Math.floor(nums.length / 2) + 1;

    for (let i = 0; i < nums.length; i++) {
        if (counts[nums[i]] == null) {
            counts[nums[i]] = 1
        }
        else {
            counts[nums[i]]++;
        }

        if (counts[nums[i]] >= threshold) {
            return nums[i];
        }
    }
};

// Boyer–Moore Majority Vote (O(n) time, O(1) space)
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let count = 0;
    let candidate = null;

    for (let i = 0; i < nums.length; i++) {
        if (count == 0) {
            candidate = nums[i];
            count++;
        }
        else if (candidate == nums[i]) {
            count++;
        }
        else {
            count--;
        }
    }

    return candidate;
};


// 189. Rotate Array
// Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.
//
// Example 1:
//
// Input: nums = [1,2,3,4,5,6,7], k = 3
// Output: [5,6,7,1,2,3,4]
// Explanation:
// rotate 1 steps to the right: [7,1,2,3,4,5,6]
// rotate 2 steps to the right: [6,7,1,2,3,4,5]
// rotate 3 steps to the right: [5,6,7,1,2,3,4]
/**
 * Rotates the array to the right by k steps in-place.
 * Uses the reversal trick
 *
 * @param {number[]} nums – the array to rotate
 * @param {number} k – number of steps to rotate (non-negative)
 * @return {void} Do not return anything; modify nums in-place.
 */
var rotate = function(nums, k) {
    // Helper to reverse nums[l..r] inclusive
    const reverse = (l, r) => {
        while (l < r) {
            [nums[l], nums[r]] = [nums[r], nums[l]];
            l++; r--;
        }
    };

    // 1) reverse the whole array
    reverse(0, n - 1);
    // 2) reverse the first k elements
    reverse(0, k - 1);
    // 3) reverse the remaining n-k elements
    reverse(k, n - 1);
};


// Trickier solution that works in O(n) time and uses O(1) space
/**
 * Rotates the array to the right by k steps in-place,
 * using the cyclic-replacement method.
 *
 * @param {number[]} nums – the array to rotate
 * @param {number} k – number of steps to rotate (non-negative)
 * @return {void} Do not return anything; modify nums in-place.
 */
var rotate = function(nums, k) {
    const n = nums.length;
    if (n <= 1) return;

    // Normalize k to [0, n)
    k %= n;
    if (k === 0) return;

    let count = 0;    // how many elements we've moved so far

    // We may have multiple disjoint cycles; we start each cycle
    // at increasing `start` indices until we've moved all n items.
    for (let start = 0; count < n; start++) {
        let current = start;
        let prevVal = nums[start];

        do {
            // Compute where this element should go
            const nextIdx = (current + k) % n;

            // Swap it in, saving the overwritten value for the next step
            const tmp = nums[nextIdx];
            nums[nextIdx] = prevVal;
            prevVal = tmp;

            // Advance our “pointer” and increment the total move count
            current = nextIdx;
            count++;
        } while (current !== start);
    }
};

/**
 * 141. Linked List Cycle
 */

// Given head, the head of a linked list, determine if the linked list has a cycle in it.
//
// There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.
// Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
//
// Return true if there is a cycle in the linked list. Otherwise, return false.
//
// Example 1:
// Input: head = [3,2,0,-4], pos = 1
// Output: true
// Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;

        if (slow === fast) {
            return true;
        }
    }

    return false;
};

/**
 * 234. Palindrome Linked List
 */

// Given the head of a singly linked list, return true if it is a palindrome or false otherwise.
//
// Example 1:
// Input: head = [1,2,2,1]
// Output: true
// Example 2:
// Input: head = [1,2]
// Output: false

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    if (!head || !head.next) {
        return true;
    }

    let slow = head;
    let fast = head;
    let prevSlow = null;

    // Finding midpoint and reversing left half list as we go
    while (fast && fast.next) {
        fast = fast.next.next;

        // Reversing left half list (midpoint ignored if exists)
        let next = slow.next;
        slow.next = prevSlow;
        prevSlow = slow;
        slow = next;
    }

    let left = prevSlow;

    // If fast exists, list length is odd and we need to ignore the middle item
    // Otherwise, list length is even and slow is the head of right list
    let right = fast ? slow.next : slow;

    // Traverse both lists
    while (left && right) {
        if (left.val !== right.val) {
            return false;
        }

        left = left.next;
        right = right.next;
    }

    return true;
};

// Alt solution:
// 1. Find midpoint
// 2. Reverse RIGHT half
// 3. Traverse and compare
// Cose easier but has 3 loops
// Same complexity t O(n), s O(1), but more operations in reality

function isPalindrome(head) {
    if (!head || !head.next) {
        return true;
    }

    // find middle node
    let slow = head, fast = head;
    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
    }

    // reverse second half
    let prev = null;
    while (slow) {
        let next = slow.next;
        slow.next = prev;
        prev = slow;
        slow = next;
    }

    // compare halves
    let first = head, second = prev;
    while (second) {
        if (first.val !== second.val) {
            return false;
        }
        first = first.next;
        second = second.next;
    }

    return true;
}


/**
 * 19. Remove Nth Node From End of List
 */

// Given the head of a linked list, remove the nth node from the end of the list and return its head.
//
// Example 1:
// Input: head = [1,2,3,4,5], n = 2
// Output: [1,2,3,5]
// Example 2:
// Input: head = [1], n = 1
// Output: []
// Example 3:
// Input: head = [1,2], n = 1
// Output: [1]

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let slow = head;
    let fast = head;

    // Sliding fast to Nth position from the start
    for (let i = 0; i < n; i++) {
        fast = fast.next;
    }

    // Edge case - remove head
    if (!fast) {
        return head.next;
    }

    // Sliding both, this way slow will be next to the one we want to delete
    while (fast.next) {
        slow = slow.next;
        fast = fast.next;
    }

    // Deleting the node
    slow.next = slow.next.next;

    return head;
};


// Tricky solution (Anatoly's) which uses midpoint to detect the list length
// Also, we use midpoint pointer if Nth element is in the rigth half of the list
// Max ops count is N
// Min ops count is N / 2 + 1

var removeNthFromEnd = function(head, n) {
    let length = 0;
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        length += 2;
    }

    // Odd length
    if (fast) {
        length++;
    }

    if (n < length) {
        let current = head;
        let i = 1;

        // If the element is on the right side of the list,
        // We have a pointer in the middle alredy (slow)
        let midpoint = Math.floor(length / 2) + 1;

        if (n < length - midpoint) {
            current = slow;
            i = midpoint;
        }

        // Traversing until we find node next to n
        while (i <= length - n - 1) {
            current = current.next;
            i++;
        }

        // Deleting node
        current.next = current.next.next;
    }
    else {
        return head.next;
    }

    return head;
};

/**
 * 143. Reorder List
 */

// You are given the head of a singly linked-list. The list can be represented as:
// L0 → L1 → … → Ln - 1 → Ln
// Reorder the list to be on the following form:
// L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
// You may not modify the values in the list's nodes. Only nodes themselves may be changed.
//
// Example 1:
// Input: head = [1,2,3,4]
// Output: [1,4,2,3]
// Example 2:
// Input: head = [1,2,3,4,5]
// Output: [1,5,2,4,3]

var reorderList = function(head, list) {
    if (!head || !head.next) {
        return head;
    }

    let slow = head;
    let fast = head;

    // Finding midpoint
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // Left half list
    let left = head;

    // Right half list (we need to reverse it)
    // Fast present for odd lengths, need to move one step to the right
    let right = slow;

    // Reversing the list
    let prev = null;

    while (right) {
        let next = right.next;

        right.next = prev;
        prev = right;
        right = next;
    }

    // Back to last existing node
    right = prev;

    // Merging the two lists
    while (right.next) {
        let nextLeft = left.next;
        let nextRight = right.next;

        // Add node
        left.next = right;
        // Change pointer to next left
        right.next = nextLeft;
        // Move
        left = nextLeft;
        right = nextRight;
    }

    return head;
};


/**
 * 24. Swap Nodes in Pairs
 */

// Given a linked list, swap every two adjacent nodes and return its head.
// You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)
// Example 1:
// Input: head = [1,2,3,4]
// Output: [2,1,4,3]
// Example 4:
// Input: head = [1,2,3]
// Output: [2,1,3]

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    // Spare us headache with head re-assign
    let dummy = new ListNode(0, head);

    let first = head;
    let prev = dummy;

    // Iterate only when have a guaranteed next pair
    while (first && first.next) {
        let second = first.next;

        // Swap
        let next = second.next; // remember next
        second.next = first;    // move front to back
        first.next = next;      // move back to front
        prev.next = second;     // re-link previous to new back

        // Move
        prev = first;    // first is now second
        first = next;    // move back +2 nodes
    }

    return dummy.next;
};

/**
 * 875. Koko Eating Bananas
 */

// Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.
// Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile.
// If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.
// Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.
// Return the minimum integer k such that she can eat all the bananas within h hours.
//
// Example 1:
// Input: piles = [3,6,7,11], h = 8
// Output: 4
// Example 2:
// Input: piles = [30,11,23,4,20], h = 5
// Output: 30
// Example 3:
// Input: piles = [30,11,23,4,20], h = 6
// Output: 23

/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function(piles, h) {
    let speedMin = 1;
    let speedMax = piles.reduce((max, val) => Math.max(max, val));
    let speed = 0;

    // Binary search for proper speed value
    while (speedMin < speedMax) {
        speed = Math.floor((speedMax + speedMin) / 2);

        // Calculating total lime spend, stop if more than h
        let timeSpent = 0;
        for (let i = 0; i < piles.length; i++) {
            timeSpent += Math.ceil(piles[i] / speed);
        }

        // If spent more time than allowed, increase speed
        if (timeSpent > h) {
            speedMin = speed + 1;
        }
        // Otherwise we found a valid speed but there may be a smaller value
        else {
            speedMax = speed;
        }
    }

    return speedMin;
};
// Time complexity O(log m * n), where m = max bananas count
// Space complexity O(1)


/**
 * 33. Search in Rotated Sorted Array
 */

// There is an integer array nums sorted in ascending order (with distinct values).
// Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length)
// such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed).
// For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].
// Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.
// You must write an algorithm with O(log n) runtime complexity.
//
// Example 1:
// Input: nums = [4,5,6,7,0,1,2], target = 0
// Output: 4
// Example 2:
// Input: nums = [4,5,6,7,0,1,2], target = 3
// Output: -1
// Example 3:
// Input: nums = [1], target = 0
// Output: -1

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        let middle = Math.floor((left + right) / 2);

        if (target === nums[middle]) {
            return middle;
        }

        // If left part is sorted
        if (nums[left] <= nums[middle]) {
            // Target is in left sorted band
            if ((target >= nums[left]) && (target < nums[middle])) {
                right = middle - 1;
            }
            // Target is in the right unsorted band
            else {
                left = middle + 1;
            }
        }
        // Right band is sorted
        else {
            // Target is in right sorted band
            if ((target > nums[middle]) && (target <= nums[right])) {
                left = middle + 1;
            }
            // Target is in the left unsorted band
            else {
                right = middle - 1;
            }
        }
    }

    return -1;
};
// Time complexity O(log n)
// Space complexity O(1)


/**
 * 215. Kth Largest Element in an Array
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
    if (!nums || (k > nums.length)) {
        return null;
    }

    let candidates = new MinHeap();
    candidates.heapify(nums.slice(0, k));

    for (let i = k; i < nums.length; i++) {
        if (nums[i] > candidates.peek()) {
            candidates.pop()
            candidates.push(nums[i]);
        }
    }

    return candidates.peek();
};
// Time Complexity: O(n log k) where n is the number of elements in the array and k is the input parameter
// Space Complexity: O(k)


/**
 * 973. K Closest Points to Origin
 */

// Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).
// The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).
// You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).
//
// Example 1:
// Input: points = [[1,3],[-2,2]], k = 1
// Output: [[-2,2]]
// Explanation:
// The distance between (1, 3) and the origin is sqrt(10).
// The distance between (-2, 2) and the origin is sqrt(8).
// Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
// We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].
// Example 2:
// Input: points = [[3,3],[5,-1],[-2,4]], k = 2
// Output: [[3,3],[-2,4]]
// Explanation: The answer [[-2,4],[3,3]] would also be accepted.

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function(points, k) {
    let candidates = new TupleMaxHeap();

    // To get the k min values we need to use MAX Heap
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        // Math.sqrt is costly and unnecessary
        const distance = Math.sqrt(point[0] * point[0] + point[1] * point[1]);

        // Then we need to populate the heap with the min values
        // We will use Tuples (distance, index)
        if (candidates.heap.length < k) {
            candidates.push([distance, i]);
        }
        else if (distance < candidates.peek()[0]) {
            candidates.pop();
            candidates.push([distance, i]);
        }
    }

    // Returning original coordinates
    return candidates.heap.map(candidate => points[candidate[1]]);
};
// Time Complexity: O(n log k) where n is the number of points in the array and k is the input parameter
// Space Complexity: O(k) where k is the input parameter.
// Even more optimal solution: Quickselect O(n)


// Solution with MIN Heap (negated distance)
var kClosest = function(points, k) {
    let candidates = new TupleMinHeap();

    // To get the k min values we need to use MAX Heap
    // Or use MIN heap with negated values trick
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        // Math.sqrt is costly and unnecessary
        const distance = Math.sqrt(point[0] * point[0] + point[1] * point[1]);

        // Then we need to populate the heap with the min values
        // We will use Tuples (distance, index)
        if (candidates.heap.length < k) {
            candidates.push([-distance, i]);
        }
        else if (distance < -candidates.peek()[0]) {
            candidates.pop();
            candidates.push([-distance, i]);
        }
    }

    // Returning original coordinates
    return candidates.heap.map(candidate => points[candidate[1]]);
};

/**
 * Returns the k closest points to the origin in average O(n) time.
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function(points, k) {
    const quickselect = function (left, right, kSmallest, comparisonFunction = null) {
        // quickselect is abstracted due to long implementation
    }

    // Distance squared (Math.sqrt is costly and unnecessary)
    const dist2 = function(coords) {
        return coords[0] * coords[0]  + coords[1] * coords[1];
    };

    // Comparing two values by their distances
    const compareDist2 = function(value1, value2) {
        return dist2(value1) - dist2(value2);
    };

    // Only partition the first k entries into their correct spots
    quickselect(0, points.length - 1, k - 1, compareDist2);

    // Now the first k points in `points` are the k closest (in any order)
    return points.slice(0, k);
};
// Time Complexity: average O(n), worst case O(n²)
// Space Complexity: O(k) where k is the input parameter.

/**
 * 658. Find K Closest Elements
 */

// Given a sorted integer array arr, two integers k and x, return the k closest integers to x in the array.
// The result should also be sorted in ascending order.
// An integer a is closer to x than an integer b if:
// |a - x| < |b - x|, or
// |a - x| == |b - x| and a < b
//
// Example 1:
// Input: arr = [1,2,3,4,5], k = 4, x = 3
// Output: [1,2,3,4]
// Example 2:
// Input: arr = [1,1,2,3,4,5], k = 4, x = -1
// Output: [1,1,2,3]

/**
 * Binary search solution
 */
var findClosestElements = function(arr, k, x) {
    let left = 0;
    let right = arr.length - k;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        // The contiguous subarray containing the k closest elements cannot contain both nums[mid] and nums[mid + k]
        // because they are located k + 1 elements apart.
        // So when nums[mid + k] is closer to the target than nums[mid],
        // this tells us that the final answer might include nums[mid + k],
        // but it will definitely not incldue nums[mid]
        // Also if nums[mid] == nums[mid + k], we will get a direction based on whether nums[mid] > or < targer
        if (x - arr[mid] > arr[mid + k] - x) {
            left = mid + 1;
        }
        // The opposite is true when nums[mid] is closer to the target than nums[mid + k].
        // In this case, the final answer might include nums[mid]
        // but it will definitely not include nums[mid + k].
        // To reflect this, we move the right pointer to mid
        else {
            right = mid;
        }
    }

    return arr.slice(left, left + k);
};

/**
 * Max Heap Solution
 */
var findClosestElements = function(arr, k, x) {
    let heap = new TupleMaxHeap();

    for (let i = 0; i < arr.length; i++) {
        let distance = Math.abs(x - arr[i]);

        if (heap.length() < k) {
            heap.push([distance, i]);
        }
        else if (distance < heap.peek()[0]) {
            heap.pop();
            heap.push([distance, i]);
        }
    }

    return heap.heap.map(val => arr[val[1]]).sort((a, b) => a - b);
};

/**
 * 23. Merge k Sorted Lists
 */

// You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
// Merge all the linked-lists into one sorted linked-list and return it.
//
// Example 1:
// Input: lists = [[1,4,5],[1,3,4],[2,6]]
// Output: [1,1,2,3,4,4,5,6]
// Explanation: The linked-lists are:
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// merging them into one sorted linked list:
// 1->1->2->3->4->4->5->6

// Example 2:
// Input: lists = []
// Output: []

// Example 3:
// Input: lists = [[]]
// Output: []

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    let heap = new TupleMinHeap();

    // Add all list heads to the heap
    for (const head of lists) {
        if (head) {
            heap.push([head.val, head]);
        }
    }

    let dummy = new ListNode(0, null);
    let lastNode = dummy;

    // Now we will be pulling the node with smallest value from the heap and merging it to the resulting list
    // If the node is linked to another, add it to the list
    while (heap.length() > 0) {
        let nextNode = heap.pop()[1];

        // Node to merged list
        lastNode.next = nextNode;
        lastNode = nextNode;

        // If next node is linked to another, add it to the heap
        if (nextNode.next) {
            heap.push([nextNode.next.val, nextNode.next]);
        }
    }

    return dummy.next;
};
// Time Complexity: O(n * log k) where n is the total number of nodes across all input linked lists and k is the number of linked lists.
// Space Complexity: O(k) where k is the number of linked lists



// ----------------------------------- Depth-First Search, Binary Tree ----------------------------------- //

/**
 * 104. Maximum Depth of Binary Tree
 */

// Given the root of a binary tree, return its maximum depth.
// A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
//
// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: 3

// Example 2:
// Input: root = [1,null,2]
// Output: 2

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
var maxDepth = function(root) {
    if (!root) {
        return 0;
    }

    let depthLeft = root.left ? maxDepth(root.left) : 0;
    let depthRight = root.right ? maxDepth(root.right) : 0;

    return Math.max(depthLeft, depthRight) + 1;
};
// Time Complexity: O(n)
// Space Complexity: O(n)


/**
 * 112. Path Sum
 */

// Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path
// such that adding up all the values along the path equals targetSum.
// A leaf is a node with no children.
//
// Example 1:
// Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
// Output: true
// Explanation: The root-to-leaf path with the target sum is shown.

// Example 2:
// Input: root = [1,2,3], targetSum = 5
// Output: false
// Explanation: There are two root-to-leaf paths in the tree:
// (1 --> 2): The sum is 3.
// (1 --> 3): The sum is 4.
// There is no root-to-leaf path with sum = 5.

// Example 3:
// Input: root = [], targetSum = 0
// Output: false
// Explanation: Since the tree is empty, there are no root-to-leaf paths.

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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {
    if (!root) {
        return false;
    }

    if (!root.left && !root.right) {
        return root.val === targetSum;
    }

    return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
};
// Time Complexity: O(n)
// Space Complexity: O(n)

/**
 * 1448. Count Good Nodes in Binary Tree
 */

// Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X.
// Return the number of good nodes in the binary tree.
//
// Example 1:
// Input: root = [3,1,4,3,null,1,5]
// Output: 4
// Explanation: Nodes in blue are good.
// Root Node (3) is always a good node.
// Node 4 -> (3,4) is the maximum value in the path starting from the root.
// Node 5 -> (3,4,5) is the maximum value in the path
// Node 3 -> (3,1,3) is the maximum value in the path.
// Example 2:
// Input: root = [3,3,null,4,2]
// Output: 3
// Explanation: Node 2 -> (3, 3, 2) is not good, because "3" is higher than it.
// Example 3:
// Input: root = [1]
// Output: 1
// Explanation: Root is considered as good.

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
var goodNodes = function(root) {
    let getGoodNodes = function(root, maxVal) {
        if (!root) {
            return 0;
        }

        let currentMax = Math.max(maxVal, root.val);

        let goodLeft = getGoodNodes(root.left, currentMax);
        let goodRight = getGoodNodes(root.right, currentMax);

        return goodLeft + goodRight + ((maxVal > root.val) ? 0 : 1);
    }

    return getGoodNodes(root, -Infinity);
};
// Time Complexity: O(n)
// Space Complexity: O(n)

/**
 * 98. Validate Binary Search Tree
 */

// Given the root of a binary tree, determine if it is a valid binary search tree (BST).
// A valid BST is defined as follows:
// The left subtree of a node contains only nodes with keys strictly less than the node's key.
// The right subtree of a node contains only nodes with keys strictly greater than the node's key.
// Both the left and right subtrees must also be binary search trees.
//
// Example 1:
// Input: root = [2,1,3]
// Output: true
// Example 2:
// Input: root = [5,1,4,null,null,3,6]
// Output: false
// Explanation: The root node's value is 5 but its right child's value is 4.

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
var isValidBST = function(root) {
    var checkValidBST = function(root, min, max) {
        if (!root) {
            return true;
        }

        // Min and Max are boundaries set by top nodes
        // Breaking these boundaries mean breaking BST requirements
        if ((root.val <= min) || (root.val >= max)) {
            return false;
        }

        // Left subtree nodes must be NO GREATER than current root node
        // but NO LESS than the min value of the last node where we turned RIGHT (if any)
        return checkValidBST(root.left, min, root.val)
            // Same principle in reverse for the right subtree
            && checkValidBST(root.right, root.val, max);
    };

    return checkValidBST(root, -Infinity, Infinity);
};
// Time Complexity: O(n)
// Space Complexity: O(n)


/**
 * 563. Binary Tree Tilt
 */

// Given the root of a binary tree, return the sum of every tree node's tilt.
// The tilt of a tree node is the absolute difference between the sum of all left subtree node values
// and all right subtree node values. If a node does not have a left child,
// then the sum of the left subtree node values is treated as 0. The rule is similar if the node does not have a right child.
//
// Example 1:
// Input: root = [1,2,3]
// Output: 1
// Explanation:
// Tilt of node 2 : |0-0| = 0 (no children)
// Tilt of node 3 : |0-0| = 0 (no children)
// Tilt of node 1 : |2-3| = 1 (left subtree is just left child, so sum is 2; right subtree is just right child, so sum is 3)
// Sum of every tilt : 0 + 0 + 1 = 1
// Example 2:
// Input: root = [4,2,9,3,5,null,7]
// Output: 15
// Explanation:
// Tilt of node 3 : |0-0| = 0 (no children)
// Tilt of node 5 : |0-0| = 0 (no children)
// Tilt of node 7 : |0-0| = 0 (no children)
// Tilt of node 2 : |3-5| = 2 (left subtree is just left child, so sum is 3; right subtree is just right child, so sum is 5)
// Tilt of node 9 : |0-7| = 7 (no left child, so sum is 0; right subtree is just right child, so sum is 7)
// Tilt of node 4 : |(3+5+2)-(9+7)| = |10-16| = 6 (left subtree values are 3, 5, and 2, which sums to 10; right subtree values are 9 and 7, which sums to 16)
// Sum of every tilt : 0 + 0 + 0 + 2 + 7 + 6 = 15
// Example 3:
// Input: root = [21,7,14,1,1,2,2,3,3]
// Output: 9

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
var findTilt = function(root) {
    let tiltSum = 0;

    let calculateSubtreeSum = function(root) {
        if (!root) {
            return 0;
        }

        let leftResult = calculateSubtreeSum(root.left);
        let rightResult = calculateSubtreeSum(root.right);

        tiltSum += Math.abs(leftResult - rightResult);

        return root.val + leftResult + rightResult;
    }

    calculateSubtreeSum(root);

    return tiltSum;
};
// Time Complexity: O(n)
// Space Complexity: O(n)


/**
 * 543. Diameter of Binary Tree
 */

// Given the root of a binary tree, return the length of the diameter of the tree.
// The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.
// The length of a path between two nodes is represented by the number of edges between them.
//
// Example 1:
// Input: root = [1,2,3,4,5]
// Output: 3
// Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].
// Example 2:
// Input: root = [1,2]
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
var diameterOfBinaryTree = function(root) {
    let maxDiameter = 0;

    function dfs(node) {
        // base case
        if (!node) {
            return 0;
        }

        // get the max depth of the left and right subtrees
        const depthLeft = dfs(node.left);
        const depthRight = dfs(node.right);

        // update the maximum diameter of the tree
        maxDiameter = Math.max(maxDiameter, depthLeft + depthRight);

        // return the max depth of the current subtree
        return 1 + Math.max(depthLeft, depthRight);
    }

    dfs(root);
    return maxDiameter;
};
// Time Complexity: O(n)
// Space Complexity: O(n)


/**
 * 113. Path Sum II
 */

// Given the root of a binary tree and an integer targetSum, return all root-to-leaf paths where the sum of the node values in the path equals targetSum.
// Each path should be returned as a list of the node values, not node references.
// A root-to-leaf path is a path starting from the root and ending at any leaf node. A leaf is a node with no children.
//
// Example 1:
// Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
// Output: [[5,4,11,2],[5,8,4,5]]
// Explanation: There are two paths whose sum equals targetSum:
// 5 + 4 + 11 + 2 = 22
// 5 + 8 + 4 + 5 = 22
// Example 2:
// Input: root = [1,2,3], targetSum = 5
// Output: []
// Example 3:
// Input: root = [1,2], targetSum = 0
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
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function(root, targetSum) {
    let result = [];

    // This is a stack that will keep the current path values
    let currentPath = [];

    let searchPath = function(node, targetSum) {
        if (!node) {
            return;
        }

        // Push value to stack
        currentPath.push(node.val);

        // If this is a leaf and the remaining target value equals leaf value, we found a path
        if (!node.left && !node.right && (targetSum === node.val)) {
            result.push(currentPath.slice()); // Copy the current path to result
        }
        else {
            // Otherwise search left and right subtrees, decreasing the search value by current value
            searchPath(node.left, targetSum - node.val);
            searchPath(node.right, targetSum - node.val);
        };

        // Pop the value from the stack when we're done
        currentPath.pop();
    }

    searchPath(root, targetSum);

    return result;
};
// Time Complexity: O(n)
// Space Complexity: O(n)


/**
 * 687. Longest Univalue Path
 */

// Given the root of a binary tree, return the length of the longest path, where each node in the path has the same value.
// This path may or may not pass through the root.
// The length of the path between two nodes is represented by the number of edges between them.
//
// Example 1:
// Input: root = [5,4,5,1,1,null,5]
// Output: 2
// Explanation: The shown image shows that the longest path of the same value (i.e. 5).
// Example 2:
// Input: root = [1,4,5,4,4,null,5]
// Output: 2
// Explanation: The shown image shows that the longest path of the same value (i.e. 4).

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
var longestUnivaluePath = function(root) {
    let maxLength = 0;

    let searchPaths = function(node, parentValue) {
        if (!node) {
            return 0;
        }

        let leftLength = searchPaths(node.left, node.val);
        let rightLength = searchPaths(node.right, node.val);


        if (leftLength || rightLength) {
            maxLength = Math.max(maxLength, leftLength + rightLength);
        }

        return (node.val === parentValue) ? Math.max(1, leftLength + 1, rightLength + 1) : 0;
    }

    searchPaths(root, null);

    return maxLength;
};
// Time Complexity: O(n)
// Space Complexity: O(n)

// Similar solution without extra params (compare values on root node)
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
var longestUnivaluePath = function(root) {
    let maxLength = 0;

    let searchPaths = function(node) {
        if (!node) {
            return 0;
        }

        let leftLength = searchPaths(node.left);
        let rightLength = searchPaths(node.right);

        let leftUnivalueLength = 0;
        let rightUnivalueLength = 0;

        // check if children have the same value as the current node,
        // which means we can extend the univalue path by including the current node
        if (node.left && (node.left.val === node.val)) {
            leftUnivalueLength = leftLength + 1;
        }

        if (node.right && (node.right.val === node.val)) {
            rightUnivalueLength = rightLength + 1;
        }

        // This is the length of the longest univalue path that goes through the current node
        maxLength = Math.max(maxLength, leftUnivalueLength + rightUnivalueLength);

        // We return max univalue length of left or right shoulder in case if it's a subshoulder of a longer path
        return Math.max(leftUnivalueLength, rightUnivalueLength);
    }

    searchPaths(root);

    return maxLength;
};
// Time Complexity: O(n)
// Space Complexity: O(n)




// ----------------------------------- Depth-First Search, Graph ----------------------------------- //


/**
 * 133. Clone Graph
 * https://leetcode.com/problems/clone-graph/description/
 */

// Given a reference of a node in a connected undirected graph.
// Return a deep copy (clone) of the graph.
// Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.
// Test case format:
// For simplicity, each node's value is the same as the node's index (1-indexed).
// For example, the first node with val == 1, the second node with val == 2, and so on. The graph is represented in the test case using an adjacency list.
// An adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.
// The given node will always be the first node with val = 1.
// You must return the copy of the given node as a reference to the cloned graph.

/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */
var cloneGraph = function(node) {
    // Cloned nodes inventory to prevent loops
    const clonedNodes = {};

    const graphTraverse = function(node) {
        if (!node) {
            return null;
        }

        // If already cloned, return it
        if (clonedNodes[node.val]) {
            return clonedNodes[node.val];
        }

        // Create new node and save it before going into recursion
        let clonedNode = new _Node(node.val, []);
        clonedNodes[node.val] = clonedNode;

        // Enumerate neighbors and start recursion
        for (const neighbor of node.neighbors) {
            if (neighbor) {
                clonedNode.neighbors.push(graphTraverse(neighbor));
            }
        }

        return clonedNode;
    }

    // Graph is connected, so no need for loops
    return graphTraverse(node);
};
// Time Complexity: O(N + M) where N is the number of nodes and M is the number of edges in the graph for the depth-first search traversal.
// Space Complexity: O(N + M) where N is the number of nodes and M is the number of edges in the graph.



// ----------------------------------- Depth-First Search, Matrix ----------------------------------- //

/**
 * 733. Flood Fill
 * https://leetcode.com/problems/flood-fill/description/
 */

// You are given an image represented by an m x n grid of integers image, where image[i][j] represents the pixel value of the image.
// You are also given three integers sr, sc, and color. Your task is to perform a flood fill on the image starting from the pixel image[sr][sc].
// To perform a flood fill:
// Begin with the starting pixel and change its color to color.
// Perform the same process for each pixel that is directly adjacent (pixels that share a side with the original pixel, either horizontally or vertically) and shares the same color as the starting pixel.
// Keep repeating this process by checking neighboring pixels of the updated pixels and modifying their color if it matches the original color of the starting pixel.
// The process stops when there are no more adjacent pixels of the original color to update.
// Return the modified image after performing the flood fill.
//
// Example 1:
// Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
// Output: [[2,2,2],[2,2,0],[2,0,1]]
// Explanation:
// From the center of the image with position (sr, sc) = (1, 1) (i.e., the red pixel),
// all pixels connected by a path of the same color as the starting pixel (i.e., the blue pixels) are colored with the new color.
// Note the bottom corner is not colored 2, because it is not horizontally or vertically connected to the starting pixel.
//
// Example 2:
// Input: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0
// Output: [[0,0,0],[0,0,0]]
// Explanation:
// The starting pixel is already colored with 0, which is the same as the target color. Therefore, no changes are made to the image.

/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, color) {
    const rows = image.length;
    const cols = image[0].length;
    const startColor = image[sr][sc];

    // Quick sanity check + infinite recursion breaker
    if (startColor === color) {
        return image;
    }

    const recursiveFill = function(row, col) {
        // Main logic - fill if the cell color is the same as starting cell
        if (image[row][col] === startColor) {
            image[row][col] = color;

            if (row - 1 >= 0) {
                recursiveFill(row - 1, col);
            }
            if (row + 1 < rows) {
                recursiveFill(row + 1, col);
            }
            if (col - 1 >= 0) {
                recursiveFill(row, col - 1);
            }
            if (col + 1 < cols) {
                recursiveFill(row, col + 1);
            }
        }
    }

    // Start with the target cell
    recursiveFill(sr, sc);

    return image;
};
// Time Complexity: O(r * c)
// Space Complexity: O(r * c)


/**
 * 200. Number of Islands
 * https://leetcode.com/problems/number-of-islands/
 */

// Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.
// An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
// You may assume all four edges of the grid are all surrounded by water.
//
// Example 1:
// Input: grid = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ]
// Output: 1
// Example 2:
// Input: grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]
// Output: 3

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    // up down left right
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const rows = grid.length;
    const cols = grid[0].length;
    const visited = {};

    // Visited key helper
    const getKey = (row, col) => {return `${row},${col}`};

    const islandSearch = function(row, col) {
        // Checking bounds, value, and previous visits
        if ((row < 0) || (row >= rows) || (col < 0) || (col >= cols)
            || (grid[row][col] !== "1") || visited[getKey(row, col)]) {
            return;
        }

        // Mark visited
        visited[getKey(row, col)] = true;

        // Recursive search
        for ([dr, dc] of directions) {
            islandSearch(row + dr, col + dc);
        }

        return;
    }

    let result = 0;

    // Traversing the grid
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // If found an unvisited island cell, search and mark full island
            if ((grid[r][c] === "1") && !visited[getKey(r, c)]) {
                islandSearch(r, c);
                result++;
            }
        }
    }

    return result;
};
// Time Complexity: O(r * c)
// Space Complexity: O(r * c)


/**
 * 130. Surrounded Regions
 * https://leetcode.com/problems/surrounded-regions/description/
 */

// You are given an m x n matrix board containing letters 'X' and 'O', capture regions that are surrounded:
// Connect: A cell is connected to adjacent cells horizontally or vertically.
// Region: To form a region connect every 'O' cell.
// Surround: The region is surrounded with 'X' cells if you can connect the region with 'X' cells and none of the region cells are on the edge of the board.
// To capture a surrounded region, replace all 'O's with 'X's in-place within the original board. You do not need to return anything.
//
// Example 1:
// Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
// Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
// Explanation:
// In the above diagram, the bottom region is not captured because it is on the edge of the board and cannot be surrounded.
//
// Example 2:
// Input: board = [["X"]]
// Output: [["X"]]

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
    // Edge conditions check
    if (!board || (board.length < 3) || (board[0].length < 3)) {
        return;
    }

    const rows = board.length;
    const cols = board[0].length;
    const unsurrounded = {};

    // Visited key helper
    const getKey = (row, col) => {return `${row},${col}`};

    const searchRegion = function(row, col) {
        // Boundaries check + validation
        if ((row < 0) || (row >= rows) || (col < 0) || (col >= cols)
            || (board[row][col] !== 'O') || unsurrounded[getKey(row, col)]) {
            return;
        }

        // Marking this place as unsurrounded
        unsurrounded[getKey(row, col)] = true;

        // Recursive search
        searchRegion(row + 1, col);
        searchRegion(row - 1, col);
        searchRegion(row, col + 1);
        searchRegion(row, col - 1);
    }

    // Unsurrounded regions will start from the border
    // Traversing first and last rows
    for (let r = 0; r < rows; r++) {
        searchRegion(r, 0);
        searchRegion(r, cols - 1);
    }

    // Traversing first and last columns
    for (let c = 1; c < cols - 1; c++) {
        searchRegion(0, c);
        searchRegion(rows - 1, c);
    }

    // Traversing the inside cells and marking all remaining 'O' to 'X'
    for (let r = 1; r < rows - 1; r++) {
        for (let c = 1; c < cols - 1; c++) {
            if ((board[r][c] === 'O') && !unsurrounded[getKey(r, c)]) {
                board[r][c] = 'X';
            }
        }
    }
};
// Time Complexity: O(r * c)
// Space Complexity: O(r * c)


/**
 * 417. Pacific Atlantic Water Flow
 * https://leetcode.com/problems/pacific-atlantic-water-flow/description/
 */

// There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean.
// The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.
// The island is partitioned into a grid of square cells.
// You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).
// The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west
// if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.
// Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.
//
// Example 1:
// Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
// Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
// Explanation: The following cells can flow to the Pacific and Atlantic oceans, as shown below:
// [0,4]: [0,4] -> Pacific Ocean
//        [0,4] -> Atlantic Ocean
// [1,3]: [1,3] -> [0,3] -> Pacific Ocean
//        [1,3] -> [1,4] -> Atlantic Ocean
// [1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean
//        [1,4] -> Atlantic Ocean
// [2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean
//        [2,2] -> [2,3] -> [2,4] -> Atlantic Ocean
// [3,0]: [3,0] -> Pacific Ocean
//        [3,0] -> [4,0] -> Atlantic Ocean
// [3,1]: [3,1] -> [3,0] -> Pacific Ocean
//        [3,1] -> [4,1] -> Atlantic Ocean
// [4,0]: [4,0] -> Pacific Ocean
//        [4,0] -> Atlantic Ocean
// Note that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.
// Example 2:
// Input: heights = [[1]]
// Output: [[0,0]]
// Explanation: The water can flow from the only cell to the Pacific and Atlantic oceans.

/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function(heights) {
    if (!heights || !heights[0]) {
        return [];
    }

    const rows = heights.length;
    const cols = heights[0].length;

    // up down left right
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    // Reaching Pacific
    const pacific = {};
    // Reaching Atlantic
    const atlantic = {};

    // Visited cells key helper
    const getKey = (row, col) => {return `${row},${col}`};

    const searchPath = function(row, col, ocean) {
        // Mark that ocean is reacheable from here
        ocean[getKey(row, col)] = [row, col];

        for (const [dr, dc] of directions) {
            const r = row + dr;
            const c = col + dc;

            // Check boundaries, height difference, and ignore visited cells
            if ((r >= 0) && (r < rows) && (c >= 0) && (c < cols)
                && !ocean[getKey(r, c)] && (heights[row][col] <= heights[r][c])) {
                searchPath(r, c, ocean);
            }
        }
    }

    // Search starts at every boundary
    for (let r = 0; r < rows; r++) {
        searchPath(r, 0, pacific);          // Left
        searchPath(r, cols - 1, atlantic);  // Right
    }

    for (let c = 0; c < cols; c++) {
        searchPath(0, c, pacific);          // Top
        searchPath(rows - 1, c, atlantic);  // Bottom
    }

    // Getting final result as intersection of reacheable from both coeans
    let result = [];

    for (key of Object.keys(pacific)) {
        if (atlantic[key]) {
            result.push(atlantic[key]);
        }
    }

    return result;
};
// Time Complexity: O(r * c)
// Space Complexity: O(r * c)



// ----------------------------------- Breadth-First Search, Binary Tree ----------------------------------- //

/**
 * 199. Binary Tree Right Side View
 * https://leetcode.com/problems/binary-tree-right-side-view/description/
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
    if (!root) {
        return [];
    }

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();

            if (i === levelSize - 1) {
                // Rightmost node on every level is visible
                result.push(node.val);
            }

            if (node.left) {
                queue.push(node.left);
            }

            if (node.right) {
                queue.push(node.right);
            }
        }
    }

    return result;
};
// Time Complexity: O(n)
// Space Complexity: O(n)


/**
 * 103. Binary Tree Zigzag Level Order Traversal
 * https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/
 */

// Given the root of a binary tree, return the zigzag level order traversal of its nodes' values.
// (i.e., from left to right, then right to left for the next level and alternate between).
//
// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: [[3],[20,9],[15,7]]
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
var zigzagLevelOrder = function(root) {
    if (!root) {
        return [];
    }

    const result = [];
    const queue = [root];

    // Current tree level, root = 0
    let level = 0;

    while (queue.length > 0) {
        const levelSize = queue.length;
        const nodes = [];

        // Processing node on the current level
        for (let i = 0; i < levelSize; i++) {
            let node = queue.shift();

            if (level % 2 === 0) {
                // Even levels left to right
                nodes.push(node.val);
            }
            else {
                // Odd levels right to left
                nodes.unshift(node.val);
            }

            if (node.left) {
                queue.push(node.left);
            }

            if (node.right) {
                queue.push(node.right);
            }
        }

        // Adding the traversed values to the result
        result.push(nodes);

        level++;
    }

    return result;
};
// Time Complexity: O(n)
// Space Complexity: O(n)


/**
 * 662. Maximum Width of Binary Tree
 */

// Given the root of a binary tree, return the maximum width of the given tree.
// The maximum width of a tree is the maximum width among all levels.
// The width of one level is defined as the length between the end-nodes (the leftmost and rightmost non-null nodes), where the null nodes between the end-nodes that would be present in a complete binary tree extending down to that level are also counted into the length calculation.
// It is guaranteed that the answer will in the range of a 32-bit signed integer.
//
// Example 1:
// Input: root = [1,3,2,5,3,null,9]
// Output: 4
// Explanation: The maximum width exists in the third level with length 4 (5,3,null,9).
// Example 2:
// Input: root = [1,3,2,5,null,null,9,6,null,7]
// Output: 7
// Explanation: The maximum width exists in the fourth level with length 7 (6,null,null,null,null,null,7).
// Example 3:
// Input: root = [1,3,2,5]
// Output: 2
// Explanation: The maximum width exists in the second level with length 2 (3,2).

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
var widthOfBinaryTree = function(root) {
    if (!root) {
        return 0;
    }

    let result = 0;

    // Queue will have node and it's position on the current level
    // Position of the leftmost node on every level is 0
    // Position of the left node = parent position * 2
    // Position of the right node = parent position * 2 + 1
    const queue = [{
        node: root,
        position: 0
    }];

    while (queue.length > 0) {
        let levelSize = queue.length;

        // We can immediately calculate current tree width as we know left-most and right-most non-null nodes
        let leftMost = queue[0].position;
        let rightMost = queue[levelSize - 1].position;

        result = Math.max(result, rightMost - leftMost + 1);

        // But we still need to iterate to continue BFS and calculate further nodes' positions
        for (let i = 0; i < levelSize; i++) {
            let item = queue.shift();

            if (item.node.left) {
                queue.push({
                    node: item.node.left,
                    position: item.position * 2
                });
            }

            if (item.node.right) {
                queue.push({
                    node: item.node.right,
                    position: item.position * 2 + 1
                });
            }

            // To pass LeetCode testcase 106 I had to do a hack for positions calculation, otherwise they becomw Infinity
            // (item.position - leftMost) * 2
            // (item.position - leftMost) * 2 + 1
        }
    }

    return result;
};
// Time Complexity: O(n)
// Space Complexity: O(n)


// ----------------------------------- Breadth-First Search, Matrix ----------------------------------- //

/**
 * 994. Rotting Oranges
 * https://leetcode.com/problems/rotting-oranges/description/
 * https://www.hellointerview.com/learn/code/breadth-first-search/rotting-oranges
 */

// You are given an m x n grid where each cell can have one of three values:
// 0 representing an empty cell,
// 1 representing a fresh orange, or
// 2 representing a rotten orange.
// Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.
// Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.
//
// Example 1:
// Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
// Output: 4
// Example 2:
// Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
// Output: -1
// Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.
// Example 3:
// Input: grid = [[0,2]]
// Output: 0
// Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.

/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function(grid) {
    if (!grid || !grid[0]) {
        return -1;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    const queue = [];

    let freshOranges = 0;

    // We don't need to track visited cells because we will only visit "1"s (fresh oranges)

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // Adding rotten oranges to the queue
            if (grid[r][c] === 2) {
                queue.push([r, c]);
                // We will traverse only "good" oranges, so no need to add these to "visited"
            }
            // Counting good oranges
            else if (grid[r][c] === 1) {
                freshOranges++;
            }
        }
    }

    // up down left right
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    let minutes = 0;

    // This will help us stop at edge conditions also
    while (queue.length > 0 && freshOranges > 0) {
        let levelSize = queue.length;

        minutes++;

        for (let i = 0; i < levelSize; i++) {
            const [row, col] = queue.shift();

            for (const [dr, dc] of directions) {
                const r = row + dr;
                const c = col + dc;

                // Checking for all fresh oranges around and marking them as rotten
                if (r >= 0 && r < rows && c >= 0 && c < cols && grid[r][c] === 1) {
                    grid[r][c] = 2; // Marking the orange as rotten
                    freshOranges--; // Counting

                    queue.push([r, c]); // Adding for next minute
                }
            }
        }
    }

    return (freshOranges === 0) ? minutes : -1;
};
// Time Complexity: O(r * c)
// Space Complexity: O(r * c)


/**
 * 542. 01 Matrix
 * https://leetcode.com/problems/01-matrix/description/
 * https://www.hellointerview.com/learn/code/breadth-first-search/01-matrix
 */

// Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.
// The distance between two cells sharing a common edge is 1.
//
// Example 1:
// Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
// Output: [[0,0,0],[0,1,0],[0,0,0]]
// Example 2:
// Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
// Output: [[0,0,0],[0,1,0],[1,2,1]]

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function(mat) {
    if (!mat || !mat[0]) {
        return [];
    }

    const rows = mat.length;
    const cols = mat[0].length;
    const queue = [];

    let result = [];

    // Initialize the output matrix and find and put all 0 cells to the queue
    for (let r = 0; r < rows; r++) {
        if (!result[r]) {
            result[r] = [];
        }

        for (let c = 0; c < cols; c++) {
            // Distance from 0 to 0 is 0
            if (mat[r][c] === 0) {
                queue.push([r, c]);
                result[r][c] = 0;
            }
            // Otherwise put a marker
            else {
                result[r][c] = -1;
            }
        }
    }

    // up down left right
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    while (queue.length > 0) {
        const [row, col] = queue.shift();

        for ([dr, dc] of directions) {
            const r = row + dr;
            const c = col + dc;

            // For all neighbors with -1 placeholder the distance to nearest 0 is current distance + 1
            if (r >= 0 && r < rows && c >= 0 && c < cols && result[r][c] === -1) {
                result[r][c] = result[row][col] + 1;
                queue.push([r, c]);
            }
        }
    }

    return result;
};
// Time Complexity: O(r * c)
// Space Complexity: O(r * c)


/**
 * 815. Bus Routes
 * https://leetcode.com/problems/bus-routes/description/
 * https://www.hellointerview.com/learn/code/breadth-first-search/bus-routes
 */

// You are given an array routes representing bus routes where routes[i] is a bus route that the ith bus repeats forever.
// For example, if routes[0] = [1, 5, 7], this means that the 0th bus travels in the sequence 1 -> 5 -> 7 -> 1 -> 5 -> 7 -> 1 -> ... forever.
// You will start at the bus stop source (You are not on any bus initially), and you want to go to the bus stop target.
// You can travel between bus stops by buses only.
// Return the least number of buses you must take to travel from source to target. Return -1 if it is not possible.
//
// Example 1:
// Input: routes = [[1,2,7],[3,6,7]], source = 1, target = 6
// Output: 2
// Explanation: The best strategy is take the first bus to the bus stop 7, then take the second bus to the bus stop 6.
// Example 2:
// Input: routes = [[7,12],[4,5,15],[6],[15,19],[9,12,13]], source = 15, target = 12
// Output: -1

/**
 * @param {number[][]} routes
 * @param {number} source
 * @param {number} target
 * @return {number}
 */
var numBusesToDestination = function(routes, source, target) {
    if (!routes || !routes[0]) {
        return -1;
    }

    // Edge condition
    if (source === target) {
        return 0;
    }

    // This will be adjacency graph of stop -> [routes]
    // We'll store routes themselves instead of indexes
    const busStops = {};

    // Initializing the adjacency graph
    for (const route of routes) {
        for (const stop of route) {
            if (!busStops[stop]) {
                busStops[stop] = [];
            }

            busStops[stop].push(route);
        }
    }

    // Edge condition: no source or target stops
    if (!busStops[source] || !busStops[target]) {
        return -1;
    }

    // Start queue - all routes for the source stop
    const queue = [...busStops[source]];

    const visited = new Set();
    visited.add(...queue);

    let busesTaken = 0;

    while (queue.length > 0) {
        busesTaken++;
        let levelSize = queue.length;

        // We need this to properly count buses taken
        for (let i = 0; i < levelSize; i++) {
            let route = queue.shift();

            // Iterating through all stops in the current route
            for (const stop of route) {
                // Found the target!
                if (stop === target) {
                    return busesTaken;
                }
                else {
                    // For each bus stop on the current route
                    // We're adding to the queue other routes going through the same stop
                    for (const nextRoute of busStops[stop]) {
                        if (!visited.has(nextRoute)) {
                            visited.add(nextRoute);
                            queue.push(nextRoute);
                        }
                    }
                }
            }
        }
    }

    return -1;
};
// Time Complexity: O(r * s) where r - number of routes and s - number of stops
// Space Complexity: O(r * s)



// ----------------------------------- DFS + Backtracking ----------------------------------- //


/**
 * 79. Word Search
 * https://leetcode.com/problems/word-search/description/
 * https://www.hellointerview.com/learn/code/backtracking/word-search
 */

// Given an m x n grid of characters board and a string word, return true if word exists in the grid.
// The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.
// The same letter cell may not be used more than once.
//
// Example 1:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// Output: true
// Example 2:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
// Output: true
// Example 3:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
// Output: false

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    if (!board || !board[0]) {
        return false;
    }

    const rows = board.length;
    const cols = board[0].length;

    // down right up left
    const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];

    const searchWord = function(row, col, searchIndex) {
        // If the current letter is the one we're looking for
        if (board[row][col] === word[searchIndex]) {
            // If it's the last letter, we found the word
            if (searchIndex === word.length - 1) {
                return true;
            }

            // Dirty trick: replace found letter with a placeholder to avoid double usage
            // We could also track them in a Set but surprisingly, this works much faster
            const currentLetter = board[row][col];
            board[row][col] = '#';

            for (const [dr, dc] of directions) {
                const r = row + dr;
                const c = col + dc;

                // Recursive depth search
                if (r >= 0 && r < rows && c >= 0 && c < cols &&
                    searchWord(r, c, searchIndex + 1)) {
                    return true;
                }
            }

            // Replace the letter back
            board[row][col] = currentLetter;
        }

        return false;
    }

    // Traverse the board starting search from each letter until found the one
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // We could also check for (board[r][c] === word[0])
            // But it's the first check of the function, not much save
            if (searchWord(r, c, 0)) {
                return true;
            }
        }
    }

    return false;
};
// Time Complexity: O(m * n * 4^L) where m and n are the dimensions of the grid and L is the length of the word.
// We iterate over each cell once (m * n), and for each cell,
// we call the dfs function which makes 4 recursive calls with a max depth of L, giving us O(4^L) per cell.
// Space Complexity: O(L) where L is the length of the word.


/**
 * 22. Generate Parentheses
 * https://leetcode.com/problems/generate-parentheses/description/
 * https://www.hellointerview.com/learn/code/backtracking/generate-parentheses
 */

// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
// Example 1:
// Input: n = 3
// Output: ["((()))","(()())","(())()","()(())","()()()"]
// Example 2:
// Input: n = 1
// Output: ["()"]

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const result = [];
    const stack = [];

    const searchCombinations = function(s, openCount, closeCount) {
        if (s.length < n * 2) {
            if (openCount < n) {
                searchCombinations(s + '(', openCount + 1, closeCount);
            }

            if (closeCount < openCount) {
                searchCombinations(s + ')', openCount, closeCount + 1);
            }
        }
        else {
            result.push(s);
        }
    }

    searchCombinations('', 0, 0);

    return result;
};
// Time Complexity: O(2 * 2^n)
// Space Complexity: O(2 * 2^n)


/**
 * 39. Combination Sum
 * https://leetcode.com/problems/combination-sum/description/
 * https://www.hellointerview.com/learn/code/backtracking/combination-sum
 */

// Given an array of distinct integers candidates and a target integer target,
// return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.
// The same number may be chosen from candidates an unlimited number of times.
// Two combinations are unique if the frequency of at least one of the chosen numbers is different.
// The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.
//
// Example 1:
// Input: candidates = [2,3,6,7], target = 7
// Output: [[2,2,3],[7]]
// Explanation:
// 2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
// 7 is a candidate, and 7 = 7.
// These are the only two combinations.
// Example 2:
// Input: candidates = [2,3,5], target = 8
// Output: [[2,2,2,2],[2,3,3],[3,5]]
// Example 3:
// Input: candidates = [2], target = 1
// Output: []

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    const result = [];

    const searchCombinations = function(path, sum, index) {
        // If we haven't reached the sum
        if (sum < target) {
            for (let i = index; i < candidates.length; i++) {
                // Break off early because all next candidates are larger (pruning)
                if (sum + candidates[i] > target) {
                    return;
                }

                // Add candidate and search deeper, then backtrack
                path.push(candidates[i]);
                searchCombinations(path, sum + candidates[i], i);
                path.pop();
            }
        }
        // If the exact sum is found, save the combination
        else if (sum === target) {
            result.push([...path]);
        }
        // If the sum is larger than target, nothing will happen
        return;
    }

    // Sort candidates to ensure pruning
    candidates.sort((a, b) => a - b);

    searchCombinations([], 0, 0);

    return result;
};
// Time Complexity: O(n^t) where n - number of candidates, t - target
// Space Complexity: O(n^t) where n - number of candidates, t - target

// More precisely
// Time Complexity: O(n^(t / s)) s - smallest candidate


/**
 * 207. Course Schedule
 * https://leetcode.com/problems/course-schedule/
 * https://www.hellointerview.com/learn/code/graphs/course-schedule
 */

// There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1.
// You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
// For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
// Return true if you can finish all courses. Otherwise, return false.
//
// Example 1:
// Input: numCourses = 2, prerequisites = [[1,0]]
// Output: true
// Explanation: There are a total of 2 courses to take.
// To take course 1 you should have finished course 0. So it is possible.
// Example 2:
// Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
// Output: false
// Explanation: There are a total of 2 courses to take.
// To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    if (!prerequisites || !prerequisites.length) {
        return true;
    }

    // Calculate adjacency list and indegrees (Kahn's algorithm)
    const indegrees = new Array(numCourses).fill(0);
    const adjList = {};

    for (const [c1, c2] of prerequisites) {
        // Incoming connections
        indegrees[c2]++;

        // Adjacency list graph representation (node -> [connected to])
        if (!adjList[c1]) {
            adjList[c1] = [];
        }

        adjList[c1].push(c2);
    }

    const queue = [];

    // Enqueing all courses without prerequisites
    for (let course = 0; course < indegrees.length; course++) {
        if (indegrees[course] === 0) {
            queue.push(course);
        }
    }

    // We will calculate the total # of courses reached through prerequisites
    let coursesAccessible = 0;

    while (queue.length > 0) {
        const course = queue.shift();
        coursesAccessible++;

        // Take all next courses
        for (const next of adjList[course] || []) {
            // Decrease the indegrees (# of not covered prerequisites)
            if (--indegrees[next] === 0) {
                // If no prerequisites left, push to queue
                queue.push(next);
            }
        }
    }

    // We are good if we have covered all courses
    return (coursesAccessible === numCourses);
};
// Time Complexity: O(V + E) where V is the number of courses and E is the number of prerequisites. We visit each node and edge once.
// Space Complexity: O(V + E)


/**
 * 210. Course Schedule II
 * https://leetcode.com/problems/course-schedule-ii/description/
 * https://www.hellointerview.com/learn/code/graphs/course-schedule-ii
 */

// There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1.
// You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
// For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
// Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them.
// If it is impossible to finish all courses, return an empty array.
//
// Example 1:
// Input: numCourses = 2, prerequisites = [[1,0]]
// Output: [0,1]
// Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].
// Example 2:
// Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
// Output: [0,2,1,3]
// Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
// So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].
// Example 3:
// Input: numCourses = 1, prerequisites = []
// Output: [0]

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
    if (!prerequisites) {
        return [];
    }

    // This task requires us to do a topological sort of the graph

    const adjList = {};
    const indegrees = new Array(numCourses).fill(0);
    const queue = [];

    // Calculating adjacency list and indegrees (for Kahn's algorithm)
    for (const [c1, c2] of prerequisites) {
        indegrees[c1]++;

        if (!adjList[c2]) {
            adjList[c2] = [];
        }

        adjList[c2].push(c1);
    }

    // All nodes without any incoming edges == courses without pre-requisites
    for (let i = 0; i < indegrees.length; i++) {
        if (indegrees[i] === 0) {
            queue.push(i);
        }
    }

    const result = [];

    while (queue.length > 0) {
        const course = queue.shift();

        // Decrease the indegrees of next courses
        // If 0, we have filled all pre-requisites and can take this course
        for (const next of adjList[course] || []) {
            if (--indegrees[next] === 0) {
                queue.push(next);
            }
        }

        result.push(course);
    }

    // If all courses are in the result, we have the correct order of the courses
    return (result.length === numCourses) ? result : [];
};
// Time Complexity: O(V + E) where V is the number of courses and E is the number of prerequisites. We visit each node and edge once.
// Space Complexity: O(V + E)



// ----------------------------------- Dynamic Programming ----------------------------------- //



/**
 * 70. Climbing Stairs
 * https://leetcode.com/problems/climbing-stairs/description/
 * https://www.hellointerview.com/learn/code/dynamic-programming/fundamentals
 */

// You are climbing a staircase. It takes n steps to reach the top.
// Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
//
// Example 1:
// Input: n = 2
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps
// Example 2:
// Input: n = 3
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    const cache = [1, 1, 2];

    // Recursive Fibonacci calculation with cache
    const climb = function(steps) {
        if (cache.length > steps) {
            return cache[steps];
        }

        const result = climb(steps - 2) + climb(steps - 1);
        cache.push(result);

        return result;
    }

    return climb(n);
};
// Time Complexity: O(n)
// Space Complexity: O(n)


/**
 * 198. House Robber
 * https://leetcode.com/problems/house-robber/description/
 * https://www.hellointerview.com/learn/code/dynamic-programming/solving-a-question-with-dp
 */

// You are a professional robber planning to rob houses along a street.
// Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent
// houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.
// Given an integer array nums representing the amount of money of each house,
// return the maximum amount of money you can rob tonight without alerting the police.
//
// Example 1:
// Input: nums = [1,2,3,1]
// Output: 4
// Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
// Total amount you can rob = 1 + 3 = 4.
// Example 2:
// Input: nums = [2,7,9,3,1]
// Output: 12
// Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
// Total amount you can rob = 2 + 9 + 1 = 12.

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    // Decision for each house may be
    // 1. Skip it and prioritize robbing previous house (and all houses we robbed with it)
    // 2. Rob it. In this case we need to skip previous house (and all houses we robbed with it)
    let previous = 0;
    let current = nums[0];

    for (let i = 1; i < nums.length; i++) {
        const take = previous + nums[i];    // Rob this one
        const skip = current;               // Skip, previous take is better

        previous = current;                 // Save last value
        current = Math.max(take, skip);     // Decide what's better for the house in question
    }

    return current;
};
// Time Complexity: O(n)
// Space Complexity: O(1)


/**
 * 338. Counting Bits
 * // https://leetcode.com/problems/counting-bits/description/
 * // https://www.hellointerview.com/learn/code/dynamic-programming/counting-bits
 */

// Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.
// Example 1:
// Input: n = 2
// Output: [0,1,1]

// Example 2:
// Input: n = 5
// Output: [0,1,1,2,1,2]

// 0  --> 00000     > 0
// 1  --> 00001     > 1
// 2  --> 00010     > 1
// 3  --> 00011     > 2
// 4  --> 00100     > 1
// 5  --> 00101     > 2
// 6  --> 00110     > 2
// 7  --> 00111     > 3
// 8  --> 01000     > 1
// 9  --> 01001     > 2
// 10 --> 01010     > 2
// 11 --> 01011     > 3
// 12 --> 01100     > 2
// 13 --> 01101     > 3
// 14 --> 01110     > 3
// 15 --> 01111     > 4
// 16 --> 10000     > 1

/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {
    const result = new Array(n + 1).fill(0);

    // When we multiply any number by 2 in bin representation, we add 0 to it
    // Therefore, even X will have the same amount of 1s as X / 2
    // Next number will have an extra odd bit at the end (+1)

    // 2 => 0010; 4 => 0100, same as count[2]
    // 2 => 0010; 5 => 0101, same as count[2] + 1 (odd bit)
    // 5 => 0101, 10 => 01010, same as count[5]

    // Solution
    for (let i = 1; i <= n; i++) {
        result[i] =
            result[Math.floor(i / 2)] + // Same as X / 2
            (i % 2);                    // +1 if odd
    }

    return result;
};

// Brute-force approach: emulate bits in an array

/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {
    const bits = [0]; // This is a reversed representation, e.g. 1101 => [1, 0, 1, 1]
    const result = [0];

    let countOnes = 0;

    for (let i = 1; i <= n; i++) {
        // Odd value: change 0 to 1 at the end
        if (i % 2 === 1) {
            bits[0] = 1;
            countOnes++;
        }
        // Even value: add 1
        else {
            // Collapse all 1s at the beginning to 0
            bitIndex = 0;
            while (bits[bitIndex] === 1) {
                bits[bitIndex] = 0;
                countOnes--;
                bitIndex++;
            }

            // Place 1 to the fist 0 slot
            bits[bitIndex] = 1;
            countOnes++;
        }

        result.push(countOnes);
    }

    return result;
};
// Time Complexity: O(n log n)
// Space Complexity: O(n)

/**
 * 91. Decode Ways
 * https://leetcode.com/problems/decode-ways/description/
 * https://www.hellointerview.com/learn/code/dynamic-programming/decode-ways
 */

// You have intercepted a secret message encoded as a string of numbers. The message is decoded via the following mapping:
// "1" -> 'A'
// "2" -> 'B'
// ...
// "25" -> 'Y'
// "26" -> 'Z'
// However, while decoding the message, you realize that there are many different ways you can decode the message
// because some codes are contained in other codes ("2" and "5" vs "25").
// For example, "11106" can be decoded into:
// "AAJF" with the grouping (1, 1, 10, 6)
// "KJF" with the grouping (11, 10, 6)
// The grouping (1, 11, 06) is invalid because "06" is not a valid code (only "6" is valid).
// Note: there may be strings that are impossible to decode.
// Given a string s containing only digits, return the number of ways to decode it. If the entire string cannot be decoded in any valid way, return 0.
// The test cases are generated so that the answer fits in a 32-bit integer.
// Example 1:
// Input: s = "12"
// Output: 2
// Explanation:
// "12" could be decoded as "AB" (1 2) or "L" (12).
//
// Example 2:
// Input: s = "226"
// Output: 3
// Explanation:
// "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).
//
// Example 3:
// Input: s = "06"
// Output: 0
// Explanation:
// "06" cannot be mapped to "F" because of the leading zero ("6" is different from "06"). In this case, the string is not a valid encoding, so return 0.

/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
    // If start with '0', no ways to decode
    if (!s || s[0] === '0') {
        return 0;
    }

    // First 1: Empty sting - 1 way to decode
    // Second 1: 1-9 digit - 1 way to decode
    let result = [1, 1];

    let previousDigit = parseInt(s[0]);

    // If our alphabet could decode 0-99, we would need to calculate Fibonacci(n)
    // Since we decode 1-26, we need to skip some
    // This logic is basically Fibonacci with conditions
    for (let i = 1; i < s.length; i++) {
        const currentDigit = parseInt(s[i]);
        let current = 0;

        // Non-zero digit means the ways to decode this substring i === ways to decode previous substring i-1
        if (currentDigit != 0) {
            current += result[i];
        }

        // This way is easier than checking all conditions for 2 digits separately
        const doubleDigits = previousDigit * 10 + currentDigit;

        if (doubleDigits >= 10 && doubleDigits <= 26) {
            // Having a valid pair means we have additional substring i-2 ways to decode this substring
            current += result[i - 1];
        }

        previousDigit = currentDigit;

        result.push(current);
    }

    return result[result.length - 1];
};
// Time Complexity: O(n)
// Space Complexity: O(n)


/**
 * 221. Maximal Square
 * https://leetcode.com/problems/maximal-square/description/
 * https://www.hellointerview.com/learn/code/dynamic-programming/maximal-square
 */

// Given an m x n binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.
// Example 1:
// Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
// Output: 4
// Example 2:
// Input: matrix = [["0","1"],["1","0"]]
// Output: 1
// Example 3:
// Input: matrix = [["0"]]
// Output: 0

/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function(matrix) {
    if (!matrix || !matrix.length) {
        return 0;
    }

    // This matrix will be the same size r x c
    // sizes[r][c] is the max size of the side of the square of 1s ending at this point
    let sizes = [];
    let maxSide = 0;

    // Traversing the matrix
    for (let r = 0; r < matrix.length; r++) {
        if (!sizes[r]) {
            sizes[r] = [];
        }

        for (let c = 0; c < matrix[0].length; c++) {
            // Size of the side of this square is at least 1
            // If top, left, and top-left are also non-zero, they mark ends of other squares
            if (matrix[r][c] === "1") {
                const top = (r > 0) ? sizes[r - 1][c] : 0;
                const left = (c > 0) ? sizes[r][c - 1] : 0;
                const topleft = (r > 0 && c > 0) ? sizes[r - 1][c - 1] : 0;

                // In this case size of the square side is the min value of the neighbors + 1
                sizes[r][c] = Math.min(top, left, topleft) + 1;
                maxSide = Math.max(maxSide, sizes[r][c]);
            }
            else {
                sizes[r][c] = 0;
            }
        }
    }

    return maxSide * maxSide;
};
// Time Complexity: O(r * c)
// Space Complexity: O(r * c)


/**
 * 62. Unique Paths
 * https://leetcode.com/problems/unique-paths/description/
 * https://www.hellointerview.com/learn/code/dynamic-programming/unique-paths
 */

// There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]).
// The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.
// Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.
// The test cases are generated so that the answer will be less than or equal to 2 * 109.
//
// Example 1:
// Input: m = 3, n = 7
// Output: 28
// Example 2:
// Input: m = 3, n = 2
// Output: 3
// Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
// 1. Right -> Down -> Down
// 2. Down -> Down -> Right
// 3. Down -> Right -> Down

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    const paths = []; // Matrix shows number of unique paths to each cell

    // Base case: 1 path to each left-most cell
    for (let i = 0; i < m; i++) {
        paths[i] = Array(n).fill(0);
        paths[i][0] = 1;
    }

    // Base case: 1 path to each top cell
    for (let j = 1; j < n; j++) {
        paths[0][j] = 1;
    }

    // Traversing the remaining matrix
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            // Unique paths to this cell = paths to top cell + paths to left cell
            paths[i][j] = paths[i - 1][j] + paths[i][j - 1];
        }
    }

    return paths[m - 1][n - 1];
};
// Time Complexity: O(r * c)
// Space Complexity: O(r * c)


/**
 * 300. Longest Increasing Subsequence
 * https://leetcode.com/problems/longest-increasing-subsequence/description/
 * https://www.hellointerview.com/learn/code/dynamic-programming/longest-increasing-subsequence
 */

// Given an integer array nums, return the length of the longest strictly increasing subsequence.
//
// Example 1:
// Input: nums = [10,9,2,5,3,7,101,18]
// Output: 4
// Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
// Example 2:
// Input: nums = [0,1,0,3,2,3]
// Output: 4
// Example 3:
// Input: nums = [7,7,7,7,7,7,7]
// Output: 1

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    // Min LIS is 1 (self)
    let lengths = Array(nums.length).fill(1);

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            // For the next number we're looking back at each number less than this
            // Current number increases the longest LIS by 1
            if (nums[i] > nums[j]) {
                lengths[i] = Math.max(lengths[i], lengths[j] + 1);
            }
        }
    }

    return Math.max(...lengths);
};

// Time Complexity: O(n^2)
// Space Complexity: O(n)


// O(n log n) “Patience Sorting” approach (tails + binary search)
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    const tails = [];  // tails[k] = smallest tail of an increasing subseq of length k+1

    for (const x of nums) {
        // find insertion point via binary search
        let lo = 0;
        let hi = tails.length - 1;

        while (lo <= hi) {
            const mid = (lo + hi) >>> 1;
            if (tails[mid] < x) {
                lo = mid + 1;
            }
            else {
                hi = mid - 1;
            }
        }

        // lo is first index with tails[lo] >= x, or tails.length if none
        if (lo === tails.length) {
            tails.push(x);
        } else {
            tails[lo] = x;
        }
    }

    return tails.length;
};
// Time Complexity: O(n log n)
// Space Complexity: O(n)

/**
 * 139. Word Break
 * https://leetcode.com/problems/word-break/description/
 * https://www.hellointerview.com/learn/code/dynamic-programming/word-break
 */

// Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.
// Note that the same word in the dictionary may be reused multiple times in the segmentation.
//
// Example 1:
// Input: s = "leetcode", wordDict = ["leet","code"]
// Output: true
// Explanation: Return true because "leetcode" can be segmented as "leet code".
// Example 2:
// Input: s = "applepenapple", wordDict = ["apple","pen"]
// Output: true
// Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
// Note that you are allowed to reuse a dictionary word.
// Example 3:
// Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
// Output: false

// Ideal solution: check dictionary against substrings
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    // A marker at i means that a substring of length i is a word
    // Or that a substring between any previous true marker and i is a word
    const wordMarkers = Array(s.length + 1).fill(false);
    // String of length 0 is a valid sequence
    wordMarkers[0] = true;

    // We traverse the string with 2 pointers. Right pointer is excluded from substring
    for (let right = 1; right <= s.length; right++) {
        // Checking each word in the dictionary
        for (const word of wordDict) {
            // If it fits in and checks out, mark the position
            if (right >= word.length && wordMarkers[right - word.length]) {
                const substr = s.substring(right - word.length, right);
                if (substr === word) {
                    wordMarkers[right] = true;
                }
            }
        }
    }

    return wordMarkers[s.length];
};
// Time Complexity: O(n * m) where n is the length of the input string and m is the length of wordDict
// Space Complexity: O(n)

// Less ideal solution: check substrings against dictionary
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    // Set will give O(1) lookup
    const wordSet = new Set(wordDict);
    // A marker at i means that a substring of length i is a word
    // Or that a substring between any previous true marker and i is a word
    const wordMarkers = Array(s.length + 1).fill(false);
    // String of length 0 is a valid sequence
    wordMarkers[0] = true;

    // We traverse the string with 2 pointers. Right pointer is excluded from substring
    for (let right = 1; right <= s.length; right++) {
        // Left pointer will start at 0 and we will be checking if [left; right) is a word
        for (let left = 0; left < right; left++) {
            // If left is on a marker (end of the previous word) and a word exists in the dict -> success
            if (wordMarkers[left] && wordSet.has(s.substring(left, right))) {
                wordMarkers[right] = true;
                break;
            }
        }
    }

    return wordMarkers[s.length];
};
// Time Complexity: O(n^2)
// Space Complexity: O(n)


/**
 * 1235. Maximum Profit in Job Scheduling
 * https://leetcode.com/problems/maximum-profit-in-job-scheduling/description/
 * https://www.hellointerview.com/learn/code/dynamic-programming/maximum-profit-in-job-scheduling
 */

// We have n jobs, where every job is scheduled to be done from startTime[i] to endTime[i], obtaining a profit of profit[i].
// You're given the startTime, endTime and profit arrays,
// return the maximum profit you can take such that there are no two jobs in the subset with overlapping time range.
// If you choose a job that ends at time X you will be able to start another job that starts at time X.
//
// Example 1:
// Input: startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]
// Output: 120
// Explanation: The subset chosen is the first and fourth job.
// Time range [1-3]+[3-6] , we get profit of 120 = 50 + 70.
// Example 2:
// Input: startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit = [20,20,100,70,60]
// Output: 150
// Explanation: The subset chosen is the first, fourth and fifth job.
// Profit obtained 150 = 20 + 70 + 60.
// Example 3:
// Input: startTime = [1,1,1], endTime = [2,3,4], profit = [5,6,4]
// Output: 6

/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number[]} profit
 * @return {number}
 */
var jobScheduling = function(startTime, endTime, profit) {
    // Binary search of the right-most insert index for target in sorted array
    const bisectRight = function(array, target) {
        let left = 0;
        let right = array.length;
        while (left < right) {
            const mid = (left + right) >>> 1;
            if (array[mid] <= target) {
                left = mid + 1;
            }
            else {
                right = mid;
            }
        }

        return left;
    }

    // Get jobs sorted by end time
    // We could do a sort index instead but this reads better
    const jobs = startTime.map((v, i) => ({
        start: v,
        end: endTime[i],
        profit: profit[i]
    }))
        .sort((a, b) => {return a.end - b.end});

    // We will need this for bisect
    const endTimeSorted = jobs.map((v, i) => v.end);

    // i-th value means max profit after starting (or skipping) jobs up to i
    const maxProfits = Array(jobs.length + 1).fill(0);

    for (let i = 1; i < maxProfits.length; i++) {
        const job = jobs[i - 1];

        // This is the number of jobs that have finished before start of this one
        const finishedJobs = bisectRight(endTimeSorted, job.start);
        // We calculate what's more profitable: skipping the job vs taking it and all possible before
        maxProfits[i] = Math.max(maxProfits[i - 1], job.profit + maxProfits[finishedJobs]);
    }

    return maxProfits[maxProfits.length - 1];
};
// Time Complexity: O(n log n)
// Space Complexity: O(n)




// ----------------------------------- Greedy Algorithms ----------------------------------- //


/**
 * 455. Assign Cookies
 * https://leetcode.com/problems/assign-cookies/description/
 * https://www.hellointerview.com/learn/code/greedy/overview
 */

// Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie.
// Each child i has a greed factor g[i], which is the minimum size of a cookie that the child will be content with;
// and each cookie j has a size s[j]. If s[j] >= g[i], we can assign the cookie j to the child i, and the child i will be content.
// Your goal is to maximize the number of your content children and output the maximum number.
//
// Example 1:
// Input: g = [1,2,3], s = [1,1]
// Output: 1
// Explanation: You have 3 children and 2 cookies. The greed factors of 3 children are 1, 2, 3.
// And even though you have 2 cookies, since their size is both 1, you could only make the child whose greed factor is 1 content.
// You need to output 1.
// Example 2:
// Input: g = [1,2], s = [1,2,3]
// Output: 2
// Explanation: You have 2 children and 3 cookies. The greed factors of 2 children are 1, 2.
// You have 3 cookies and their sizes are big enough to gratify all of the children,
// You need to output 2.

/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
    g.sort((a, b) => (a - b));
    s.sort((a, b) => (a - b));

    // Indexes of both arrays
    let gi = 0;
    let si = 0;

    // Traversing both arrays simultaneously
    while (gi < g.length && si < s.length) {
        // If the smallest value can satisfy minimal greed, we grant it
        if (s[si] >= g[gi]) {
            gi++;
            si++;
        }
        // Otherwise get next value
        else {
            si++;
        }
    }

    return gi;
};
// Time Complexity: O(n log n + m log m) where n is the number of children and m is the number of cookies
// Space Complexity: O(1)


/**
 * 121. Best Time to Buy and Sell Stock
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/
 * https://www.hellointerview.com/learn/code/greedy/best-time-to-buy-and-sell-stock
 */

// You are given an array prices where prices[i] is the price of a given stock on the ith day.
// You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
// Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
//
// Example 1:
// Input: prices = [7,1,5,3,6,4]
// Output: 5
// Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
// Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
// Example 2:
// Input: prices = [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transactions are done and the max profit = 0.

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if (!prices || prices.length < 2) {
        return 0;
    }

    let min = prices[0];
    let result = 0;

    // Checking each price, remembering min
    // Calculating profit and remembering max
    for (const price of prices) {
        min = Math.min(min, price)
        result = Math.max(result, price - min);
    }

    return result;
};
// Time Complexity: O(n)
// Space Complexity: O(1)


/**
 * 134. Gas Station
 * https://leetcode.com/problems/gas-station/description/
 * https://www.hellointerview.com/learn/code/greedy/gas-station
 */

// There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i].
// You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station.
// You begin the journey with an empty tank at one of the gas stations.
// Given two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction,
// otherwise return -1. If there exists a solution, it is guaranteed to be unique.
//
// Example 1:
// Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
// Output: 3
// Explanation:
// Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
// Travel to station 4. Your tank = 4 - 1 + 5 = 8
// Travel to station 0. Your tank = 8 - 2 + 1 = 7
// Travel to station 1. Your tank = 7 - 3 + 2 = 6
// Travel to station 2. Your tank = 6 - 4 + 3 = 5
// Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.
// Therefore, return 3 as the starting index.
// Example 2:
// Input: gas = [2,3,4], cost = [3,4,3]
// Output: -1
// Explanation:
// You can't start at station 0 or 1, as there is not enough gas to travel to the next station.
// Let's start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
// Travel to station 0. Your tank = 4 - 3 + 2 = 3
// Travel to station 1. Your tank = 3 - 3 + 3 = 3
// You cannot travel back to station 2, as it requires 4 unit of gas but you only have 3.
// Therefore, you can't travel around the circuit once no matter where you start.

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
    let totalGas = 0;
    let totalCost = 0;
    let start = 0;
    let tank = 0;

    for (let i = 0; i < gas.length; i++) {
        // Calculating total gas and cost
        // If totalGas >= totalCost, there is a guaranteed solution
        totalGas += gas[i];
        totalCost += cost[i];

        // Update tank
        tank += gas[i] - cost[i];

        // If can't reach next station, reset tank and start from next station
        if (tank < 0) {
            start = i + 1;
            tank = 0;
        }
    }

    return (totalGas >= totalCost) ? start : -1;
};
// Time Complexity: O(n)
// Space Complexity: O(1)


/**
 * 55. Jump Game
 * https://leetcode.com/problems/jump-game/description/
 * https://www.hellointerview.com/learn/code/greedy/jump-game
 */

// You are given an integer array nums. You are initially positioned at the array's first index,
// and each element in the array represents your maximum jump length at that position.
// Return true if you can reach the last index, or false otherwise.
//
// Example 1:
// Input: nums = [2,3,1,1,4]
// Output: true
// Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
// Example 2:
// Input: nums = [3,2,1,0,4]
// Output: false
// Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    let maxJump = 0;

    for (let i = 0; i < nums.length - 1; i++) {
        // Previous jump might allow us to jump further than the current one
        maxJump = Math.max(maxJump, nums[i]);

        // No jump, no game
        if (maxJump <= 0) {
            return false;
        }

        // Decrease maxJump allowance for the next cell
        maxJump--;
    }

    return true;
};
// Time Complexity: O(n)
// Space Complexity: O(1)




// ----------------------------------- Prefix Sum ----------------------------------- //



/**
 * 560. Subarray Sum Equals K
 * https://leetcode.com/problems/subarray-sum-equals-k/description/
 * https://www.hellointerview.com/learn/code/prefix-sum/subarray-sum-equals-k
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    const prefixSum = Array(nums.length + 1).fill(0);
    const sumCounts = {
        0: 1
    };

    let result = 0;

    for (let i = 0; i < nums.length; i++) {
        const sum = prefixSum[i] + nums[i];
        prefixSum[i + 1] = sum;

        // Solution 1
        // This will do the job in O(n^2) time
        // for (let left = 0; left <= i; left++) {
        //     if (sum - prefixSum[left] === k) {
        //         result++;
        //     }
        // }

        // Solution 2
        // This will do the job in O(n) time
        // Prefix Sum formula states that to calculate arraySum of subarray [i, j] we can do arraySum = prefixSum[i + 1] - prefixSum[j]
        // Therefore prefixSum[j] = prefixSum[i + 1] - arraySum
        // We know that arraySum == k (our target) and have just calculated prefixSum[i + 1]
        // We need to find all prefixSum[j] that satisfy the condition prefixSum[j] == prefixSum[i + 1] - arraySum
        result += sumCounts[sum - k] || 0;

        // Then we add out current sum to the counts array
        sumCounts[sum] = (sumCounts[sum] || 0) + 1;

        // In this solution we don't really need prefixSum array, we just need the current array sum but I left it here for explicitness (and for solution 1)
    }

    return result;
};
// Time Complexity: O(n)
// Space Complexity: O(n)


// ----------------------------------- Matrices ----------------------------------- //


/**
 * 54. Spiral Matrix
 * https://leetcode.com/problems/spiral-matrix/description/
 * https://www.hellointerview.com/learn/code/matrices/spiral-matrix
 */

// Given an m x n matrix, return all elements of the matrix in spiral order.
// Example 1:
// Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
// Output: [1,2,3,6,9,8,7,4,5]
// Example 2:
// Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
// Output: [1,2,3,4,8,12,11,10,9,5,6,7]

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    if (!matrix || !matrix[0]) {
        return [];
    }

    // right down left up
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    const rows = matrix.length;
    const cols = matrix[0].length;

    let row = 0;        // Current row
    let col = 0;        // Current column
    let direction = 0;  // Current direction
    let rowsParsed = 0; // Full rows parsed
    let colsParsed = 0; // Full columns parsed
    let segment = cols; // How many items to add before direction change

    const result = [];

    for (i = 0; i < rows * cols; i++) {
        result[i] = matrix[row][col];   // Adding current item
        segment--;  // Decreasing count

        // Need to change direction
        if (segment === 0) {
            if (direction % 2 === 0) {
                rowsParsed++;   // Horizontal direction - full row parsed
            }
            else {
                colsParsed++;   // Vertical direction - full column parsed
            }

            // Change direction (90 degreees clockwise)
            direction = (direction === 3) ? 0 : direction + 1;

            // New segment length
            segment = (direction % 2 === 0) ? cols - colsParsed : rows - rowsParsed;
        }

        // Move pointers
        row += directions[direction][0];
        col += directions[direction][1];
    }

    return result;
};
// Time Complexity: O(r * c)
// Space Complexity: O(r * c)



// Alternative solution
function spiralOrder(matrix) {
    let result = [];
    while (matrix.length > 0) {
        // Top row: ingest as is
        result = result.concat(matrix.shift());

        // Right column: trim right-most values
        if (matrix.length > 0 && matrix[0].length > 0) {
            for (let row of matrix) {
                result.push(row.pop());
            }
        }

        // Bottom row: ingest reversed
        if (matrix.length > 0) {
            result = result.concat(matrix.pop().reverse());
        }

        // Left column: trim left-most values
        if (matrix.length > 0 && matrix[0].length > 0) {
            for (let i = matrix.length - 1; i >= 0; i--) {
                result.push(matrix[i].shift());
            }
        }
    }
    return result;
}
// Time Complexity: O(r * c)
// Space Complexity: O(r * c)


/**
 * 48. Rotate Image
 * https://leetcode.com/problems/rotate-image/description/
 * https://www.hellointerview.com/learn/code/matrices/rotate-image
 */

// You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).
// You have to rotate the image in-place, which means you have to modify the input 2D matrix directly.
// DO NOT allocate another 2D matrix and do the rotation.
//
// Example 1:
// Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
// Output: [[7,4,1],[8,5,2],[9,6,3]]
// Example 2:
// Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
// Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

// Easy solution: transpose matrix + reverse rows

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    if (!matrix || matrix.length <= 1) {
        return;
    }

    const size = matrix.length;

    // Transpose matrix
    for (let i = 0; i < size; i++) {
        for (let j = i; j < size; j++) {
            [ matrix[i][j], matrix[j][i] ] = [ matrix[j][i], matrix[i][j] ];
        }
    }

    // Reverse each row
    for (let i = 0; i < size; i++) {
        matrix[i].reverse();
    }
};
// Time Complexity: O(n^2) (matrix is n x n)
// Space Complexity: O(1)


// Creative solution: take all items from lower left quarter and swap them counter-clock-wise 3 times
// This way for each item we will have 4 elements rotated once clock-wise

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    if (!matrix || matrix.length <= 1) {
        return;
    }

    const size = matrix.length;

    // Midpoint = floor of size / 2
    const mid = (size >>> 1);

    // We will start at lower left quarter items
    // If size is odd, don't include middle items (they'll be swap targets)
    for (let i = mid; i < size; i++) {
        for (let j = 0; j < mid; j++) {
            // Set starting point
            let row = i;
            let col = j;

            // Do exactly 3 swaps counter-clock-wise
            for (let k = 0; k < 3; k++) {
                // Set swap target
                let rowTarget = (size - 1) - col;
                let colTarget = row;

                // Swap items in place
                [ matrix[row][col], matrix[rowTarget][colTarget] ] = [ matrix[rowTarget][colTarget], matrix[row][col] ];

                // Swapping same item in new position with next one
                row = rowTarget;
                col = colTarget;
            }
        }
    }
};
// Time Complexity: O(n^2) (matrix is n x n)
// Space Complexity: O(1)


/**
 * 73. Set Matrix Zeroes
 * https://leetcode.com/problems/set-matrix-zeroes/description/
 * https://www.hellointerview.com/learn/code/matrices/set-matrix-zeroes
 */

// Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.
// You must do it in place.
//
// Example 1:
// Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
// Output: [[1,0,1],[0,0,0],[1,0,1]]
// Example 2:
// Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
// Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    if (!matrix || !matrix.length) {
        return;
    }

    const rows = matrix.length;
    const cols = matrix[0].length;

    const rowsToFill = [];
    const colsToFill = [];

    // Remember which rows and columns to fill with zeroes
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (matrix[r][c] === 0) {
                rowsToFill.push(r);
                colsToFill.push(c);
            }
        }
    }

    // For each remembered row and column - traverse and fill
    for (const r of rowsToFill) {
        for (let c = 0; c < cols; c++) {
            matrix[r][c] = 0;
        }
    }

    for (const c of colsToFill) {
        for (let r = 0; r < rows; r++) {
            matrix[r][c] = 0;
        }
    }

    // If we want O(1) space then we can use first row and first column as marker space
    // First, we need to check whether they need to be filled with 0s too and remember
    // Second, traverse the rest of the matrix and mark 0s in first row and column
    // Finally, if first row and/or column need to be filled with 0s, fill them too
};
// Time Complexity: O(r * c)
// Space Complexity: O(r * c)


