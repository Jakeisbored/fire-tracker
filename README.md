<p align="center">
   <img src="https://raw.githubusercontent.com/kokkoooo/fire-tracker/master/header.png?token=AKIFUTBH4QANTQQVFZHD34C6GMSWQ" alt="Header">
</p>

<p align="center">
  Powerful, flexible and easy-to-use package for scraping info from Free Fire servers
</p>

<p align="center">
  <a href="https://travis-ci.org/kokkoooo/fire-tracker">
    <img src="https://travis-ci.org/kokkoooo/fire-tracker.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://coveralls.io/github/kokkoooo/fire-tracker?branch=master">
    <img src="https://coveralls.io/repos/github/kokkoooo/fire-tracker/badge.svg?branch=master" alt="Coverage Status">
  </a>
  <a href="https://david-dm.org/kokkoooo/fire-tracker">
    <img src="https://david-dm.org/kokkoooo/fire-tracker/status.svg" alt="dependencies Status">
  </a>
  <a href="https://david-dm.org/kokkoooo/fire-tracker?type=dev">
    <img src="https://david-dm.org/kokkoooo/fire-tracker/dev-status.svg" alt="devDependencies Status">
  </a>
  <a href="https://david-dm.org/kokkoooo/fire-tracker?type=peer">
    <img src="https://david-dm.org/kokkoooo/fire-tracker/peer-status.svg" alt="peerDependencies Status">
  </a>
</p>

# Getting started
1. Install the package
2. Here is a list of functions available for now :
   *function*:`output@type`:**params@type**
   *wallpapersScrap(type)*:`wallpapers@array`:**type@string**
   *charactersScrap()*:`characterss@array`:**none@none**
   *weaponsScrap(type,name)*:`wallpapers@array`:**type@string/name@string**

# Example
   <code>
   	const fire-tracker = require('fire-tracker');
   	fire-tracker.weaponsScrap('All',(r,e)=>{
   	// We didn't include 'name' because we chose 'All' before.
     if(e) return;
     console.log(r);
   });
   </code>
  
# Features
- Fast , reliable and flexible.
- Easy to use.
- Open source.
- Self-updated.

# Contact Me
(Discord)[https://discord.gg/aPs6MgE]