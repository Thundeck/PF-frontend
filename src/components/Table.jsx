import React from "react";

const Table = ({ array, typeTable }) => {
  const handleClick = () => {};
  return (
    <table className="w-full text-sm text-left shadow-md rounded-lg ">
      <thead className="text-xs text-white capitalize0 bg-principal dark:bg-principal-dark">
        <tr>
          <th scope="col" className="py-3 px-6">
            id
          </th>
          <th scope="col" className="py-3 px-6">
            name,owmer,title
          </th>
          <th scope="col" className="py-3 px-6">
            Status
          </th>
          <th scope="col" className="py-3 px-6">
            Action
          </th>
        </tr>
      </thead>

      <tbody>
        {array?.length ? (
          array.map((e) => (
            <tr
              key={e?._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="py-4 px-6 text-white">{e?._id}</td>
              <td className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                <img
                  className="w-10 h-10 rounded-full"
                  src={
                    e?.profile_img ||
                    e?.imgs?.[0] ||
                    e?.img ||
                    e?.icon ||
                    "https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
                  }
                  alt={"img"}
                />
                <div className="pl-3">
                  <div className="text-base font-semibold">
                    {e?.name || e?.title || e?.client?.name || e?.description}
                  </div>
                  <div className="font-normal text-gray-500">
                    {e?.email || e?.addres || e?.comment || e?.description}
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center text-white">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      !e?.deleted ? "bg-green-400" : "bg-red-500"
                    } mr-2`}
                  ></div>
                  {!e?.deleted ? "Online" : "Offline"}
                </div>
              </td>

              <td className="py-4 px-6">
                <button
                  onClick={() => handleClick()}
                  value={e?.deleted}
                  className="font-medium text-principal dark:text-principal-dark hover:underline"
                >
                  {e?.deleted ? "enable" : "disable"}
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>{"no hay " + typeTable + " registrados"}</tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
