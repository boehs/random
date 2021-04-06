#!/usr/bin/env rust-script
//! TODO: Description Here
//!
//! Copyright CURRENT_YEAR, Evan Boehs
//!
//! ```cargo
//! [package]
//! name = "helloworld"
//! authors/*  */ = ["Evan Boehs"]
//! version = "0.1.0"
//! license = "Commons Clause Apache-2.0"
//! edition = "2018"
//!
//! [dependencies]
//! gumdrop = "0.8"
//! ```
#![forbid(unsafe_code)]

use std::path::PathBuf;
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
    let opts = MyOptions::parse_args_default_or_exit();

    todo!();
    
    println!("Hello, World!")
}

// vim: set ft=rust sw=4 sts=4 expandtab :