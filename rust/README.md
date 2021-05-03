# You should know

These rust programs are self-contained `script` files. Although there are many ways to do this, including utilizing the `bin` directory alongside the `cargo run --bin filename.rs` as well as the option of using rust `Workspaces`. I chose to use a third-party rust library called [rust-script](https://rust-script.org/).

You can easily install rust script:

```PowerShell
$ cargo install rust-script
```

You may then run any one of these scripts using

```PowerShell
rust-script filename.rs
```

Provided you are `cd`ed there ofc

---

`snippet.rs` is a boilerplate I use for VScode

---

I would suggest you create an alias for rust-script because it's annoying to write. I chose to use `rs`

```Powershell
Set-Alias -Name rs -Value rust-script
```
