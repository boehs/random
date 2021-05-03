#!/usr/bin/env rust-script
//! ```cargo
//! [package]
//! name = "countto100"
//! authors = ["Evan Boehs"]
//! version = "0.1.0"
//! license = "Commons Clause Apache-2.0"
//! edition = "2018"
//!
//! [dependencies]
//! 
//! ```
// Copyright 2021, Evan Boehs

#![forbid(unsafe_code)]

fn main() {
    for n in 0..101 {
        println!("{}",n)
    }
}

// vim: set ft=rust sw=4 sts=4 expandtab :
