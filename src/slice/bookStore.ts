import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { IBook } from "../types/type";

export const getBookData = createAsyncThunk (
    "bookStore/getBookData",
    async function () {
        const response = await fetch('https://api.itbook.store/1.0/new')
        const data = await response.json()
        return data
    }
)




export const searchBookData = createAsyncThunk (
    "bookStore/searchBookData",
    async function (payload:string) {
        let data:any = []
        if (payload.length <= 1) {const response = await fetch('https://api.itbook.store/1.0/new')
            data = await response.json()}
        else {const response = await fetch(`https://api.itbook.store/1.0/search/${payload}`)
         data = await response.json()}
        return data
    }
)




export const getCurrentBook = createAsyncThunk (
    "bookStore/getCurrentBook",
    async function (payload:any) {
        const response = await fetch(`https://api.itbook.store/1.0/books/${payload}`)
        const data = await response.json()
        return data
    }
)




export const getCardBook = createAsyncThunk (
    "bookStore/getCardBook",
    async function(payload:string[]) {
        const data = await Promise.all(payload.map(async (element:string)=> {
            const data = await fetch(`https://api.itbook.store/1.0/books/${element}`)
            console.log(data.json);
            return data.json();
        }))
        return data;
    }
)



const bookStoreSlice = createSlice ({
    name: "bookSlice",
    initialState:{
        currentBooks: [],
        book: {},
        CartId: [],
        cart: [],
        searchText: '',
        totalPrice: 0,
        status: '',
        error: null
    },
    reducers: {
        AddToCart(state: any, { payload }: { payload: any }) {
            if (!state.CartId.includes(payload)) {
              state.CartId.push(payload);
            }
          },
          RemoveFromCart(state: any, { payload }: { payload: any }) {
            const index = state.CartId.indexOf(payload);
            if (index !== -1) {
                state.CartId.splice(index, 1);
                state.cart = state.cart.filter((item: IBook) => item.isbn13 !== payload);
                let totalPrice = 0;
                state.cart.forEach((element: IBook) => {
                    totalPrice += Number(element.count) * Number(element.price.split('$').join(''));
                });
                state.totalPrice = totalPrice.toFixed(2);
            }
        },
        
          
          
        GetTotalPrice(state:any){
            let totalPrice:number = 0;
            if (state.cart.length === 0) return
                else    {state.cart.forEach((element:IBook) => {
                        (totalPrice += Number(element.count)*Number(element.price.split('$').join('')));
                        state.totalPrice = String(totalPrice.toFixed(2));
                        });
                    } 
        },
        IncreaseCount(state: any, { payload }: { payload: string }) {
            state.cart.forEach((element: IBook) => {
              if (payload === element.isbn13) {
                element.count = (Number(element.count) + 1);
              }
            });
          },
          DecreaseCount(state: any, { payload }: { payload: string }) {
            state.cart.forEach((element: IBook) => {
              if (payload === element.isbn13) {
                const newCount = Number(element.count) - 1;
                const index = state.CartId.indexOf(payload);
                if (newCount === 0) {state.CartId.splice(index, 1);}
                if (newCount > 0) {element.count = newCount;}
              }
            });
          }
          
        
    },
    extraReducers:(builder) => {
        return builder.addCase(getBookData.pending, (state:any) => {
            state.status = 'Loading'
            state.error = null;
        }),
        builder.addCase(getBookData.fulfilled, (state:any, payload:any) => {
            state.status = 'Done.'
            state.error = null;
            state.currentBooks = payload.payload.books;
        }),
        builder.addCase(getBookData.rejected, (state:any, payload:any) => {
            state.status = 'ERROR'
            state.error = payload;
        }),



        builder.addCase(searchBookData.pending, (state:any) => {
            state.status = 'Loading'
            state.error = null;
        }),
        builder.addCase(searchBookData.fulfilled, (state:any, payload:any) => {
            state.status = 'Done.'
            state.error = null;
            state.currentBooks = payload.payload.books;
        }),
        builder.addCase(searchBookData.rejected, (state:any, payload:any) => {
            state.status = 'ERROR'
            state.error = payload;
        }),



        builder.addCase(getCurrentBook.pending, (state:any) => {
            state.status = 'Loading'
            state.error = null;
        }),
        builder.addCase(getCurrentBook.fulfilled, (state:any, payload:any) => {
            state.status = 'Done.'
            state.error = null;
            state.book=payload.payload;
        }),
        builder.addCase(getCurrentBook.rejected, (state:any, payload:any) => {
            state.status = 'ERROR'
            state.error = payload;
        }),



        builder.addCase(getCardBook.pending, (state:any) => {
            state.status = 'Loading'
            state.error = null;
        }),
        builder.addCase(getCardBook.fulfilled, (state:any, payload:any) => {
            state.status = 'Done.'
            state.error = null;
            state.cart = payload.payload;
            state.cart.map((element:any)=> {element.count = 1});
        }),
        builder.addCase(getCardBook.rejected, (state:any, payload:any) => {
            state.status = 'ERROR'
            state.error = payload;
        })
    }
})

const {actions, reducer} = bookStoreSlice;

export default reducer;

export const {AddToCart, GetTotalPrice, IncreaseCount, DecreaseCount, RemoveFromCart} = actions;