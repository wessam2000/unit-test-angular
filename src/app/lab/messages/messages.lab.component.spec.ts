import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MessagesComponentForLab } from "./messages.lab.component";
import { By } from "@angular/platform-browser";
import { MessageService } from "../../services/message/message.service";
import { DebugElement } from '@angular/core';

describe("2-message component integration testing:", () => {
  let fixture: ComponentFixture<MessagesComponentForLab>;
  let component: MessagesComponentForLab;
  let messageService: MessageService;

  const mockMessages = [
    { id: 1, message: "Hello world" },
    { id: 2, message: "loving Angular" },
    { id: 3, message: "Enjoy testing" },
  ];

  beforeEach( () => {
    TestBed.configureTestingModule({imports:[MessagesComponentForLab]})

    fixture = TestBed.createComponent(MessagesComponentForLab);
    component = fixture.componentInstance;
    messageService = TestBed.inject(MessageService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it("expect component template to be empty", () => {
    messageService.messages = [];
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent.trim()).toBe("");
  });


  it("then expect div.msg to have the messages after setting it", () => {
    messageService.messages = mockMessages;
    fixture.detectChanges();
    const messageElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.msg'));
    expect(messageElements.length).toBe(mockMessages.length);
    expect(messageElements[0].nativeElement.textContent).toContain("Hello world");
    expect(messageElements[1].nativeElement.textContent).toContain("loving Angular");
    expect(messageElements[2].nativeElement.textContent).toContain("Enjoy testing");
  });
});
