import React from "react";
import LineChart from "./LineChart";
import PieChartFirst from "./PieChartFirst";
import PieChartSecond from "./PieChartSecond";

export default function Dashboard() {
  return (
    <>
      <div style={{ height: '45vh' }}>
        <LineChart />
      </div>
      <div style={{ display: 'flex', height: '45vh' }}>
        <div style={{ width: '45vw' }}>
          <PieChartFirst />
        </div>
        <div style={{ width: '45vw' }}>
          <PieChartSecond />
        </div>
      </div>
    </>
  );
}
