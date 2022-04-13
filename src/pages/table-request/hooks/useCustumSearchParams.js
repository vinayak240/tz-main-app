import { useSearchParams } from "react-router-dom";

export default function useCustumSearchParams() {
  const [search] = useSearchParams();
  const queryObj = {};
  for (const entry of search.entries()) {
    const [param, value] = entry;
    queryObj[param] = value;
  }

  return queryObj;
}
