var TinyCanvasObject = function(tinyCanvas){
    this.tinyCanvas = tinyCanvas;
    this.objectDrawTrace = [];
    this.tracePoints = [];
    this.isMouseOn = false;
    this.context = this.tinyCanvas.context;
    this.isOutOfTransform = false;
    this.path = null;
    this.index = TinyCanvasObject.instences.length;
    TinyCanvasObject.instences.push(this);
    this.childs = [];
    this.isHidden = false;
    this.canvasTransformData = {
        translate: {
            dx: 0, 
            dy: 0
        },
        scale: {
            sx: 1, 
            sy: 1
        }
    };
    this.drawerName = {
        beginPath: "beginPath",
        moveTo: "moveTo",
        lineTo: "lineTo",
        quadraticCurveTo: "quadraticCurveTo",
        bezierCurveTo: "bezierCurveTo",
        fill: "fill",
        stroke: "stroke",
        setFillStyle: "setFillStyle",
        setLineWidth: "setLineWidth",
        setStrokeStyle: "setStrokeStyle",
        setFontSize: "setFontSize",
        setFontFamily: "setFontFamily",
        drawText: "drawText", 
        closePath: "closePath", 
        enableShadow: "enableShadow", 
        disableShadow: "disableShadow",
        setShadowProperties: "setShadowProperties"
    };
    this.data = {};
    
    
    this.checkEventObject = (e) => {
        if(window.event){
            return window.event;
        }else{
            return e;
        }
    };
    
    this.getMousePosition = (e) => {
        let mX = e.clientX - $(this.tinyCanvas.canvasElement).offset().left;
        let mY = e.clientY - $(this.tinyCanvas.canvasElement).offset().top;
        
        if(!mX || !mY){
            mX = window.event.touches[0].clientX - $(this.tinyCanvas.canvasElement).offset().left;
            mY = window.event.touches[0].clientY - $(this.tinyCanvas.canvasElement).offset().top;
        }
        
        return {
            x: mX, 
            y: mY
        };
    };
    
    
    this.push = (drawerName, params = []) => {
        this.objectDrawTrace.push({
            name: drawerName, 
            pr: params
        });
        
        return this;
    };
    
    this.beginPath = () => {
        
        this.push(this.drawerName.beginPath);
        
        if(!this.isHidden){
            this.tinyCanvas.beginPath();
        }
        
        if(this.path !== null){
            delete this.path;
        }
        
        this.path = new Path2D();
        
        return this;
    };
    
    this.moveTo = (px, py) => {
        this.push(this.drawerName.moveTo, [px, py]);
        
        if(!this.isHidden){
            this.tinyCanvas.moveTo(px, py);
        }
        
        this.path.moveTo(px, py);
        
        this.tracePoints.push({
            x: px, 
            y: py
        });
        
        return this;
    };
    
    
    this.lineTo = (px, py) => {
       this.push(this.drawerName.lineTo, [px, py]);
       
       if(!this.isHidden){
           this.tinyCanvas.lineTo(px, py);
       }
       
       this.path.lineTo(px, py);
       
       this.tracePoints.push({
            x: px, 
            y: py
        });
       
       return this;
    };
    
    this.quadraticCurveTo = (p1x, p1y, p2x, p2y) => {
        this.push(this.drawerName.quadraticCurveTo, [p1x, p1y, p2x, p2y]);
        
        if(!this.isHidden){
            this.tinyCanvas.quadraticCurveTo(p1x, p1y, p2x, p2y);
        }
        
        this.path.quadraticCurveTo(p1x, p1y, p2x, p2y);
        
        this.tracePoints.push({
            x: p1x, 
            y: p1y
        });
        
        this.tracePoints.push({
            x: p2x, 
            y: p2y
        });
        
        return this;
    };
    
    
    
    this.bezierCurveTo = (p1x, p1y, p2x, p2y, p3x, p3y) => {
        this.push(this.drawerName.bezierCurveTo, [p1x, p1y, p2x, p2y, p3x, p3y]);
        
        if(!this.isHidden){
            this.tinyCanvas.bezierCurveTo(p1x, p1y, p2x, p2y, p3x, p3y);
        }
        
        this.path.bezierCurveTo(p1x, p1y, p2x, p2y, p3x, p3y);
        
        this.tracePoints.push({
            x: p1x, 
            y: p1y
        });
        
        this.tracePoints.push({
            x: p2x, 
            y: p2y
        });
        
        this.tracePoints.push({
            x: p3x, 
            y: p3y
        });
        
        return this;
    };   
    
    
    this.fill = (color = null) => {
        let params = color === null?[]:[color];
        this.push(this.drawerName.fill, params);
        
        if(!this.isHidden){
            this.tinyCanvas.fill(color);
        }
        
        
        return this;
    };
    
    
    this.stroke = (color = null) => {
        let params = color === null?[]:[color];
        this.push(this.drawerName.stroke, params);
        
        if(!this.isHidden){
            this.tinyCanvas.stroke(color);
        }
        
        return this;
    };
    
    
    this.setFillStyle = (color) => {
        this.push(this.drawerName.setFillStyle, [color]);
        
        if(!this.isHidden){
            this.tinyCanvas.setFillStyle(color);
        }
        
        
        return this;
    };  
    
    
    this.setLineWidth = (w) => {
        this.push(this.drawerName.setLineWidth, [w]);
        
        if(!this.isHidden){
            this.tinyCanvas.setLineWidth(w);
        }
        
        return this;
    };
    
    this.setStrokeStyle = (color) => {
        this.push(this.drawerName.setStrokeStyle, [color]);
        
        if(!this.isHidden){
            this.tinyCanvas.setStrokeStyle(color);
        }
        
        
        return this;
    };
    
    
    this.setFontSize = (s) => {
        this.push(this.drawerName.setFontSize, [s]);
        
        if(!this.isHidden){
            this.tinyCanvas.setFontSize(s);
        }
        
        return this;
    };
    
    
    this.setFontFamily = (f) => {
        this.push(this.drawerName.setFontFamily, [f]);
        
        if(!this.isHidden){
            this.tinyCanvas.setFontFamily(f);
        }
        
        return this;
    };
    
    this.drawText = (x, y, text, color = null) => {
        this.push(this.drawerName.drawText, [x, y, text, color]);
        
        if(!this.isHidden){
            this.tinyCanvas.drawText(x, y, text, color);
        }
        
        
        return this;
    };
    
    this.closePath = () => {
        this.push(this.drawerName.closePath);
        
        if(!this.isHidden){
            this.tinyCanvas.closePath();
        }
        
        return this;
    };
    
    
    this.enableShadow = (color = "black", blur = 5, offsetX = 0, offsetY = 0) => {
        this.push(this.drawerName.enableShadow, [color, blur, offsetX, offsetY]);
        
        if(!this.isHidden){
            this.tinyCanvas.enableShadow(color, blur, offsetX, offsetY);
        }
        
        return this;
    };
    
    this.disbaleShadow = () => {
        this.push(this.drawerName.disableShadow);
        
        if(!this.isHidden){
            this.tinyCanvas.disableShadow();
        }
        
        
        return this;
    };
    
    this.setShadowProperties = (color, blur, offsetX, offsetY) => {
        this.push(this.drawerName.setShadowProperties, [color, blur, offsetX, offsetY]);
        
        if(!this.isHidden){
            this.setShadowProperties(color, blur, offsetX, offsetY);
        }
        
        return this;
    };
    
    
    this.render = () => {
        if(this.isHidden){
            return this;
        }
        this.objectDrawTrace.forEach((trace) => {
            switch(trace.name){
                case this.drawerName.beginPath:
                    this.tinyCanvas.beginPath();
                    break;
                case this.drawerName.moveTo:
                    if(trace.pr.length >= 2){
                        let tmpX = trace.pr[0];
                        let tmpY = trace.pr[1];
                        if(this.getIsOutOfTransform()){
                            tmpX -= this.canvasTransformData.translate.dx;
                            tmpY -= this.canvasTransformData.translate.dy;
                            
                            tmpX /= (this.canvasTransformData.scale.sx);
                            tmpY /= (this.canvasTransformData.scale.sy);
                        }
                        this.tinyCanvas.moveTo(tmpX, tmpY);
                        
                        /*this.tracePoints.push({
                            x: trace.pr[0],
                            y: trace.pr[1]
                        });*/
                    }
                    break;
                case this.drawerName.lineTo:
                    if(trace.pr.length >= 2){
                        let tmpX = trace.pr[0];
                        let tmpY = trace.pr[1];
                        if(this.getIsOutOfTransform()){
                            tmpX -= this.canvasTransformData.translate.dx;
                            tmpY -= this.canvasTransformData.translate.dy;
                            
                            tmpX /= (this.canvasTransformData.scale.sx);
                            tmpY /= (this.canvasTransformData.scale.sy);
                        }
                        this.tinyCanvas.lineTo(tmpX, tmpY);
                        
                        /*this.tracePoints.push({
                            x: trace.pr[0],
                            y: trace.pr[1]
                        });*/
                    }
                    break;
                case this.drawerName.quadraticCurveTo:
                    if(trace.pr.length >= 4){
                        this.tinyCanvas.quadraticCurveTo(trace.pr[0], trace.pr[1], trace.pr[2], trace.pr[3]);
                        
                        /*this.tracePoints.push({
                            x: trace.pr[0],
                            y: trace.pr[1]
                        });
                        
                        this.tracePoints.push({
                            x: trace.pr[2],
                            y: trace.pr[3]
                        });*/
                    }
                    break;
                case this.drawerName.bezierCurveTo:
                    if(trace.pr.length >= 6){
                        this.tinyCanvas.bezierCurveTo(trace.pr[0], trace.pr[1], trace.pr[2], trace.pr[3], trace.pr[4], trace.pr[5]);
                        
                        /*this.tracePoints.push({
                            x: trace.pr[0],
                            y: trace.pr[1]
                        });
                        
                        this.tracePoints.push({
                            x: trace.pr[2],
                            y: trace.pr[3]
                        });
                        
                        this.tracePoints.push({
                            x: trace.pr[4],
                            y: trace.pr[5]
                        });*/
                    }
                    break;
                case this.drawerName.fill: 
                    if(trace.pr.length < 1){
                        this.tinyCanvas.fill();
                    }else{
                        this.tinyCanvas.fill(trace.pr[0]);
                    }
                    
                    break;
                case this.drawerName.stroke: 
                    if(trace.pr.length < 1){
                        this.tinyCanvas.stroke();
                    }else{
                        this.tinyCanvas.stroke(trace.pr[0]);
                    }
                    
                    break;
                case this.drawerName.setFillStyle: 
                    if(trace.pr.length >= 1){
                        this.tinyCanvas.setFillStyle(trace.pr[0]);
                    }
                    
                    break;
                case this.drawerName.setLineWidth: 
                    if(trace.pr.length >= 1){
                        this.tinyCanvas.setLineWidth(trace.pr[0]);
                    }
                    
                    break;
                case this.drawerName.setStrokeStyle: 
                    if(trace.pr.length >= 1){
                        this.tinyCanvas.setStrokeStyle(trace.pr[0]);
                    }
                    break;
                case this.drawerName.setFontSize: 
                    if(trace.pr.length >= 1){
                        let tmp1 = trace.pr[0];
                        if(this.getIsOutOfTransform()){
                            tmp1 = parseInt(tmp1.replace("px", ""), 10);
                            tmp1 /= (this.canvasTransformData.scale.sx);
                            tmp1 = tmp1+"px";
                            
                        }
                        this.tinyCanvas.setFontSize(tmp1);
                    }
                    break;
                case this.drawerName.setFontFamily: 
                    if(trace.pr.length >= 1){
                        
                        this.tinyCanvas.setFontFamily(trace.pr[0]);
                    }
                    break;
                case this.drawerName.drawText: 
                    if(trace.pr.length >= 4){
                        let tmp1 = trace.pr[0];
                        let tmp2 = trace.pr[1];
                        if(this.getIsOutOfTransform()){
                            tmp1 -= this.canvasTransformData.translate.dx;
                            tmp2 -= this.canvasTransformData.translate.dy;
                            
                            tmp1 /= (this.canvasTransformData.scale.sx);
                            tmp2 /= (this.canvasTransformData.scale.sy);
                            
                        }
                        this.tinyCanvas.drawText(tmp1, tmp2, trace.pr[2], trace.pr[3]);
                    }
                    break;
                case this.drawerName.enableShadow:
                    if(trace.pr.length >= 4){
                        this.tinyCanvas.enableShadow(trace.pr[0], trace.pr[1], trace.pr[2], trace.pr[3]);
                    }
                    break;
                    
                case this.drawerName.disableShadow:
                    this.tinyCanvas.disableShadow();
                    break;
                    
                case this.drawerName.setShadowProperties:
                    if(trace.pr.length >= 4){
                        this.tinyCanvas.setShadowProperties(trace.pr[0], trace.pr[1], trace.pr[2], trace.pr[3]);
                    }
                    break;
            }
           
        });
        
        this.childs.forEach((child) => {
            child.render();
        });
        
        return this;
    };
    
    this.isInnerPoint = (x, y) => {
        let out = true;
        
        let tDx = this.canvasTransformData.translate.dx;
        let tDy = this.canvasTransformData.translate.dy;
        
        let sDx = this.canvasTransformData.scale.sx;
        let sDy = this.canvasTransformData.scale.sy;
        
        if(this.getIsOutOfTransform()){
            tDx = 0;
            tDy = 0;
            sDx = 1;
            sDy = 1;
        }
        
        let tmpAllRight = true;
        for(let p of this.tracePoints){
            if(x >= (p.x*sDx + tDx)){
                tmpAllRight = false;
                break;
            }
        }
        
        let tmpAllLeft = true;
        for(let p of this.tracePoints){
            if((x <= (p.x*sDx + tDx))){
                tmpAllLeft = false;
                break;
            }
        }
        
        
        let tmpAllTop = true;
        for(let p of this.tracePoints){
            if((y >= (p.y*sDy + tDy))){
                tmpAllTop = false;
                break;
            }
        }
        
        let tmpAllBottom = true;
        for(let p of this.tracePoints){
            if((y <= (p.y*sDy + tDy))){
                tmpAllBottom = false;
                break;
            }
        }
        
        if(this.getIsOutOfTransform() || this.path === null){
            out = !tmpAllRight && !tmpAllLeft && !tmpAllTop && !tmpAllBottom; 
        }else{
            out = this.tinyCanvas.context.isPointInPath(this.path, x, y);
        }
        
        
        return out;
    };
    
    
    this.onClick = (callback = null) => {
        this.tinyCanvas.canvasElement.addEventListener("click", (e) => {
            let cp = this.getMousePosition(this.checkEventObject(e));
            if(typeof callback === "function"){
                if(this.isInnerPoint(cp.x, cp.y) && !TinyCanvasObject.hasClickCandidate){
                    
                    let hasUpperCandidate = false;
                    
                    for(let index = 0; index < TinyCanvasObject.instences.length; index++){
                        let ob = TinyCanvasObject.instences[index];
                        if(ob !== this && ob.isInnerPoint(cp.x, cp.y) && ob.index > this.index){
                            hasUpperCandidate = true;
                            break;
                        }
                    }
                    
                    if(!hasUpperCandidate){
                        callback(cp);
                        
                        TinyCanvasObject.hasClickCandidate = true;
                        window.setTimeout(function(){
                            TinyCanvasObject.hasClickCandidate = false;
                        }, 100);
                    }
                }
            }
            
        });
        
        return this;
    };
    
    this.mouseOn = (callback = null) => {
        this.tinyCanvas.canvasElement.addEventListener("mousemove", (e) => {
            let cp = this.getMousePosition(this.checkEventObject(e));
            if(typeof callback === "function"){
                if(this.isInnerPoint(cp.x, cp.y)){
                    //if(!this.isMouseOn){
                        callback(cp);
                        
                        this.isMouseOn = true;
                    //}
                }
            }
        });
        
        return this;
    };
    
    
    this.mouseOut = (callback = null) => {
        this.tinyCanvas.canvasElement.addEventListener("mousemove", (e) => {
            let cp = this.getMousePosition(this.checkEventObject(e));
            if(typeof callback === "function"){
                if(!this.isInnerPoint(cp.x, cp.y)){
                    if(this.isMouseOn){
                        callback(cp);
                        
                        this.isMouseOn = false;
                    }
                }
            }
        });
    };
    
    
    this.alter = (name, params) => {
        let i = 0;
        for(let trace of this.objectDrawTrace){
            if(trace.name === name){
                this.objectDrawTrace[i].pr = params;
            }
            i++;
        }
        
        return this;
    };
    
    
    this.setIsOutOfTransform = (out = true) => {
        this.isOutOfTransform = out;
        
        return this;
    };
    
    this.getIsOutOfTransform = () => {
        return this.isOutOfTransform;
    };
    
    
    this.hide = () => {
        this.isHidden = true;
        
        return this;
    };
    
    this.show = () => {
        this.isHidden = false;
        
        return this;
    };
    
    this.append = (child) => {
        if(this.childs.indexOf(child) === -1){
            this.childs.push(child);
        }
        
        return this;
    };
    
    
    this.isObjectDataExist = (dataName) => {
        return dataName in this.data;
    };
    
    
    this.saveData = (dataName, dataValue) => {
        this.data[dataName] = dataValue;
        
        return this;
    };
    
    this.readData = (dataName, defaultValue) => {
        let out  = defaultValue;
        
        if(this.isObjectDataExist(dataName)){
            out = this.data[dataName];
        }
        
        return out;
    };
    
    this.getObjectMaxX = () => {
        let out = 0;
        if(this.tracePoints.length){
            out = this.tracePoints[0].x;
        }
        this.tracePoints.forEach((p) => {
            if(p.x > out){
                out = p.x;
            }
        });
        
        return out;
    };
    
    this.getObjectMaxY = () => {
        let out = 0;
        if(this.tracePoints.length){
            out = this.tracePoints[0].y;
        }
        this.tracePoints.forEach((p) => {
            if(p.y > out){
                out = p.y;
            }
        });
        
        return out;
    };
    
    this.getObjectMinX = () => {
        let out = 0;
        if(this.tracePoints.length){
            out = this.tracePoints[0].x;
        }
        this.tracePoints.forEach((p) => {
            if(p.x < out){
                out = p.x;
            }
        });
        
        return out;
    };
    
    this.getObjectMinY = () => {
        let out = 0;
        if(this.tracePoints.length){
            out = this.tracePoints[0].y;
        }
        this.tracePoints.forEach((p) => {
            if(p.y < out){
                out = p.y;
            }
        });
        
        return out;
    };
    
    this.init = () => {
        
        this.tinyCanvas.onTranslate((dx, dy) => {
            this.canvasTransformData.translate.dx = dx;
            this.canvasTransformData.translate.dy = dy;
        });
        
        this.tinyCanvas.onScale((sx, sy) => {
            this.canvasTransformData.scale.sx = sx;
            this.canvasTransformData.scale.sy = sy;
            
            
        });
        
        this.tinyCanvas.onResetTransform(() => {
            /*this.canvasTransformData.translate.dx = 0;
            this.canvasTransformData.translate.dy = 0;*/
            
            /*this.canvasTransformData.scale.sx = 1;
            this.canvasTransformData.scale.sy = 1;*/
        });
    
        /*$("#map_canvas").click((e) => {
            let eventOb = this.checkEventObject(e);
            
            let mP = this.getMousePosition(e);
            
            alert(JSON.stringify(mP));
        });*/
        return this;
    };
    
};

TinyCanvasObject.hasClickCandidate = false;

TinyCanvasObject.instences = [];
