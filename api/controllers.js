import {
  Configuration,
  PlaidEnvironments,
  PlaidApi,
  Products,
  CountryCode,
} from "plaid";
import { MongoClient } from "mongodb";

const configuration = new Configuration({
  // basePath: PlaidEnvironments.sandbox,
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": "",
      "PLAID-SECRET": "", // SANDBOX
      // "PLAID-SECRET": "", // DEVELOPMENT
    },
  },
});
const plaidClient = new PlaidApi(configuration);

var mongoUrl = process.env.MONGO_CONNECTION_URL;
// const mongoClient = MongoClient.connect(mongoUrl, function (err, db) {
//   if (err) throw err;
// });

const getLinkToken = async (req, res) => {
  const configs = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: "req.body.userId",
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

const authGet = async (req, res) => {
  const param = {
    access_token: req.body.accessToken,
  };
  console.log("param:", param);

  try {
    const response = await plaidClient.authGet({
      access_token: req.body.accessToken,
    });
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

const getBudget = async (req, res) => {
  // console.log(JSON.stringify(req));

  const client = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }

  try {
    const db = client.db("budgeting");
    let collection = db.collection("monthlyBudget");
    let query = { month: "2022-05" };
    let mongoResult = await collection.findOne(query);

    console.log("MONGO RESULT LOOK HERE ----->>>>>>>:", mongoResult);
    res.send(mongoResult);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const addCategory = async (req, res) => {
  // console.log(JSON.stringify(req));

  const client = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }

  try {
    const db = client.db("budgeting");
    let collection = db.collection("monthlyBudget");

    let filter = { month: "2022-05" };
    const updateDoc = {
      $push: {
        categories: {
          name: "New Category",
          items: [],
        },
      },
    };

    //   $push: {
    //     plot: `A harvest of random numbers, such as: ${Math.random()}`,
    //   },
    // };
    const result = await collection.updateOne(filter, updateDoc);

    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );

    let query = { month: "2022-05" };
    let mongoResult = await collection.findOne(query);
    res.send(mongoResult);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const updateCategory = async (req, res) => {
  const client = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }

  try {
    const db = client.db("budgeting");
    let collection = db.collection("monthlyBudget");

    const filter = { month: req.body.month };
    const updateDoc = { $set: req.body.updates };

    const result = await collection.updateOne(filter, updateDoc);

    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
    res.end();
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

export {
  getLinkToken,
  getAccessToken,
  getAccounts,
  getTransactions,
  getBudget,
  addCategory,
  authGet,
};
