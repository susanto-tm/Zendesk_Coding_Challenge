# Zendesk Coding Challenge

## Installation

The application requires a NodeJS runtime to be installed in order
to run the NextJS application. The NodeJS run time can be downloaded [here](https://nodejs.org/en/).

Once Node has been installed, the application specifically uses `yarn` as its package manager.
Install `yarn` using `npm`:

```bash
npm install -g yarn
```

In the root directory, install all the necessary dependencies for the application:

```bash
yarn install
```

Then to start the application, run:

```bash
yarn start
```

To start the development server, run:

```bash
yarn dev
```

Both the application and the proxy api will start and can be accessed through
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

### API Proxy

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


