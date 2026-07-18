import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly otpInput: Locator;
  readonly verifyOtpButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.getByRole("textbox", {
      name: "Email or Phone Number",
    });

    this.passwordInput = page.getByRole("textbox", {
      name: "Password",
    });

    this.loginButton = page.getByRole("button", {
      name: "Login",
    });

    this.otpInput = page.getByRole("textbox", {
      name: "Enter 4-Digit OTP",
    });

    this.verifyOtpButton = page.getByRole("button", {
      name: "Verify OTP →",
    });
  }

  async visit(url: string) {
  console.log("Going to:", url);

  await this.page.goto(url, { waitUntil: "networkidle" });

  console.log("After goto:", this.page.url());
}

  async login(email: string, password: string) {
    console.log("Current URL:", this.page.url());
    await this.emailInput.fill(email);
    console.log("Email filled");
    await this.passwordInput.fill(password);
    console.log("Password filled");
    await this.loginButton.click();
        console.log("Clicked login");
  }

  async waitForOtpPage() {
    await expect(this.otpInput).toBeVisible();
  }

  async verifyOTP(otp: string) {
    await this.otpInput.fill(otp);
    await this.verifyOtpButton.click();
  }
}