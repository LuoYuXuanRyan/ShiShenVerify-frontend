import { VChart } from "@visactor/react-vchart";

const commonSpec = {
  type: "line",
  xField: "date",
  yField: "count",
  seriesField: "medalType",
  legends: { visible: true },
};

const data = [
  [
    150, 74, 52, 113, 148, 130, 127, 103, 89, 105, 116, 112, 140, 113, 149, 71,
    86, 136, 131, 112, 145, 145, 50, 87, 138, 104, 105, 102, 101, 84, 61, 120,
    148,
  ],
  [
    10, 4, 5, 15, 14, 15, 15, 15, 10, 7, 15, 15, 15, 12, 15, 6, 8, 10, 10, 10,
    15, 15, 4, 10, 15, 15, 11, 10, 15, 6, 4, 15, 14,
  ],
].map((arr, outer) => {
  const type = ["第一层识别", "第二层识别"][outer];
  return arr.map((item, inner) => {
    const date = new Date(2024, 2, 29); // 月份是0索引的，所以2代表3月
    date.setDate(date.getDate() + inner);
    const formattedDate = date.toISOString().split("T")[0];
    return {
      date: formattedDate,
      count: item,
      medalType: type,
    };
  });
});

console.log(data);

const spec = () => {
  return {
    ...commonSpec,
    title: {
      visible: true,
      text: "识别人数",
      subtext: null,
    },
    data: {
      values: data[0].concat(data[1]),
    },
  };
};

export default function LineChart() {
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
