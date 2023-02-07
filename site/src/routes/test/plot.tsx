import Graph from '~/components/Graph'

export default function Plot() {
  return <main>
    <h1>Basics</h1>
    <Graph data={[{
      fn: 'x^2'
    }, {
      fn: 'tan(x)',
      derivative: {
        fn: '1 / (cos(x) ^ 2)',
        updateOnMouseMove: true
      }
    }, {
      fn: 'sin(x)',
    }, {
      r: '2 * sin(4 theta)',
      fnType: 'polar',
      graphType: 'polyline'
    }]} />
    <Graph data={[{
      x: 't - 1.6cos(24t)',
      y: 't - 1.6sin(25t)',
      range: [-10 * Math.PI, 10 * Math.PI],
      fnType: 'parametric',
      graphType: 'polyline'
    }]} />
  </main>
}