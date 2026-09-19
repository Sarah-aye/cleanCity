# 🌱 CleanCity — Recycling Tracker

A modern recycling tracking application built with **Next.js**, **React**, and **React Bootstrap**.

CleanCity helps users record their recycling activity, manage their entries, search and sort their recycling history, track quantities by category, celebrate recycling achievements, switch between light and dark themes, and export their data as CSV.

The project also includes automated tests using **Jest** and **React Testing Library**.

---

### 👤 Author

## Sarah Malwil

### Links

## github https://github.com/Sarah-aye/cleanCity

## live-demo https://clean-city-five.vercel.app/

## GIFs in /public/gifs

## ✨ Features

### ♻️ Recycling Tracker

Users can record recycling activities by selecting a waste category and entering a quantity.

- 🗂️ Select a waste category
- 🔢 Enter a recycling quantity
- ✅ Form validation
- ➕ Add new recycling entries
- ✏️ Edit existing entries
- 🗑️ Delete entries
- 🔄 Automatically combine entries belonging to the same category
- 💾 Persist recycling data using `localStorage`
- 🏆 Unlock category achievements

---

### 🏆 Recycling Achievements

CleanCity includes an achievement system that celebrates users when they reach meaningful recycling milestones.

An **Achievement Card** is displayed when the recycling quantity for a specific category reaches the configured threshold of **10**.

For example:

```text
Plastic
──────────────
10 items recycled
🏆 Achievement unlocked!
```

The achievement functionality is implemented using a **Higher-Order Component (HOC)**.

The HOC wraps an existing component and provides achievement behavior without requiring the wrapped component itself to contain the threshold logic.

Conceptually:

```text
Recycling data
      │
      ▼
Achievement HOC
      │
      ├── Check category
      ├── Check quantity
      └── Check threshold
             │
             ▼
      Achievement Card
```

This demonstrates React's component composition pattern and keeps achievement-related behavior reusable.

### Why use an HOC?

The HOC allows the achievement behavior to be separated from the presentation component.

Instead of putting the threshold logic directly inside every card, the behavior can be reused by wrapping different components.

```js
const EnhancedCard = withAchievement(CardComponent);
```

This keeps the components focused on presentation while the HOC handles the additional behavior.

---

### 🔎 Search

The recycling log includes category-based searching.

Search supports:

- 🔤 Case-insensitive matching
- 🔍 Partial category matching
- ✂️ Whitespace trimming
- 📋 Displaying only matching recycling entries

For example:

```text
Search: "plastic"
```

can match:

```text
Plastic
Plastic Bottle
Recycled Plastic
```

---

### ↕️ Sorting

Recycling entries can be sorted using several options:

- 🅰️ Category — ascending
- 🆎 Category — descending
- 🔢 Quantity — ascending
- 🔢 Quantity — descending
- 📅 Date — newest first

The sorting logic is handled through a memoized derived value so the list is recalculated when the underlying data, search term, or sorting option changes.

---

### 📊 Recycling Statistics

The application calculates useful recycling totals.

#### Total Quantity

The currently filtered recycling entries are used to calculate the displayed total quantity.

#### Category Totals

The application also maintains totals for each recycling category.

For example:

```text
plastic: 25
glass: 10
paper: 30
```

Category names are normalized when totals are calculated so values such as:

```text
Plastic
plastic
PLASTIC
```

can be treated as the same category.

---

### 💾 Local Storage

Recycling data is persisted in the browser using `localStorage`.

This means users can:

1. Add recycling entries
2. Refresh the page
3. Return to the application
4. Continue seeing their saved entries

The application uses a reusable `useLocalStorage` hook.

The hook also handles:

- 🖥️ Client/server rendering
- 🔄 Synchronizing storage changes
- 🛡️ Storage errors
- ⚛️ React state synchronization
- 🌐 Browser `storage` events

---

### 🌓 Light & Dark Theme

The application supports theme switching.

The theme is synchronized with the document root using:

```text
.dark
```

and:

