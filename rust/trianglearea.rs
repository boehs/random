#!/usr/bin/env rust-script
//! ```cargo
//! [package]
//! name = "trianglearea"
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
use std::io::stdin;

fn main() {
    println!("Enter the length of the first line");
    let mut l1 = String::new();
    stdin().read_line(&mut l1).ok().expect("Failed to read line");
    println!("Enter the length of the second line");
    let mut l2 = String::new();
    stdin().read_line(&mut l2).ok().expect("Failed to read line");
    println!("Enter the length of the third line");
    let mut l3 = String::new();
    stdin().read_line(&mut l3).ok().expect("Failed to read line");
    let l1: f64 = l1.trim().parse().unwrap();
    let l2: f64 = l2.trim().parse().unwrap();
    let l3: f64 = l3.trim().parse().unwrap();

    //idk somehow my math is wrong
    let s = (l1+l2+l3) / 2.0;
    let result = (s * (s-l1) * (s-l2) * (s-l3)).sqrt();
    println!("The result is {}",result)
}

// vim: set ft=rust sw=4 sts=4 expandtab :
