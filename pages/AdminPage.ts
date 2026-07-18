import { Page, Locator,expect } from "@playwright/test";

export class AdminPage {

    readonly page: Page;

    readonly userListLink: Locator;
    readonly editUserButton: Locator;
    readonly statusDropdown: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.userListLink = page.getByRole("link", {
            name: "User List"
        });

        this.editUserButton = page.getByRole("button", {
            name: "Edit User"
        });

        this.statusDropdown = page.getByRole("combobox").nth(1);

        this.saveButton = page.getByRole("button", {
            name: "Save Changes"
        });

    }

    async activateUser(userName: string) {

        await this.userListLink.click();

        const row = this.page.locator("tbody tr").filter({
            hasText: userName
        });

        await row.getByRole("button", {
            name: "VIEW"
        }).click();

        await this.editUserButton.click();

        await this.statusDropdown.click();

        await this.page.getByRole("option", {
            name: "Active"
        }).click();

        await this.saveButton.click();
        
    }

}