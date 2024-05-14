import { Response } from "express";

const populateTokenInResponse = (
  token: string,
  response: Response
): Response => {
  const cookieOptions = {
    httpOnly: true,
  };

  response.cookie("token", token, cookieOptions);
  return response;
};

// export
export default {
  populateTokenInResponse,
};
