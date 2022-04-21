import { useState } from "react";
import Select from "../components/Select";
import useFormFields from "../components/useFormFields";
import "../styles/calculator.css";

function Calculatotr({ banks }) {
  const [fields, changeFieldValue] = useFormFields({
    bankSelected: 0,
    initialLoan: "",
    downPayment: "",
  });

  const [monthlyPayment, setMonthlyPayment] = useState("");

  const selectData = banks.map((bank) => {
    return { value: bank.id, id: bank.id, label: bank.bankName };
  });

  //monthly payment calculation
  const calculate = (e) => {
    e.preventDefault();
    let errors = [];
    for (const value of Object.values(fields)) {
      if (value.length === 0) {
        alert("ERROR! One or more fields are empty!");
        return;
      }
    }
    if (fields.initialLoan > banks[fields.bankSelected].maximumLoan) {
      errors.push("Loan amount too high");
    }
    if (
      fields.downPayment <
      (banks[fields.bankSelected].initialPayment * fields.initialLoan) / 100
    ) {
      errors.push(
        `Down payment must be more than ${
          (banks[fields.bankSelected].initialPayment * fields.initialLoan) / 100
        }`
      );
    }
    if (errors.length) {
      alert(errors[0]);
    } else {
      const p = fields.initialLoan - fields.downPayment;
      const r = banks[fields.bankSelected].interestRate / 100;
      const n = banks[fields.bankSelected].loanTerm;
      setMonthlyPayment(
        `${(
          (p * (r / 12) * Math.pow(1 + r / 12, n)) /
          (Math.pow(1 + r / 12, n) - 1)
        ).toFixed(2)} UAH`
      );
    }
  };
  return (
    <form className='calculator' onSubmit={calculate}>
      <div className='calculator__input-holder'>
        <div className='calculator__input-title'>Select Bank</div>
        <Select
          data={selectData}
          name={"bankSelected"}
          handleSelect={changeFieldValue}
          value={fields.bankSelected}
          className='calculator__select'
        ></Select>
      </div>
      <div className='calculator__bank-info'>
        <div>
          Interest rate(%):{" "}
          <span>{banks[fields.bankSelected].interestRate}</span>
        </div>
        <div>
          Initial payment(%):{" "}
          <span>{banks[fields.bankSelected].initialPayment}</span>
        </div>
        <div>
          Loan term(month): <span>{banks[fields.bankSelected].loanTerm}</span>
        </div>
        <div>
          Maximum loan(UAH):{" "}
          <span>{banks[fields.bankSelected].maximumLoan}</span>
        </div>
      </div>
      <div className='calculator__input-holder'>
        <div className='calculator__input-title'>Initial loan</div>
        <input
          className='calculator__input'
          type='number'
          name='initialLoan'
          value={fields.initialLoan}
          onChange={changeFieldValue}
          placeholder='Enter initial loan'
        />
      </div>
      <div className='calculator__input-holder'>
        <div className='calculator__input-title'>Down payment</div>
        <input
          className='calculator__input'
          type='number'
          name='downPayment'
          value={fields.downPayment}
          onChange={changeFieldValue}
          placeholder='Enter down payment'
        />
      </div>
      <button type='submit' className='calculator__btn'>
        Calculate
      </button>
      <input
        className={`calculator__result ${monthlyPayment !== "" ? "show" : ""}`}
        type='text'
        name='monthlyPayment'
        value={monthlyPayment}
        readOnly
      />
    </form>
  );
}

export default Calculatotr;
