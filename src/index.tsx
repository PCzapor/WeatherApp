import { createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./helpers/sliceStore";

export type GlobalContent = {
  favorites: string[];
  active: string;
};

export const MyGlobalContext = createContext<GlobalContent>({
  favorites: [],
  active: "",
});

export const useGlobalContext = (): GlobalContent =>
  useContext(MyGlobalContext);
const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <QueryClientProvider client={client}>
      <Toaster />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);

reportWebVitals();
