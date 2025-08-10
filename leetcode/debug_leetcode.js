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
    let queue = [root.left, root.right];

    while (queue.length > 0) {
        const levelLength = queue.length;

        if (levelLength % 2 === 1) {
            return false;
        }

        for (let i = 0; i < levelLength; i++) {
            const left = queue.shift();

            if (i < levelLength / 2) {
                const right = queue[levelLength - 1 - (i + 1) * 2];

                if (left && right && left.val !== right.val || (left && !right) || (!left && right)) {
                    return false;
                }
            }

            if (left) {
                queue.push(left.left);
                queue.push(left.right);
            }
        }
    }

    return true;
};


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


const executionStart = Date.now();

//----------------------------------------------------------

const root = [2,3,3,4,5,5,4,null,null,8,9,9,8]

const result = isSymmetric(arrayToTree(root));
console.log(result);

//----------------------------------------------------------

const executionEnd = Date.now();
console.log(`Execution Time: ${(executionEnd - executionStart)} ms`);
