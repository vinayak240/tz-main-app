import { useEffect, useState } from "react";

export default function TestApp() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => setCount(count + 1), 1000);
  }, [count]);

  return (
    <div className="App">
      <h1>{count}</h1>
    </div>
  );
}
