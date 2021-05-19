#!/usr/bin/env rust-script
//! ```cargo
//! [package]
//! name = "popup"
//! authors = ["Evan Boehs"]
//! version = "0.1.0"
//! license = "Commons Clause Apache-2.0"
//! edition = "2018"
//!
//! [dependencies]
//! native-windows-gui = "1.0.11"
//! native-windows-derive = "1.0.3" # Optional. Only if the derive macro is used.
//! ```
// Copyright 2021, Evan Boehs

/*!
    A very simple application that show your name in a message box.
    See `basic` for the version without the derive macro
*/

#![windows_subsystem = "windows"]

extern crate native_windows_gui as nwg;
extern crate native_windows_derive as nwd;

fn main() {
    nwg::init().expect("Failed to init Native Windows GUI");
    let p = nwg::MessageParams {
        title: "Virus Alert !",
        content: "Hi, I am an Albanian virus but because of poor technology in my country unfortunately I am not able to harm your computer. Please be so kind to delete one of your important files yourself and then forward me other users. Many thanks for your cooperation!  Best regards,Albanian virus",
        buttons: nwg::MessageButtons::YesNoCancel,
        icons: nwg::MessageIcons::Error,
    };
    nwg::message(&p);
    
}
