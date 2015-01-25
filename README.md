Shapelink API
===================

Node client for the [Shapelink API](http://developer.shapelink.com/index.php/Main_Page).

## Install

```javascript
npm install shapelink-node-sdk
```

## Usage

```javascript
var Shapelink = require('shapelink-node-sdk').Shapelink;
var shapelink = new Shapelink("YOUR_API_KEY", "YOUR_SECRET", 'sv', true);
```

## Implemented methods

* auth.RequireToken
* diary.GetStrengthExercises
* statistic.GetStrengthExerciseHistory

Feel free to submit a pull request if you implement other methods.