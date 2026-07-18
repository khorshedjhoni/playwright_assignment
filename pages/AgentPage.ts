import { expect, Locator, Page } from "@playwright/test";

export class AgentPage {

    readonly page: Page;

    readonly balanceInput: Locator;
    readonly cashInLink: Locator;
    readonly customerPhoneInput: Locator;
    readonly amountInput: Locator;
    readonly cashInButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {

        this.page = page;

        this.balanceInput = page.getByLabel("Current Balance (BDT)");

        this.cashInLink = page.getByRole("link", {
            name: "Cash In"
        });

        this.customerPhoneInput = page.getByRole("textbox", {
            name: "Customer Phone Number"
        });

        this.amountInput = page.getByRole("spinbutton", {
            name: "Amount (BDT)"
        });

        this.cashInButton = page.getByRole("button", {
            name: "Cash In →"
        });

        this.successMessage = page.getByText("Deposit successful");

    }

    async verifyBalance(balance: string) {

        await expect(this.balanceInput).toHaveValue(balance);

    }

    async cashIn(customerPhone: string, amount: string) {

        await this.cashInLink.click();

        await this.customerPhoneInput.fill(customerPhone);

        await this.amountInput.fill(amount);

        await this.cashInButton.click();

    }

    async verifyDepositSuccess() {

        await expect(this.successMessage).toBeVisible();

    }

}