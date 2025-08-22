# 📌 Task Management Dashboard

A simple yet powerful **Task Management Dashboard** built with modern web technologies.  
It includes features such as **drag-and-drop task organization**, **form validation**, **service worker integration**, and a clean, responsive UI.

---

## 👨‍💻 Author

**Erick García**  
Senior Frontend Developer

---

## 🛠️ Tech Stack

- **React 18** (with hooks and context)
- **TypeScript** (strict typing for reliability)
- **Vite** (fast bundling and DX)
- **React Hook Form** (form state management)
- **Jest & React Testing Library** (unit testing)
- **SCSS Modules** (styling with BEM methodology)
- **Service Worker** (offline caching and PWA support)

---

## 🚀 Getting Started

### ✅ Prerequisites

- **Node.js** (>= 20.x)
- **npm**

### 📥 Installation

```bash
# Clone repository
git clone https://github.com/your-username/task-management-dashboard.git
cd task-management-dashboard

---

## ▶️ Running the Project

# Install dependencies
npm install

# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview

---

## 🧪 Running Tests

npm run test

```

---

## 🎨 Design Decisions & Trade-offs

- React Hook Form vs Formik → chose react-hook-form for performance and smaller bundle size.

- Vite vs CRA/Next.js → picked Vite for speed and simplicity, as SSR was not a requirement.

- SCSS over TailwindCSS → for more fine-grained control and adherence to BEM methodology.

- Drag and Drop → implemented using dnd-kit/core

---

## 📝 Assumptions

- Users will mostly access the app from modern browsers supporting ESM.

- Tasks are stored in memory or simple API mocks — no real backend integration in this version.

- Accessibility support relies on semantic HTML + ARIA attributes.

---

## ⚡ Performance Optimizations

- Code Splitting: Lazy loading for non-critical components.

- Memoization: Used useMemo and useCallback where appropriate.

- Minimized re-renders: Leveraged react-hook-form’s uncontrolled inputs.

---

## ♿ Accessibility Considerations

- Semantic HTML with roles and ARIA attributes.

- Proper labeling of inputs and tooltips.

- Keyboard navigation supported (focusable elements).

- Color contrast aligned with WCAG guidelines.

---

## 🔄 How Drag & Drop Works

- Works only on desktop mode (> 1024px)

- Each task card is draggable.

- Boards (columns) act as droppable zones.

- When a task is moved, the local state updates accordingly.

---

This project uses [MSW (Mock Service Worker)](https://mswjs.io/) to mock API calls during development and testing.
When you install and run MSW, it generates a **`mockServiceWorker.js`** file in your `public/` folder.

### How it works

- MSW intercepts network requests at the **service worker layer**.
- Instead of hitting a real backend, requests are resolved using **mock handlers** defined in the project (inside `/src/mocks`).
- This allows us to develop and test the app in isolation, without depending on a live API.
- The `mockServiceWorker.js` file is auto-generated and should be committed to the repo, as it’s required for MSW to work correctly in local dev and tests.
