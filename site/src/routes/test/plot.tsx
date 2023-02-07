import Graph from '~/components/Graph'

export default function Plot() {
  return <main>
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
  </main>
}