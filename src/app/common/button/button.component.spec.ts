import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display button text', () => {
    component.label = 'Click Me';
    fixture.detectChanges();
    const buttonElement: HTMLElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.textContent).toContain('Click Me');
  });

  it('should display an icon if provided', () => {
    component.icon = 'home';
    fixture.detectChanges();
    const iconElement: HTMLElement = fixture.nativeElement.querySelector('i');
    expect(iconElement).toBeTruthy();
  });

  it('should emit click event when clicked', () => {
    spyOn(component.buttonClick, 'emit');
    const buttonElement: HTMLElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();
    expect(component.buttonClick.emit).toHaveBeenCalled();
  });
});