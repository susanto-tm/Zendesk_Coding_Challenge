import {test, expect, APIRequestContext} from '@playwright/test'

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(baseURL ?? "http://localhost:3000")
  await page.locator("h1#quick-stats").waitFor()
})

test.describe("basic tests", () => {
  test.skip()
  test("page_load", async ({page, baseURL}) => {
    await expect(page.locator("h1#quick-stats")).toHaveText("Quick Stats")
    await expect(page.locator("h1#all-tickets")).toHaveText("All Tickets")
  })

  test("status_counts_add_to_total", async ({page, baseURL}) => {
    const total = (await page.locator("#stats-total").allInnerTexts())[0]  // get total ticket count
    const counts = await page.locator(".stats-count:not(#stats-total)").allInnerTexts()  // get individual status count
    const finalCounts = counts.reduce((previousValue, currentValue) => {
      return Number(previousValue) - Number(currentValue)
    }, Number(total))  // subtract total with each individual stats
    expect(finalCounts).toEqual(0)
  })
})

test.describe("ticket_pagination", () => {
  test.skip()
  test("tickets_lt_25", async ({ page, baseURL }) => {
    const totalTickets = Number((await page.locator("#stats-total").allInnerTexts())[0])
    test.skip(totalTickets >= 25, "Total ticket count of at least 25 requires pagination")

    const ticketsDisplayed = await page.locator(".ticket-card").count()
    expect(ticketsDisplayed).toBeLessThanOrEqual(25)
  })

  test("tickets_gte_25", async ({ page, baseURL }) => {
    const totalTickets = Number((await page.locator("#stats-total").allInnerTexts())[0])
    test.skip(totalTickets < 25, "Total ticket count is less than 25, so test is not applicable")

    const ticketsDisplayed = await page.locator(".ticket-card").count()
    expect(ticketsDisplayed).toBeGreaterThanOrEqual(25)
  })
})

test.describe("proxy_api", () => {
  let api: APIRequestContext
  test("oauth_token", async ({ playwright, baseURL, request }) => {
    const fetchToken = await request.get(`${baseURL}/api/auth/token`)
    const token = (await fetchToken.json()).data
    api = await playwright.request.newContext({
      baseURL,
      extraHTTPHeaders: {
        "Authorization": `Bearer ${token}`
      }
    })
    expect(token).not.toEqual("")
  })

  test("no_token_request", async ({ baseURL, request }) => {
    const fetchTickets = await request.get(`${baseURL}/api/tickets/1`)
    const ticket = await fetchTickets.json()
    expect(ticket.type).toEqual("ERROR")
  })

  test("malformed_token_request", async ({ baseURL, request }) => {
    const fetchTickets = await request.get(`${baseURL}/api/tickets/1`, {
      headers: {
        "authorization": "Bearer"
      }
    })
    const ticket = await fetchTickets.json()
    expect(ticket.type).toEqual("ERROR|AUTH")
  })

  test("first_25_tickets", async ({ baseURL }) => {
    const fetchTickets = await api.get(`${baseURL}/api/tickets`)
    const tickets = (await fetchTickets.json()).data
    expect(tickets.length).toEqual(25)
  })

})