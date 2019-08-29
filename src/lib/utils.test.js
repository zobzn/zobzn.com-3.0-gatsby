/**
 * @jest-environment jsdom
 */

import { qs, qsa, closest, matches, on, wait } from "./utils";

const {
  MouseEvent,
  NodeList,
  HTMLElement,
  HTMLDivElement,
  HTMLSpanElement
} = window;

// @todo test wait

const testHtml = [
  '<div class="div-1"><span class="span-1"></span></div>',
  '<div class="div-2"><span class="span-2"></span></div>'
].join("\n");

beforeEach(() => {
  document.body.innerHTML = testHtml;
});

afterEach(() => {
  document.body.innerHTML = "";
});

describe("dom", () => {
  it("jsdom contains working querySelectorAll", () => {
    expect(document.querySelector("iframe")).toBeNull();
    expect(document.querySelector(".span-1")).toBeInstanceOf(HTMLSpanElement);
  });

  it("jsdom contains working querySelectorAll returns NodeList", () => {
    expect(document.querySelectorAll("iframe")).toBeInstanceOf(NodeList);
    expect(document.querySelectorAll("iframe")).toHaveLength(0);

    expect(document.querySelectorAll(".span-1, div")).toBeInstanceOf(NodeList);
    expect(document.querySelectorAll(".span-1, div")).toHaveLength(3);
  });

  it("jsdom supports dom manipulations", () => {
    const element = document.createElement("div");
    expect(element).not.toBeNull();
    expect(element).toBeInstanceOf(HTMLDivElement);

    element.classList.add("new-element");
    expect(element.classList.contains("new-element")).toBeTruthy();

    document.body.appendChild(element);
    expect(document.body.innerHTML).toBe(
      [
        '<div class="div-1"><span class="span-1"></span></div>\n',
        '<div class="div-2"><span class="span-2"></span></div>',
        '<div class="new-element"></div>'
      ].join("")
    );
  });

  it("qs works", () => {
    const querySelector = jest.spyOn(document, "querySelector");
    expect(qs("iframe")).toBeNull();
    expect(querySelector).toHaveBeenCalledTimes(1);
    expect(querySelector).toHaveBeenCalledWith("iframe");
    querySelector.mockRestore();

    expect(qs(".span-1")).not.toBeNull();
    expect(qs(".span-1")).toBeInstanceOf(HTMLElement);
    expect(qs(".span-1")).toBeInstanceOf(HTMLSpanElement);

    expect(qs("div").tagName).toEqual("DIV");
    expect(qs("span").tagName).toEqual("SPAN");
    expect(qs("div, span").tagName).toEqual("DIV");
    expect(qs("div, .span-1").tagName).toEqual("DIV");
    expect(qs(".span-1, div").tagName).toEqual("DIV");
    expect(qs("span, div").tagName).toEqual("DIV");
  });

  it("qsa works", () => {
    const querySelectorAll = jest.spyOn(document, "querySelectorAll");
    expect(qsa("iframe")).toEqual([]);
    expect(querySelectorAll).toHaveBeenCalledTimes(1);
    expect(querySelectorAll).toHaveBeenCalledWith("iframe");
    querySelectorAll.mockRestore();

    expect(qsa("iframe")).toEqual([]);
    expect(qsa("iframe")).toHaveLength(0);

    expect(qsa("div")).toEqual([
      expect.any(HTMLDivElement),
      expect.any(HTMLDivElement)
    ]);
    expect(qsa("div")).toHaveLength(2);

    expect(qsa("span, div")).toEqual([
      expect.any(HTMLDivElement),
      expect.any(HTMLSpanElement),
      expect.any(HTMLDivElement),
      expect.any(HTMLSpanElement)
    ]);
    expect(qsa("span, div")).toHaveLength(4);

    expect(qsa("*")).toBeInstanceOf(Array);
    expect(qsa("*")).toContainEqual(expect.any(HTMLDivElement));
    expect(qsa("*")).toContainEqual(expect.any(HTMLSpanElement));
    expect(qsa("*")).toHaveLength(7); // html, head, body, div, span

    let elements;

    elements = qsa("iframe");
    expect(elements).not.toBeNull();
    expect(elements).toBeInstanceOf(Array);
    expect(elements).toHaveLength(0);

    elements = qsa(".span-1");
    expect(elements).not.toBeNull();
    expect(elements).toBeInstanceOf(Array);
    expect(elements).toHaveLength(1);
    expect(elements[0]).toBeInstanceOf(HTMLSpanElement);
  });

  it("qsa returns elements in order of appearance in dom", () => {
    let elements = qsa(".span-1, div");
    expect(elements).not.toBeNull();
    expect(elements).toBeInstanceOf(Array);
    expect(elements).toHaveLength(3);
    expect(elements[0].classList.contains("div-1")).toBeTruthy();
    expect(elements[1].classList.contains("span-1")).toBeTruthy();
    expect(elements[2].classList.contains("div-2")).toBeTruthy();
  });
});

