import {
  AfterContentInit,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Renderer2
} from '@angular/core';
import { Emojipicker } from './emojipicker';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MatFormField } from '@angular/material';
import { EmojiService } from './emoji.service';
import { DOCUMENT } from '@angular/platform-browser';

/** Directive used to connect an input to a Emojipicker. */
@Directive({
  selector: 'textarea[emojipicker]',
  host: {
    '[attr.aria-expanded]': '_emojipicker?.opened || "false"',
    '[attr.aria-haspopup]': 'true',
    '[attr.aria-owns]': '_emojipicker?.id',
    '(textarea)': '_onInput($event.target.value)',
    '(blur)': '_onTouched()',
  }
})
export class EmojipickerInput {
  /** The emojipicker that this input is associated with. */
  @Input()
  set emojipicker(value: Emojipicker) {
    if (value) {
      this._emojipicker = value;
      this._emojipicker._registerInput(this);
    }
  }
  _emojipicker: Emojipicker;

  /** The value of the input. */
  @Input()
  get value() {
    return this._emojiService.emojify(this._elementRef.nativeElement.value);
  }
  set value(value: string) {
    let emojiValue = this._emojiService.emojify(value);
    this._renderer.setProperty(this._elementRef.nativeElement, 'value',
      emojiValue);
    this._valueChange.emit(emojiValue);
  }

  /** Emits when the value changes (either due to user input or programmatic change). */
  _valueChange = new EventEmitter();

  _onTouched = () => { };

  private _cvaOnChange: (value: any) => void = () => { };

  private _validatorOnChange = () => { };

  private _emojipickerSubscription: Subscription;

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    @Inject(DOCUMENT) private document: any,
    private _emojiService: EmojiService,
    @Optional() private _MatInputContainer: MatFormField) {
  }

  ngAfterContentInit() {
    if (this._emojipicker) {
      this._emojipickerSubscription =
        this._emojipicker.selectedChanged.subscribe((selected) => {
          this.insertAtCursor(this._elementRef.nativeElement,  `:${selected}:`);
          //   this.value = `${this.value}${selected.emoji}`;
          //   this._cvaOnChange(selected);
        });
    }
  }

  insertAtCursor(myField, myValue) {
    //IE support
    if (this.document.selection) {
        myField.focus();
        var sel = this.document.selection.createRange();
        sel.text = myValue;
    }
    // Microsoft Edge
    else if(window.navigator.userAgent.indexOf("Edge") > -1) {
      var startPos = myField.selectionStart; 
      var endPos = myField.selectionEnd; 

      myField.value = myField.value.substring(0, startPos)+ myValue 
             + myField.value.substring(endPos, myField.value.length); 

      var pos = startPos + myValue.length;
      myField.focus();
      myField.setSelectionRange(pos, pos);
    }
    //MOZILLA and others
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
    } else {
        myField.value += myValue;
    }
}

/*
  _getCaretPosition(oField) {
    // Initialize
    let iCaretPos = 0;
    // IE Support
    if (this.document) {
      // Set focus on the element
      oField.focus();
      if (this.document.selection) {
        const oSel = this.document.selection.createRange();
        // Move selection start to 0 position
        oSel.moveStart('character', -oField.value.length);
        // The caret position is selection length
        iCaretPos = oSel.text.length;
      }
    }

    // Firefox support
    else if (oField.selectionStart || oField.selectionStart == '0')
      iCaretPos = oField.selectionStart;

    // Return results
    return iCaretPos;
  }
  */

  ngOnDestroy() {
    if (this._emojipickerSubscription) {
      this._emojipickerSubscription.unsubscribe();
    }
  }

  /**
   * Gets the element that the emojipicker popup should be connected to.
   * @return The element to connect the popup to.
   */
  getPopupConnectionElementRef(): ElementRef {
    return this._MatInputContainer ? this._MatInputContainer.underlineRef : this._elementRef;
  }

  // Implemented as part of ControlValueAccessor
  writeValue(value: any): void {
    this.value = value;
  }

  // Implemented as part of ControlValueAccessor
  registerOnChange(fn: (value: any) => void): void {
    this._cvaOnChange = fn;
  }

  // Implemented as part of ControlValueAccessor
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  // Implemented as part of ControlValueAccessor
  setDisabledState(disabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', disabled);
  }


  _onInput(value: string) {
    let val = this._emojiService.emojify(value);
    this._cvaOnChange(val);
    this._valueChange.emit(val);
  }
}
