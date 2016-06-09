# ThemeDelta Visualization

A web-based tool to visualize temporal trends, clustering, and reorganization in time-indexed textual datasets.
To get additional information about the tool and underlying topic modeling algorithm please refer to the <a href="http://www.umiacs.umd.edu/~elm/projects/theme-delta/theme-delta.pdf">ThemeDelta</a> paper

## Usage

Open index.html file to see an example data visualization.
To visualize your data using the tool -- go to file ThemeData.js and update following variables

* themes_string --- 3D array used to provide topic labels in different segments based on individual time stamps
* themes_freq --- 3D array used to provide topic frequency in different segments based on individual time stamps
* timeStamps --- 1D array used to specify time stamps for the visualization

## Supported Browser(s)

Chrome
