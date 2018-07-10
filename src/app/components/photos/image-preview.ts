import { Directive, ElementRef, Input, Renderer, SimpleChanges, OnChanges } from '@angular/core';

@Directive({ selector: 'img[imgPreview]' })
export class ImagePreview implements OnChanges {
    @Input() image: any;

    constructor(private el: ElementRef, private renderer: Renderer) { }

    ngOnChanges(changes: SimpleChanges) {

        let reader = new FileReader();
        let el = this.el;

        reader.onloadend = function (e) {
            el.nativeElement.src = reader.result;
        };

        if (this.image) {
            return reader.readAsDataURL(this.image);
        }

    }

}