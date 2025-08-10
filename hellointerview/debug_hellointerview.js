class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Solution {
    create_trie(words) {
        // === DO NOT MODIFY ===
        this.root = new TrieNode();
        for (const word of words) {
            this.insert(word);
        }
    }

    insert(word) {
        // === DO NOT MODIFY ===
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

        return node.isEndOfWord;
    }

    prefix(word) {
        const prefixHelper = (node, prefix) => {
            const result = [];

            if (node.isEndOfWord) {
                result.push(prefix);
            }

            const chars = Object.keys(node.children);

            for (const char of chars) {
                result.push(...prefixHelper(
                    node.children[char],
                    prefix + char
                ));
            }

            return result;
        }

        let node = this.root;

        for (const char of word) {
            node = node.children[char];

            if (!node) {
                return [];
            }
        }

        return prefixHelper(node, word);
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


// Initializing test case

const input = "233";
const startTime = Date.now();
const result = (new Solution()).digitsToLetterCombinations(input);
const endTime = Date.now();
console.log(result);
console.log(`Execution Time: ${(endTime - startTime)} ms`);