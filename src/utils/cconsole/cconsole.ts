const CSS_FLAG = "%c";

const LOG_BADGE = "color: #000000; background-color: #00ffcc; font-weight: bold;";
const LOG_TEXT = "color: #00ffcc; font-style: italic;";

const ERROR_BADGE = "color: #ffffff; background-color: #ff0055; font-weight: bold;";
const ERROR_TEXT = "color: #ff0055; font-weight: bold; text-decoration: underline;";

export const cconsole = {
  log(message: string) {
    console.log(`${CSS_FLAG} LOG ${CSS_FLAG} ${message}`, LOG_BADGE, LOG_TEXT);
  },
  error(message: string) {
    console.error(`${CSS_FLAG} ERR ${CSS_FLAG} ${message}`, ERROR_BADGE, ERROR_TEXT);
  }
}