import { useLocation } from "react-router";

const useQuery = (): URLSearchParams =>
  new URLSearchParams(useLocation().search);

export default useQuery;
