noevalleynurseryschool.github.io
================================

This website was created by [Chris Yap](https://www.chrisyap.com) (Enso and Esme's dad!).  Feel free to get in touch with any issues or questions.

## Full environment dependencies

The following dependencies are required if you want to run the full NVNS website environment on your computer for development and local previewing.

* Linux/Unix or Mac OS
* Ruby (Language underlying Jekyll and RubyGems) - [https://www.ruby-lang.org/en/documentation/installation/](https://www.ruby-lang.org/en/documentation/installation/)
* RubyGems (Package management for the Jekyll environment - [https://rubygems.org/pages/download](https://rubygems.org/pages/download))
* Bundler (Helper that makes managing RubyGems on a project level much easier)[https://bundler.io/](https://bundler.io/)
* Node.js / NPM (Package management, used in this case for Gulp - [https://docs.npmjs.com/getting-started/installing-node](https://docs.npmjs.com/getting-started/installing-node))
* Bower (Front-end asset package management - [https://bower.io/#install-bower](https://bower.io/#install-bower))

If you are running Mac OS X, Ruby is probably already installed on your system.

## System components

* Jekyll ([https://jekyllrb.com](https://jekyllrb.com))
* Liquid templating
* Gulp ([http://gulpjs.com](http://gulpjs.com/))
* SASS css ([http://sass-lang.com/](http://sass-lang.com/))
* AngularJS ([https://angularjs.org/](https://angularjs.org/))
* jQuery ([https://jquery.com/](https://jquery.com/))

## Steps to get environment running locally

1. Clone the git repository to your system
2. Ensure you have all the dependencies noted above.
3. In a terminal, `cd` into the directory where you checked out the code
4. Run `npm install` (Note, depending on your situation, you may need to run this as `sudo`, e.g. `sudo npm install`)
5. Run `bundle install` (Note, depending on your situation, you may need to run this as `sudo`, e.g. `sudo bundle install`)
6. Run `gulp`.
7. Point your browser to `http://localhost:4000`

## Running the environment in Docker

1. Clone the git repository to your system.
2. Enter the $repo/docker directory.
3. Run `build_container.sh`
4. Run `run_docker.sh`
5. Point your browser to the URL shown in the output.

## Site maintenance

### Overview

You can make simpler text and page updates without previewing locally and getting the environment running by simply checking out the Github repository, editing files, and pushing back to the repo.  Since the site is hosted on Github page, which has Jekyll built-in, simply pushing the HTML pages back to repo will automatically trigger build and deployment.  Easy.

However, making changes to assets that are built, such as Javascript changes, requires that at least the asset build system (Gulp) be running.

### Details

Assuming you want to make more involved changes that require testing locally before updating the live site (e.g. making Javascript changes, you probably should test locally first before making live), you should get the environment running via the steps above.

#### Installing third party web assets

If you need to install new third-party packages for CSS or Javascript functionality, use bower. First search for packages on Bower's website, the install via `bower install <package name> -- save` (The `--save` flag is important to keep a record of all package dependencies for this website.  If all packages need to be installed again at some point in the future for some reason, a simple `bower install` will read from the saved package list and grab them all).

#### Editing NVNS Javascript or CSS

To edit `javascript` or `css`, look in the `_assets` directory.  All relevant assets live here.

#### Compiled files that you should not edit

* The `_site` directory contains the compiled site created by Jekyll.  **You should not edit or touch these files** as they will be overwritten by Jekyll.
* Similarly, the `dist` directory is compiled assets that will be copied by Jekyll into the actual site files in `_site`.  **Do not edit anything in here** as they will be overwritten by the system.

#### Adding and removing pages

It's advised to take a look at the [Jekyll website](https://jekyllrb.com) to get an idea of how Jekyll works.  The site structure should be fairly self-evident with a quick look at the Git repo.  Of particular note is **required** the block of code at the top of every HTML file that Jekyll refers to as `Front Matter`, such as:

```
---
layout: home
title: Home
id: home
group: nav_main
nav_order: 1
---
```

and

```
---
layout: default
title: Our Teachers
id: teachers
group: nav_about
nav_order: 1
---
```

It's mostly self-explanatory but here's a couple pointers for trickier bits:

* The `layout` field refers to the base template which is used to render the page with the page you are working on.  For the most part, you'll be using `default`
* The `group` setting helps Jekyll build the navigation system.  Top level items should use `nav_main`.  Subpages of a top-level item should use `nav_<section name>`, e.g. `nav_about`
* The `nav_order` field defines the order the items will appear in the navigation relative to each other.
* In general, follow the existing naming conventions such as using `underscores` and `dashes` when setting these fields, or your changes might behave erratically.

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

## To-Do

* Devise a way to improve asset pipeline implementation so that we can concatenate and minify Javascript assets using only Jekyll/Github.io-native solutions, enabling us to dispense with Gulp entirely.  Currently concatenate might be possible through the use of includes, but minify is not.  There are plenty of 3rd party Jekyll plugins that would accomplish this, but Github.io does not support the vast majority of plugins.
