import { useState } from "react";
import { snacks } from "./Data.js";
import { BiSort } from "react-icons/bi";

export default function Table() {
  const [data, setData] = useState({
    searchValue: "",
    sortTypeBy: "",
    isAscending: false
  });
  const searchHandler = (val) => {
    setData({ ...data, searchValue: val });
  };
  const sortData = (actionType) => {
    setData({
      ...data,
      sortTypeBy: actionType,
      isAscending: !data.isAscending
    });
  };
  console.log(data);
  const applyFilters = (arr) => {
    let filtered = [...arr];
    if (data.searchValue !== "") {
      filtered = [
        ...filtered.filter(
          ({ product_name, ingredients }) =>
            product_name
              .toLowerCase()
              .includes(data.searchValue.toLowerCase()) ||
            ingredients.some((item) =>
              item.toLowerCase().includes(data.searchValue.toLowerCase())
            )
        )
      ];
      console.log(filtered, "fil");
    }
    if ((data.actionType !== "") & data.isAscending) {
      filtered = filtered.sort(
        (a, b) => a[data.sortTypeBy] - b[data.sortTypeBy]
      );
    }
    if ((data.actionType !== "") & !data.isAscending) {
      filtered = filtered.sort(
        (a, b) => b[data.sortTypeBy] - a[data.sortTypeBy]
      );
    }
    return filtered;
  };

  const filteredData = applyFilters(snacks);
  return (
    <div>
      <h2>Machine Coding Round Three</h2>
      <p>
        The goal of this assignment is to create a table with filter and sorting
        functionality for snacks list using React JS.
      </p>
      <input
        type="text"
        placeholder="Search.."
        onChange={(e) => searchHandler(e.target.value)}
      />
      <table>
        <tr>
          <th onClick={() => sortData("id")}>
            Id
            <BiSort />
          </th>
          <th onClick={() => sortData("product_name")}>Product Name</th>
          <th onClick={() => sortData("price")}>
            Price
            <BiSort />
          </th>
          <th onClick={() => sortData("calories")}>
            Calories
            <BiSort />
          </th>
          <th onClick={() => sortData("ingredients")}>Ingredients</th>
        </tr>
        {filteredData.map(
          ({ id, product_name, price, calories, ingredients }) => {
            return (
              <>
                <tr key={id}>
                  <td>{id}</td>
                  <td>{product_name}</td>
                  <td>{price}</td>
                  <td>{calories}</td>
                  <td>{ingredients.join(", ")}</td>
                </tr>
              </>
            );
          }
        )}
      </table>
    </div>
  );
}
