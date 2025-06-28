**DEV README**

Welcome! If you are a dev working on this react app, you're in the right place.
To start a live server so you can view your changes on localhost in real time, run "npm start" in your powershell/VS terminal.
If you run into a "scripts disabled" error when trying to run commands like npm start, run the following command to bypass the script execution policy on just that terminal session:

    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

Components have been broken up into several .js files in /src, and the best practice is to have a separate file for each component.
If you see multiple component functions in one file, please separate them and handle the imports at the top of files so that we can keep track accordingly.


**If you are a dev and run into any issues that may be important to other devs, please add to this readme so we can keep this updated!