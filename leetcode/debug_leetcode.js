import { Heap } from "../utils/helpers.js"

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    if (!nums || (k > nums.length)) {
        return null;
    }

    let candidates = new Heap();
    candidates.heapify(nums.slice(0, k));

    for (let i = k; i < nums.length; i++) {
        if (nums[i] > candidates.peek()) {
            candidates.pop()
            candidates.push(nums[i]);
        }
    }

    return candidates.peek();
};

const executionStart = Date.now();

//----------------------------------------------------------

const nums = [3,2,3,1,2,4,5,5,6], k = 4

const result = findKthLargest(nums, k);
console.log(result);

//----------------------------------------------------------

const executionEnd = Date.now();
console.log(`Execution Time: ${(executionEnd - executionStart)} ms`);