```text
data-bs-theme="dark"
```

The theme preference is persisted using the same local-storage mechanism.

---

### ⌨️ Keyboard Functionality

The application also supports keyboard interactions for form workflows.

A dedicated keyboard handler is used to respond to keyboard events while the user is entering recycling information.

This allows the application to provide a smoother keyboard-driven experience rather than requiring every action to be performed with a mouse.

The keyboard functionality is implemented through the `usePledgeForm` hook.

The hook receives the submission callback and provides a keyboard handler:

```js
const { handleKeyDown } = usePledgeForm(onSubmit);
```

The handler is then attached to the quantity input:

```jsx
<Form.Control type="text" inputMode="numeric" onKeyDown={handleKeyDown} />
```

This keeps keyboard behavior separate from the form's visual component.

---

### 🛡️ Confirmation Dialog Before Submission

Before certain form submissions are completed, CleanCity uses a confirmation dialog to give the user an opportunity to confirm the action.

The flow is:

```text
User enters recycling data
        │
        ▼
Keyboard / submit action
        │
        ▼
Confirmation dialog
        │
        ├── Cancel → submission stopped
        │
        └── Confirm → submission continues
```

The confirmation functionality is provided through a reusable confirmation context.

Components can access the confirmation functionality through:

```js
useConfirm();
```

This avoids duplicating dialog state and behavior across multiple components.

The confirmation system is particularly useful for preventing accidental actions and giving users control before an important operation is completed.

---

### ✏️ Editing Entries

Existing recycling records can be edited.

The tracker form supports both:

```text
New entry
```

and:

```text
Edit entry
```

When editing an entry:

- Existing values are loaded into the form
- Validation still applies
- Changes can be saved
- The user can cancel the edit

The form behavior is managed through the reusable `useTrackerForm` hook.

---

### 🗑️ Deleting Entries

Users can delete individual recycling records.

Deletion is performed by matching the entry's unique ID.

This keeps the operation deterministic and prevents unrelated records from being removed.

---

### ➕ Automatic Category Aggregation

When a user adds an entry for a category that already exists, the application combines the quantities rather than unnecessarily creating a duplicate category record.

For example:

```text
Plastic → 10
```

Adding:

```text
Plastic → 5
```

results in:

```text
Plastic → 15
```

Category comparison is normalized using trimmed lowercase values.

---

### 🆔 Unique Entry IDs

Every newly created recycling entry receives a unique ID.

The application uses a dedicated `makeId` utility for this.

The ID allows operations such as:

- ✏️ Editing
- 🗑️ Deleting
- 🎯 Identifying individual records

The ID is intentionally kept separate from the search and sorting logic.

---

### 📅 Creation Dates

New entries receive an ISO timestamp using:

```js
new Date().toISOString();
```

ISO timestamps make the values suitable for chronological sorting and storage.

---

### 📤 CSV Export

Users can export their recycling log as a CSV file.

The export includes:

- Category
- Quantity
- Date Created

The generated file is automatically named using the current date:

```text
cleancity_recycling_log_YYYY-MM-DD.csv
```

The export implementation also handles quotation marks inside category names by escaping them correctly for CSV format.

---

# 🧠 Custom Hooks

The application separates reusable logic from UI components through custom React hooks.

### `useRecyclingLog`

Responsible for recycling-log functionality:

- 📋 Reading logs
- ➕ Adding entries
- ✏️ Editing entries
- 🗑️ Deleting entries
- 🔎 Searching
- ↕️ Sorting
- 📊 Calculating totals
- 📤 Exporting CSV data

---

### `useTrackerForm`

Responsible for tracker form behavior:

- 📝 Managing category state
- 🔢 Managing quantity state
- ⚠️ Validation
- 📤 Form submission
- ✏️ Loading existing entries
- 🔄 Resetting the form after successful creation

---

### `useLocalStorage`

Provides reusable browser-storage functionality.

It supports:

