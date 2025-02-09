const readline = require('readline');
const axios = require('axios');

const RESET = "\x1b[0m";
const FG_BLUE = "\x1b[34m";
const FG_GREEN = "\x1b[32m";
const FG_RED = "\x1b[31m";
const FG_YELLOW = "\x1b[33m";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptForWallet() {
    rl.question(FG_BLUE + "Enter wallet address: " + RESET, (wallet) => {
        promptForEarnings(wallet);
    });
}

function promptForEarnings(wallet) {
    rl.question(FG_BLUE + "Enter total earnings: " + RESET, (total) => {
        rl.question(FG_BLUE + "Enter pending earnings: " + RESET, (pending) => {
            rl.question(FG_BLUE + "Enter paid earnings: " + RESET, (paid) => {
                sendPostRequest(wallet, total, pending, paid);
            });
        });
    });
}

async function sendPostRequest(wallet, total, pending, paid) {
    const data = {
        wallet: wallet,
        earnings: {
            total: parseFloat(total),
            pending: parseFloat(pending),
            paid: parseFloat(paid)
        }
    };
    
    try {
        const response = await axios.post('https://kaleidofinance.xyz/api/testnet/update-balance', data);
        console.log(FG_GREEN + "Balance updated successfully!" + RESET);
        console.log(FG_GREEN + "Wallet: " + wallet + RESET);
        console.log(FG_GREEN + "Total Earnings: " + parseFloat(total).toFixed(2) + RESET);
        console.log(FG_GREEN + "Pending Earnings: " + parseFloat(pending).toFixed(2) + RESET);
        console.log(FG_GREEN + "Paid Earnings: " + parseFloat(paid).toFixed(2) + RESET);
        rl.close();
    } catch (error) {
        console.log(FG_RED + "An error occurred while updating the balance." + RESET);
        console.log(FG_RED + "Error Details: " + error.message + RESET);
        rl.close();
    }
}

console.log(FG_YELLOW + "This is just one of the many powerful bots in VIP ADFMIDN. Want more? Come join us!" + RESET);
console.log(FG_YELLOW + "HOKIRECEH x ONGKANG ONNGKANG" + RESET);
console.log(FG_YELLOW + "KALEIDO AUTO INJECT PLER, DYOR!" + RESET);
console.log("");
promptForWallet();
