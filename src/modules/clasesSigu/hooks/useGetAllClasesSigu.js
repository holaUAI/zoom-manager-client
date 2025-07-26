import { useQuery } from "@tanstack/react-query";
import { getAll } from "../api/clasesSigu";

export const useClasesSigu = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: ["reuniones_sigu", page, limit], // el queryKey depende de page
    queryFn: () => getAll(page, limit),
    select: (res) => res || [],
    keepPreviousData: true, // evita el "parpadeo" al cambiar de página
  });
};
