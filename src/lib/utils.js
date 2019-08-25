import on from "./on";
import qs from "./qs";
import qsa from "./qsa";
import closest from "./closest";
import matches from "./matches";

const wait = async ms => new Promise(resolve => setTimeout(resolve, ms));

export { qs, qsa, on, closest, matches, wait };
