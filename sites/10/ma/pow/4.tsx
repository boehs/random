import { render } from "solid-js/web";
import { createSignal, For, createEffect } from "solid-js";

function Counter() {
  const [i, setI] = createSignal(1);

  const grid = () => {
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
    if(grid[i() + 1] && grid[i() + 1][i() + 1] != undefined) grid[i() + 1][i() + 1] = true;
    return grid;
  };

  return (
    <>
      <For each={grid()}>
        {(row) => (
          <div
            style={{
              display: "flex",
            }}
          >
            <For each={row}>
              {(circle) => (
                <div
                  style={{
                    "background-color": `${circle ? "red" : "white"}`,
                    height: `${((document.body.clientHeight - 60) / (1 + i() * 2))-4}px`,
                    width: `${document.body.clientWidth / (1 + i() * 2)}px`
                  }}
                >
                  {circle}
                </div>
              )}
            </For>
          </div>
        )}
      </For>
      <div
        style={{
          display: "flex",
          "justify-content": "space-between",
        }}
      >
        <div>
          <button onClick={() => setI(() => i() + 1)}>+ {i()}</button>
          <button onClick={() => setI(() => i() - 1)}>- {i()}</button>
          <input
            type="number"
            value={i()}
            onInput={(e) => setI(e.target.value ? Number(e.target.value) : 0)}
          />
        </div>
        <div>
          {
            grid()
              .flat(1)
              .filter((circle) => circle).length
          }
        </div>
      </div>
    </>
  );
}

render(() => <Counter />, document.getElementById("app")!);
