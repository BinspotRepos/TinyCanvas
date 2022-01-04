# TinyCanvas
A light weight HTML canvas framework for advanced canvas drawing with JavaScript. It also support object based drawing with events (click, hover, ...) on a specific object in the drawing scene.

# Usage

```
  var canvasElement = document.getElementById("canvas");
  var tinyCanvas = TinyCanvas(canvasElement, canvasElement.innerWith, canvasElement.innnerHeight);
  tinyCanvas.setFillStyle("blue");
  tinyCanvas.setStrokeStyle("yellow");
  tinyCanvas.setLineWidth(3);
  tinyCanvas.startPath()
            .setLineWidth(3)
            .moveTo(2*(tinyCanvas.viewport.width/3), 50)
            .lineTo(2*(tinyCanvas.viewport.width/3) + 60, 100)
            .strock("blue");
  
  var tObject = new TinyCanvasObject(tinyCanvas).init();
```
