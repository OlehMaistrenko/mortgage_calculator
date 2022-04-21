import { useState } from "react";
import DeleteIcon from "./DeleteIcon";
import EditIcon from "./EditIcon";
import { deleteBank, updateBank, createBank } from "../api/rest/bank";
import useFormFields from "./useFormFields";
function Bank({
  bankName = "",
  interestRate = "",
  maximumLoan = "",
  initialPayment = "",
  loanTerm = "",
  id,
  updateBanksList,
  addNewBank,
}) {
  //filling bank info to inputs
  const [fields, changeFieldValue, setFormFields] = useFormFields({
    bankName,
    interestRate,
    maximumLoan,
    initialPayment,
    loanTerm,
  });

  //flag for editing bank info
  const [editable, setEditable] = useState(false);

  //cancel editing and setting default values
  const handleCancelEdit = () => {
    setEditable(false);
    setFormFields({
      bankName,
      interestRate,
      maximumLoan,
      initialPayment,
      loanTerm,
    });
  };

  //updating bank info
  const handleEdit = (e) => {
    e.preventDefault();
    for (const value of Object.values(fields)) {
      if (value.length === 0) {
        alert("ERROR! One or more fields are empty!");
        return;
      }
    }
    updateBank(id, fields).then((resp) => {
      updateBanksList();
      setEditable(false);
    });
  };

  //adding new bank to db
  const handleAdd = (e) => {
    e.preventDefault();
    for (const value of Object.values(fields)) {
      if (value.length === 0) {
        alert("ERROR! One or more fields are empty!");
        return;
      }
    }
    createBank(fields).then(() => {
      handleCancelEdit();
      updateBanksList();
    });
  };

  //deleting bank from db
  const handleDelete = () => {
    if (window.confirm("Are you sure?")) {
      deleteBank(id).then((resp) => {
        updateBanksList();
      });
    }
  };

  return (
    <form
      className={`bank ${editable ? "bank-edit" : ""}`}
      onSubmit={addNewBank ? handleAdd : handleEdit}
    >
      {addNewBank && (
        <div
          className='bank__add-btn'
          onClick={() => {
            setEditable(true);
          }}
        ></div>
      )}
      {!addNewBank && (
        <EditIcon
          handleClick={() => {
            setEditable(true);
          }}
        ></EditIcon>
      )}
      {!addNewBank && <DeleteIcon handleClick={handleDelete}></DeleteIcon>}

      <div className='bank__name'>
        <div className='bank__unit-name bank__unit-name_name'>Bank name</div>
        <input
          type='text'
          className='bank__name-input'
          name='bankName'
          value={fields.bankName}
          onChange={changeFieldValue}
          readOnly={!editable}
        />
      </div>
      <div className='bank__info-unit'>
        <div className='bank__unit-name'>Interest Rate(%)</div>
        <input
          type='number'
          className='bank__unit-value'
          name='interestRate'
          value={fields.interestRate}
          onChange={changeFieldValue}
          readOnly={!editable}
        />
      </div>
      <div className='bank__info-unit'>
        <div className='bank__unit-name'>Maximum loan(UAH)</div>
        <input
          type='number'
          className='bank__unit-value'
          name='maximumLoan'
          value={fields.maximumLoan}
          onChange={changeFieldValue}
          readOnly={!editable}
        />
      </div>
      <div className='bank__info-unit'>
        <div className='bank__unit-name'>Minimum down payment(%)</div>
        <input
          type='number'
          className='bank__unit-value'
          name='initialPayment'
          value={fields.initialPayment}
          onChange={changeFieldValue}
          readOnly={!editable}
        />
      </div>
      <div className='bank__info-unit'>
        <div className='bank__unit-name'>Loan term(month)</div>
        <input
          type='number'
          className='bank__unit-value'
          name='loanTerm'
          value={fields.loanTerm}
          onChange={changeFieldValue}
          readOnly={!editable}
        />
      </div>
      <div className='bank__edit-controlls'>
        <button type='submit' className='bank__save-btn bank__btn'>
          Save
        </button>
        <button
          type='button'
          className='bank__cancel-btn bank__btn'
          onClick={handleCancelEdit}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default Bank;
