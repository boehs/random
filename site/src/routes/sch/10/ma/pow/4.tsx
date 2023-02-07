import { Accessor, createMemo, createSignal, Setter, Show } from "solid-js";
import Grid from "~/components/Grid";

export default function Counter(props: {
  i: [Accessor<number>, Setter<Number>]
}) {
  const [i, setI] = props.i || createSignal(1);

  const grid = createMemo(() => {
    let grid = Array(1 + i() * 2)
      .fill(Array(1 + i() * 2).fill(true))
      .map((row, idx) =>
        idx > i()
          ? row
          : Array(i() + 1)
            .fill(false)
            .concat(row.slice(i() + 1))
      );
    grid[0][i()] = true;
    grid[i()][0] = true;

    grid = grid
      .reverse()
      .map((row, idx) =>
        idx >= i() ? row : row.slice(0, i() + 1).concat(Array(i()).fill(false))
      )
      .reverse();
    if (grid[i() + 1] && grid[i() + 1][i() + 1] != undefined) grid[i() + 1][i() + 1] = true;
    return grid;
  })
  
  const filled = () => grid()
    .flat(1)
    .filter((circle) => circle).length

  return (
    <>
      <Show when={!props.i}>
        <h1>Pow #4</h1>
      </Show>
      <Grid grid={grid()} />
      <Show when={!props.i}>
        <div class="toolbar">
          <button onClick={() => setI(() => i() + 1)}>+</button>
          <button onClick={() => setI(() => i() - 1)} disabled={i() == 0}>-</button>
          <input
            type="number"
            value={i()}
            onInput={(e) => setI((e.target as HTMLInputElement).value ? Number((e.target as HTMLInputElement).value) : 0)}
            min={0}
          />
          <div class="chip" style={{"--offset": filled() / 20 + 'px'}}>
            {filled()}
          </div>
        </div>
        <div>
          <input type="range" min={0} max={50}
            value={i()}
            onInput={(e) => setI((e.target as HTMLInputElement).value ? Number((e.target as HTMLInputElement).value) : 0)}
          />
        </div>
      </Show>
    </>
  );
}