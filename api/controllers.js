import {
  Configuration,
  PlaidEnvironments,
  PlaidApi,
  Products,
  CountryCode,
} from "plaid";

const configuration = new Configuration({
  // basePath: PlaidEnvironments.sandbox,
  basePath: PlaidEnvironments.development,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": "627933fea56cc7001a026bf3",
      // "PLAID-SECRET": "1790a6708f6a859463d9ed3a320907", // SANDBOX
      "PLAID-SECRET": "0c3f3bfdb1bb673c13ec95b6153641", // DEVELOPMENT
    },
  },
});
const plaidClient = new PlaidApi(configuration);

const getLinkToken = async (req, res) => {
  const configs = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: "user123",
    },
    client_name: "HTS Budget Tool",
    products: [Products.Transactions],
    country_codes: [CountryCode.Us],
    language: "en",
  };

  try {
    const response = await plaidClient.linkTokenCreate(configs);
    console.log(response);
    console.log(response.data);

    res.send(response.data);
  } catch (e) {
    res.status(500).send(e);
  }
};

const getAccessToken = async (req, res) => {
  const param = {
    public_token: req.body.publicToken,
  };
  console.log("param:", param);

  try {
    const response = await plaidClient.itemPublicTokenExchange(param);
    console.log(response);
    console.log(response.data);

    res.send(response.data);
  } catch (e) {
    res.status(500).send(e);
  }
};

const getAccounts = async (req, res) => {
  const param = {
    access_token: req.body.accessToken,
  };
  console.log("param:", param);

  try {
    const response = await plaidClient.accountsGet(param);
    console.log(response);
    console.log(response.data);

    res.send(response.data);
  } catch (e) {
    res.status(500).send(e);
  }
};

const getTransactions = async (req, res) => {
  console.log("param:", req.body);

  try {
    const response = await plaidClient.transactionsGet(req.body);
    // console.log(response);
    // console.log(response.data);

    res.send(response.data);
  } catch (e) {
    console.log("Failed");
    res.status(500).send(e);
  }
};

export { getLinkToken, getAccessToken, getAccounts, getTransactions };
