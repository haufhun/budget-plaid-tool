import {
  Button,
  Container,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AccountBase, Transaction } from "plaid";
import { useState } from "react";
import { usePlaidLink, PlaidLinkOptions } from "react-plaid-link";
import axios from "axios";

const Transactions = (props: any) => {
  const transactions: Transaction[] = props.transactions;
  const accounts: AccountBase[] = props.accounts;

  const findAccountNameById = (accountId: string) =>
    accounts.filter(
      (account: AccountBase) => account.account_id === accountId
    )[0].name;

  return (
    <>
      <Typography variant="h4">Transactions ({transactions.length})</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Merchant</TableCell>
              <TableCell>Categories</TableCell>
              <TableCell>Account</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.transaction_id}>
                <TableCell>{transaction.name}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.merchant_name}</TableCell>
                <TableCell>{transaction.category?.join(", ")}</TableCell>
                <TableCell>
                  {findAccountNameById(transaction.account_id)}
                </TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

function SimpleTest() {
  const [linkToken, setLinkToken] = useState("");
  const [publicToken, setPublicToken] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const [accounts, setAccounts] = useState<AccountBase[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState("");

  const getLinkToken = async () => {
    try {
      const response = await axios.post("http://localhost:4090/getLinkToken", {
        userId: "haufhun",
      });
      console.log("response:", response);

      setLinkToken(response.data.link_token);
    } catch (e) {
      console.log(e);
    }
  };

  const getAccessToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4090/getAccessToken",
        { publicToken }
      );
      console.log("response:", response);

      setAccessToken(response.data.access_token);
    } catch (e) {
      console.log(e);
    }
  };

  const getAccounts = async () => {
    if (!accessToken)
      throw new Error("Need an access token to get accounts...");

    const response = await axios.post("http://localhost:4090/getAccounts", {
      accessToken,
    });
    console.log("response:", response);

    setAccounts(response.data.accounts);
  };

  const getTransactions = async () => {
    if (!accessToken)
      throw new Error("Need an access token to get transactions...");

    const params = {
      access_token: accessToken,
      start_date: "2022-04-01",
      end_date: "2022-05-10",
      options: {},
    };
    if (selectedAccountId !== "ALL") {
      params.options = {
        account_ids: [selectedAccountId],
      };
    }

    const response = await axios.post(
      "http://localhost:4090/getTransactions",
      params
    );

    setTransactions(response.data.transactions);
    console.log("response:", response);
  };

  const handleOnSuccess = async (publicToken: any, metadata: any) => {
    console.log("SUCCESS!");

    setPublicToken(publicToken);
    console.log(metadata);
  };

  // The usePlaidLink hook manages Plaid Link creation
  // It does not return a destroy function;
  // instead, on unmount it automatically destroys the Link instance
  const config: PlaidLinkOptions = {
    onSuccess: handleOnSuccess,
    token: linkToken,
  };
  const { open } = usePlaidLink(config);

  return (
    <Container>
      <Typography>Link Token: {linkToken}</Typography>
      <Typography>Public Token: {publicToken}</Typography>
      <Typography>Access Token: {accessToken}</Typography>

      <Button onClick={getLinkToken}>Get Link Token</Button>
      <Button onClick={() => open()}>Open Link</Button>
      <Button onClick={getAccessToken}>Get Access Token</Button>
      <hr />
      <Button onClick={getAccounts}>Get Accounts</Button>
      <hr />
      <FormControl fullWidth>
        <InputLabel>Account Id</InputLabel>
        <Select
          value={selectedAccountId}
          onChange={(e) => setSelectedAccountId(e.target.value)}
        >
          <MenuItem value="ALL">ALL</MenuItem>
          {accounts.map((a: AccountBase) => (
            <MenuItem value={a.account_id}>
              {a.account_id} ({a.name})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={getTransactions}>Get Transactions</Button>

      <hr />
      <br />
      <Transactions accounts={accounts} transactions={transactions} />
      <br />
    </Container>
  );
}

export default SimpleTest;
