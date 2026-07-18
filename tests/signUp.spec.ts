import {test,expect} from '@playwright/test';
import { getMessageId ,readLatestMessage} from '../services/gmailAuth';
import { extractOtp } from '../utils/extractOtp';


test('agent signUp',async({page})=>{
    await page.goto('https://dmoneyportal.roadtocareer.net/');
    await page.getByRole('link', { name: 'Sign Up' }).nth(0).click();
  

    await page.getByRole('textbox', { name: 'Full Name' }).fill('TestAgent321');
    await page.getByRole('textbox', { name: 'Email Address' }).fill('khorshedjhoni+321@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('1234');
    await page.getByRole('textbox', { name: 'Phone Number' }).fill('01521400120');
    await page.getByRole('textbox',{name:'National ID (NID)'}).fill('52345675');
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: '🏪 Agent' }).click();
    await page.locator('body').click();
    await page.getByRole('button', { name: 'Create Account →' }).click();
    await page.waitForURL('https://dmoneyportal.roadtocareer.net/login');
    await page.pause();
})

test('admin login',async({page})=>{
    await page.goto('https://dmoneyportal.roadtocareer.net/login');
    await page.getByRole('textbox', { name: 'Email or Phone Number' }).fill('admin@dmoney.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('1234');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('https://dmoneyportal.roadtocareer.net/profile');
    await page.getByRole('link',{name:'User List'}).click();
    const row = page.locator('tbody tr').filter({hasText: 'TestAgent321',});
    await row.getByRole('button', { name: 'VIEW' }).click();
    await page.getByRole('button', { name: 'Edit User' }).click();
    await page.getByRole('combobox').nth(1).click();
    await page.getByRole('option', { name: 'Active' }).click();
    await page.getByRole('button',{name:"Save Changes"}).click();
    await page.pause();
    
})

test('system login',async({page})=>{
    await page.goto('https://dmoneyportal.roadtocareer.net/login');
    await page.getByRole('textbox', { name: 'Email or Phone Number' }).fill('system@dmoney.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('1234');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('https://dmoneyportal.roadtocareer.net/profile');
    await page.getByRole('link',{name:'Cash In'}).click();
    await page.getByRole('textbox', { name: 'Customer Phone Number' }).fill('01521400120');
    await page.getByRole('spinbutton', { name: 'Amount (BDT)' }).fill('2000');
    await page.getByRole('button', { name: 'Cash In →' }).click();
    await page.waitForURL('https://dmoneyportal.roadtocareer.net/agent/cash-in');
    await page.pause();
})

test.only('agent login',async({page,request})=>{
    await page.goto('https://dmoneyportal.roadtocareer.net/login');
    await page.getByRole('textbox', { name: 'Email or Phone Number' }).fill('khorshedjhoni+321@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('1234');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('https://dmoneyportal.roadtocareer.net/login');
   const previousMessageId = await getMessageId(request);




await expect(
  page.getByRole('textbox', { name: 'Enter 4-Digit OTP' })
).toBeVisible();

let newMessageId = '';

for (let i = 0; i < 10; i++) {
  await page.waitForTimeout(1000);

  const currentMessageId = await getMessageId(request);

  if (currentMessageId !== previousMessageId) {
    newMessageId = currentMessageId;
    break;
  }
}

if (!newMessageId) {
  throw new Error('OTP email was not received');
}

const email = await readLatestMessage(request, newMessageId);
// console.log(email);
const otp = extractOtp(email);
// console.log(otp);


await page.getByRole('textbox', { name: 'Enter 4-Digit OTP' }).fill(otp);
await page.getByRole('button', { name: 'Verify OTP →' }).click();

const balanceInput =await page.getByLabel('Current Balance (BDT)');
await expect(balanceInput).toHaveValue('2000.00');

await page.getByRole('link',{name:'Cash In'}).click();
await page.getByRole('textbox', { name: 'Customer Phone Number' }).fill('01521400255');
await page.getByRole('spinbutton', { name: 'Amount (BDT)' }).fill('500');
await page.getByRole('button', { name: 'Cash In →' }).click();
await expect(page.getByText('Deposit successful')).toBeVisible();
await page.pause();
})