noevalleynurseryschool.github.io
================================

This website was created by [Chris Yap](https://www.chrisyap.com) (Enso's dad!).  Feel free to get in touch with any issues or questions.

## Full environment dependencies

The following dependencies are required if you want to run the full NVNS website environment on your computer for development and local previewing.

* Linux/Unix or Mac OS
* Node.js / NPM (Package management for the Gulp CSS and Javascript asset build system)
* Bower (Front-end asset package management)
* Ruby / RubyGems (Package management and engine for the Jekyll environment)

## Overview for making site updates

You can make simpler text and page updates without previewing locally and getting the environment running by simply checking out the Github repository, editing files, and pushing back to the repo.  Since the site is hosted on Github page, which has Jekyll built-in, simply pushing the HTML pages back to repo will automatically trigger build and deployment.  Easy.

However, making changes to assets that are built, such as Javascript or CSS changes (the latter of which is pre-processed and written in LESS) requires that at least the asset build system (Gulp) be running.

## System components

* Jekyll ([https://jekyllrb.com](https://jekyllrb.com))
* Liquid templating
* Gulp ([http://gulpjs.com](http://gulpjs.com/))
* LESS css ([http://lesscss.org/](http://lesscss.org/))
* AngularJS ([https://angularjs.org/](https://angularjs.org/))
* jQuery ([https://jquery.com/](https://jquery.com/))

## Troubleshooting

### Gulp

#### Changes to CSS and JS don't seem to be reflected in my dev environment

If you attempted to save invalid JS or CSS, it's possible that the minification processes caused Gulp to exit with an exception.  

First of all, this means that your saves going forward won't be processed until you restart Gulp, and you might not realize it for a while.

Secondly, sometimes Ruby fails to release the machine's process when exiting, meaning that when you start Gulp back up, it can behave erratically if it can't serve itself off of the address and port (default would be localhost:4000) it expects to.  When this happens you'll probably see some warning in the console output when restarting Gulp that looks like this:

`[19:14:46] Jekyll: jekyll 3.4.0 | Error:  Address already in use - bind(2)`

When this happens, you can look up the process ID and force it to stop using `kill`.

First, find the process ID with:

`lsof -wni tcp:4000` or `ps aux | grep jekyll`

Then, kill the process.  For example, if the PID you found from the previous command was `12345`:

`kill -9 12345`

## ToDos

* Convert LESS to SASS CSS pre-processing for better integration with Jekyll on Github and enabling us to fully edit this site without necessarily needing to get the environment running locally.
