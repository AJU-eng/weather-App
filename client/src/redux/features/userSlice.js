import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  recentLocation:null,
  userData: null,
  locations: [],
  isLogged: false,
  token: "",
  err: "",
};

export const userRegister = createAsyncThunk(
  "user/register",
  async (data, { rejectWithValue }) => {
    try {
      let body = {
        query: `mutation{
            createUser(input:{name:"${data.name}",email:"${data.email}",password:"${data.password}"}){_id,name,email}
        }`,
      };
      const res = await axios.post("http://localhost:3000/graphql", body);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const userLogin = createAsyncThunk(
  "user/login",
  async (datas, { rejectWithValue }) => {
    try {
      console.log(datas);
      let body = {
        query: `query{
                login(email:"${datas.email}",password:"${datas.password}"){
                    userId,token,tokenExpiration
                }
            }`,
      };
      const data = await axios.post("http://localhost:3000/graphql", body);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  let body = {
    query: `query{Logout{done}}`,
  };
  const data = await axios.post("http://localhost:3000/graphql", body);
  return data.data;
});

export const getLocation = createAsyncThunk("user/locations", async (token) => {
  
  let body = {
    query: `query{getLocations(token:"${token}"){location{location,temp}}}`,
  };
  
  const res = await axios.post("http://localhost:3000/graphql", body);
  return res.data;
});

export const saveLocation = createAsyncThunk(
  "user/createLocation",
  async (data) => {
    try {
      
      console.log(data);
      let body = {
        query: `mutation{
          location(input:{city:"${data.city}",temp:${data.temp},token:"${data.token}"}){location,temp}
      }`,
      };
      const res=await axios.post("http://localhost:3000/graphql",body)
      console.log(res.data);
      return res.data
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

export const logged = createAsyncThunk(
  "user/logged",
  async (token, { rejectWithValue }) => {
    try {
      let body = {
        query: `query{
            isAuth(token:"${token}"){
                Auth
            }
        }`,
      };
      const res = await axios.post("http://localhost:3000/graphql", body);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  initialState: initialState,
  name: "user",
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state, action) => {
      state.loading = true;
      state.userData = null;
      state.err = "";
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.err = "";
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      state.loading = false;
      state.userData = null;
      state.err = action.payload;
    });
    builder.addCase(userLogin.pending, (state, action) => {
      (state.loading = true), (state.userData = null), (state.err = "");
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      (state.loading = false),
        (state.userData = action.payload),
        (state.isLogged = true);
      // console.log(action.payload.data.login.token);
      state.token = action.payload.data.login.token;
      state.err = "";
    }),
      builder.addCase(userLogin.rejected, (state, action) => {
        (state.loading = false),
          (state.userData = null),
          (state.err = action.payload);
      }),
      builder.addCase(logout.fulfilled, (state, action) => {
        state.isLogged = false;
      });

    builder.addCase(logged.fulfilled, (state, action) => {
      state.isLogged = true;
    }),
      builder.addCase(logged.rejected, (state, action) => {
        state.isLogged = false;
      }),
      builder.addCase(getLocation.pending, (state, action) => {
        state.loading = true;
      });
    builder.addCase(getLocation.fulfilled, (state, action) => {
      (state.loading = false), (state.locations = action.payload);
    });
    builder.addCase(saveLocation.fulfilled,(state,action)=>{
     state.locations
    })
  },
});

export const userReducer = userSlice.reducer;
