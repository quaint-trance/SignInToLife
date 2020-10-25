import { useContext, useEffect } from 'react'
import { Line, defaults } from 'react-chartjs-2'
import useChart from '../hooks/useChart';
import { UserContext } from '../components/UserContext'

export default function Chart() {

  const { token, loading } = useContext( UserContext );
  const { data, isLoading } = useChart(token, loading);

  defaults.global.defaultFontColor = "#fff";
  defaults.global.defaultScalesColor = "#fff"

  const getChartData = canvas => {
      let newDatasets =  data.datasets.map(set=>{
        return {
          ...set,
          backgroundColor: `rgba(255, 255, 255, 0)`,
          pointBackgroundColor: "#ffffff",
          borderColor: "#ffffff",
          borderWidth: 3,
          pointBorderWidth: 5,
        }
      })
      return {
        ...data,
        datasets: newDatasets
      };
  }

  return (
    <div>
      <Line
        options={{
          responsive: "true",
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              gridLines: {
                color: 'rgba(255, 255, 255, 0.3)'
              }
            }],
            xAxes: [{
              gridLines: {
                color: 'rgba(255, 255, 255, 0.3)'
              }
            }]
          }
        }}
        data={getChartData}
        redraw
      />
    </div>
  )
}
