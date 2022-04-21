import { useEffect, useState } from "react";
import { getBanks } from "../api/rest/bank";
import Bank from "../components/Bank";
import "../styles/banks.css";

function Banks() {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    updateBanksList();
  }, []);

  const updateBanksList = () => {
    getBanks().then((resp) => {
      setBanks(resp.data);
    });
  };

  return (
    <div className='banks'>
      {banks.map((bank) => {
        return (
          <Bank
            key={bank.id}
            id={bank.id}
            bankName={bank.bankName}
            initialPayment={bank.initialPayment}
            maximumLoan={bank.maximumLoan}
            interestRate={bank.interestRate}
            loanTerm={bank.loanTerm}
            updateBanksList={updateBanksList}
          ></Bank>
        );
      })}
      <Bank addNewBank={true} updateBanksList={updateBanksList}></Bank>
    </div>
  );
}

export default Banks;
