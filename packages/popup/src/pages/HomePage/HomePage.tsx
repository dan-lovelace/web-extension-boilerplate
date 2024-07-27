import { useState } from "preact/hooks";

import "./HomePage.css";

export default function HomePage() {
  const [count, setCount] = useState(0);

  return (
    <div id="home-page">
      <h1>Web Extension Boilerplate</h1>
      <p>
        Made with{" "}
        <a href="https://vitejs.dev/" target="_blank">
          Vite
        </a>{" "}
        +{" "}
        <a href="https://preactjs.com/" target="_blank">
          Preact
        </a>
        . Save changes to the Popup package and click the icon in your toolbar
        to see changes in real-time.
      </p>
      <button onClick={() => setCount(count + 1)}>Count is: {count}</button>
    </div>
  );
}
