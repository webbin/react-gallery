import React from 'react';

interface Props {
  width: number;
  height: number;
  data: {
    color: string;
    value: number;
    label: string;
  }[];
}

const PieChart = (props: Props) => {
  const { data, width, height } = props;
  const total = data.reduce((sum, { value }) => sum + value, 0);
  let currentAngle = -90;

  return (
    <svg
      style={{
        position: 'absolute',
        left: 100,
        top: 200,
      }}
      width={width}
      height={height}
    >
      {data.map((slice) => {
        const { color, value, label } = slice;
        const percentage = (value / total) * 100;
        const angle = (percentage / 100) * 360;
        const x1 = width / 2;
        const y1 = height / 2;
        const x2 = x1 + Math.cos((currentAngle * Math.PI) / 180) * (width / 2);
        const y2 = y1 + Math.sin((currentAngle * Math.PI) / 180) * (height / 2);

        const textX =
          x1 +
          Math.cos(((currentAngle + angle / 2) * Math.PI) / 180) *
            (width / 3);
        const textY =
          y1 +
          Math.sin(((currentAngle + angle / 2) * Math.PI) / 180) *
            (height / 3);

        if (angle <= 0) {
          return null;
        }

        const largeArcFlag = angle > 180 ? 1 : 0;
        const pathData = `M${x1},${y1} L${x2},${y2} A${width / 2},${
          height / 2
        } 0 ${largeArcFlag},1 ${
          x1 + Math.cos(((currentAngle + angle) * Math.PI) / 180) * (width / 2)
        },${
          y1 + Math.sin(((currentAngle + angle) * Math.PI) / 180) * (height / 2)
        } Z`;

        currentAngle += angle;

        console.log('path data: ', pathData);
        return (
          <g key={color}>
            <path d={pathData} fill={color} />
            <text
              x={textX}
              y={textY}
              fill="white"
              textAnchor="middle"
              dominantBaseline="hanging"
              fontSize="12"
              // rotate={90}
              // transform='rotate(90)'
              width="50"
            >
              {label || `${percentage.toFixed(1)}%`}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default PieChart;
