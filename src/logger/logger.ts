import log4js from "log4js";
import config from "config";

const logConfiguration = config.get<any>("log4js");

log4js.configure(logConfiguration);

export default log4js;
