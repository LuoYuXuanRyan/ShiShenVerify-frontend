import React, { useState, useCallback } from "react";
import { VChart } from "@visactor/react-vchart";
import { Radio, RadioGroup } from '@douyinfe/semi-ui';

const commonSpec = {
  type: 'pie',
  data: [
    {
      id: 'id0',
      values: [
        { type: '识别成功', value: '96' },
        { type: '识别失败', value: '3' },
        { type: '无法识别', value: '1' }
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
    text: '第一层识别结果',
    subtext: null,
  },
  legends: {
    visible: true,
    orient: 'right'
  },
}


export default function PieChartFirst(){
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <VChart
        spec={{
          ...commonSpec,
          ...donutChart,
        }}
        option={{ mode: "desktop-browser" }}
        style={{ height: 440, width: 680 }}
      />
    </div>
  );
}