- 💾 Reading persisted values
- 🛡️ Handling storage errors
- 🌐 Server-side rendering compatibility
- 🔄 React state synchronization
- 📡 Browser storage events
- 🌓 Theme synchronization

The hook uses React's `useSyncExternalStore` to provide a safe subscription model.

---

### `usePledgeForm`

The `usePledgeForm` hook encapsulates keyboard and confirmation-related form behavior.

It provides:

- ⌨️ Keyboard event handling
- 🛡️ Confirmation before submission
- 🔗 Integration with the application's confirmation context

This prevents `TrackerForm` from becoming responsible for all keyboard and confirmation logic itself.

---

# 🧩 Higher-Order Component

In addition to custom hooks, the application demonstrates the use of a **Higher-Order Component (HOC)**.

A HOC is a function that takes a component and returns an enhanced component.

Conceptually:

```js
const EnhancedComponent = withAchievement(Component);
```

The achievement HOC uses recycling information to determine whether a category has reached the configured threshold.

```text
Component
    │
    ▼
withAchievement(...)
    │
    ├── Read recycling information
    ├── Check category quantity
    ├── Check threshold
    └── Enhance UI
            │
            ▼
      Achievement Card
```

This provides an example of using **component composition** to add reusable behavior without modifying the original component.

---

# 🏗️ Application Architecture

The application combines several React patterns:

```text
                    CleanCity
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
   Components       Hooks          HOCs
        │              │              │
        │              ├─ Form        └─ Achievements
        │              ├─ Logs
        │              ├─ Storage
        │              └─ Keyboard
        │
        ▼
   React Bootstrap
        │
        ▼
   User Interface
```

The architecture separates:

- 🎨 Presentation
- 🧠 Business logic
- 🔄 State management
- 🧩 Reusable component behavior
- 💾 Persistence
- ⌨️ User interaction
- 🛡️ Confirmation workflows

---

# 🧪 Testing

The project uses:

- 🧪 Jest
- 🧫 React Testing Library
- 🔗 React Testing Library DOM matchers
- 🖱️ Testing Library User Event

Testing focuses on observable application behavior rather than implementation details.

---

## 🔬 Form Validation Tests

The tracker form tests:

- ❌ Missing category
- ❌ Missing quantity
- ❌ Non-numeric quantity
- ❌ Zero quantity
- ❌ Negative quantity
- ❌ Decimal quantity
- ✅ Valid submission
- 🚫 Preventing `onSubmit` when validation fails

---

## ⌨️ Keyboard Interaction Tests

Keyboard behavior can be tested by simulating keyboard events against the form controls.

The goal is to verify observable behavior such as:

```text
Keyboard event
      ↓
Keyboard handler
      ↓
Confirmation
      ↓
Submit or cancel
```

Rather than testing the internal implementation of the keyboard handler, tests should verify what happens as a result of the user's keyboard interaction.

---

## 🛡️ Confirmation Tests

The confirmation workflow should verify both possible outcomes:

### User confirms

```text
User submits
     ↓
Confirmation appears
     ↓
User confirms
     ↓
onSubmit is called
```

### User cancels

```text
User submits
     ↓
Confirmation appears
     ↓
User cancels
     ↓
onSubmit is not called
```

This ensures that the confirmation mechanism actually protects the submission action.

---

## 🏆 Achievement Tests

The achievement HOC can be tested by checking the rendered result at and around the threshold.

For example:

```text
Quantity: 9
→ Achievement not displayed

Quantity: 10
→ Achievement displayed
```

The important behavior is the threshold transition rather than the internal implementation of the HOC.

---

## 🔎 Search Tests

The recycling hook tests:

- 📋 Returning all entries without a search term
- 🔍 Filtering by category
- 🔤 Case-insensitive search
- ✂️ Partial category matching

---

## ↕️ Sorting Tests

The recycling hook tests:

```text
category-asc
category-desc
quantity-asc
quantity-desc
date-desc
```

Tests use deterministic IDs, quantities, and dates so that sorting results are predictable.

---

# 🧠 Testing Philosophy

