import Bar from "@/components/bar/bar"



function Home () {
  const title = '主流框架满意度'
  const xData = ['Vue', 'React', 'Angular']
  const yData = [30, 40, 50]
  const yDataSec = [70, 80, 50]
  const style = { width: '500px', height: '400px' }
  return (<div className="home" style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'space-around' }}>
    <Bar title={title} xData={xData} yData={yData} style={style} />
    <Bar title='三大框架使用度' xData={xData} yData={yDataSec} style={style} />
  </div>

  )
}

export default Home