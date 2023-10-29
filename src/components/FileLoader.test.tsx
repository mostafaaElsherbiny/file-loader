import { render, waitFor } from "@testing-library/react";
import FileLoader from "./fileLoader";
import user from "@testing-library/user-event";

jest.mock("../helper/analyze", () => ({
  analyze: jest.fn(
    () =>
      new Map([
        ["word1", 1],
        ["word2", 2],
      ])
  ),
}));

describe("FileLoader Component", () => {
  it("renders without errors", async () => {
    const { findByTestId, getByText } = render(<FileLoader />);

    expect(getByText("File Loader")).toBeTruthy();

    expect(findByTestId("file-loader")).toBeTruthy();

    expect(getByText("Analyze"));
  });

  it("handles file input change correctly", async () => {
    const { findByTestId, getByText } = render(<FileLoader />);

    const fileInput = await findByTestId("file-loader");

    const file = new File(["mustafa"], "test.txt", { type: "text/plain" });

    user.upload(fileInput, file);

    await waitFor(() => {
      expect(getByText("mustafa")).toBeTruthy();
    });
  });

  it("handles file input change correctly and analyze", async () => {
    const { findByTestId, getByText } = render(<FileLoader />);

    const fileInput = await findByTestId("file-loader");

    // Create a mock File object
    const file = new File(["mustafa mustafa"], "test.txt", {
      type: "text/plain",
    });

    user.upload(fileInput, file);

    await waitFor(() => {
      expect(getByText("mustafa mustafa")).toBeTruthy();
    });

    const analyzeButton = await findByTestId("analyze-id");

    user.click(analyzeButton);

    await waitFor(() => {
      expect(getByText("Word")).toBeTruthy();
      expect(getByText("Count")).toBeTruthy();
    });
  });

  it("handles file input analyze empty", async () => {
    const { findByTestId, getByText } = render(<FileLoader />);

    const fileInput = await findByTestId("file-loader");

    const file = new File([""], "test.txt", {
      type: "text/plain",
    });

    user.upload(fileInput, file);

    const analyzeButton = await findByTestId("analyze-id");

    user.click(analyzeButton);

    await waitFor(() => {
      expect(getByText("No file loaded")).toBeTruthy();
    });
  });
  it("handles file input change load file with unaccepted extension ", async () => {
    const { findByTestId, getByText } = render(<FileLoader />);

    const fileInput = await findByTestId("file-loader");

    const file = new File([""], "test.txt", {
      type: "text/html",
    });

    user.upload(fileInput, file);

    await waitFor(() => {
      expect(getByText("File should be a text file")).toBeTruthy();
    });
  });
});
