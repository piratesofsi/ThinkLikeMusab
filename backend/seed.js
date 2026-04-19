import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "./models/Post.js";

dotenv.config();

const posts = [
  {
    question: "Question 1",
    title: "ThinkLikeMusab #1 – Wiggle Sort",
    tags: ["Arrays", "Sorting"],
    description: "From sorting intuition to greedy optimization",
    status: "approved",
    leetcode: { number: 280, name: "Wiggle Sort", url: "https://leetcode.com/problems/wiggle-sort/" },
    content: `
## Problem

Rearrange an array such that:

\`nums[0] ≥ nums[1] ≤ nums[2] ≥ nums[3]...\`

The goal is to alternate between greater and smaller elements.

---

## Initial Approach (Sorting)

My first instinct was to sort the array. Once sorted, swap adjacent pairs to create the pattern.

### Steps

- Sort the array
- Swap pairs: (0,1), (2,3), (4,5)...

\`\`\`java
Arrays.sort(nums);

for (int i = 0; i < n - 1; i += 2) {
    swap(i, i + 1);
}
\`\`\`

This works because sorting groups values together first.

---

## Limitation

Sorting takes **O(n log n)**.

So I asked — can we avoid sorting entirely?

---

## Optimized Approach (Greedy)

Instead of sorting, we fix the pattern while traversing.

### Observation

- If index is **even** → \`nums[i] ≥ nums[i+1]\`
- If index is **odd** → \`nums[i] ≤ nums[i+1]\`

If the condition is violated → swap immediately.

\`\`\`java
for (int i = 0; i < n - 1; i++) {
    if (i % 2 == 0) {
        if (nums[i] < nums[i + 1]) swap(i, i + 1);
    } else {
        if (nums[i] > nums[i + 1]) swap(i, i + 1);
    }
}
\`\`\`

---

## Why This Works

> This problem is not about sorting. It is about maintaining correct **adjacent relationships**. Fixing locally → the global pattern forms automatically.

---

## Complexity

- Sorting approach → **O(n log n)**
- Greedy approach → **O(n)**
- Space → **O(1)**
`,
  },
  {
    question: "Question 2",
    title: "ThinkLikeMusab #2 – Wiggle Sort II",
    tags: ["Arrays", "Sorting"],
    description: "Handling duplicates using reverse placement strategy",
    status: "approved",
    leetcode: { number: 324, name: "Wiggle Sort II", url: "https://leetcode.com/problems/wiggle-sort-ii/" },
    content: `
## Problem

Given \`nums = [1,5,1,1,6,4]\`, rearrange so that:

\`nums[0] < nums[1] > nums[2] < nums[3]...\`

Odd indices must be strictly greater than adjacent even indices.

---

## Why Greedy Fails Here

In Wiggle Sort I, we used a simple greedy swap.

But here:

- Duplicate values exist
- Strict inequality is required

> So local swaps are not enough anymore.

---

## My Approach (Sorting + Controlled Placement)

Instead of fixing locally, I decided to control placement globally.

### Idea

- Sort the array
- Fill the result array from the **end**
- Place **largest elements at odd indices**
- Place **remaining elements at even indices**

---

## Steps

1. Sort the array
2. Start from the largest element (end of array)
3. Fill **odd indices first (1, 3, 5, ...)** with largest elements
4. Then fill **even indices (0, 2, 4, ...)** with remaining elements

---

## Important Insight

> If we fill smaller elements first, duplicates can end up adjacent and break strict inequality.

So we:

- Always pick from the **end (largest remaining)**
- This guarantees correct ordering

---

## Code Implementation

\`\`\`java
class Solution {
    public void wiggleSort(int[] nums) {
        int n = nums.length;
        int[] ans = new int[n];

        Arrays.sort(nums);

        int j = n - 1;

        for (int i = 1; i < n; i += 2) {
            ans[i] = nums[j--];
        }

        for (int i = 0; i < n; i += 2) {
            ans[i] = nums[j--];
        }

        for (int i = 0; i < n; i++) {
            nums[i] = ans[i];
        }
    }
}
\`\`\`

---

## Why This Works

- Largest elements go to peaks (odd indices)
- Smaller elements go to valleys (even indices)
- Since we fill from the back, duplicates are naturally separated

---

## Complexity

- Time → **O(n log n)** (sorting)
- Space → **O(n)** (extra array)

---

## Key Takeaway

> This problem is about **placement strategy**, not just comparison.

Instead of fixing violations, we prevent them by construction.
`,
  },
  {
    question: "Question 3",
    title: "ThinkLikeMusab #3 – Binary Search",
    tags: ["Binary Search", "Arrays"],
    description: "Why halving the search space is always the move",
    status: "approved",
    leetcode: { number: 704, name: "Binary Search", url: "https://leetcode.com/problems/binary-search/" },
    content: `
## Problem

Given a sorted array, find the index of a target element in **O(log n)**.

---

## The Idea

Every time we check the middle element:

- If it equals target → done
- If target is smaller → search left half
- If target is larger → search right half

We eliminate half the array each step.

---

## Code

\`\`\`java
int lo = 0, hi = nums.length - 1;

while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;

    if (nums[mid] == target) return mid;
    else if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
}

return -1;
\`\`\`

---

## Why \`lo + (hi - lo) / 2\` and not \`(lo + hi) / 2\`

> \`lo + hi\` can overflow if both are large integers. Subtracting first keeps the value safe.

---

## Complexity

- Time → **O(log n)**
- Space → **O(1)**
`,
  },
  {
    question: "Question 4",
    title: "ThinkLikeMusab #4 – Two Sum",
    tags: ["Arrays", "Strings"],
    description: "From brute force O(n²) to HashMap O(n)",
    status: "approved",
    leetcode: { number: 1, name: "Two Sum", url: "https://leetcode.com/problems/two-sum/" },
    content: `
## Problem

Given an array and a target, return indices of two numbers that add up to target.

---

## Brute Force

Check every pair.

\`\`\`java
for (int i = 0; i < n; i++) {
    for (int j = i + 1; j < n; j++) {
        if (nums[i] + nums[j] == target) return new int[]{i, j};
    }
}
\`\`\`

Time → **O(n²)**. Too slow for large inputs.

---

## Optimized (HashMap)

Instead of searching for the complement, **store what we've seen**.

### Insight

> For each element \`x\`, we need \`target - x\`. If we've seen it before, we're done.

\`\`\`java
Map<Integer, Integer> map = new HashMap<>();

for (int i = 0; i < nums.length; i++) {
    int complement = target - nums[i];
    if (map.containsKey(complement)) {
        return new int[]{map.get(complement), i};
    }
    map.put(nums[i], i);
}
\`\`\`

---

## Complexity

- Time → **O(n)**
- Space → **O(n)** — for the HashMap
`,
  },
  {
    question: "Question 5",
    title: "ThinkLikeMusab #5 – Reverse Linked List",
    tags: ["Linked Lists"],
    description: "Pointer manipulation made visual",
    status: "approved",
    leetcode: { number: 206, name: "Reverse Linked List", url: "https://leetcode.com/problems/reverse-linked-list/" },
    content: `
## Problem

Reverse a singly linked list in-place.

---

## The Trick

We need three pointers: \`prev\`, \`curr\`, \`next\`.

At each step:
- Save \`next\` before we break the link
- Point \`curr.next\` backward to \`prev\`
- Move both pointers forward

\`\`\`java
ListNode prev = null;
ListNode curr = head;

while (curr != null) {
    ListNode next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
}

return prev;
\`\`\`

---

## Why \`prev\` starts as null

> The last node of the original list becomes the new head. Its \`next\` should point to nothing — so \`null\` is the correct starting value for \`prev\`.

---

## Complexity

- Time → **O(n)**
- Space → **O(1)**
`,
  },
  {
    question: "Question 6",
    title: "ThinkLikeMusab #6 – Climbing Stairs",
    tags: ["Dynamic Programming"],
    description: "The DP pattern hiding inside a simple staircase",
    status: "approved",
    leetcode: { number: 70, name: "Climbing Stairs", url: "https://leetcode.com/problems/climbing-stairs/" },
    content: `
## Problem

You can climb 1 or 2 steps at a time. How many ways to reach step \`n\`?

---

## Observation

To reach step \`n\`, you came from either:
- Step \`n-1\` (took 1 step)
- Step \`n-2\` (took 2 steps)

So: \`ways(n) = ways(n-1) + ways(n-2)\`

> This is just Fibonacci in disguise.

---

## Code

\`\`\`java
int a = 1, b = 1;

for (int i = 2; i <= n; i++) {
    int temp = a + b;
    a = b;
    b = temp;
}

return b;
\`\`\`

---

## Why This Works

We don't need an array — just the last two values. Each step depends only on its two predecessors.

---

## Complexity

- Time → **O(n)**
- Space → **O(1)**
`,
  },
  {
    question: "Question 7",
    title: "ThinkLikeMusab #7 – Valid Parentheses",
    tags: ["Strings", "Greedy"],
    description: "Why a stack is the natural fit for bracket problems",
    status: "approved",
    leetcode: { number: 20, name: "Valid Parentheses", url: "https://leetcode.com/problems/valid-parentheses/" },
    content: `
## Problem

Given a string with \`(\`, \`)\`, \`{\`, \`}\`, \`[\`, \`]\`, check if it's valid.

Valid means every opening bracket has a matching closing bracket in the right order.

---

## Why Stack?

> Opening brackets need to be matched by the **most recent** unmatched opener. That's exactly what a stack gives us — LIFO order.

---

## Code

\`\`\`java
Stack<Character> stack = new Stack<>();

for (char c : s.toCharArray()) {
    if (c == '(' || c == '{' || c == '[') {
        stack.push(c);
    } else {
        if (stack.isEmpty()) return false;
        char top = stack.pop();
        if (c == ')' && top != '(') return false;
        if (c == '}' && top != '{') return false;
        if (c == ']' && top != '[') return false;
    }
}

return stack.isEmpty();
\`\`\`

---

## Why \`stack.isEmpty()\` at the end?

> If unclosed openers remain in the stack, the string is invalid even if every closer matched correctly.

---

## Complexity

- Time → **O(n)**
- Space → **O(n)**
`,
  },
  {
    question: "Question 8",
    title: "ThinkLikeMusab #8 – Max Depth of Binary Tree",
    tags: ["Trees"],
    description: "Recursion that thinks one level at a time",
    status: "approved",
    leetcode: { number: 104, name: "Maximum Depth of Binary Tree", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
    content: `
## Problem

Find the maximum depth of a binary tree.

---

## Recursive Insight

> The depth of a tree = 1 + max(depth of left subtree, depth of right subtree)

Base case: a null node has depth 0.

---

## Code

\`\`\`java
public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
\`\`\`

---

## Why This Works

Every call handles just one node and delegates to its children. The recursion naturally explores all paths and bubbles up the longest one.

---

## Complexity

- Time → **O(n)** — visits every node once
- Space → **O(h)** — call stack height equals tree height
`,
  },
  {
    question: "Question 9",
    title: "ThinkLikeMusab #9 – Mirror Distance",
    tags: ["Strings", "Arrays"],
    description: "Reverse a number and find the absolute difference from the original",
    status: "approved",
    leetcode: { number: 3783, name: "Mirror distance of an Integer", url: "https://leetcode.com/problems/mirror-distance-of-an-integer/" },
    content: `
## Problem

Given a number \`n\`, find the **mirror** of it (reverse its digits), then return the absolute difference between the original and its mirror.

\`\`\`
Input: 1234    Mirror: 4321

Output: |1234 - 4321| = 3087
\`\`\`

---

## How I Thought About It

The word "mirror" is just a fancy way of saying **reverse the digits**.

So the problem breaks into two steps:

- Reverse the number
- Subtract and return the absolute difference

---

## Reversing a Number

No strings, no arrays. Pure math.

### The trick

- \`element % 10\` → gives the **last digit**
- \`result * 10 + digit\` → shifts result left and appends the digit
- \`element / 10\` → removes the last digit

\`\`\`java
private int findMirror(int element) {
    int result = 0;
    while (element > 0) {
        int digit = element % 10;
        result = result * 10 + digit;
        element = element / 10;
    }
    return result;
}
\`\`\`

### Dry run with 1234

| element | digit | result |
|---------|-------|--------|
| 1234    | 4     | 4      |
| 123     | 3     | 43     |
| 12      | 2     | 432    |
| 1       | 1     | 4321   |
| 0       | —     | done   |

---

## Final Step

\`\`\`java
public int mirrorDistance(int n) {
    int mirror = findMirror(n);
    return Math.abs(n - mirror);
}
\`\`\`

> \`Math.abs()\` handles the case where the mirror is larger than the original — so we always get a positive result.

---

## Complexity

- Time → **O(d)** where d is the number of digits
- Space → **O(1)**

---

## Key Takeaway

> When a problem says "mirror" or "reverse" a number — think **modulo and division**, not strings. It's cleaner and teaches you how numbers actually work digit by digit.
`,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Post.deleteMany({});
    console.log("Cleared existing posts");

    await Post.insertMany(posts);
    console.log(`Seeded ${posts.length} posts successfully`);

    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exit(1);
  }
};

seed();