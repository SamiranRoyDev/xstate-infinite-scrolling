// import axios from 'axios';
import { createMachine, assign } from "xstate";
const nextPage = assign({
    page: (context, event) => context.page + 1,
  });
const fetchMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDMwBcDGALAsgQ2wEsA7MAOkIgBswBiAMQFEAVAYQAkBtABgF1FQABwD2sQmkLDiAkAA9EARgDMATjIqNGgKwAOACwAmI9z0KANCACei7gDYytvZsNbuCgOwK7AX28XUmLgEWCTkVMJ4ECRQtBBS5CQAbsIA1uQB2PhEpGThkdEIScIYeBJSPLwVMiJiZdJIcopa9tzcKgaurTq2Wkp6WhbWCEomZFru3Sp2Sr0GOga2vv7omcGhuRFRxDFgAE67wrtkglSlyIcAtmQZQdlhmwVFJXUVVQ014pL1oPIIBu4GMjcdx6YGeBT-Nw6QaIAzAhwqPRInQjZTzJQGJYgG5ZEI5WAAVwwGDgsAYLA4byEok+Uhkvx63AcSncEzsRn+hhhCAUOh0ZD07lsKJG3F6emFSixOLWOT2B125LYXD41RpdXpiD0OjUCmaczhhgBfKU3J0CgFmhU7jcbncKhZvj8IGIwggcBkMruatqX01CAAtEYBa0JRKNNrXPpuQHbBa+QZTHHBdaJjppStbniEtQwD7ad9Gn8tGNtDNRVoFE4FLZuUp7K5eYYHYnWQoVBnArj1nktlB8xqGr8OkzBcKtCpeu4WT1oVZYSW4+5dIKq7yISp086vdmyITiaSB36h4hbHGBa45u2Id0Ady5vZbEp204OsLugpO6s7mR5Ycj3SJ4ILY3CAnqtgGIierPlMejclMQIikilYoqy3BSk6QA */
  id: "fetchMachine",
  initial: "idle",
  context: {
    data: [],
    page: 1,
    error: null,
    isLoading:false
  },
  states: {
    idle: {
      on: {
        FETCH: "loading",
      },
    },
    loading: {
      entry: assign({ isLoading: true }),
      invoke: {
        src: async (ctx) => {
          try {
            let response = await fetch(
              `https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${ctx.page}`
            );
            let data = response.json();
            return data;
          } catch (error) {
            throw error;
          }
        },
        onDone: {
          target: "success",
          actions: assign({
            data: (contex, event) => {
              return [...contex.data, ...event.data.nodes];
            },
            isLoading : (context, event) => !context.isLoading
          }),
        },
        onError: {
          target: "error",
          actions: assign({
            error: (_, event) => event.data,
            isLoading : (context, event) => !context.isLoading
          }),
        },
      },
    },
    success: {
      on:{
        FETCH :{
            target:"loading",
            actions:"nextPage"
        }
      }
    },
    error: {
      on: {
        FETCH: "loading",
      },
    },
  },
},{
    actions: { nextPage },
    // guards: { isLastPage }
  });
export default fetchMachine;
