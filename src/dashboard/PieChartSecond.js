import React from "react";
import { VChart } from "@visactor/react-vchart";

const commonSpec = {
  type: 'pie',
  data: [
    {
      id: 'id0',
      values: [
        { type: '识别成功', value: '98' },
        { type: '识别失败', value: '2' },
        { type: '无法识别', value: '0' }
      ]
    }
  ],
  valueField: 'value',
  categoryField: 'type',
  label: {
    visible: true
  },
  tooltip: {
    mark: {
      content: [
        {
          key: datum => datum['type'],
          value: datum => datum['value'] + '%'
        }
      ]
    }
  }
};

const donutChart = {
  title: {
    visible: true,
    text: '第二层识别结果',
    subtext: null,
  },
  legends: {
    visible: false,
    orient: 'right'
  },
}

export default function PieChartSecond(){
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <VChart
        spec={{
          ...commonSpec,
          ...donutChart,
        }}
        option={{ mode: "desktop-browser" }}
        style={{ height: '45vh', width: '45vw' }}  // Adjust the height and width to 45% of viewport height and width
      />
    </div>
  );
}
