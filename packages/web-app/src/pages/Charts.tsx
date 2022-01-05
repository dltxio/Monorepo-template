import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import ChartCard from "../components/dashboard/Chart/ChartCard";
import ChartLegend from "../components/dashboard/Chart/ChartLegend";
import PageTitle from "../components/dashboard/Typography/PageTitle";
import {
  barLegends,
  barOptions,
  doughnutLegends,
  doughnutOptions,
  lineLegends,
  lineOptions
} from "../utils/demo/chartsData";

type Props = {};

const Charts: React.FC<Props> = props => {
  return (
    <>
      <PageTitle>Charts</PageTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Doughnut">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Lines">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>

        <ChartCard title="Bars">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard>
      </div>
    </>
  );
};

export default Charts;
