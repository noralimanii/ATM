//!TODO:
// When click confirm withdraw emtpy input
// Display a notify message
//discount the withdraw amount
//! User cannot withdraw more than his balance

let amount = 350;
let transactions = [];
let transactionStatus = "";

//Queries------------------------------------------------------------------------
const loginScreen = document.querySelector("#login-screen");
const loginForm = document.querySelector("#login-form");
const userNameInput = document.querySelector("#username");
const pinInput = document.querySelector("#pin");
const loginError = document.querySelector("#login-error");
const dashboard = document.querySelector("#dashboard");
const logOutBtn = document.querySelector("#logout-btn");
const transactionScreen = document.querySelector("#transaction-screen");
const balance = document.querySelector("#balance");
const transactionInput = document.querySelector("#transaction-amount");
const transactionError = document.querySelector("#transaction-error");
const depositBtn = document.querySelector("#deposit-btn");
const withdrawBtn = document.querySelector("#withdraw-btn");
const transactionHistory = document.querySelector("#history-screen");
const transactionList = document.querySelector("#history-list");

//-------------------------------------------------------------------------------
//Functions------------------------------------------------------------------------

const openTransactionHistory = () => {
  dashboard.classList.remove("active");
  transactionHistory.classList.add("active");
  transactions.forEach((tranasction) => {
    const li = document.createElement("li");
    li.textContent = tranasction;
    transactionList.appendChild(li);
  });
};

const transactionClick = () => {
  dashboard.classList.remove("active");
  transactionScreen.classList.add("active");
};

const cancelDeposit = () => {
  transactionScreen.classList.remove("active");
  dashboard.classList.add("active");
  transactionError.classList.remove("success");
  transactionError.classList.add("error");
  transactionError.textContent = "";
  transactionInput.value = "";
};

const updateBalance = (balanceAmount) => {
  amount += balanceAmount;
  balance.textContent = `${amount}$`;
};

const confirmDeposit = () => {
  let depositAmount = Number(transactionInput.value);
  if (depositAmount < 1) {
    transactionError.textContent = "You cannot deposit less than 1$";
  } else {
    transactionInput.value = "";
    transactionError.textContent = `Succesfully deposited: ${depositAmount}$`;
    transactionError.classList.remove("error");
    transactionError.classList.add("success");
    transactionError.style.color = "white";
    updateBalance(depositAmount);
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    transactions.push(
      `You have deposited: ${depositAmount} $ at ${day}.${month}.${year} ${hour}:${minutes}`
    );
  }
};

const confirmWithdraw = () => {
  let transactionValue = Number(transactionInput.value); //400
  if (transactionValue > amount) {
    transactionError.textContent = "Inssufficient funds";
  } else if (transactionValue < 1) {
    transactionError.textContent = "You cannot withdraw less than 1 $";
  } else {
    transactionInput.value = "";
    transactionError.textContent = `Successfully withdrew ${transactionValue} $`;
    transactionError.classList.remove("error");
    transactionError.classList.add("success");
    transactionError.style.color = "white";
    updateBalance(-transactionValue); //-200
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    transactions.push(
      `You have withdrawn: ${transactionValue} $ at ${day}.${month}.${year} ${hour}:${minutes}`
    );
  }
};

const confirmTransaction = () => {
  if (transactionStatus === "deposit") {
    confirmDeposit();
  } else {
    confirmWithdraw();
  }
};

const backToDashboard = () => {
  transactionHistory.classList.remove("active");
  transactionHistory.classList.add("hidden");
  dashboard.classList.remove("hidden");
  dashboard.classList.add("active");
  // Clear the transaction list to avoid duplicate entries
  transactionList.innerHTML = "";
};

//-------------------------------------------------------------------------------
//Event Listeners ----------------------------------------------------------------

loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); //PREVENTS RELOADING
  const userName = userNameInput.value;
  const pin = pinInput.value;

  if (userName !== "user" || pin !== "1234") {
    loginError.textContent = "Wrong Credentials, Try again please";
    userNameInput.value = "";
    pinInput.value = "";
  } else {
    loginScreen.classList.remove("active");
    dashboard.classList.add("active");
  }
});

logOutBtn.addEventListener("click", () => {
  dashboard.classList.remove("active");
  loginScreen.classList.add("active");
  userNameInput.value = "";
  pinInput.value = "";
});

depositBtn.addEventListener("click", () => {
  transactionStatus = "deposit";
  transactionClick();
});

withdrawBtn.addEventListener("click", () => {
  transactionStatus = "withdraw";
  transactionClick();
});

//-------------------------------------------------------------------------------

//Styles------------------------------------------------------------------------

loginScreen.classList.add("active");

balance.textContent = `${amount} $`;
//-------------------------------------------------------------------------------
