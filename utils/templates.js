/**
 * Sliding Window - Variable Length
 */
function variableLengthSlidingWindow(nums) {
    let state = {}; // choose appropriate data structure
    let start = 0;
    let max_ = 0;

    for (let end = 0; end < nums.length; end++) {
        // extend window
        // add nums[end] to state in O(1) in time

        while (/* state is not valid */) {
            // repeatedly contract window until it is valid again
            // remove nums[start] from state in O(1) in time
            start++;
        }

        // INVARIANT: state of current window is valid here.
        max_ = Math.max(max_, end - start + 1);
    }

    return max_;
}

/**
 * Sliding Window - Fixed Length
 */
function fixedLengthSlidingWindow(nums, k) {
    let state = // choose appropriate data structure
    let start = 0;
    let max = 0;

    for (let end = 0; end < nums.length; end++) {
        // extend window
        // add nums[end] to state in O(1) time

        if (end - start + 1 === k) {
            // INVARIANT: size of the window is k here.
            max = Math.max(max, contents of state);

            // contract window
            // remove nums[start] from state in O(1) time
            start++;
        }
    }

    return max;
}

/**
 * Depth-first Search (DFS) on a binary tree
 */

function dfs(node) {
    // base case
    if (node === null) {
        return "some value";
    }

    // ...

    const left = dfs(node.left);
    const right = dfs(node.right);
    return "value based on left and right";
}

/**
 * Depth-first Search (DFS) on a graph (adjacency list)
 */

function dfs(adjList) {
    if (!adjList || Object.keys(adjList).length === 0) {
        return;
    }
    const visited = new Set();

    function dfsHelper(node) {
        if (visited.has(node)) {
            return;
        }

        visited.add(node);
        for (const neighbor of adjList[node] || []) {
            dfsHelper(neighbor);
        }
        return;
    }

    // Handle disconnected components
    for (const node in adjList) {
        if (!visited.has(parseInt(node))) {
            dfsHelper(parseInt(node));
        }
    }
}

/**
 * Constructing Adjacency List from Edges
 */

function buildAdjList(n, edges) {
    const adjList = {};

    for (let i = 0; i < n; i++) {
        adjList[i] = [];
    }

    for (const [u, v] of edges) {
        adjList[u].push(v);
        adjList[v].push(u);
    }

    return adjList;
}


/**
 * Depth-first Search (DFS) on a graph (matrix)
 */

const matrix = [
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0]
];
function dfs(matrix) {
    const visited = new Set();
    // up, down, left, right
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    function dfsHelper(r, c) {
        const key = `${r},${c}`;
        if (visited.has(key)) {
            return;
        }

        // check if the cell is out of bounds
        if (r < 0 || r >= matrix.length || c < 0 || c >= matrix[0].length) {
            return;
        }

        visited.add(key);
        for (const [dr, dc] of directions) {
            dfsHelper(r + dr, c + dc);
        }
        return;
    }

    dfsHelper(0, 0);
}

/**
 * Breadth-first Search (BFS) on a binary tree
 */

function bfs(root) {
    if (!root) {
        return [];
    }

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const currNode = queue.shift();

        // Task-specific logic here
        result.push(currNode.val);

        // Adding children to queue
        if (currNode.left) {
            queue.push(currNode.left);
        }
        if (currNode.right) {
            queue.push(currNode.right);
        }
    }

    return result;
}

/**
 * Breadth-first Search (BFS) on a binary tree - level by level
 */

function levelOrder(root) {
    if (!root) {
        return [];
    }

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        // number of nodes at the current level
        const levelSize = queue.length;
        const currentLevelResult = [];

        // Current level loop
        for (let i = 0; i < levelSize; i++) {
            const curr = queue.shift();

            // Task-specific logic here
            currentLevelResult.push(curr.val);

            // Adding children to queue
            if (curr.left) {
                queue.push(curr.left);
            }
            if (curr.right) {
                queue.push(curr.right);
            }
        }

        // IMPORTANT
        // we have finished processing all nodes at the current level
        result.push(currentLevelResult);
    }

    return result;
}

/**
 * Breadth-first Search (BFS) on a graph (Adjacency List) - level by level
 */

function bfsLevels(graph, start) {
    const queue = [start];
    const visited = new Set();
    visited.add(start);
    const levels = [];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node);
            for (const neighbor of graph[node]) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }

        // IMPORTANT
        // we have finished processing all nodes at the current level
        levels.push(currentLevel);
    }

    return levels;
}

/**
 * Breadth-first Search (BFS) on a matrix - level by level
 */

function bfsLevelByLevel(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    // start at the top-left corner
    const queue = [[0, 0]];
    const visited = new Set();
    visited.add("0,0");

    const levels = [];
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const [row, col] = queue.shift();
            currentLevel.push([row, col]);
            for (const [dr, dc] of directions) {
                const r = row + dr;
                const c = col + dc;
                if (r >= 0 && r < rows && c >= 0 && c < cols && !visited.has(`${r},${c}`)) {
                    visited.add(`${r},${c}`);
                    queue.push([r, c]);
                }
            }
        }

        // IMPORTANT
        // we have finished processing all nodes at this level
        levels.push(currentLevel);
    }

    return levels;
}

/**
 * DFS + Backtracking
 */

function pathSum(root, target) {
    function backtrack(node, path, total) {
        if (!node) {
            return;
        }

        path.push(node.val);
        total += node.val;

        // KEY STEP 2
        // current sum exceeds target
        // so pop to remove the current node from the path
        // return to backtrack to previous node on the call stack
        if (total > target) {
            path.pop();
            return;
        }

        if (!node.left && !node.right) {
            // add the path to the result
            // note we have to make a copy ([...path]) of the path
            // since future recursive calls modify path
            if (total === target) {
                result.push([...path]);
            }
        } else {
            backtrack(node.left, path, total);
            backtrack(node.right, path, total);
        }

        // KEY STEP 1
        // we have finished exploring all paths containing the current node
        // so pop to remove the current node from the path
        // return to backtrack to previous node on the call stack.
        path.pop();
    }

    const result = [];
    backtrack(root, [], 0);
    return result;
}

/**
 * Graph indegree calculation - list of edges
 */
function indegree(n, edges) {
    const indegree = new Array(n).fill(0);
    for (const [u, v] of edges) {
        indegree[v] += 1;
    }
    return indegree;
}

/**
 * Graph indegree calculation - adjacency list
 */
function indegree(adjList, n) {
    const indegree = new Array(n).fill(0);
    for (const u in adjList) {
        // increment the indegree of each neighbor of u
        for (const v of adjList[u]) {
            indegree[v] += 1;
        }
    }
    return indegree;
}

/**
 * Topological Sort of the graph - Kahn's Algorithm
 */

function topologicalSort(adjList, n) {
    // calculate indegree of each node
    const indegree = new Array(n).fill(0);
    for (const u in adjList) {
        for (const v of adjList[u]) {
            indegree[v]++;
        }
    }

    // enqueue nodes with indegree 0
    const queue = [];
    for (let u = 0; u < n; u++) {
        if (indegree[u] === 0) {
            queue.push(u);
        }
    }

    const order = [];
    while (queue.length > 0) {
        const u = queue.shift();
        order.push(u);

        for (const v of adjList[u] || []) {
            indegree[v]--;
            if (indegree[v] === 0) {
                queue.push(v);
            }
        }
    }

    return order.length === n ? order : [];
}
// Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges in the graph
// Space Complexity: O(V)
