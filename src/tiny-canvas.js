var TinyCanvas = function(canvasElement, canvasWidth, canvasHeight){
    this.canvasElement = canvasElement;
    this.context = this.canvasElement.getContext("2d");
    this.glContext = this.canvasElement.getContext("webgl");
    this.fontFamily = "Ubuntu, sans-serif";
    this.fontSize = "14px";
    this.fontStyle = "normal";
    this.transformData = {
        translate: {
            dx: 0, 
            dy: 0, 
            callbacks: []
        }, 
        scale: {
            sx: 1,
            sy: 1, 
            callbacks: []
        },
        reset: {
            callbacks: []
        }
    };
    this.shadow = {
       color: "black",
       blur: 5,
       offsetX: 0,
       offsetY: 0
    };
    
    this.viewport = {
        width: canvasWidth, 
        height: canvasHeight
    };
    
    this.allContext = {
        default: "2d",
        webgl: "webgl"
    };
    
    this.setFillStyle = (color) => {
        this.context.fillStyle = color;
        
        return this;
    };
    
    this.getFillStyle = () => {
        return this.context.fillStyle;
    };
    
    this.setStrokeStyle = (color) => {
        this.context.strokeStyle = color;
        
        return this;
    };
    
    this.getStrokeStyle = () => {
        return this.context.strokeStyle;
    };
    
    
    this.clear = () => {
        this.context.clearRect(-100000, -100000, this.viewport.width*100000, this.viewport.height*100000);
        return this;
    };
    
     this.clearRect = (x, y, w, h) => {
        this.context.clearRect(x, y, w, h);
        
        return this;
    };
    
    this.setLineWidth = (lWidth) => {
        this.context.lineWidth = lWidth;
        return this;
    };
    
    this.setFontFamily = (fontF) => {
        this.fontFamily = fontF;
        this.context.font = this.fontStyle+" "+this.fontSize+" "+this.fontFamily+"";
    };
    
    this.setFontSize = (fontSize) => {
        this.fontSize = fontSize;
        this.context.font = this.fontStyle+" "+this.fontSize+" "+this.fontFamily+"";
        return this;
    };
    
    this.setFontStyle = (fontStyle) => {
        this.fontStyle = fontStyle;
        this.context.font = this.fontStyle+" "+this.fontSize+" "+this.fontFamily+"";
        return this;
    };
    
    this.drawText = (x, y, text, color = null) => {
        let tmpC = this.getFillStyle();
        if(color !== null){
            this.setFillStyle(color);
        }
        this.context.fillText(text, x, y);
        this.setFillStyle(tmpC);
        return this;
    };
    
    
    this.drawStrokedText = (x, y, text, color = null) => {
        let tmpC = this.getStrokeStyle();
        if(color !== null){
            this.setStrokeStyle(color);
        }
        this.context.strokeText(text,  x, y);
        this.setStrokeStyle(tmpC);
        return this;
    };
    
    this.drawFilledRect = (x, y, w, h, color = null) => {
        let tmpC = this.getFillStyle();
        if(color !== null){
            this.setFillStyle(color);
        }
        this.context.fillRect(x, y, w, h);
        this.setFillStyle(tmpC);
        return this;
    };
    
    
    this.drawFilledRoundRect = (x, y, width, height, r, color = null) => {
        let tmpC = this.getFillStyle();
        if(color !== null){
            this.setFillStyle(color);
        }
         this.startPath()
                .moveTo(x, y+r)
                .lineTo(x, y + height - r)
                .quadraticCurveTo(x, y + height, x + r, y + height)
                .lineTo(x + width - r, y + height)
                .quadraticCurveTo(x + width, y + height, x + width, y + height - r)
                .lineTo(x + width, y + r)
                .quadraticCurveTo(x + width, y, x + width - r, y)
                .lineTo(x + r,y).quadraticCurveTo(x, y, x, y + r)
                .fill();
        
        this.setFillStyle(tmpC);
        
        return this;
    };
    
    this.drawStrokedRoundRect = (x, y, width, height, r, color = null) => {
        let tmpC = this.getStrokeStyle();
        if(color !== null){
            this.setStrokeStyle(color);
        }
        this.startPath()
                .moveTo(x, y+r)
                .lineTo(x, y + height - r)
                .quadraticCurveTo(x, y + height, x + r, y + height)
                .lineTo(x + width - r, y + height)
                .quadraticCurveTo(x + width, y + height, x + width, y + height - r)
                .lineTo(x + width, y + r)
                .quadraticCurveTo(x + width, y, x + width - r, y)
                .lineTo(x + r,y).quadraticCurveTo(x, y, x, y + r)
                .strock();
                
        this.setStrokeStyle(tmpC);
        
        return this;
    };
    
    this.drawStrokedRect = (x, y, w, h, color = null) => {
        let tmpC = this.getStrokeStyle();
        if(this.color !== null){
            this.setStrokeStyle(color);
        }
        this.context.strokeRect(x, y, w, h);
        this.setStrokeStyle(tmpC);
        
        return this;
    };
    
    this.drawFilledCircle = (x, y, w, color = null) => {
        let tmpC = this.getFillStyle();
        if(this.color !== null){
            this.setFillStyle(color);
        }
        this.context.beginPath();
        this.context.arc(x, y, w, 0, Math.PI*2);
        this.context.fill();
        this.setFillStyle(tmpC);
        
        return this;
    };
    
    
    this.drawStrokedCircle = (x, y, w, color = null) => {
        let tmpC = this.getStrokeStyle();
        if(this.color !== null){
            this.setStrokeStyle(color);
        }
        this.context.beginPath();
        this.context.arc(x, y, w, 0, Math.PI*2);
        this.context.stroke();
        this.setStrokeStyle(tmpC);
        
        return this;
    };
    
    this.drawPic = (img, x, y) => {
        this.context.drawImage(img, x, y);
        
        return this;
    };
    
    this.drawPicWithWidhAndHeight = (img, x, y, w, h) => {
        this.context.drawImage(img, x, y, w, h);
        
        return this;
    };
    
    this.drawPicWithClipping = (img, sx, sy, sW, sH, x, y, w, h) => {
        this.context.drawImage(img, sx, sy, sW, sH, x, y, w, h);
        
        return this;
    };
    
    
    this.setShadowProperties = (color, blur, offsetX, offsetY) => {
        this.shadow.color = color; 
        this.shadow.blur = blur;
        this.shadow.offsetX = offsetX;
        this.shadow.offsetY = offsetY;
        
        return this;
    };
    
    
    this.enableShadow = (color = this.shadow.color, blur = this.shadow.blur, offsetX = this.shadow.offsetX, offsetY = this.shadow.offsetY) => {
        this.setShadowProperties(color, blur, offsetX, offsetY);
        
        this.context.shadowColor = this.shadow.color;
        this.context.shadowBlur = this.shadow.blur;
        this.context.shadowOffsetX = this.shadow.offsetX;
        this.context.shadowOffsetY = this.shadow.offsetY;
        
        return this;
    };
    
    this.disableShadow = () => {
        this.context.shadowColor = this.shadow.color;
        this.context.shadowBlur = 0;
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 0;
        
        return this;
    };
    
    this.beginPath = () => {
        this.context.beginPath();
        
        return this;
    };
    
    this.startPath = () => {
        this.context.beginPath();
        
        return this;
    };
    
    this.moveTo = (x, y) => {
        this.context.moveTo(x, y);
        
        return this;
    };
    
    this.lineTo = (x, y) => {
        this.context.lineTo(x, y);
        
        return this;
    };
    
    this.quadraticCurveTo = (p2x, p2y, p3x, p3y) => {
        this.context.quadraticCurveTo(p2x, p2y, p3x, p3y);
        
        return this;
    };
    
    this.bezierCurveTo = (p2x, p2y, p3x, p3y, p4x, p4y) => {
        this.context.bezierCurveTo(p2x, p2y, p3x, p3y, p4x, p4y);
        
        return this;
    };
    
    
    this.fill = (color = null) => {
        let tmpC = this.getFillStyle();
        if(this.color !== null){
            this.setFillStyle(color);
        }
        
        this.context.fill();
        
        this.setFillStyle(tmpC);
        
        return this;
    };
    
    this.strock = (color = null) => {
        let tmpC = this.getStrokeStyle();
        if(this.color !== null){
            this.setStrokeStyle(color);
        }
        
        this.context.stroke();
        
        this.setStrokeStyle(tmpC);
        
        return this;
    };
    
    this.stroke = (color = null) => {
        let tmpC = this.getStrokeStyle();
        if(this.color !== null){
            this.setStrokeStyle(color);
        }
        
        this.context.stroke();
        
        this.setStrokeStyle(tmpC);
        
        return this;
    };
    
    this.closePath = () => {
        this.context.closePath();
    };
    
    this.setTranslate = (dx, dy) => {
        this.transformData.translate.dx = dx;
        this.transformData.translate.dy = dy;
        
         this.transformData.translate.callbacks.forEach((callback) => {
            callback(dx, dy);
        });
        
        return this;
    };
    
    this.translate = (dx, dy) => {
        this.setTranslate(dx, dy);
        
        this.context.translate(dx, dy);
        
        return this;
    };
    
    this.getTranslateData = () => {
        return {dx: this.transformData.translate.dx, dy: this.transformData.translate.dy};
    };
    
    this.onTranslate = (callback) => {
        if(typeof callback === "function"){
            this.transformData.translate.callbacks.push(callback);
        }
    };
    
    this.resetTransform = () => {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        
        
        return this;
    };
    
    
    this.resetTransformData = () => {
        this.transformData.translate.dx = 0;
        this.transformData.translate.dy = 0;
        this.transformData.scale.sx = 1;
        this.transformData.scale.sy = 1;
        
        this.transformData.reset.callbacks.forEach((callback) => {
            callback();
        });
    };
    
    this.onResetTransform = (callback) => {
        this.transformData.reset.callbacks.push(callback);
        
        return this;
    };
    
    this.setScale = (sx, sy) => {
        this.transformData.scale.sx = sx;
        this.transformData.scale.sy = sy;
        
        this.transformData.scale.callbacks.forEach((callback) => {
            callback(sx, sy);
        });
        
        return this;
    };
    
    this.scale = (sx, sy) => {
        this.setScale(sx, sy);
        
        this.context.scale(sx, sy);
        
        return this;
    };
    
    this.onScale = (callback) => {
        this.transformData.scale.callbacks.push(callback);
        
        return this;
    };
    
    
    this.getScaleData = () => {
        return {sx: this.transformData.scale.sx, sy: this.transformData.scale.sy};
    };
    
    this.performTransform = () => {
        this.resetTransform();
        
        this.translate(this.transformData.translate.dx, this.transformData.translate.dy);
        this.scale(this.transformData.scale.sx, this.transformData.scale.sy);
    };
    
    
    this.isWebGlAvailable = () => {
        let out = true;
        
        if(this.glContext === null){
            out = false;
        }
        
        return out;
    };
    
    
    this.switchToGl = () => {
        if(this.isWebGlAvailable()){
            this.currentContext = this.allContext.webgl;
        }
        
        return this;
    };
    
    this.init  = () => {
        this.canvasElement.width = this.viewport.width;
        this.canvasElement.height = this.viewport.height;
        this.setFontSize(this.fontSize);
        
        return this;
    };
};
