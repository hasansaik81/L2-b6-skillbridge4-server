// import { Response } from "express";

// type TReponse<T> = {
//   statusCode: number;
//   success: boolean;
//   message: string;
//   data?: T;
// };

// const sendResponse = <T>(res: Response, data: TReponse<T>) => {
//   const { statusCode, success, message, data: DataReponse } = data;

//   res.status(statusCode).json({
//     success,
//     message,
//     data: DataReponse,
//   });
// };

// export default sendResponse;






import { Response } from "express";

type TResponse<T> = {
  statusCode?: number;
  success: boolean;
  message: string;
  data?: T;
  meta?: Record<string, any> | null;
};

const sendResponse = <T>(
  res: Response,
  payload: TResponse<T>
) => {
  const {
    statusCode = 200,
    success,
    message,
    data = null,
    meta = null,
  } = payload;

  return res.status(statusCode).json({
    success,
    message,
    data,
    meta,
  });
};

export default sendResponse;