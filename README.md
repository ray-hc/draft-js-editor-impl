# Draft.JS Editor Implementation

This repository has my extension/implementation of Facebook's Draft.js editor, which provides a React-based rich-text editor framework. This was created by me for my team's Full-Stack Web Development final project, Our Stories (demo [here](https://cs52-ourstories.netlify.app/)). I have tidied up some of the code to make the rich-text editor a standalone project, which you can see here!

## Editor Components

### New Page

New Page implements the Draft JS editor, a library/component built by FB to enable all sorts of rich-text. This editor is extended by the Draft.Js Plugins library to allow even more custom behavior. Simply put, Draft JS editors save pages as JSON objects containing blocks of text with style properties. 

### Plugins

The Draft.Js Plugins editor accepts list of plugin objects which allow us to add fancy styling. Plugins function allows us to create, use consistent of plugins in any editor. The Draft-JS-Plugins library provides some out-of-the-box plugins for adding styling to Draft-JS, but it also allows to build our own custom plugins -- much help in this from [Plugins docs](https://github.com/draft-js-plugins/draft-js-plugins). 

These plugins allow for the insertion of:

* PDFs
* Videos
* Images
* Highlighted text
 
### Load-Page

We save the JSON editor object as a string to local storage, and this function allows us to reconvert that string back into object when loading.

### Embed-Picker / Media-Picker

Modal windows for uploading content via upload (using S3) or link.

## Services

### S3

All file attachments uploaded from computer can be stored in an S3 bucket. This code uses the backend of the OurStories project to generate signed request then sends it back to frotend to "do" the upload.