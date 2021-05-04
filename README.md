# Bézier Curves


Web application made with HTML, CSS, JavaScript Vanilla and p5.js for creating Bézier curves.

Click [here](https://bezier-curves.netlify.app/) to access the application.

## About the interface
- button to create new curve;
- button to delete curve;
- buttons to switch between existing curves;
- field to define the number of evaluation points;
- buttons to hide / display:
  - control points;
  - control polygonals;
  - curves;
- interaction with the curves, allowing to insert, modify and delete control points.

## System requirements
- the evaluation points are made with the De Casteljau's algorithm;
- the curves are made by connecting the evaluated points;
- the number of curved evaluations is arbitrary (user-specified);
- the number of curved control points is arbitrary;
- the system responds to changes in real time;
- the system does not display crashes or memory overflow.
