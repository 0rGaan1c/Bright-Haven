## Demo

Click here to watch the demo

https://github.com/user-attachments/assets/c00d1ca0-2cd9-47fa-ac79-d892b60b64e9



## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/0rGaan1c/Bright-Haven.git
   ```
2. Navigate to the project folder:
   ```bash
   cd bright-haven
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## Understanding the Problem

Like usual, I started the assignment by going through the problem statement and understanding it as deeply as possible because I think a good understanding of the problem is necessary before we even try to solve it. In this case, the problem itself was pretty straightforward since I just had to build out the Supertask main functionality. After going through the website and playing around with it, it was pretty clear to me what exactly I had to do, which is quite important because usually, this is the hard and challenging part.

After I understood the problem, I started thinking about how I would actually go about solving it, coming up with a simple folder structure and all the necessary files and components and the general design of the system that I would be creating and using to complete the assignment.

I decided to use `localStorage` for temporarily storing the data alongside React Context to make things work well together:

```json
{
  "DO_FIRST": [],
  "DO_LATER": [],
  "DELEGATE": [],
  "ELIMINATE": [
    {
      "id": "9ea67e2c-a510-471d-a08f-b5c505719373",
      "title": "One-Two",
      "createdAt": 1737646966371,
      "isCompleted": true
    }
  ]
}
```

Each section (`DO_FIRST`, `DO_LATER`, `DELEGATE`, and `ELIMINATE`) contains an array of tasks which is an object with following types:

```typescript
interface Task {
  id: string;
  title: string;
  createdAt: number;
  isCompleted: boolean;
}
```

---

## Challenges

The biggest challenge of this assignment was the drag-and-drop part, mainly because I have not worked primarily on something like this before. However, by using the `react-draggable` library and understanding how the tasks are moving from one place to another, I was able to solve it. Though, due to a lack of time, I wasn’t able to implement the moving of tasks within the same section, but it’s also a very interesting problem that I will probably be working on this weekend just to implement it myself.

Another challenge was handling task placement logic while dragging tasks across sections. The function below calculates the new section based on the task's position when dropped:

```typescript
function getNewSectionId(elementID: string) {
  const sectionRects = {
    DO_FIRST: document.querySelector("#DO_FIRST")?.getBoundingClientRect(),
    DO_LATER: document.querySelector("#DO_LATER")?.getBoundingClientRect(),
    DELEGATE: document.querySelector("#DELEGATE")?.getBoundingClientRect(),
    ELIMINATE: document.querySelector("#ELIMINATE")?.getBoundingClientRect()
  };

  const taskElement = document.getElementById(elementID);
  if (!taskElement) return null;

  const taskRects = taskElement.getBoundingClientRect();
  if (!taskRects) return null;

  for (const [sectionId, sectionRect] of Object.entries(sectionRects)) {
    if (!sectionRect) continue;

    const halfWidth = taskRects.width / 2;
    const halfHeight = taskRects.height / 2;

    const verticallyInside =
      taskRects.top + halfHeight >= sectionRect.top &&
      taskRects.bottom - halfHeight <= sectionRect.bottom;

    const movingToRight =
      taskRects.left + halfWidth >= sectionRect.left && verticallyInside;
    const movingToLeft =
      taskRects.right - halfWidth <= sectionRect.right && verticallyInside;

    if (
      (sectionId === "DO_LATER" || sectionId === "ELIMINATE") &&
      movingToRight
    ) {
      return sectionId as SectionId;
    }

    if (
      (sectionId === "DO_FIRST" || sectionId === "DELEGATE") &&
      movingToLeft
    ) {
      return sectionId as SectionId;
    }
  }

  return null;
}
```

This function was crucial to ensuring tasks moved correctly between sections based on their position and movement direction.

---

## Things I Could Do Better

- One thing I could definitely do better is to add transitions and make the overall dragging and moving of tasks smoother.

---

## Further Improvements and Scalability

- Adding a backend server with optimistic updates. I will keep the local storage so that the app itself feels great to the user in terms of UI/UX but will periodically perform optimistic updates to save data to the backend.
- Adding error boundaries.
- Implementing UI messages to reflect user actions like adding, saving, etc., to improve overall user experience.

---
