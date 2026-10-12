import { test, expect } from '@playwright/test';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test.describe('API GET and POST requests', () => {

  test('GET request', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users`);
    const body = await response.json();
    console.log(body);
    expect(response.status()).toBe(200);
    expect(body[0].email).toBe('Sincere@april.biz');
  });

  test('POST request', async ({ request }) => {
    const response = await request.post(`${baseUrl}/posts`, {
      data: {
        title: 'Playwright API Testing',
        body: 'Learning API Automation',
        id: 1,
      },
    });
    const body = await response.json();
    console.log(body);
    expect(response.status()).toBe(201);
    expect(body.title).toBe('Playwright API Testing');
  });
});