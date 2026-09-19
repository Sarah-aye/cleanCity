import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import TrackerForm from "./TrackerForm";
import { ConfirmProvider } from "../context/ConfirmContext";

describe("TrackerForm validation", () => {
  // Test 1.
  // It returns an error when submission is done without the category

  it("shows an error when no category is selected", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(
      <ConfirmProvider>
        <TrackerForm onSubmit={onSubmit} />
      </ConfirmProvider>,
    );

    const quantityInput = screen.getByLabelText("Quantity");
    const submitButton = screen.getByRole("button", {
      name: "Add to tracker",
    });

    await user.type(quantityInput, "5");
    await user.click(submitButton);

    expect(
      screen.getByText("Please select a waste category."),
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  // Test 2.
  // It returns an error when submission is done with the quantity being 0

  it("shows an error when quantity is 0", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(
      <ConfirmProvider>
        <TrackerForm onSubmit={onSubmit} />
      </ConfirmProvider>,
    );

    const categorySelect = screen.getByLabelText("Waste category");
    const quantityInput = screen.getByLabelText("Quantity");
    const submitButton = screen.getByRole("button", {
      name: "Add to tracker",
    });

    await user.selectOptions(categorySelect, "Plastic");
    await user.type(quantityInput, "0");
    await user.click(submitButton);

    expect(screen.getByText("Quantity cannot be 0.")).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
