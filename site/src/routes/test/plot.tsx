import Graph from '~/components/data/Graph'
import PTitle from '~/components/Title'

export default function Plot() {
  return <main>
    <PTitle>Plotting Tests</PTitle>
    <h2>Basics</h2>
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
    <h2>Baby's first parametric equation</h2>
    <Graph data={[{
      x: 't - 1.6cos(24t)',
      y: 't - 1.6sin(25t)',
      range: [-10 * Math.PI, 10 * Math.PI],
      fnType: 'parametric',
      graphType: 'polyline'
    }]} />
    <h2>Sym test</h2>
    <Graph data={[
      { fn: 'abs(x)' },
      { fn: 'sqrt(x)' },
      { fn: 'PI' },
      {
        r: 'theta',
        fnType: 'polar',
        graphType: 'polyline'
      },
    ]} />
  </main>
}