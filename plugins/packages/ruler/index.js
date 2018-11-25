class Ruler {
    constructor() {
        this.point1 = null;
        this.p1Width = null;
        this.p1Height = null;
        this.p1OffsetTop = null;
        this.p1OffsetLeft = null;
    };

    getPoint1() {
        document.addEventListener('click', (e) => {
            this.point1 = e.target;
            this.p1Width = e.target.offsetWidth;
            this.p1Height = e.target.offsetHeight;
            this.p1OffsetTop = e.target.offsetTop;
            this.p1OffsetLeft = e.target.offsetLeft;
            this.setStylesPoint1Width();
            this.setStylesPoint1Height();
            this.getPoint2();
        })
    }

    setStylesPoint1Width() {
        this.point1.classList.add('point1');
        this.point1.appendChild(this.setRulerPoint1Width());
        var rulerW = document.getElementById('ruler-width');
        rulerW.style.height = this.p1Height + 'px';
        rulerW.style.top = this.p1OffsetTop + 'px';
    }

    setRulerPoint1Width() {
        var div = document.createElement('div');
        div.id = "ruler-width";
        return div;
    }
    setStylesPoint1Height() {
        this.point1.classList.add('point1');
        this.point1.appendChild(this.setRulerPoint1Height());
        var rulerW = document.getElementById('ruler-height');
        rulerW.style.width = this.p1Width + 'px';
        rulerW.style.left = this.p1OffsetLeft + 'px';
    }

    setRulerPoint1Height() {
        var div = document.createElement('div');
        div.id = "ruler-height";
        return div;
    }

    // ----------- POINT 2 ----------- //
    getPoint2() {
        document.addEventListener('mouseover', (e) => {
            this.setRulerPoint2(e);
        }, false);
    }

    setRulerPoint2(e) {
        var target = e.target;
        var targetOffsetTop = target.offsetTop;
        var targetOffsetLeft = target.offsetLeft;
        var targetWidth = target.offsetWidth;
        var targetHeight = target.offsetHeight;

        var p2 = document.getElementsByClassName("point2");
        if (p2.length > 0) {
            p2[0].classList.remove("point2");
        }
        target.classList.add('point2');

        var elements = document.getElementsByClassName('ruler-line-height');
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }

        var elements = document.getElementsByClassName('ruler-line-width');
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
        var divRH = document.createElement('div');
        divRH.classList.add("ruler-line-height");
        target.appendChild(divRH);

        var divRW = document.createElement('div');
        divRW.classList.add("ruler-line-width");
        target.appendChild(divRW);

        // added js styles for ruler line
        if (targetOffsetTop > this.p1OffsetTop) {
            divRH.style.height = Math.abs(targetOffsetTop - this.p1OffsetTop - this.p1Height) + 'px';
            divRH.style.top = Math.abs(this.p1OffsetTop + this.p1Height) + 'px';
        } else {
            divRH.style.height = Math.abs(targetOffsetTop - this.p1OffsetTop + this.p1Height) + 'px';
            divRH.style.bottom = Math.abs(this.p1OffsetTop) + 'px';
        }

        if (targetOffsetLeft < this.p1OffsetLeft) {
            divRW.style.width = Math.abs(targetOffsetLeft - (this.p1OffsetLeft - targetWidth)) + 'px';
            divRW.style.left = Math.abs(targetOffsetLeft + targetWidth) + 'px';
        } else {
            divRW.style.width = Math.abs(targetOffsetLeft - (this.p1OffsetLeft + this.p1Width)) + 'px';
            divRW.style.left = Math.abs(this.p1OffsetLeft + this.p1Width) + 'px';
        }
    }



    // removePointByClass(pointClass) {
    //     var elements = document.getElementsByClassName(pointClass);
    //     while (elements.length > 0) {
    //         elements[0].parentNode.removeChild(elements[0]);
    //     }
    // }

    // createRulerLine() {
    //     var div = document.createElement('div');
    //     div.classList.add('ruler-line');
    //     return div;
    // }

    init() {
        this.getPoint1();
    }
}

const ruler = new Ruler();
ruler.init();