The project focuses on **behavior-driven testing**.

Instead of asking:

> "Did React call `useMemo()`?"

the tests ask:

> "Did the user receive the correctly filtered and sorted recycling entries?"

Instead of testing:

> "Was this internal function called?"

the tests focus on:

> "Did confirming the dialog actually submit the form?"

This produces tests that describe application behavior and are less coupled to implementation details.

---

# 🛠️ Tech Stack

| Technology                    | Purpose                           |
| ----------------------------- | --------------------------------- |
| ⚛️ React                      | UI and application state          |
| ▲ Next.js                     | Application framework             |
| 🎨 React Bootstrap            | UI components and styling         |
| 🧪 Jest                       | Testing framework                 |
| 🧫 React Testing Library      | Component and hook testing        |
| 🖱️ Testing Library User Event | User interaction simulation       |
| 💾 localStorage               | Client-side persistence           |
| 📄 CSV                        | Data export                       |
| 🧩 React HOC                  | Reusable component enhancement    |
| 🛡️ React Context              | Confirmation dialog functionality |

---

# 📦 Installation

Install project dependencies:

```bash
npm install
```

Testing dependencies:

```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

---

# ▶️ Running the Application

Start the development server:

```bash
npm run dev
```

---

# 🧪 Running Tests

Run the complete test suite:

```bash
npm test
```

Run a specific test:

```bash
npx jest useLocalStorage.test.js
```

or:

```bash
npx jest useRecyclingLog.test.js
```

---

# ⚙️ Jest Configuration

The project uses Next.js's Jest integration:

```js
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

export default createJestConfig(config);
```

`next/jest.js` is provided by the installed **Next.js package**, so a separate `@next/jest` package is not required.

---

# 🧩 Important Development & Testing Solutions

### 🔤 Jest matcher capitalization

Jest matchers are case-sensitive.

Correct:

```js
expect(value).toBe("hello");
```

---

### 🎭 Mocking unrelated dependencies

When testing `TrackerForm`, its `usePledgeForm` dependency can be mocked when the test is specifically focused on form validation.

```js
jest.mock("../hooks/usePledgeForm", () => ({
  usePledgeForm: () => ({
    handleKeyDown: jest.fn(),
  }),
}));
```

This keeps individual tests focused and avoids requiring unrelated context providers.

---

### 🧪 Mock functions

To verify whether a callback was called:

```js
const onSubmit = jest.fn();
```

Then:

```js
expect(onSubmit).not.toHaveBeenCalled();
```

---

### 🪝 Testing hooks

Custom hooks are tested using:

```js
renderHook();
```

State-changing operations are wrapped with:

```js
act();
```

Example:

```js
const { result } = renderHook(() => useRecyclingLog(logs));

act(() => {
  result.current.setSearchTerm("plastic");
});
```

---

### 🎯 Deterministic test data

Production code uses generated IDs and current timestamps, but search and sorting tests use fixed values.

This makes tests:

- 🔁 Repeatable
- 🎯 Predictable
- 🧪 Easier to debug
- 🚫 Independent of the current date/time

---

# 🌱 Project Goal

CleanCity demonstrates how a modern React/Next.js application can combine:

**♻️ Useful functionality + 🧠 reusable hooks + 🧩 HOCs + ⌨️ keyboard interactions + 🛡️ confirmation workflows + 💾 persistence + 🏆 achievements + 🎨 responsive UI + 🧪 automated testing**

The project emphasizes maintainable code by separating UI, business logic, reusable behavior, persistence, and user-interaction concerns.

---

## ❤️ Development Approach

The project was developed incrementally:

```text
Build a feature
      ↓
Run the application
      ↓
Test the behavior
      ↓
Find failures
      ↓
Understand the error
      ↓
Fix the implementation
      ↓
Run the tests again
      ↓
Repeat 🔄
```

Testing is treated as part of the development process rather than something added at the end.

---

## ♻️ CleanCity

**Track it. Recycle it. Celebrate progress. 🌱🏆**

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
