import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userData: [],
  inputFormUpdate: { _id: "", name: "", phone: "", email: "" },
};

export const fetchedAllData = createAsyncThunk(
  "user/fetchedAllData",
  async () => {
    const res = await axios("http://localhost:5000/users");
    const data = await res.data;
    return data;
  }
);

export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async (user) => {
    const config = { "content-type": "application/json" };
    const { _id } = user;
    axios.put(`http://localhost:5000/users/${_id}`, user, config);
    return user;
  }
);

export const deleteUsersData = createAsyncThunk(
  "user/deleteUsersData",
  async (user) => {
    const { _id } = user;
    axios.delete(`http://localhost:5000/users/${_id}`);
    return user;
  }
);

export const addUserData = createAsyncThunk(
  "user/addUserData",
  async (user) => {
    const config = { "content-type": "application/json" };
    delete user._id;
    return axios
      .post(`http://localhost:5000/users`, user, config)
      .then((res) => {
        return res.data;
      })
      .catch((e) => console.log(e));
  }
);

export const crudSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateInitial: (state, action) => {
      state.inputFormUpdate = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchedAllData.fulfilled, (state, action) => {
      state.userData = [...state.userData, ...action.payload];
    });
    builder.addCase(deleteUsersData.fulfilled, (state, action) => {
      state.userData = state.userData.filter(
        (user) => user._id !== action.payload._id
      );
    });
    builder.addCase(addUserData.fulfilled, (state, action) => {
      state.userData.push(action.payload);
    });
    builder.addCase(updateUserData.fulfilled, (state, action) => {
      state.userData = state.userData.map((user) => {
        if (user._id === action.payload._id) {
          return action.payload;
        } else return user;
      });
    });
  },
});

export const { updateInitial } = crudSlice.actions;

export default crudSlice.reducer;
