import {test, expect, APIRequestContext} from '@playwright/test'

expect.extend({
  toBeOneOf(received: any, constructor = [String, null]) {
    const pass = !!constructor.find(c => received.constructor === c)
    if (pass) {
      return {
        message: () => "Matched type",
        pass: true
      }
    } else {
      return {
        message: () => "Failed match",
        pass: false
      }
    }
  }
})

test.describe("component_tests", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL ?? "http://localhost:3000")
    await page.locator("h1#quick-stats").waitFor()
  })

  test.describe("basic tests", () => {
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
    test("tickets_lt_25", async ({page, baseURL}) => {
      const totalTickets = Number((await page.locator("#stats-total").allInnerTexts())[0])
      test.skip(totalTickets >= 25, "Total ticket count of at least 25 requires pagination")

      const ticketsDisplayed = await page.locator(".ticket-card").count()
      expect(ticketsDisplayed).toBeLessThanOrEqual(25)
    })

    test("tickets_gte_25", async ({page, baseURL}) => {
      const totalTickets = Number((await page.locator("#stats-total").allInnerTexts())[0])
      test.skip(totalTickets < 25, "Total ticket count is less than 25, so test is not applicable")

      const ticketsDisplayed = await page.locator(".ticket-card").count()
      expect(ticketsDisplayed).toBeGreaterThanOrEqual(25)
    })
  })
})

test.describe("proxy_api", () => {
  let api: APIRequestContext, sampleTicketId: number, sampleUserId: number

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

  test("first_25_tickets", async () => {
    const fetchTickets = await api.get("/api/tickets")
    const tickets = (await fetchTickets.json()).data
    expect(tickets.length).toEqual(25)
    sampleTicketId = tickets[0].id  // sample ticket for later tests
    sampleUserId = tickets[0].requester_id  // sample user id for later tests
  })

  test.describe("no_token_request", () => {
    test("first_25_tickets", async ({ baseURL, request }) => {
      const fetchTickets = await request.get(`${baseURL}/api/tickets`)
      const ticket = await fetchTickets.json()
      expect(fetchTickets.ok()).toBeFalsy()
      expect(ticket.type).toEqual("ERROR")
    })

    test("ticket_by_id", async ({ baseURL, request }) => {
      const fetchTicket = await request.get(`${baseURL}/api/tickets/${sampleTicketId}`)
      const ticket = await fetchTicket.json()
      expect(fetchTicket.ok()).toBeFalsy()
      expect(ticket.type).toEqual("ERROR")
    })

    test("user_ids", async ({ baseURL, request }) => {
      const fetchUser = await request.get(`${baseURL}/api/users`, {
        params: {
          ids: `${sampleUserId}`
        }
      })
      const user = await fetchUser.json()
      expect(fetchUser.ok()).toBeFalsy()
      expect(user.type).toEqual("ERROR")
    })
  })

  test.describe("malformed_token_request", () => {
    let malformedApi: APIRequestContext

    test.beforeAll(async ({ playwright }) => {
      malformedApi = await playwright.request.newContext({
        extraHTTPHeaders: {
          authorization: "Bearer"
        }
      })
    })

    test("first_25_tickets", async ({ baseURL }) => {
      const fetchTickets = await malformedApi.get(`${baseURL}/api/tickets`)
      const ticket = await fetchTickets.json()
      expect(fetchTickets.ok()).toBeFalsy()
      expect(ticket.type).toEqual("ERROR|AUTH")
    })

    test("ticket_by_id", async ({ baseURL }) => {
      const fetchTicket = await malformedApi.get(`${baseURL}/api/tickets/${sampleTicketId}`)
      const ticket = await fetchTicket.json()
      expect(fetchTicket.ok()).toBeFalsy()
      expect(ticket.type).toEqual("ERROR|TICKET")
    })

    test("user_ids", async ({ baseURL }) => {
      const fetchUser = await malformedApi.get(`${baseURL}/api/users`, {
        params: {
          ids: `${sampleUserId}`
        }
      })
      const user = await fetchUser.json()
      expect(fetchUser.ok()).toBeFalsy()
      expect(user.type).toEqual("ERROR|AUTH")
    })
  })

  test.describe("users", () => {
    test("user_data_format", async () => {
      const fetchUser = await api.get("/api/users", {
        params: {
          ids: `${sampleUserId}`
        }
      })
      const user = await fetchUser.json()
      expect(user.data[0]).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          email: expect.any(String),
          name: expect.any(String),
          created_at: expect.any(String),
        })
      )
      // @ts-ignore
      expect(user.data[0].photo).toBeOneOf([String, null])
    })

    test("resolve_ticket_comments_author_format", async () => {
      const fetchTicket = await api.get(`/api/tickets/${sampleTicketId}`)
      const ticket = (await fetchTicket.json()).data
      const commentAuthor = ticket.comments[0].author
      expect(commentAuthor).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          email: expect.any(String),
          name: expect.any(String),
          created_at: expect.any(String),
        })
      )
      // @ts-ignore
      expect(commentAuthor.photo).toBeOneOf([String, null])
    })
  })

  test.describe("ticket_count", () => {
    let totalCount: number, openCount: number, pendingCount: number, solvedCount: number

    test("total_tickets", async () => {
      const total = await api.get("/api/tickets/count")
      expect(total.ok()).toBeTruthy()

      const count = (await total.json()).data
      expect(typeof count).toEqual("number")

      totalCount = count
    })

    test("open_tickets", async () => {
      const open = await api.get("/api/tickets/count", {
        params: {
          status: "open"
        }
      })
      expect(open.ok()).toBeTruthy()

      const count = (await open.json()).data
      expect(typeof count).toEqual("number")

      openCount = count
    })

    test("pending_tickets", async () => {
      const pending = await api.get("/api/tickets/count", {
        params: {
          status: "pending"
        }
      })
      expect(pending.ok()).toBeTruthy()

      const count = (await pending.json()).data
      expect(typeof count).toEqual("number")

      pendingCount = count
    })

    test("solved_tickets", async () => {
      const solved = await api.get("/api/tickets/count", {
        params: {
          status: "solved"
        }
      })
      expect(solved.ok()).toBeTruthy()

      const count = (await solved.json()).data
      expect(typeof count).toEqual("number")

      solvedCount = count
    })

    test("verify_total_counts",  () => {
      expect(totalCount).toStrictEqual(openCount + pendingCount + solvedCount)
    })
  })
})