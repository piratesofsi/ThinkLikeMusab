export const posts = [
  {
    id: "wiggle-sort",
    question: "Question 1",
    title: "ThinkLikeMusab #1 – Wiggle Sort",
    description: "From sorting intuition to greedy optimization",
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
    id: "wiggle-sort-ii",
    question: "Question 2",
    title: "ThinkLikeMusab #2 – Wiggle Sort II",
    description: "Handling duplicates using reverse placement strategy",
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

        // fill odd indices with largest elements
        for (int i = 1; i < n; i += 2) {
            ans[i] = nums[j--];
        }

        // fill even indices with remaining elements
        for (int i = 0; i < n; i += 2) {
            ans[i] = nums[j--];
        }

        // copy back
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
];
