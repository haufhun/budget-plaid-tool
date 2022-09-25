import { useEffect, useState } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { PlaidLinkOptions, usePlaidLink } from "react-plaid-link";

export default function Accounts() {
  const [linkToken, setLinkToken] = useState("");
  const [publicToken, setPublicToken] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    getLinkToken();
  }, []);

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

  const handleOnSuccess = async (publicToken: any, metadata: any) => {
    console.log("SUCCESS!");

    setPublicToken(publicToken);
    console.log(metadata);
  };

  const authGet = async () => {
    try {
      const response = await axios.post("http://localhost:4090/authGet", {
        accessToken,
      });
      console.log("response:", response);
    } catch (e) {
      console.log(e);
    }
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
    <>
      <Container>
        <Typography variant="h1">Accounts</Typography>
        <Stack>
          <Stack direction="row" spacing={2}>
            <Typography>Link Token: {linkToken}</Typography>
            <Typography>Public Token: {publicToken}</Typography>
            <Typography>Access Token: {accessToken}</Typography>
          </Stack>

          <Button onClick={() => open()}>Open Link</Button>
          <Button onClick={getAccessToken}>Get Access Token</Button>
          <Button onClick={authGet}>Auth Get</Button>
        </Stack>
      </Container>
    </>
  );
}
