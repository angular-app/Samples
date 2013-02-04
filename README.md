Book Samples
=======

## Sample code - chapter by chapter

Each chapter has its own folder, which will correspond to the zip file name for that chapter on submission.
Within each chapter folder is a folder for each sample.  The folder should contain enough to run the sample independent of the other samples, including tests.
There is an index (i.e. 01, 02, etc.) in front of each sample so that you can see the order in which they appear in the chapter.
Where the sample has a corresponding Plunk, the Plunk ID is added in brackets after the name of the sample in the folder name.

## Library files

There is a common folder for libraries called lib.

## Testing

There is a basic grunt file that can run all the unit tests.

You need to install the grunt CLI and testacular globally:

```
npm -g install grunt-cli testacular
```

You also need the grunt library locally (using the values in the package.json):

```
npm install grunt
```

Run grunt to check for jslint errors, generate HTML2JS templates and execute all the samples' tests.

```
grunt.cmd
```