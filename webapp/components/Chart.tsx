import { useContext, useEffect } from 'react'
import { Line, defaults } from 'react-chartjs-2'
import useChart from '../hooks/useChart';
import { UserContext } from '../components/UserContext'

export default function Chart({className}) {

  const { token, loading } = useContext( UserContext );
  const { data, isLoading } = useChart(token, loading);

  const getChartData = canvas => {
      let newDatasets =  data.datasets.map(set=>{
        return {
          ...set,
          backgroundColor: "rgba(0, 0, 0, 0)",
          pointBackgroundColor: "#427e3d",
          borderColor: "#427e3d",
          borderWidth: 2,
        }
      })
      return {
        ...data,
        datasets: newDatasets
      };
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