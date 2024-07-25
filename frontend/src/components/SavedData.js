import { useSelector, useDispatch } from "react-redux";
import {
  fetchedAllData,
  updateInitial,
  deleteUsersData,
} from "../features/crudSlice";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useEffect } from "react";

const SavedData = () => {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.userData);

  useEffect(() => {
    dispatch(fetchedAllData());
  }, [dispatch]);

  return (
    <div className="flex-column items-center justify-center">
      <div className="flex justify-center items-center w-7/12 rounded-lg bg-blue-100 h-10 mx-auto">
        <h2 className="font-bold text-cyan-700 text-xl">Saved Data</h2>
      </div>
      <div className="flex items-center justify-center mx-auto">
        <table className="bg-slate-100 w-7/12  rounded-lg my-2">
          <thead>
            <tr>
              <th className="py-2 text-center">Name</th>
              <th className="py-2 text-center">Email</th>
              <th className="py-2 text-center">Phone</th>
              <th className="py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, index) => (
              <tr key={index}>
                <td className="py-1 text-center">{user.name}</td>
                <td className="py-1 text-center">{user.email}</td>
                <td className="py-1 text-center">{user.phone}</td>
                <td className="py-1 px-2 text-center flex items-center justify-between">
                  <MdDeleteForever
                    size="1.6rem"
                    cursor="pointer"
                    color="black"
                    onClick={() => dispatch(deleteUsersData(user))}
                  />
                  <FaEdit
                    size="1.3rem"
                    cursor="pointer"
                    onClick={() => {
                      dispatch(updateInitial(user));
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SavedData;
