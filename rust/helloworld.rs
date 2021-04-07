#!/usr/bin/env rust-script
//! ```cargo
//! [package]
//! name = "helloworld"
//! authors = ["Evan Boehs"]
//! version = "0.1.0"
//! license = "Commons Clause Apache-2.0"
//! edition = "2018"
//!
//! [dependencies]
//! gumdrop = "0.8"
//! ```
// Copyright 2021, Evan Boehs

#![forbid(unsafe_code)]

extern crate gumdrop;
use gumdrop::Options;

#[derive(Debug, Options)]
struct MyOptions {
    // NOTE: This will panic on paths containing invalid UTF-8
    #[options(free)]
    inpath: Vec<String>,

    #[options(help = "print help message")]
    help: bool,
}

fn main() {
    let _opts = MyOptions::parse_args_default_or_exit();

    println!("Hello World!")

}

// vim: set ft=rust sw=4 sts=4 expandtab :
