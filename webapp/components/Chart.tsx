import { useContext, useEffect } from 'react'
import { Line, defaults } from 'react-chartjs-2'
import useChart from '../hooks/useChart';

export default function Chart({className, token}) {

  const { data, isLoading } = useChart(token);

  const getChartData = () => {
      let e = data.datasets.map(set=>{
        return {
          ...set,
          backgroundColor: "rgba(0, 0, 0, 0)",
          pointBackgroundColor: "#427e3d",
          borderColor: "#427e3d",
          borderWidth: 2,
        }
      })
      ///console.log(e);
      return e;
  }

  return (
    <div className={className}>
      <Line
        options={{
          responsive: "true",
          legend: {
            display: false
        },
        }}
        data={getChartData}
        redraw
      />
    </div>
  )

}