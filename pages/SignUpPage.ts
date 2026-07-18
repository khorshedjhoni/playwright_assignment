import { Page, Locator,expect } from "@playwright/test";

export interface AgentData {

    name: string;
    email: string;
    password: string;
    phone: string;
    nid: string;

}

export class SignUpPage {

    readonly page: Page;

    readonly signUpLink: Locator;
    readonly fullNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly phoneInput: Locator;
    readonly nidInput: Locator;
    readonly roleDropdown: Locator;
    readonly createAccountButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.signUpLink = page.getByRole("link", { name: "Sign Up" }).first();

        this.fullNameInput = page.getByRole("textbox", { name: "Full Name" });

        this.emailInput = page.getByRole("textbox", { name: "Email Address" });

        this.passwordInput = page.getByRole("textbox", { name: "Password" });

        this.phoneInput = page.getByRole("textbox", { name: "Phone Number" });

        this.nidInput = page.getByRole("textbox", { name: "National ID (NID)" });

        this.roleDropdown = page.getByRole("combobox");

        this.createAccountButton = page.getByRole("button", {
            name: "Create Account →"
        });

    }

    async visit(url: string) {

        await this.page.goto(url);

    }

    async signUp(agent: AgentData) {

        await this.signUpLink.click();
        await expect(this.fullNameInput).toBeVisible({ timeout: 30000 });
        await this.page.screenshot({
  path: "after-signup-click.png",
  fullPage: true,
});

        await this.fullNameInput.fill(agent.name);

        await this.emailInput.fill(agent.email);

        await this.passwordInput.fill(agent.password);

        await this.phoneInput.fill(agent.phone);

        await this.nidInput.fill(agent.nid);

        await this.roleDropdown.click();

        await this.page.getByRole("option", { name: "🏪 Agent" }).click();

        await this.page.locator("body").click();

        await this.createAccountButton.click();

    }

}