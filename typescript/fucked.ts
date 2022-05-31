// `this` should not equal `window`, but it becomes window because it is shadowed by setInterval (in the window context)
// as of 5/2022, typescript does not detect it.
// you can fix it by changing
// `setInterval(this.ee,1000)` -> `setInterval(() => this.ee(),1000)`
// or `ee() {` -> `ee = () => {`
// 
class Help {
	constructor(ree) {
  	setInterval(this.ee,1000)
  };
  
  ee() {
  	console.log(this == window) // true
  };
}

new Help()
