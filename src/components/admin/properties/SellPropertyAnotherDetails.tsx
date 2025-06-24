import DeleteIcon from "@mui/icons-material/Delete";

type ARR = {
  numOfField: any[];
  setNumOfField: () => void;
  addNewFieldOnBtnClick: any;
};
const SellPropertyAnotherDetails = ({
  numOfField,
  setNumOfField,
  addNewFieldOnBtnClick,
}: ARR) => {
  const deleteFieldOnBtnClick = (id: any) => {
    const newnumOfFiled = numOfField.filter((field) => field.id !== id);
    // setNumOfField(newnumOfFiled)
  };
  //   const addNewFieldOnBtnClick = () => {
  //     setNumOfField((prev: any[]) => [
  //       ...prev,
  //       { id: prev.length + 1, item: "", quantity: "", rate: "", amount: "" },
  //     ]);
  //   };
  return (
    <>
      <tr>
        <td className="border border-slate-600 p-3">
          <input
            type="text"
            className="rounded-md border border-slate-600 p-2"
          />
        </td>
        <td className="border border-slate-600 p-3">
          <input
            type="number"
            className="rounded-md border border-slate-600 p-2"
            defaultValue={1.0}
          />
        </td>

        <td className="border border-slate-600 p-3">
          <input
            type="number"
            className="rounded-md border border-slate-600 p-2"
            defaultValue={0.0}
          />
        </td>
        <td className="border border-slate-600 p-3">
          <input
            type="number"
            className="rounded-md border border-slate-600 p-2"
            defaultValue={0.0}
          />
        </td>
        <td className="border border-slate-600 p-3">
          <div className="flex cursor-pointer items-center justify-center text-red-600">
            <DeleteIcon onClick={deleteFieldOnBtnClick} />
          </div>
          <div>
            <button onClick={addNewFieldOnBtnClick}>Add</button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default SellPropertyAnotherDetails;
