import express, { Request, Response } from "express";
import { OkPacket, RowDataPacket } from "mysql2";

const queryResult = (query: string) => {
  const result: Promise<any> = new Promise((resolve, reject) => {
    db.query(query, (error: any, result: any) => {
      if (error) {
        reject(error);
      }

      const rows = <RowDataPacket[]>result;
      resolve(rows);
    });
  });

  return result;
};

export { queryResult };
