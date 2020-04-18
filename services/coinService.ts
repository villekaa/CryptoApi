import axios from "axios";
import * as fs from "fs";
import * as dotenv from "dotenv";
import * as moment from "moment";
dotenv.config();
moment.locale(process.env.LOCALE);

export async function getCoinListings() {
  try {
    const response = await axios.get(process.env.API_URL!);
    return response.data;
  } catch (error) {
    console.log(`Error fetching coins from api ${error}`);
  }
}

export function writeJson(fileName: string, text: string) {
  try {
    let data = JSON.stringify(text);
    fs.writeFileSync(fileName, data);
  } catch (error) {
    console.log(`Error writing to json ${error}`);
  }
}

export function updateLog() {
  try {
    let text = `Updated coin prices ${moment().format(
      "MMMM Do YYYY, h:mm:ss a"
    )} \n`;
    fs.appendFile("./log.txt", text, function (err) {
      if (err) throw err;
      console.log(text);
    });
  } catch (error) {
    console.log(`Error updating log ${error}`);
  }
}

export function getCoins() {
  try {
    let rawdata = fs.readFileSync("./coins.json");
    return JSON.parse(rawdata.toString());
  } catch (error) {
    console.log(`Error reading coin list ${error}`);
  }
}
