import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Ticket, Comment } from "../types";
//mock data to set initial tickets
import { initialTickets } from "../mockdata/initialTickets";

interface TicketsState {
  list: Ticket[];
}

//defind initial state to redux and pass mock data as initial state
const initialState: TicketsState = { list: initialTickets };

//slice to handing ticket opperation
const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addTicket(
      state,
      action: PayloadAction<Omit<Ticket, "id" | "createdAt" | "comments">>
    ) {
      const nextId = state.list.length
        ? Math.max(...state.list.map((t) => t.id)) + 1
        : 1;
      state.list.unshift({
        ...action.payload,
        id: nextId,
        createdAt: new Date().toISOString(),
        comments: [],
      });
    },
    updateTicket(
      state,
      action: PayloadAction<{ id: number; changes: Partial<Ticket> }>
    ) {
      const { id, changes } = action.payload;
      const idx = state.list.findIndex((t) => t.id === id);
      if (idx >= 0) state.list[idx] = { ...state.list[idx], ...changes };
    },
    addComment(state, action: PayloadAction<{ id: number; comment: Comment }>) {
      const { id, comment } = action.payload;
      const ticket = state.list.find((t) => t.id === id);
      if (ticket)
        ticket.comments.push({ ...comment, at: new Date().toISOString() });
    },
    deleteTicket(state, action: PayloadAction<number>) {
      state.list = state.list.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTicket, updateTicket, addComment, deleteTicket } =
  ticketsSlice.actions;
export default ticketsSlice.reducer;