describe("event handling with `on`", () => {
  it('"on" event listener on provided element', () => {
    const handler = jest.fn(() => {
      expect(true).toBeTruthy();
    });

    on("click", qs(".span-1"), handler);
    qs("span").click();
    qs("div").click();

    expect(handler).toBeCalledTimes(1);
  });

  it('"on" event listener on provided element', () => {
    const handler = jest.fn(function(event, dummyArgument) {
      expect(dummyArgument).toBeUndefined();
      expect(event).toBeInstanceOf(MouseEvent);
      expect(event.type).toBe("click");
      expect(this).toBe(document.querySelector("span.span-1"));
      expect(event.target).toBe(document.querySelector("span.span-1"));
      expect(event.srcElement).toBe(document.querySelector("span.span-1"));
    });

    on("click", qs(".span-1"), handler);
    qs("span").click();
    qs("div").click();

    expect(handler).toBeCalledTimes(1);
  });

  it('"on" event listener on element selector', () => {
    const handler = jest.fn(function(event, dummyArgument) {
      expect(dummyArgument).toBeUndefined();
      expect(event).toBeInstanceOf(MouseEvent);
      expect(event.type).toBe("click");
      expect(this).toBe(document.querySelector("span.span-1"));
      expect(event.target).toBe(document.querySelector("span.span-1"));
      expect(event.srcElement).toBe(document.querySelector("span.span-1"));
    });

    on("click", ".span-1", handler);
    qs("span").click();
    qs("div").click();

    expect(handler).toBeCalledTimes(1);
  });

  it('"on" event listener on element selector through div', () => {
    const handler = jest.fn(function(event, dummyArgument) {
      expect(dummyArgument).toBeUndefined();
      expect(event).toBeInstanceOf(MouseEvent);
      expect(event.type).toBe("click");
      expect(this).toBe(document.querySelector("span.span-1"));
      expect(event.target).toBe(document.querySelector("span.span-1"));
      expect(event.srcElement).toBe(document.querySelector("span.span-1"));
    });

    on("click", "div", ".span-1", handler);
    qs("span").click();
    qs("div").click();

    expect(handler).toBeCalledTimes(1);
  });

  it('"on" event listener on element selector through document', () => {
    const handler = jest.fn(function(event, dummyArgument) {
      expect(dummyArgument).toBeUndefined();
      expect(event).toBeInstanceOf(MouseEvent);
      expect(event.type).toBe("click");
      expect(this).toBe(document.querySelector("span.span-1"));
      expect(event.target).toBe(document.querySelector("span.span-1"));
      expect(event.srcElement).toBe(document.querySelector("span.span-1"));
    });

    on("click", document, ".span-1", handler);
    qs("span").click();
    qs("div").click();
    expect(handler).toBeCalledTimes(1);
  });

  it('"on" event listener on element selector through document', () => {
    const handler = jest.fn(function(event, dummyArgument) {
      expect(dummyArgument).toBeUndefined();
      expect(event).toBeInstanceOf(MouseEvent);
      expect(event.type).toBe("click");
      expect(event.target.tagName).toMatch(/DIV|SPAN/);
      expect(qsa("div, span").includes(event.target)).toBeTruthy();
    });

    on("click", document, "span, div", handler);
    qs("span").click();
    qs("div").click();
    expect(handler).toBeCalledTimes(2);
  });
});

describe("closest", () => {
  it("find nothing", () => {
    expect(closest(qs(".span-1"), "section")).toBeNull();
  });

  it("find nothing for element not in document", () => {
    const span = document.createElement("span");
    expect(closest(span, "div")).toBeNull();
  });

  it("find parent", () => {
    expect(closest(qs(".span-1"), "div")).toBeInstanceOf(HTMLDivElement);
    expect(closest(qs(".span-1"), "div")).toEqual(qs(".div-1"));
  });

  it("find self", () => {
    expect(closest(qs(".span-1"), "*")).toBeInstanceOf(HTMLSpanElement);
    expect(closest(qs(".span-1"), "*")).toEqual(qs(".span-1"));
    expect(closest(qs(".span-1"), "div, span")).toBeInstanceOf(HTMLSpanElement);
    expect(closest(qs(".span-1"), "div, span")).toEqual(qs(".span-1"));
  });

  it("find self for element not in document", () => {
    const span = document.createElement("span");
    expect(closest(span, "*")).toBeInstanceOf(HTMLSpanElement);
    expect(closest(span, "*")).toEqual(span);
  });
});

describe("matches", () => {
  it("works", () => {
    expect(matches(qs(".span-1"), "span")).toBeTruthy();
    expect(matches(qs(".span-1"), "div span")).toBeTruthy();
    expect(matches(qs(".span-1"), ".div-1 span")).toBeTruthy();
    expect(matches(qs(".span-1"), "body span")).toBeTruthy();
    expect(matches(qs(".span-1"), "html span")).toBeTruthy();
    expect(matches(qs(".span-1"), "section")).toBeFalsy();
    expect(matches(qs("span"), "div .span-1")).toBeTruthy();
    expect(matches(qs("span"), "body .span-1")).toBeTruthy();
    expect(matches(qs("head"), "html head")).toBeTruthy();
    expect(matches(qs("body"), "html body")).toBeTruthy();
  });

  it("works for element not in document", () => {
    const span = document.createElement("span");
    expect(matches(span, "span")).toBeTruthy();
    expect(matches(span, "div span")).toBeFalsy();
  });
});

describe("wait", () => {
  it("works with 0 milliseconds", async () => {
    expect.assertions(3);
    jest.useFakeTimers();
    const promise = wait(0);
    jest.runAllTimers();
    const result = await promise;
    expect(result).toBeUndefined();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 0);
  });

  it("works with 1000 milliseconds", async () => {
    expect.assertions(3);
    jest.useFakeTimers();
    const promise = wait(1000);
    jest.runAllTimers();
    const result = await promise;
    expect(result).toBeUndefined();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });
});
