
import args from "commander";


// For production version.
if (process.defaultApp != true) process.argv.unshift("");

args
.option("-t, --testnet", "Use the test network")
.parse(process.argv);

export const testnet = args.testnet;
