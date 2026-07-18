import { Page, Locator } from "@playwright/test";

export class SystemPage {

    readonly page: Page;

    readonly cashInLink: Locator;
    readonly phoneInput: Locator;
    readonly amountInput: Locator;
    readonly cashInButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.cashInLink = page.getByRole("link", {
            name: "Cash In"
        });

        this.phoneInput = page.getByRole("textbox", {
            name: "Customer Phone Number"
        });

        this.amountInput = page.getByRole("spinbutton", {
            name: "Amount (BDT)"
        });

        this.cashInButton = page.getByRole("button", {
            name: "Cash In →"
        });

    }

    async deposit(phone: string, amount: string) {

        await this.cashInLink.click();

        await this.phoneInput.fill(phone);

        await this.amountInput.fill(amount);

        await this.cashInButton.click();

    }

}