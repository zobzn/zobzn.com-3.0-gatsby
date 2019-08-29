import React from "react";
import renderer from "react-test-renderer";
import Header from "../header";

describe("Header", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Header />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly on homepage", () => {
    const tree = renderer
      .create(<Header location={{ pathname: "/" }} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly on inner page", () => {
    const tree = renderer
      .create(<Header location={{ pathname: "/about" }} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
