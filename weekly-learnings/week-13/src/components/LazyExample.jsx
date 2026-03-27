import React, { Suspense, useState } from "react";

const Chart = React.lazy(() => import("./Chart"));

export default function LazyExample() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <h2>Lazy Loading Example</h2>

      <button onClick={() => setShowChart(true)}>Load Chart</button>

      <Suspense fallback={<p>Loading Chart...</p>}>
        {showChart && <Chart />}
      </Suspense>
    </div>
  );
}
