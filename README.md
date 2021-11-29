# Zendesk Coding Challenge

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Design](#design)
    - [Application](#application)
    - [API Proxy](#api-proxy-design)
4. [Testing](#testing)
    - [Component Tests](#component-tests)
    - [API Proxy](#api-proxy-testing)
    - [Users](#users)
    - [Ticket Count](#ticket-count)
5. [Commands](#commands)

## Installation

The application requires a NodeJS runtime to be installed in order
to run the NextJS application. The NodeJS runtime can be downloaded [here](https://nodejs.org/en/).

Once Node has been installed, the application specifically uses `yarn` as its package manager.
Install `yarn` using `npm`:

```bash
npm install -g yarn
```

In the root directory, install all the necessary dependencies for the application:

```bash
yarn install
```

Then to start the application, in a production server, run:

```bash
yarn build
yarn start
```

To start the development server, run:

```bash
yarn dev
```

Both the application and the api proxy will start and can be accessed through
`http://localhost:3000` if a URL is not specified.

## Configuration

The application can be configured to run on different credentials. First,
add a file in the root directory named `.env.local`. This file will be the single source
of truth for the necessary information required in order to properly fetch information.

The following are the required variables (case-sensitive) in order to fully configure the application:

| Name | Description |
|:-----|:------------|
| CLIENT_EMAIL | The email used to authenticate into the Zendesk API |
| API_TOKEN | An api token used to authenticate together with the `CLIENT_EMAIL`. An api token can be requested through the Zendesk UI |
| CLIENT_ID | An OAuth2 unique client identifier used when registering an OAuth application through the Zendesk UI |
| ZENDESK_DOMAIN | The domain used when creating a Zendesk account. The domain can be identified from the URL: `https://{ZENDESK_DOMAIN}.zendesk.com` |
| NAMESPACE | The current URL used to run the NextJS application (usually it is `http://localhost:3000`) |

## Design

### Application

The application is designed to show as much information about the tickets and the tickets available to the user. The tickets are paginated
through using the Zendesk API and limits each request to the API by 25 tickets. Each time the user cycles through the different pages, 
the API is queried to fetch the next 25 tickets. This allows data to be queried slowly and reduces the time it takes for users to see initial
results. By paging through the tickets using the Zendesk API, we can address a case where there are a large number of tickets and a user has a 
reduced bandwidth. Paging through 25 tickets at a time will increase user experience by allowing the user to see initial results faster and wait
lesser time in a loading state.

<h3 id="api-proxy-design">API Proxy</h3>

The application does not directly communicate with the Zendesk API. Instead, the application has a single interface that proxies
requests to the Zendesk API and re-formats data returned from the API to match the application's data schema. This isolates 
business logic related to the Zendesk API to another entity whose purpose is to handle requests and errors from the Zendesk API. 
This allows a separation of concerns from the application and the API by allowing the application to only work with the data given and
is guaranteed a consistent structure through all its queries.

#### Authorization

The API proxy handles authorization through using an access token from the OAuth flow. Since user authentication is not required for 
this application, a query to the Zendesk API is made to create an access token that can be used as a `Bearer` token. In an attempt
to reduce the chances of exposing credentials to the browser, the process of requesting an access token is done through the API proxy and 
the client will only receive the access token required to further request information about tickets. The API proxy validates each request
made by the client to include the necessary information and credentials before making the request to the Zendesk API.

#### Resolving Users and Comments

The API proxy also handles one important step when querying for tickets: resolving user information. Each query to gather information
about a specific ticket only provides the `user_id`. Therefore, the API proxy will resolve this information by querying other Zendesk API
endpoints to create a structure that is consistent and will reduce roundtrip requests from the client. Information from the user is filtered
through the API proxy and only shows information that is needed for the UI.

## Testing

Tests can be run using the following command:

```bash
yarn test:e2e
```

The test will run using the configuration which requires the `NAMESPACE` environment variable to be defined. The `NAMESPACE`
variable will configure the `baseURL` used to mock interactions between the user and the UI. 

The tests include two major sections: `component_tests` and `api_proxy`.

### Component Tests

Component tests run basic and simple tests to determine whether the correct information is being displayed
to the UI.

#### Basic Tests

The basic tests section checks for whether the page successfully loads and whether the data coming in is correct. This is determined
through ensuring that the number of tickets with different status adds up to the total number of tickets. 

#### Ticket Pagination

The ticket pagination section checks for whether the correct number of tickets are displayed correctly per page. There are two tests:

1. Total number of tickets less than 25
2. Total number of tickets greater than or equal to 25

Either tests are skipped if it is not applicable. 

<h3 id="api-proxy-testing">API Proxy</h3>

The API Proxy section tests for specific conditions where errors can happen and where a specific data format should exist.

#### OAuth Token

The `oauth_token` test describes whether an access token can be queried to be used as the bearer token.

#### First 25 Tickets

The `first_25_tickents` prepares sample data for the next tests and checks whether the data fetched is either 25 
(if the total number of tickets is greater than or equal to 25), and less than 25 otherwise.

#### No Token Request

The `no_token_request` section tests for the different API proxy endpoints and whether error is handled properly when no
access token is provided.

#### Malformed Token Request

The `malformed_token_request` section tests for the different API proxy endpoints and whether error is handled properly when
an incorrect bearer token is provided.

### Users

The `users` section tests for the `users` endpoint. It evaluates whether the data returned is in the correct format and whether
each user-related information is resolved into the correct `user` object format in the comments related to a ticket.

### Ticket Count

The `ticket_count` section tests for the different ticket status types and checks whether each ticket status counts add up to the 
total number of tickets.

## Commands

The following are a summary of all commands to run the application.

| Name | Description |
|:-----|:------------|
| `yarn start` | Starts the application in a production server |
| `yarn dev` | Starts the development server (with hot-reload) |
| `yarn test:e2e` | Starts running end-to-end testing using playwright |
| `yarn build` | Builds the application into static JavaScript files |