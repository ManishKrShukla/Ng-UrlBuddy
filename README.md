# attndc-mgmt

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

The app revolves around the following frameworks : 

--> Angular
--> Bower
--> Gulp
--> Angular UI Router
--> Angular Material
--> Taffy
--> JSHAshes

It's a basic prototype for attendance management. Too minimaslistic to be called a system. 

## Build & development

In the root folder, hit npm install, followed by bower install. And that should mark your app as execution ready.

Run `gulp` for building and `gulp serve` for preview.

## TODO

--> Implementation of $q.mapSeries. Went through the original API, it needs better understanding. Hence couldn't pick it up.
--> Exact signature for the callback of all the decorator methods on $q. Was running out of time, and had laptop related issues, hence couldn't focus.

--> Rigid database structure. As of now, each module, i.e., USer and Attendance go into seperate databases. An ideal implementation should have one seperate service for dbs and other services accessing it.

--> Smooth UI for tables. Couldn't find any material design specific library that supports col and row spanning, hence focused on the funtionality rather than UI.

There are many UI improvements that can be introduced to the overall prototype, but in anent to the time constraint and other considerations, they are left out in favor of achieving maximum functionlity.
