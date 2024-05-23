import { VChart } from "@visactor/react-vchart";
import React from "react";

const commonSpec = {
  type: "line",
  xField: "year",
  yField: "count",
  seriesField: "medalType",
  legends: { visible: true },
};

const data = [
  [40, 32, 34, 36, 45, 33, 34, 83, 36, 37, 44, 37, 35, 36, 46],
  [19, 25, 21, 26, 28, 31, 35, 60, 31, 34, 32, 24, 40, 38, 29],
  [17, 17, 16, 28, 34, 30, 25, 30, 27, 37, 25, 33, 26, 36, 29],
].map((arr, outer) => {
  const type = ["Gold", "Silver", "Bronze"][outer];
  return arr.map((item, inner) => ({
    year: `${inner * 4 + 1952}`,
    count: item,
    medalType: type,
  }));
});

const spec =() => {
  return {
    ...commonSpec,
    title: {
      visible: true,
      text: "Multi-series line chart",
      subtext: "This is a multi-series line chart",
    },
    data: {
      values:
        data[0].concat(data[1]).concat(data[2]),
    },
  };
};

export default function Dashboard() {
  return (
    <div style={{ height: 440 }}>
      <VChart
        key={"multiple"}
        spec={spec()}
        option={{ mode: "desktop-browser" }}
      />
    </div>
  );
}
