import * as echarts from "echarts"
import { useEffect, useRef } from "react"

const echartInit = (node, title, xData, yData) => {
  let echart = echarts.init(node)
  echart.setOption({
    title: {
      text: title
    },
    tooltip: {},
    xAxis: {
      data: xData
    },
    yAxis: {},
    series: [
      {
        name: '满意度',
        type: 'bar',
        data: yData
      }
    ]
  })
}
function Bar ({ title, xData, yData, style }) {
  const echartRef = useRef(null)
  useEffect(() => {
    echartInit(echartRef.current, title, xData, yData)
  }, [title, xData, yData])
  return <div ref={echartRef} style={style}></div>
}

export default Bar