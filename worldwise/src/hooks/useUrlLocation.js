import { useSearchParams } from "react-router-dom";

export function useUrlLocation() {
  const [searchParams] = useSearchParams();
  //farkli citye tikaldikca url otomatik degisiecegi icin mapLt ve mapLn de degisecektir
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return [lat, lng];
}
