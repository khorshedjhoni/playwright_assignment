import { test } from '@playwright/test';

import { SignUpPage } from '../pages/SignUpPage';
import { LoginPage } from '../pages/LoginPage';
import { AdminPage } from '../pages/AdminPage';
import { SystemPage } from '../pages/SystemPage';
import { AgentPage } from '../pages/AgentPage';

import { getMessageId, readLatestMessage } from '../services/gmailAuth';
import { extractOtp } from '../utils/extractOtp';

const BASE_URL = 'https://dmoneyportal.roadtocareer.net';
const LOGIN_URL = `${BASE_URL}/login`;

const agentData = {
  name: 'TestAgent600',
  email: 'khorshedjhoni+600@gmail.com',
  password: '1234',
  phone: '01521456000',
  nid: '52345677'
};

test('Complete Agent Flow', async ({ page, request }) => {

  const signup = new SignUpPage(page);
  const login = new LoginPage(page);
  const admin = new AdminPage(page);
  const system = new SystemPage(page);
  const agent = new AgentPage(page);

  // Signup
  await signup.visit(BASE_URL);
  await signup.signUp(agentData);
  await page.waitForURL('https://dmoneyportal.roadtocareer.net/login');
  
//   await page.pause();

  // Admin login
  await login.visit(LOGIN_URL);
  await login.login('admin@dmoney.com', '1234');

  await admin.activateUser(agentData.name);
// await page.getByRole('button', { name: /logout/i }).click();
await page.locator('.css-1fdvuei').click();
await page.getByText(/logout/i).click();


  // System login
  await login.visit(LOGIN_URL);
  console.log("Login page opened");
  await login.login('system@dmoney.com', '1234');
  console.log("System logged in");
  

  await system.deposit(agentData.phone, '2000');
  await page.locator('.css-1fdvuei').click();
await page.getByRole('menuitem', { name: /logout/i }).click();



// Get latest email ID BEFORE login
const previousMessageId = await getMessageId(request);

await login.visit(LOGIN_URL);
await login.login(agentData.email, agentData.password);

// Wait until OTP page appears
await login.waitForOtpPage();

let newMessageId = '';

for (let i = 0; i < 15; i++) {
  await page.waitForTimeout(1000);

  const currentMessageId = await getMessageId(request);

  if (currentMessageId && currentMessageId !== previousMessageId) {
    newMessageId = currentMessageId;
    break;
  }
}

if (!newMessageId) {
  throw new Error('OTP email was not received');
}

// Read email
const email = await readLatestMessage(request, newMessageId);

// Extract OTP
const otp = extractOtp(email);

// Verify OTP
await login.verifyOTP(otp);

  // Verify balance
  await agent.verifyBalance('2000.00');

  // Deposit
  await agent.cashIn('01521400255', '500');

  // Verify success
  await agent.verifyDepositSuccess();

});