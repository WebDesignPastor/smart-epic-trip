# Project

This is a base project to start to build a full stack app with
go/echo/HTMX/tailwindcss.

## Requirements

You need to have go, you can follow thoses steps to install it:
[Install go](https://go.dev/doc/install)

To install Tawilwind run :

```
npm install
```

Then install echo and templ with thoses commands :
```
go get github.com/labstack/echo/v4
go install github.com/a-h/templ/cmd/templ@latest
```
You can also check avaible extension in your IDE to get auto completion for Templ and tailwindcss.

## Commands

The base project is create to run on ubuntu, if you are using an other OS you'll have to adapt some commands.

You can find them in the Makefile.

To start and watch the project run :
```
air
```
To watch css run :
```
make css-watch
```
````
